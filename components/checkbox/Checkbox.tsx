import classNames from 'classnames'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import * as React from 'react'
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleProp,
  TextStyle,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import { WithTheme, WithThemeStyles } from '../style'
import AntmView from '../view/index'
import devWarning from '../_util/devWarning'
import { useAnimatedTiming } from '../_util/hooks/useAnimations'
import { CheckboxPropsType } from './PropsType'
import CheckboxStyles, { CheckboxStyle } from './style/index'

export interface CheckboxProps
  extends CheckboxPropsType,
    WithThemeStyles<CheckboxStyle> {
  style?: StyleProp<TextStyle>
  prefixCls?: string
  children?: React.ReactNode
}

const AntmCheckbox = ({
  prefixCls = 'checkbox',
  children,
  checked,
  defaultChecked,
  disabled,
  onChange,
  ...restProps
}: CheckboxProps) => {
  devWarning(
    'checked' in restProps || !('value' in restProps),
    'Checkbox',
    '`value` is not a valid prop, do you mean `checked`?',
  )

  const checkedRef = React.useRef<undefined | boolean>()
  if (checkedRef.current === undefined) {
    checkedRef.current = checked
  }

  const [innerChecked, setInnerChecked] = useMergedState<boolean>(false, {
    value: checkedRef.current,
    defaultValue: defaultChecked,
  })

  const [animatedValue, animate] = useAnimatedTiming()
  const transitionOpacity = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  }
  const transitionTransform = {
    transform: [
      { rotate: '45deg' },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  }

  //initial animate
  React.useEffect(() => {
    if (checkedRef.current) {
      animate({ duration: 300 })
    } else {
      animate({ duration: 300, toValue: 0 })
    }
  }, [animate, checkedRef])

  function triggerChange(newChecked: boolean) {
    let mergedChecked = innerChecked

    if (!disabled) {
      mergedChecked = newChecked
      checkedRef.current = mergedChecked
      setInnerChecked(mergedChecked)
      onChange?.({
        target: {
          checked: mergedChecked,
        },
      })
    }

    return mergedChecked
  }
  const onInternalClick = () => {
    const ret = triggerChange(!innerChecked)
    animate({
      toValue: ret ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.68, -0.55, 0.27, 1.55),
    })
  }

  return (
    <WithTheme themeStyles={CheckboxStyles}>
      {(styles) => {
        const antd_checkbox = classNames(`${prefixCls}`, {
          [`${prefixCls}_checked`]: innerChecked,
          [`${prefixCls}_disabled`]: disabled,
        })
          .split(' ')
          .map((a) => styles[a])

        const antd_checkbox_inner = classNames(`${prefixCls}_inner`, {
          [`${prefixCls}_inner_disabled`]: disabled,
        })
          .split(' ')
          .map((a) => styles[a])

        const antd_checkbox_inner_after = classNames(
          `${prefixCls}_inner_after`,
          {
            [`${prefixCls}_inner_after_disabled`]: disabled,
          },
        )
          .split(' ')
          .map((a) => styles[a])

        const Color = innerChecked
          ? styles.checkbox_checked?.borderColor
          : styles.checkbox?.borderColor
        return (
          <View style={styles[`${prefixCls}_wrapper`]}>
            <View style={styles.checkbox_wave}>
              <TouchableNativeFeedback
                background={
                  Platform.Version >= 21
                    ? TouchableNativeFeedback.Ripple(Color || '', true, 13)
                    : TouchableNativeFeedback.SelectableBackground()
                }
                useForeground={true}
                disabled={disabled}
                onPress={onInternalClick}>
                <View style={antd_checkbox}>
                  <Animated.View
                    style={[antd_checkbox_inner, transitionOpacity]}
                  />
                  <Animated.View
                    style={[antd_checkbox_inner_after, transitionTransform]}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
            <Pressable disabled={disabled} onPress={onInternalClick}>
              <AntmView style={styles[`${prefixCls}_label`]}>
                {children}
              </AntmView>
            </Pressable>
          </View>
        )
      }}
    </WithTheme>
  )
}

AntmCheckbox.displayName = 'AntmCheckbox'

export default AntmCheckbox

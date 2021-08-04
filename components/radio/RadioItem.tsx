import React from 'react'
import { ImageStyle, StyleProp, Text, View, ViewStyle } from 'react-native'
import { RefCheckboxProps } from '../checkbox/Checkbox'
import { CheckboxStyle } from '../checkbox/style'
import List from '../list/index'
import { WithTheme, WithThemeStyles } from '../style'
import { RadioItemPropsType } from './PropsType'
import Radio from './Radio'
import RadioItemStyles from './style/index'

const ListItem = List.Item

export interface RadioItemNativeProps
  extends RadioItemPropsType,
    WithThemeStyles<CheckboxStyle> {
  right?: boolean
  left?: boolean
  style?: StyleProp<ViewStyle>
  radioStyle?: StyleProp<ImageStyle>
}

export default class RadioItem extends React.Component<
  RadioItemNativeProps,
  any
> {
  radio: RefCheckboxProps

  handleClick = () => {
    if (this.radio) {
      this.radio.onPress()
    }
  }

  render() {
    const {
      style,
      disabled,
      children,
      right,
      left = !right,
      ...restProps
    } = this.props

    return (
      <WithTheme styles={this.props.styles} themeStyles={RadioItemStyles}>
        {(styles) => {
          let contentDom: React.ReactElement<any> | null = null
          if (children && React.isValidElement(children)) {
            contentDom = <View style={{ flex: 1 }}>{children}</View>
          } else {
            const contentStyle = [
              styles.radioItemContent,
              disabled ? styles.radioItemContentDisable : {},
            ]
            contentDom = (
              <Text style={contentStyle} numberOfLines={1}>
                {this.props.children}
              </Text>
            )
          }

          const radioEl = (
            <Radio
              ref={(ref: RefCheckboxProps) => (this.radio = ref)}
              disabled={disabled}
              {...restProps}
            />
          )

          const listProps = {
            thumb: left && !right ? radioEl : undefined,
            extra: right ? radioEl : undefined,
          }

          return (
            <ListItem
              style={style}
              onPress={disabled ? undefined : this.handleClick}
              {...listProps}>
              {contentDom}
            </ListItem>
          )
        }}
      </WithTheme>
    )
  }
}

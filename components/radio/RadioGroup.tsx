import useMergedState from 'rc-util/lib/hooks/useMergedState'
import * as React from 'react'
import View from '../view'
import { RadioGroupProps } from './PropsType'
import Radio from './Radio'
import { RadioGroupContextProvider } from './RadioContext'

const RadioGroup = React.forwardRef<any, RadioGroupProps>((props: any, ref) => {
  const [value, setValue] = useMergedState(props.defaultValue, {
    value: props.value,
  })

  const onRadioChange = (ev: any) => {
    const lastValue = value
    const val = ev.target.value
    if (!('value' in props)) {
      setValue(val)
    }
    const { onChange } = props
    if (onChange && val !== lastValue) {
      onChange(ev)
    }
  }

  const renderGroup = () => {
    const { options, disabled, children, style } = props
    let childrenToRender = children
    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      childrenToRender = options.map((option: any) => {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          return (
            <Radio
              key={option}
              disabled={disabled}
              value={option}
              checked={value === option}
              onChange={onRadioChange}>
              {option}
            </Radio>
          )
        }
        // 此处类型自动推导为 { label: string value: string }
        return (
          <Radio
            key={`radio-group-value-options-${option.value}`}
            disabled={option.disabled || disabled}
            value={option.value}
            checked={value === option.value}>
            {option.label}
          </Radio>
        )
      })
    }

    return (
      <View style={style} ref={ref}>
        <RadioGroupContextProvider
          value={{
            onChange: onRadioChange,
            value,
            disabled: props.disabled,
          }}>
          {childrenToRender}
        </RadioGroupContextProvider>
      </View>
    )
  }

  return renderGroup()
})

export default React.memo(RadioGroup)

import { OnChangeParams } from '../checkbox/PropsType'

export interface RadioPropsType {
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  onChange?: (_e: OnChangeParams) => void
  name?: string
  value?: any
}

export interface RadioItemPropsType extends RadioPropsType {
  radioProps?: object
  onPress?: () => any
}

export interface RadioGroupProps {
  style?: any
  children?: any
  prefixCls?: string
  defaultValue?: any
  value?: any
  onChange?: any
  options?: any
  optionType?: any
  disabled?: any
}
export interface RadioGroupContextProps {
  onChange: (_e: RadioChangeEvent) => void
  value: any
  disabled?: boolean
  name?: string
}
export interface RadioChangeEvent {
  target: { value: any }
}

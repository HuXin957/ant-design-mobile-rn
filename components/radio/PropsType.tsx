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

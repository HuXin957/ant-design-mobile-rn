import React from 'react'

export interface OnChangeParams {
  target: {
    checked: boolean
  }
}
export interface CheckboxPropsType {
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  value?: any
  onChange?: (_e: OnChangeParams) => void
}

export interface CheckboxItemPropsType extends CheckboxPropsType {
  extra?: React.ReactNode
  prefixCls?: string
  onPress?: (_e?: any) => void
}

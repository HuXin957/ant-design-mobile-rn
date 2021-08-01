import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import List from '../list/index'
import { WithThemeStyles } from '../style'
import Checkbox, { RefCheckboxProps } from './Checkbox'
import { CheckboxItemPropsType } from './PropsType'
import { CheckboxStyle } from './style/index'

const ListItem = List.Item

export interface CheckboxItemProps
  extends CheckboxItemPropsType,
    WithThemeStyles<CheckboxStyle> {
  checkboxStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
}

export default class CheckboxItem extends React.Component<CheckboxItemProps> {
  checkbox: RefCheckboxProps

  handleClick = () => {
    if (this.checkbox) {
      this.checkbox.onPress()
    }
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  render() {
    const {
      style,
      defaultChecked,
      checked,
      disabled,
      children,
      extra,
      onChange,
    } = this.props

    const thumbNode = (
      <Checkbox
        ref={(ref: RefCheckboxProps) => (this.checkbox = ref)}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    )
    return (
      <ListItem
        style={style}
        onPress={disabled ? undefined : this.handleClick}
        extra={extra}
        thumb={thumbNode}>
        {children}
      </ListItem>
    )
  }
}

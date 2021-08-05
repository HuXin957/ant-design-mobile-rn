import * as React from 'react'
import Checkbox from '../checkbox/Checkbox'
import { OnChangeParams } from '../checkbox/PropsType'
import { CheckboxStyle } from '../checkbox/style'
import { WithTheme, WithThemeStyles } from '../style'
import devWarning from '../_util/devWarning'
import { RadioPropsType } from './PropsType'
import RadioGroupContext from './RadioContext'
import RadioStyle from './style'

export interface RadioProps
  extends RadioPropsType,
    WithThemeStyles<CheckboxStyle> {
  prefixCls?: string
  children?: React.ReactNode
}

const InternalRadio = (
  { styles, onChange, value, ...restProps }: RadioProps,
  ref: any,
) => {
  devWarning(
    !('optionType' in restProps),
    'Radio',
    '`optionType` is only support in Radio.Group.',
  )

  const context = React.useContext(RadioGroupContext)
  if (context) {
    restProps.checked = value === context.value
    restProps.disabled = restProps.disabled || context.disabled
  }

  const onInternalChange = (e: OnChangeParams) => {
    e.target.checked && triggerChange(e.target.checked)
  }

  function triggerChange(newChecked: boolean) {
    onChange?.({ target: { checked: newChecked } })
    context?.onChange?.({ target: { value } })
  }

  return (
    <WithTheme themeStyles={RadioStyle} styles={styles}>
      {(_styles) => {
        return (
          <Checkbox
            {...restProps}
            ref={ref}
            indeterminate={false}
            onChange={onInternalChange}
            styles={_styles}
          />
        )
      }}
    </WithTheme>
  )
}

const AntmRadio = React.forwardRef(InternalRadio)

AntmRadio.displayName = 'AntmRadio'

export default AntmRadio

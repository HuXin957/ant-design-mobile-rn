import * as React from 'react'
import Checkbox from '../checkbox/Checkbox'
import { OnChangeParams } from '../checkbox/PropsType'
import { CheckboxStyle } from '../checkbox/style'
import { WithTheme, WithThemeStyles } from '../style'
import devWarning from '../_util/devWarning'
import { RadioPropsType } from './PropsType'
import RadioStyle from './style'

export interface RadioProps
  extends RadioPropsType,
    WithThemeStyles<CheckboxStyle> {
  prefixCls?: string
  children?: React.ReactNode
}

const InternalRadio = (
  { styles, onChange, ...restProps }: RadioProps,
  ref: any,
) => {
  devWarning(
    !('optionType' in restProps),
    'Radio',
    '`optionType` is only support in Radio.Group.',
  )

  const [innerChecked, setInnerChecked] = React.useState(
    restProps.checked ?? restProps.defaultChecked,
  )

  React.useEffect(() => {
    setInnerChecked(restProps.checked)
  }, [restProps.checked])

  const onInternalChange = (e: OnChangeParams) => {
    restProps.checked ?? (e.target.checked && triggerChange(e.target.checked))
  }

  function triggerChange(newChecked: boolean) {
    setInnerChecked(newChecked)
    onChange?.({ target: { checked: newChecked } })
  }

  return (
    <WithTheme themeStyles={RadioStyle} styles={styles}>
      {(_styles) => {
        return (
          <Checkbox
            {...restProps}
            ref={ref}
            checked={innerChecked}
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

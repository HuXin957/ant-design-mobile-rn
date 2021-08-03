import * as React from 'react'
import Checkbox from '../checkbox'
import { CheckboxStyle } from '../checkbox/style'
import { WithThemeStyles } from '../style'
import devWarning from '../_util/devWarning'
import { RadioPropsType } from './PropsType'

export interface RadioProps
  extends RadioPropsType,
    WithThemeStyles<CheckboxStyle> {
  prefixCls?: string
  children?: React.ReactNode
  indeterminate?: boolean
}

const InternalRadio = (props: RadioProps) => {
  devWarning(
    !('optionType' in props),
    'Radio',
    '`optionType` is only support in Radio.Group.',
  )

  return <Checkbox {...props} />
}

const AntmRadio = React.forwardRef(InternalRadio)

AntmRadio.displayName = 'AntmRadio'

export default AntmRadio

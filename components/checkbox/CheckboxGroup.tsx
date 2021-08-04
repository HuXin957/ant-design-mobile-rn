import * as React from 'react'
import Checkbox from './Checkbox'

export type CheckboxValueType = string | number | boolean

export interface CheckboxOptionType {
  label: React.ReactNode
  value: CheckboxValueType
  style?: React.CSSProperties
  disabled?: boolean
  onChange?: (e: any) => void
}

export interface AbstractCheckboxGroupProps {
  prefixCls?: string
  className?: string
  options?: Array<CheckboxOptionType | string>
  disabled?: boolean
  style?: React.CSSProperties
}

export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
  name?: string
  defaultValue?: Array<CheckboxValueType>
  value?: Array<CheckboxValueType>
  onChange?: (checkedValue: Array<CheckboxValueType>) => void
  children?: React.ReactNode
}

export interface CheckboxGroupContext {
  name?: string
  toggleOption?: (option: CheckboxOptionType) => void
  value?: any
  disabled?: boolean
  registerValue: (val: string) => void
  cancelValue: (val: string) => void
}

export const GroupContext = React.createContext<CheckboxGroupContext | null>(
  null,
)

const InternalCheckboxGroup: React.ForwardRefRenderFunction<
  any,
  CheckboxGroupProps
> = (
  {
    defaultValue,
    children,
    options = [],
    prefixCls: customizePrefixCls,
    className,
    style,
    onChange,
    ...restProps
  },
  ref,
) => {
  // const { getPrefixCls, direction } = React.useContext(ConfigContext)

  const [value, setValue] = React.useState<CheckboxValueType[]>(
    restProps.value || defaultValue || [],
  )
  const [registeredValues, setRegisteredValues] = React.useState<
    CheckboxValueType[]
  >([])

  React.useEffect(() => {
    if ('value' in restProps) {
      setValue(restProps.value || [])
    }
  }, [restProps, restProps.value])

  const getOptions = () =>
    options.map((option) => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        }
      }
      return option
    })

  const cancelValue = (val: string) => {
    setRegisteredValues((prevValues) => prevValues.filter((v) => v !== val))
  }

  const registerValue = (val: string) => {
    setRegisteredValues((prevValues) => [...prevValues, val])
  }

  const toggleOption = (option: CheckboxOptionType) => {
    const optionIndex = value.indexOf(option.value)
    const newValue = [...value]
    if (optionIndex === -1) {
      newValue.push(option.value)
    } else {
      newValue.splice(optionIndex, 1)
    }
    if (!('value' in restProps)) {
      setValue(newValue)
    }
    const opts = getOptions()
    onChange?.(
      newValue
        .filter((val) => registeredValues.indexOf(val) !== -1)
        .sort((a, b) => {
          const indexA = opts.findIndex((opt) => opt.value === a)
          const indexB = opts.findIndex((opt) => opt.value === b)
          return indexA - indexB
        }),
    )
  }

  // const domProps = omit(restProps, ['value', 'disabled'])

  if (options && options.length > 0) {
    children = getOptions().map((option) => (
      <Checkbox
        key={option.value.toString()}
        disabled={'disabled' in option ? option.disabled : restProps.disabled}
        value={option.value}
        checked={value.indexOf(option.value) !== -1}
        onChange={option.onChange}>
        {option.label}
      </Checkbox>
    ))
  }

  return children
}

const CheckboxGroup = React.forwardRef<any, CheckboxGroupProps>(
  InternalCheckboxGroup,
)

export default React.memo(CheckboxGroup)

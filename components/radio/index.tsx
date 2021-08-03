import * as React from 'react'
import InternalRadio, { RadioProps } from './Radio'

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<RadioProps> {
  __ANTM_CHECKBOX: boolean
}

const Radio = InternalRadio as CompoundedComponent

Radio.__ANTM_CHECKBOX = true

export default Radio

import { TextField } from '@mui/material'
import React from 'react'

const Input = ({value, onChange, placeholder, type="text", ...rest }) => {
  return (
  <TextField onChange={onChange} value={value} type={type }  placeholder={placeholder} {...rest} />
  )
}

export default Input

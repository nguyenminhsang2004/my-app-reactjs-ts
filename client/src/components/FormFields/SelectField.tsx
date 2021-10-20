import { FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import React from 'react'
import { Control, useController } from 'react-hook-form'

export interface SelectOption {
  label?: string
  value: string | number
}

export interface SelectFieldProps {
  name: string
  control: Control<any>
  label?: string
  disabled?: boolean
  options: SelectOption[]
}

export function SelectField({
  name,
  control,
  label,
  disabled,
  options,
  ...inputProps
}: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })
  return (
    <FormControl disabled={disabled} fullWidth variant="outlined" size="small" margin="normal">
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        error={invalid}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  )
}

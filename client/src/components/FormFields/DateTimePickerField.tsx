import DateFnsUtils from '@date-io/date-fns'
import { Box } from '@material-ui/core'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React, { useEffect, useState } from 'react'
import { Control, useController } from 'react-hook-form'

export interface DateTimePickerFieldProps {
  name: string
  control: Control<any>
  label: string
}

export function DateTimePickerField({
  name,
  control,
  label,
  ...inputProps
}: DateTimePickerFieldProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const handleDateChange = (date: Date | null) => {
    if (onChange) {
      setSelectedDate(date)
      onChange(date)
    }
  }
  const {
    field: { onChange, onBlur, value },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  useEffect(() => {
    onChange(selectedDate)
  }, [])
  
  return (
    <Box mt={3}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          variant="inline"
          inputVariant="outlined"
          ampm={true}
          label={label}
          value={value}
          onChange={handleDateChange}
          onError={console.log}
          disablePast
          format="yyyy/MM/dd HH:mm"
          name={name}
          onBlur={onBlur}
          error={invalid}
          helperText={error}
          InputAdornmentProps={{ position: 'start' }}
        />
        {/* <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          format="MM/dd/yyyy"
          name={name}
          onBlur={onBlur}
          error={invalid}
          helperText={error}
          InputAdornmentProps={{ position: 'start' }}
        /> */}
      </MuiPickersUtilsProvider>
    </Box>
  )
}

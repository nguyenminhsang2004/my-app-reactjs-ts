import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { DateTimePickerField, InputField, SelectField } from 'components/FormFields'
import { Note } from 'models'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup.string().required('Please enter title !!!'),
  content: yup.string().required('Please enter content !!!'),
  completedAt: yup.date().required(),
})

export interface NoteFormProps {
  initialValue: Note
  isEdit: boolean
  onSubmit: (formValue: Note) => void
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  button: {
    textAlign: 'center',
    marginTop: theme.spacing(3),
  },
}))

export default function PostForm({ initialValue, onSubmit, isEdit }: NoteFormProps) {
  const classes = useStyles()

  const [error, setError] = useState<string>('')

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Note>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  })

  const handleSubmitForm = async (formValue: Note) => {
    try {
      setError('')
      await onSubmit?.(formValue)
    } catch (error) {
      console.log(error)
      setError('Create post failed.')
    }
  }

  return (
    <Box width={600}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputField name="title" control={control} label="Title" />
        <InputField name="content" control={control} label="Content" />
        {isEdit && (
          <SelectField
            name="status"
            control={control}
            label="Status"
            options={[
              { label: 'NOT COMPLETED', value: 'Not completed' },
              { label: 'COMPLETED', value: 'Completed' },
            ]}
          />
        )}
        <DateTimePickerField name="completedAt" control={control} label="Completed Date" />

        {error && <Alert severity="error">{error}</Alert>}

        <Box className={classes.button}>
          <Button
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={20} color="primary" />} Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}

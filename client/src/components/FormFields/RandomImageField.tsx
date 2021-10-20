import { Box, Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Control, useController } from 'react-hook-form'

export interface RandomImageFieldProps {
  name: string
  control: Control<any>
  label?: string
  disabled?: boolean
  isEdit: boolean
}

const getRandomImageUrl = () => {
  const randomId = Math.trunc(Math.random() * 2000)
  return `https://picsum.photos/id/${randomId}/600/300`
}

export function RandomImageField({
  name,
  control,
  label,
  disabled,
  isEdit,
  ...inputProps
}: RandomImageFieldProps) {
  useEffect(() => {
    if (!isEdit) {
      handleRandomPhotoClick()
    }
  }, [])

  const {
    field: { value, onBlur, onChange },
  } = useController({
    name,
    control,
  })

  const handleRandomPhotoClick = async () => {
    if (onChange) {
      const randomImageUrl = getRandomImageUrl()
      onChange(randomImageUrl)
    }
  }

  return (
    <Box>
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={handleRandomPhotoClick}
          onBlur={onBlur}
        >
          Random image
        </Button>
      </Box>
      <Box mt={3} height={300}>
        {value && (
          <img
            src={value}
            alt="Ooops ... not found. Please click random again!"
            onError={handleRandomPhotoClick}
          />
        )}
      </Box>
    </Box>
  )
}

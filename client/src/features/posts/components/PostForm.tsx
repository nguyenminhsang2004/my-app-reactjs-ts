import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { InputField, RandomImageField } from 'components/FormFields';
import { Post } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

const schema = yup.object().shape({
    title: yup.string().required('Please enter title !!!'),
    content: yup.string().required('Please enter content !!!'),
    imageUrl: yup.string().required(),
});

export interface PostFormProps {
    initialValue: Post;
    onSubmit: (formValue: Post) => void;
    isEdit: boolean;
}

const useStyles = makeStyles(theme => ({

    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    button: {
        textAlign: 'center',
        marginTop: theme.spacing(3),
    },

}));

export default function PostForm ({initialValue, onSubmit, isEdit}: PostFormProps) {
    const classes = useStyles();

    const [error, setError] = useState<string>('');

    const {
        control,
        handleSubmit,
        formState: {isSubmitting}
    } = useForm<Post>({
        defaultValues: initialValue,
        resolver: yupResolver(schema)
    });

    const handleSubmitForm = async (formValue: Post) => {
        try {
            setError('');
            await onSubmit?.(formValue);
        } catch (error) {
            console.log(error);
            setError('Create post failed.');
        }
    }

    return (
        <Box width={600}>
            <Typography className={classes.title} variant="h4">
                {isEdit ? 'Update post info' : 'Add new post'}
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField name="title" control={control} label="Title"/>
                <InputField name="content" control={control} label="Content"/>
                <RandomImageField isEdit={isEdit} name="imageUrl" control={control}/>

                {error && <Alert severity="error">{error}</Alert>}

                <Box className={classes.button}>
                    <Button size="large" type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={20} color="primary"/>} Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

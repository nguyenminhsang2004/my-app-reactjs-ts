import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { LoginPayLoad } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import { selectLogging } from '../authSlice';

export interface LoginFormProps {
    initialValue?: LoginPayLoad;
    onSubmit?: (formValue: LoginPayLoad) => void;
}

const schema = yup.object().shape({
    email: yup.string().email().required('Please enter email !!!'),
    passWord: yup.string().required('Please enter pass word !!!')
});

export default function LoginForm ({ initialValue, onSubmit }: LoginFormProps) {
    const {
        control, handleSubmit
    } = useForm<LoginPayLoad>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const isLogging = useAppSelector(selectLogging);

    const handleSubmitForm = (formValue: LoginPayLoad) => {
        try {
            onSubmit?.(formValue);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField name="email" control={control} label="Email" type="email"/>
                <InputField name="passWord" control={control} label="Pass word" type="password" />
                <Box mt={3}>
                    <Button fullWidth type="submit" size="medium" variant="contained" color="primary">
                        {isLogging && <CircularProgress size={20} color="secondary"/>} &nbsp; Login
                    </Button>
                    <Box style={{textAlign: 'center'}} mt={1}>
                        or <br/>
                        <Link style={{textDecoration:'none', fontSize: '18px'}} to="/register">Register</Link>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

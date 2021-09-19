import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField } from 'components/FormFields';
import { User } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import { selectRegistering } from '../authSlice';

export interface RegisterFormProps {
    initialValue?: User;
    onSubmit?: (formValue: User) => void;
}

const schema = yup.object().shape({
    fullName: yup.string().required('Please enter full name !!!') ,
    email: yup.string().email().required('Please enter email !!!'),
    passWord: yup
            .string()
            .trim().min(8, 'Pass word lasted 8 characters !!!')
            .required('Please enter pass word !!!'),
    gender: yup
            .string()
            .oneOf(['male', 'female',], 'Please select either male or female !!!')
            .required('Please select gender !!!'),
    imageUrl: yup.string().required('Please enter image !!!')
  });

export default function RegisterForm ({ initialValue, onSubmit }: RegisterFormProps) {
    const {
        control, handleSubmit
    } = useForm<User>({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const isRegistering = useAppSelector(selectRegistering);

    const handleSubmitForm = (formValue: User) => {
        try {
            onSubmit?.(formValue);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box maxWidth={700}>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField name="fullName" control={control} label="Full name"/>
                <RadioGroupField name="gender" control={control} label="Gender" options={[
                    {label: 'Male', value: 'male'},
                    {label: 'Female', value: 'female'}
                ]}/>
                <InputField name="email" control={control} label="Email" type="email"/>
                <InputField name="passWord" control={control} label="Pass word" type="password" />
                <InputField name="imageUrl" control={control} label="Image"/>
                <Box mt={3}>
                    <Button fullWidth type="submit" size="medium" variant="contained" color="primary">
                        {isRegistering && <CircularProgress size={20} color="secondary"/>} &nbsp; Register
                    </Button>

                    <Box style={{textAlign: 'center'}} mt={1}>
                        or <br/>
                        <Link style={{textDecoration:'none', fontSize: '18px'}} to="/login">Login</Link>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

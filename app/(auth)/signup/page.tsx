'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Button,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Link as MuiLink,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

import { Gender } from './enums/user.enum';
import MenuItem from '@mui/material/MenuItem';
import { signupSchema } from './schema/user.schema';

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    const onSubmit = async (data: SignupFormData) => {
        console.log(data);
        try {
            const res = await axios.post('http://localhost:3001/user/signup', data);
            console.log(res);
            toast.success("Registration successful!");
            router.push('/login');
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { message } = error.response.data;
                toast.error(message);
            } else {
                toast.error("Something went wrong");
            }
            console.log(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor="#f5f5f5"
            >
                <Paper elevation={3} sx={{ padding: 4, width: 450 }}>
                    <Typography variant="h5" gutterBottom>
                        Sign Up
                    </Typography>


                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                        <TextField
                            label="Name"
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            select
                            label="Gender"
                            defaultValue=""
                            {...register('gender')}
                            error={!!errors.gender}
                            helperText={errors.gender?.message}
                            fullWidth
                            margin="normal"
                        >
                            {Object.values(Gender).map((value) => (
                                <MenuItem key={value} value={value}>{value}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Email"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            fullWidth
                            margin="normal"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            {...register('confirmPassword')}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            fullWidth
                            margin="normal"
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Sign Up
                        </Button>

                        <Box mt={2} textAlign="center">
                            <Typography variant="body2">
                                Already have an account?{' '}
                                <MuiLink component={Link} href="/login" underline="hover">
                                    Log In
                                </MuiLink>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </>
    );
}
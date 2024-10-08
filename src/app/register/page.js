"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf } from "react-icons/fa6";
import authBg from "@/assets/auth-bg.jpg";
import { useUser } from '@/contexts/UserContext';
import toast from 'react-hot-toast';
import getUrl from '@/app/api_url';

export default function Register() {
    const { user } = useUser(); // Access the current user context
    const [registrationError, setRegistrationError] = useState(); // Store registration errors
    const router = useRouter();

    useEffect(() => {
        // If the user is already logged in, redirect to the home page
        if(user) router.push('/home');
    }, [user]);

    // Handles user registration by sending a POST request to the API
    const handleRegister = async (values) => {
        try {
            const url = getUrl('api/auth/register/'); // Construct API URL
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const data = await res.json(); // Parse response data

            if (res.ok) {
                toast.success('Account created successfully.'); // Show success message
                return router.push('/login'); // Redirect to login page
            }

            // Handle registration errors (e.g., username already exists)
            if (data.username) {
                setRegistrationError(data.username[0]);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className='main flex'>
            {/* Display background image on larger screens */}
            <div className='hidden px-3 md:flex'>
                <Image className='h-[89vh] object-cover rounded-md' src={ authBg } alt='leaf background' />
            </div>
            <div className='min-w-[50%] mx-auto px-6 py-10 rounded-md flex flex-col gap-4 items-center justify-center'>
                <div className='w-fit p-4 rounded-full bg-green-400/50'>
                    <FaLeaf fontSize='1.5rem' />
                </div>
                <div className='mb-20'>
                    <h2 className='text-4xl font-bold'>Register</h2>
                </div>
                <div className='w-full md:w-[40%]'>
                    {/* Formik for form handling */}
                    <Formik
                        initialValues={{ username: '', email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.username) {
                                errors.username = 'Required';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            } else if(values.password.length < 6) {
                                errors.password = 'Min length should be 6';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            handleRegister(values); // Submit form values for registration
                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
                                <label htmlFor='username' className='mt-1 text-sm'>Username</label>
                                <input
                                    className='px-4 py-2 border rounded-md bg-transparent'
                                    placeholder='Johnny'
                                    type="text"
                                    name="username"
                                    id="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                />
                                <span className='text-right text-xs text-red-400'>{errors.username && touched.username && errors.username}</span>

                                <label htmlFor='email' className='mt-1 text-sm'>Email</label>
                                <input
                                    className='px-4 py-2 border rounded-md bg-transparent'
                                    placeholder='johndoe@gmail.com'
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <span className='text-right text-xs text-red-400'>{errors.email && touched.email && errors.email}</span>

                                <label htmlFor='password' className='mt-1 text-sm'>Create Password</label>
                                <input
                                    className='px-4 py-2 border rounded-md bg-transparent'
                                    placeholder='••••••••'
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <span className='text-right text-xs text-red-400'>{errors.password && touched.password && errors.password}</span>

                                {/* Display registration errors */}
                                <span className='text-left text-xs text-red-400'>{registrationError}</span>

                                <button className='ml-auto mt-4 px-4 py-2 flex w-fit bg-green-400 dark:bg-green-600 transition hover:bg-green-600 flex gap-2 items-center rounded-full' type="submit" disabled={isSubmitting}>
                                    <p className='text-white font-medium'>Register</p>
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className='opacity-60 float-right'>
                    <p className='text-sm'>Already registered? <Link href='/login' className='font-medium text-blue-800 dark:text-blue-200 underline'>Login.</Link></p>
                </div>
            </div>
        </div>
    );
}

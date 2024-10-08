"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import { useUser } from '@/contexts/UserContext';
import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf } from "react-icons/fa6";
import getUrl from '@/app/api_url';
import authBg from "@/assets/auth-bg.jpg";
import toast from 'react-hot-toast';

export default function Login() {
    const { user, updateUser } = useUser(); // Access the user context to update the current user
    const [loginError, setLoginError] = useState(); // State to store any login errors
    const router = useRouter();

    useEffect(() => {
        // Redirect to the home page if the user is already logged in
        if(user) router.push('/home');
    }, [user]);

    // Handle login process
    const handleLogin = async (values) => {
        try {
            const url = getUrl('api/auth/login/'); // Construct the API endpoint URL
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values), // Send the form data as JSON
            });

            const data = await res.json(); // Parse the response data

            if (res.ok) {
                toast.success('Logged in successfully!'); // Show success message
                // Update user context with the received user data and username
                updateUser({
                    ...data,
                    username: values.username,
                });
                router.push('/home'); // Redirect to the home page
            } else {
                setLoginError(data.detail); // Display any login errors
            }
        } catch (error) {
            console.error(error.message); // Handle potential network or server errors
        }
    }

    return (
        <div className='main flex'>
            {/* Login form container */}
            <div className='min-w-[50%] mx-auto px-6 py-10 rounded-md flex flex-col gap-4 items-center justify-center'>
                {/* Logo/Icon */}
                <div className='w-fit p-4 rounded-full bg-green-400/50'>
                    <FaLeaf fontSize='1.5rem' />
                </div>
                {/* Login heading */}
                <div className='mb-20'>
                    <h2 className='text-4xl font-bold'>Login</h2>
                </div>
                {/* Formik form for handling login */}
                <div className='w-full md:w-[40%]'>
                    <Formik
                        initialValues={{ username: '', password: '' }} // Initial form values
                        validate={values => {
                            const errors = {};
                            if (!values.username) {
                                errors.username = 'Required'; // Validate username
                            }
                            if (!values.password) {
                                errors.password = 'Required'; // Validate password
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                handleLogin(values); // Handle form submission
                                setSubmitting(false);
                            }, 400);
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
                                {/* Username field */}
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
                                <span className='text-right text-xs text-red-400'>
                                    {errors.username && touched.username && errors.username}
                                </span>
                                {/* Password field */}
                                <label htmlFor='password' className='mt-1 text-sm'>Password</label>
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
                                <span className='text-right text-xs text-red-400'>
                                    {errors.password && touched.password && errors.password}
                                </span>
                                {/* Login error display */}
                                <span className='text-left text-xs text-red-400'>{loginError}</span>
                                {/* Submit button */}
                                <button
                                    className='ml-auto mt-4 px-4 py-2 flex w-fit bg-green-400 dark:bg-green-600 hover:bg-green-600 flex gap-2 items-center rounded-full'
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    <p className='text-white font-medium'>Login</p>
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
                {/* Registration link for new users */}
                <div className='opacity-60 float-right'>
                    <p className='text-sm'>
                        New here? <Link href='/register' className='font-medium text-blue-800 dark:text-blue-200 underline'>
                            Register for free.
                        </Link>
                    </p>
                </div>
            </div>
            {/* Background image on larger screens */}
            <div className='hidden px-3 md:flex'>
                <Image className='h-[89vh] object-cover rounded-md' src={ authBg } alt='leaf background' />
            </div>
        </div>
    );
}

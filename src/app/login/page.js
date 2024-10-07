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

export default function Login() {
	const { user, updateUser } = useUser();
	const [ loginError, setLoginError ] = useState();
	const router = useRouter();

	useEffect(() => {
		if(user) router.push('/home');
	}, [user]);

	const handleLogin = async ( values ) => {
		try {
			const url = getUrl('api/auth/login/');
			const res = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			});
			const data = await res.json();
			if(res.ok) {
				// add user token in user context
				updateUser({
					...data,
					username: values.username,
				});
				return router.push('/home');
			}

			setLoginError(data.detail);
		} catch (error) {
			console.error(error.message);
		}
	}


	return (
		<div className='main flex'>
			<div className='min-w-[50%] mx-auto px-6 py-10 rounded-md flex flex-col gap-4 items-center justify-center'>
				<div className='w-fit p-4 rounded-full bg-green-400/50'>
						<FaLeaf fontSize='1.5rem' />
				</div>
				<div className='mb-20'>
						<h2 className='text-4xl font-bold'>Login</h2>
				</div>
				<div className='w-full md:w-[40%]'>
					<Formik
						initialValues={{ username: '', password: '' }}
						validate={values => {
							const errors = {};
							if (!values.username) {
								errors.username = 'Required';
							}
							if (!values.password) {
								errors.password = 'Required';
							} 
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								handleLogin(values);
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
							/* and other goodies */
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
								<span  className='text-right text-xs text-red-400'>{errors.username && touched.username && errors.username}</span>
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
								<span className='text-right text-xs text-red-400'>{errors.password && touched.password && errors.password}</span>
								<span className='text-left text-xs text-red-400'>{ loginError }</span>
								<button className='ml-auto mt-4 px-4 py-2 flex w-fit bg-green-400 dark:bg-green-600 hover:bg-green-600 flex gap-2 items-center rounded-full' type="submit" disabled={isSubmitting}>
									<p className='text-white font-medium'>Login</p>
								</button>
							</form>
						)}
					</Formik>
				</div>
				<div className='opacity-60 float-right'>
					<p className='text-sm'>New here? <Link href='/register' className='font-medium text-blue-800 dark:text-blue-200 underline'>Register for free.</Link></p>
				</div>
			</div>
			<div className='hidden px-3 md:flex'>
				<Image className='h-[89vh] object-cover rounded-md' src={ authBg } alt='leaf background' />
			</div>
		</div>
	);
}
  
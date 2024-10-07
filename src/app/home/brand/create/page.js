"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { useUser } from "@/contexts/UserContext";
import getUrl from '@/app/api_url';

export default function CreateBrand() {
    const { user } = useUser();
    const router = useRouter();

    const handleSubmit = async (values) => {
        try {
			const url = getUrl('api/brands/');
            const payload = {
                ...values, 
                creator_id: user.id,
            }
            console.log(payload);
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            router.push('/home/dashboard');
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {

        if(!user) router.push('/home/dashboard');
    }, []);

    return (
        <div className='w-full'>
            <div className='mb-10'>
                <h2 className='text-lg font-semibold'>Create a Brand</h2>
            </div>
            <Formik
                initialValues={{ name: '', description: '', logo: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.description) {
                        errors.description = 'Required';
                    } 
                    if (!values.logo) {
                        errors.logo = 'Required';
                    } 
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        handleSubmit(values);
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
                        <label htmlFor='name' className='mt-1 text-sm'>Brand Name</label>
                        <input
                            className='px-4 py-2 border rounded-md bg-transparent'
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        <span  className='text-right text-xs text-red-400'>{errors.name && touched.name && errors.name}</span>
                        <label htmlFor='description' className='mt-1 text-sm'>Description</label>
                        <input
                            className='px-4 py-2 border rounded-md bg-transparent'
                            type="text"
                            name="description"
                            id="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                        />
                        <span className='text-right text-xs text-red-400'>{errors.description && touched.description && errors.description}</span>
                        <label htmlFor='logo' className='mt-1 text-sm'>Logo URL</label>
                        <input
                            className='px-4 py-2 border rounded-md bg-transparent'
                            type="url"
                            name="logo"
                            id="logo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.logo}
                        />
                        <span className='text-right text-xs text-red-400'>{errors.logo && touched.logo && errors.logo}</span>
                        <button className='ml-auto mt-4 px-4 py-2 flex w-fit bg-green-400 dark:bg-green-600 hover:bg-green-600 flex gap-2 items-center rounded-full' type="submit">
                            <p className='text-white font-medium'>Create</p>
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik } from "formik";
import { useUser } from "@/contexts/UserContext";
import getUrl from "@/app/api_url";

export default function EditProduct() {
    const [ product, setProduct ] = useState({
        name: '', description: '', image: '', stock: '', price: ''
    });
    const { user } = useUser();
    const router = useRouter();
    const { id } = useParams();

    const handleSubmit = async (values) => {
        try {
            const url = getUrl(`api/product/${id}/`);
            const payload = {
                ...product,
                ...values, 
                stock: parseInt(values.stock),
                price: parseInt(values.price),
            }
            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            router.push('/home/dashboard');
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const url = getUrl(`api/product/${id}/`);
                const res = await fetch(url);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error(error.message);
            }
        }
        if(!user) router.push('/home/dashboard');
        getProduct();
    }, [user]);

    return (
        <div className='w-full'>
            <div className='mb-10'>
                <h2 className='text-lg font-semibold'>Edit Product</h2>
            </div>
            {
                product.id && <Formik
                    initialValues={{ name: product.name, description: product.description, image: product.image, stock: product.stock, price: product.price }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        if (!values.description) {
                            errors.description = 'Required';
                        } 
                        if (!values.image) {
                            errors.image = 'Required';
                        } 
                        if (!values.stock) {
                            errors.stock = 'Required';
                        }
                        if (!values.price) {
                            errors.price = 'Required';
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
                            <label htmlFor='name' className='mt-1 text-sm'>Product Name</label>
                            <input
                                className='px-4 py-2 border rounded-md bg-transparent'
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
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
                            <label htmlFor='image' className='mt-1 text-sm'>Image URL</label>
                            <input
                                className='px-4 py-2 border rounded-md bg-transparent'
                                type="url"
                                name="image"
                                id="image"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.image}
                            />
                            <span className='text-right text-xs text-red-400'>{errors.image && touched.image && errors.image}</span>
                            <label htmlFor='stock' className='mt-1 text-sm'>Stock</label>
                            <input
                                className='px-4 py-2 border rounded-md bg-transparent'
                                type="text"
                                name="stock"
                                id="stock"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.stock}
                            />
                            <span className='text-right text-xs text-red-400'>{errors.stock && touched.stock && errors.stock}</span>
                            <label htmlFor='price' className='mt-1 text-sm'>Price</label>
                            <input
                                className='px-4 py-2 border rounded-md bg-transparent'
                                type="text"
                                name="price"
                                id="price"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                            />
                            <span className='text-right text-xs text-red-400'>{errors.price && touched.price && errors.price}</span>
                            <button className='ml-auto mt-4 px-4 py-2 flex w-fit bg-green-400 dark:bg-green-600 hover:bg-green-600 flex gap-2 items-center rounded-full' type="submit">
                                <p className='text-white font-medium'>Update</p>
                            </button>
                        </form>
                    )}
                </Formik>
            }
        </div>
    )
}
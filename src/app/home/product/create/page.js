"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { useUser } from "@/contexts/UserContext";
import getUrl from "@/app/api_url";
import toast from "react-hot-toast";

export default function CreateProduct() {
    const [ brands, setBrands ] = useState();
    const categories = ['organic', 'furniture','food', 'cosmetics', 'accessories'];
    const { user } = useUser();
    const router = useRouter();

    const handleSubmit = async (values) => {
        try {
            const url = getUrl('api/products/');
            const payload = {
                ...values, 
                brand_id: parseInt(values.brand_id),
                stock: parseInt(values.stock),
                price: parseInt(values.price),
                creator_id: user.id,
            }
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if(res.ok) {
                toast.success('Product created successfully');
                router.push('/home/dashboard');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        const getBrands = async () => {
            try {
                const url = getUrl(`api/brands/search/?field=creator_id&value=${user.id}`);
                const res = await fetch(url);
                const data = await res.json();
                setBrands(data.map(brand => ({ name: brand.name, id: brand.id }) ));
            } catch (error) {
                console.error(error.message);
            }
        }

        if(!user) router.push('/home/dashboard');
        getBrands();
    }, [user]);

    return (
        <div className='w-full'>
            <div className='mb-10'>
                <h2 className='text-lg font-semibold'>Create a Product</h2>
            </div>
            <Formik
                initialValues={{ name: '', description: '', image: '', stock: '', price: '', brand_id: '', category: '' }}
                validate={values => {
                    console.log(values);
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
                    if (!values.brand_id) {
                        errors.brand_id = 'Required';
                    } 
                    if (!values.category) {
                        errors.category = 'Required';
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
                        <span className='text-right text-xs text-red-400'>{errors.name && touched.name && errors.name}</span>
                        <label htmlFor="brands">Brand</label>
                            <select 
                                className='px-4 py-2 border rounded-md bg-transparent'
                                name="brand_id" 
                                id="brands" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.brand_id}>
                                <option className='dark:bg-slate-600' value="">Select a Brand</option>
                                {   
                                    brands && brands.map((brand, idx) => <option className='dark:bg-slate-600' value={ brand.id } key={ brand.id }>{ brand.name }</option>)
                                }
                            </select>
                        <span className='text-right text-xs text-red-400'>{errors.brand_id && touched.brand_id && errors.brand_id}</span>
                        <label htmlFor="category">Category</label>
                            <select 
                                className='px-4 py-2 border rounded-md bg-transparent'
                                name="category" 
                                id="category" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category}>
                                <option className='dark:bg-slate-600' value="">Select a Category</option>
                                {   
                                    categories.map((cat, idx) => <option className='dark:bg-slate-600' value={ cat } key={ idx }>{ cat }</option>)
                                }
                            </select>
                        <span className='text-right text-xs text-red-400'>{errors.brand_id && touched.brand_id && errors.brand_id}</span>
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
                        <label htmlFor='price' className='mt-1 text-sm'>Price (in $)</label>
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
                            <p className='text-white font-medium'>Create</p>
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
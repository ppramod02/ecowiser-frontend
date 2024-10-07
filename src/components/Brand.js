
export default function Brand({ brand }) {
    return (
        <div className='brand p-6 flex flex-col gap-2 border border-black dark:border-slate-500 rounded-lg'>
            <div className='flex gap-4 items-center'>
                <img src={ brand.logo } className='border-2 border-green-200 rounded-full' width='30' height='30' alt='brand logo' />
                <h4 className='text-lg font-medium'>{ brand.name }</h4>
            </div>
            <p>{ brand.description }</p>
        </div>
    )
}
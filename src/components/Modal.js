import { IoMdCloseCircle } from "react-icons/io";

export default function Modal({ isOpen, setIsOpen, modalText, buttonText, action }) {

    return isOpen && (
        <div className='fixed w-full h-full bg-black/30 backdrop-blur-sm inset-0'>
            <div className='absolute flex flex-col gap-4 inset-1/2 translate-x-[-50%] translate-y-[-50%] bg-slate-200 dark:bg-black rounded-lg px-20 py-12 w-[90vw] md:w-[30vw] h-fit'>
                <div className='self-end cursor-pointer'><IoMdCloseCircle fontSize='2rem' onClick={ () => setIsOpen(false) }/></div>
                <div>{ modalText }</div>
                <div><button className="px-4 py-2 rounded-md bg-red-400 dark:bg-red-600" onClick={ action }>{ buttonText }</button></div>
            </div>
        </div>
    )

}
import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-slate-300 shadow-lg'>
        <div className='flex flex-row justify-between items-center max-w-6xl mx-auto p-3'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Karan</span>
                <span className='text-slate-700'>Adwani</span>
            </h1>
            <form className='bg-slate-100 rounded-lg p-3 flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                <FaSearch/>
            </form>
            <ul className='flex gap-2 font-semibold'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                    <Link to={'/'}>
                    Home
                    </Link>
                </li>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                    <Link to={'/about'}>
                    About
                    </Link>
                </li>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                    <Link to={'/sign-in'}>
                    Sign in
                    </Link>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Header
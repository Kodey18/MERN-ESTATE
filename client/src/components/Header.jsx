import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

const Header = () => {
    const {currentUser} = useSelector(state => state.user);


  return (
    <header className='bg-slate-300 shadow-lg'>
        <div className='flex flex-row justify-between items-center max-w-6xl mx-auto p-3'>
            <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
                <span className='text-slate-500'>Go</span>
                <span className='text-slate-700'>CAMPING</span>
            </h1>
            <form className='bg-slate-100 rounded-lg p-3 flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                <FaSearch/>
            </form>
            <ul className='flex gap-4 font-semibold text-sm sm:text-xl'>
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
                    {currentUser ? (
                        <Link to={'/profile'}>
                            <img className='rounded-full h-8 w-auto object-cover' src={currentUser.avatar} alt='profile'></img>
                        </Link>
                    ) : (
                        <Link to={'/signin'}>
                        Sign in
                        </Link>
                    )}
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Header
import React from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='max-w-lg mx-auto p-7'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up!</h1>
      <form className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="username"
          className="border rounded-lg p-3"
          id="username"
        />
        <input
          type="text"
          placeholder="email"
          className="border rounded-lg p-3"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border rounded-lg p-3"
          id='password'
        />
        <button 
          className='bg-slate-800 rounded-lg text-white p-3 hover:opacity-95 uppercase text-lg disabled:opacity-80'
        >
          Sign Up
        </button>
      </form>
      <div className='text-lg flex gap-2'>
        <p>Have an Account ?</p>
        <Link to={'/signin'}>
          <span className='text-blue-800 font-semibold'>Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default Signup
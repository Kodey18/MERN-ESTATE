import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>
      <form action="" className="flex flex-col gap-5">
        <img
          src={currentUser.avatar}
          alt="Avatar"
          className="rounded-full h-36 w-36 object-cover self-center"
        />
        <input type="text" placeholder="username" className="p-3 rounded-xl" id='username'/>
        <input type="text" placeholder="email" className="p-3 rounded-xl" id='email'/>
        <input type="text" placeholder="password" className="p-3 rounded-xl" id='password'/>
        <button className='uppercase bg-slate-800 font-semibold text-white p-4 rounded-xl'>
          Update
        </button>
      </form>
      <div className='text-red-700 font-medium text-lg flex justify-between mt-4'>
        <span>Delete Account</span>
        <span>Sign out</span>
      </div>
    </div>
  );
}

export default Profile  
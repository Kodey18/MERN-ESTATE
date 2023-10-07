import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    try{
      const res = await fetch('/api/auth/signup', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      if(data.success === false){
        setErrors(data.stack);
        console.log(data.stack);
        return;
      }
      setLoading(false); 
      console.log(data);

    } catch(err){
      console.log(`error : ${err}`);
      setLoading(true);
    }
  }

  return (
    <div className='max-w-lg mx-auto p-7'>
      <h1 className="text-3xl text-center font-semibold my-7">
        Sign Up!
      </h1>

      <form className="flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="username"
          className="border rounded-lg p-3"
          id="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="email"
          className="border rounded-lg p-3"
          id="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="password"
          className="border rounded-lg p-3"
          id='password'
          onChange={(e) => handleChange(e)}
        />
        <button 
          disabled ={loading}
          className='bg-slate-800 rounded-lg text-white p-3 hover:opacity-95 uppercase text-lg disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      <div className='text-lg flex gap-2'>
        <p>Have an Account ?</p>
        <Link to={'/signin'}>
          <span className='text-blue-800 font-semibold'>Sign in</span>
        </Link>
      </div>
      {errors && <p className='text-red-600'>{errors}</p>}
    </div>
  );
}

export default Signup
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

const Signin = () => {
  const [formData, setFormData] = useState({});
  // const [errors, setErrors] = useState(null);
  // const [loading, setLoading] = useState(null);
  const {loading, errors} = useSelector( (state) => state.user )
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        // setErrors(data.stack);
        console.log(data.stack);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 500);
        dispatch(signInFailure(data.stack))
        return;
      }
      // setLoading(false);
      // setErrors(null);
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (err) {
      // console.log(`error : ${err}`);
      // setLoading(true);
      dispatch(signInFailure(err));
    }
  };

  return (
    <div className="max-w-lg mt-24 mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In!</h1>

      <form className="flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
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
          id="password"
          onChange={(e) => handleChange(e)}
        />
        <button
          disabled={loading}
          className="bg-slate-800 rounded-lg text-white p-3 hover:opacity-95 uppercase text-lg disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className="text-lg flex gap-2 mt-3">
        <p>Don't Have an Account ?</p>
        <Link to={"/signin"}>
          <span className="text-blue-800 font-semibold">Register here!</span>
        </Link>
      </div>
      {errors && <p className="text-red-600">{errors}</p>}
    </div>
  );
}

export default Signin
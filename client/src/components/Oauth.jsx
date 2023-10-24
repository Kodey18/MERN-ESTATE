import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess } from '../redux/user/userSlice';

const Oauth = () => {
    const dispatch = useDispatch();
    const handleGoogleAuth = async() => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            dispatch(signInStart());
            const res = await fetch('/api/auth/google',{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    username : result.user.displayName,
                    email: result.user.email,
                    photo : result.user.photoURL
                })
            });

            const data = await res.json();
            console.log("response here : ",data);

            console.log(result);
            dispatch(signInSuccess(data));
        }catch(err){
            console.log("error in google auth : ",err);
        }
    }

    return (
        <button 
            type='button' 
            className='bg-red-700 p-3 rounded-md font-semibold text-white text-lg uppercase hover:opacity-90'
            onClick={handleGoogleAuth}
        >
            Sign-in with GOOGLE 
        </button>
    )
}

export default Oauth
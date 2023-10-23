import React from 'react'

const Oauth = () => {
    const handleGoogleAuth = async() => {
        try{
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
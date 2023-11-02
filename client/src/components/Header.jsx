import React, { useEffect, useState } from 'react';
import {FaSearch, FaPlus} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faPlusCircle, faSign, faSignOut, faTrash } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const {currentUser} = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("searchTerm", searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    const handleSignOut = async(e) => {
        try{
        dispatch(signOutUserStart());

        const res = await fetch('/api/auth/signout', {
            method: 'GET',
        });

        const data = await res.json();
        if(data.success === false){
            dispatch(signOutUserFailure(data.stack));
            return;
        }
        localStorage.removeItem('persist:root');
        dispatch(signOutUserSuccess());
        }catch(err){
        console.log("Error in sign out", err);
        }
    }

  return (
    <header className='bg-slate-300 shadow-lg'>
        <div className='flex flex-row justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to={'/'}>
                <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
                <span className='text-slate-500'>Go</span>
                <span className='text-slate-700'>CAMPER</span>
            </h1> 
            </Link>
            
            <form 
                onSubmit={handleSubmit}
                className='bg-slate-100 rounded-lg p-3 flex items-center'
            >
                <input 
                    type="text" 
                    placeholder='Search...' 
                    className='bg-transparent focus:outline-none w-24 sm:w-64' 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                    <FaSearch/>
                </button>
            </form>

            <ul className='flex gap-4 font-semibold text-sm sm:text-xl'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                    <Link to={'/create-ground'}>
                        <FontAwesomeIcon icon={faPlus}/> CampGround
                    </Link>
                </li>
                {currentUser && 
                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                        <Link onClick={handleSignOut}>
                            <FontAwesomeIcon icon={faSignOut}/> Sign-Out
                        </Link>
                    </li> 
                }
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                    {currentUser ? (
                        <Link to={'/update-profile'}>
                            <img className='rounded-full h-8 w-8 object-cover' src={currentUser.avatar} alt='profile'></img>
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
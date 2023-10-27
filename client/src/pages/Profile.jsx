import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
    const {currentUser} = useSelector(state => state.user);
    const [showGroundError, setShowGroundError] = useState(false);
    const [groundLoad, setGroundLoad] = useState(false);
    const [userGrounds, setUserGrounds] = useState([]);

    const handleShowGrounds = async(e) => {
        e.preventDefault();
        setGroundLoad(true);

        try{
            const res = await fetch(`/api/user/userGrounds/${currentUser._id}`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();

            if(data.success === false){
                console.log(data);
                setShowGroundError(true);
                setGroundLoad(false);
                return;
            }

            setUserGrounds(data);
            setGroundLoad(false);
            setShowGroundError(false);
            console.log(data);
        }catch(err){
            setShowGroundError(true);
        }
    }

  return (
    <div>
        <div className='max-w-xl p-5'>
            <button onClick={handleShowGrounds} className='bg-slate-700 text-white font-semibold p-3 text-lg'>
                {groundLoad ? "loading Grounds..." : "Show Grounds"}
            </button>
            {showGroundError && <p className='text-red-700'>Error showing Grounds.</p>}
            {
                userGrounds && userGrounds.length > 0 &&
                <div>
                    {userGrounds.map((ground, index) => {
                        return <div className='gap-3 border border-gray-500 flex justify-between items-center rounded-lg p-3' key={ground._id}
                        >
                            <Link to={`/grounds/${ground._id}`}>
                                <img className='h-20 w-24 object-cover' src={ground.imageUrls[0]} alt="Ground Cover" />
                            </Link>
                            <Link className='text-slate-700 font-semibold flex-1 text-xl truncate hover:underline' 
                            to={`/grounds/${ground._id}`}
                            >
                                <p>{ground.name}</p>
                            </Link>
                            <div></div>
                        </div>
                    })}
                </div>
            }
        </div>
    </div>
  )
}

export default Profile;
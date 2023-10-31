import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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

    const handleGroundDelete = async(gid) => {
        try{
            const res = await fetch(`/api/ground/delete/${gid}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if(data.success === false){
                alert("Failed to delete ground");
                return;
            }

            console.log(data);
            setUserGrounds((prev) => prev.filter((ground) => ground._id !== gid));
            alert(`Ground deleted successfully.`);
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div >
        <div className='max-w-lg p-5 flex flex-col gap-2'>
            <button onClick={handleShowGrounds} className='max-w-xs rounded-lg bg-slate-700 text-white font-semibold p-3 text-lg'>
                {groundLoad ? "loading Grounds..." : "Show Grounds"}
            </button>
            {showGroundError && <p className='text-red-700'>Error showing Grounds.</p>}
            {
                userGrounds && userGrounds.length > 0 &&
                <div className='flex flex-col gap-3'>
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
                            <div className='flex flex-col gap-1 items-center'>
                                <button onClick={() => handleGroundDelete(ground._id)} className='text-red-700 text-lg flex gap-1 items-center font-semibold'>
                                    <span className='uppercase'>delete</span> 
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <Link to={`/update-ground/${ground._id}`}>
                                    <button className='text-green-700 text-lg flex gap-1 items-center font-semibold'>
                                    <span className='uppercase'>Edit</span> 
                                    <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    })}
                </div>
            }
        </div>
    </div>
  )
}

export default Profile;
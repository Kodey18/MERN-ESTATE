import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({ground}) => {
    const [gorundOwner, setGroundOwner] = useState(null);
    const [message, setMessage] = useState("");
    const onChange = (e) => {
    setMessage(e.target.value);
    };

    useEffect( () => {
        const fetchGroundOwner = async() => {
            try{
                const res = await fetch(`/api/user/contact/${ground.userRef}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const data = await res.json();
                console.log("data : ",data);

                if (data.success === false) {
                    return;
                }

                setGroundOwner(data._doc);
            }catch(err){
                console.log(err);
            }
        }

        fetchGroundOwner();

    },[ground.userRef]);


  return (
    <div>
        {gorundOwner && 
            <div className='flex flex-col gap-2'>
                <p className='text-lg font-semibold'>
                    Contact <span className='font-semibold'>{gorundOwner.username}</span>{' '}
                    for{' '}
                    <span className='font-semibold'>{ground.name.toLowerCase()}</span>
                </p>
                <textarea
                    name='message'
                    id='message'
                    rows='2'
                    value={message}
                    onChange={onChange}
                    placeholder='Enter your message here...'
                    className='w-full border p-3 rounded-lg'
                ></textarea>

                <Link
                to={`mailto:${gorundOwner.email}?subject=Regarding ${ground.name}&body=${message}`}
                className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                >
                    Send Message          
                </Link>
        </div>
        }
    </div>
  )
}

export default Contact
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [files, setFiles] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if(files){
      handleFiles(files);
    }
  }, [files]);

  const handleFiles = async(files) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + files.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, files);

    uploadTask.on("state_changed", (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log("upload is " + progress + "% done");
      setFilePerc(Math.round(progress));
    },
    (error) =>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL)=>{
          setFormData({...formData, avatar: downloadURL});
        }
      )
    },
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id] : e.target.value
    });
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>
      <form action="" className="flex flex-col gap-5">
        <input onChange={(e) =>setFiles(e.target.files[0])} type="file" ref={fileRef} accept='image/*' hidden/>
        <img
          onClick={()=>fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Avatar"
          className="rounded-full h-36 w-36 object-cover self-center cursor-pointer"
        />

        <p className='self-center text-sm'>
          {
            fileUploadError ? 
            (
              <span className='text-red-800'>Error Image Upload</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-800'>
                {`Uploading image ${filePerc}%`}
              </span>
              ) : filePerc === 100 ? (
                <span className='text-green-700'>
                  Image Uploaded Successfully!
                </span>
              ) : (
                ''
              )
          }
        </p>

        <input 
        type="text" 
        placeholder="username" 
        className="p-3 rounded-xl" id='username' 
        defaultValue={currentUser.username}
        onChange={handleChange}
        />

        <input 
        type="text" 
        placeholder="email" 
        className="p-3 rounded-xl" id='email'
        defaultValue={currentUser.email}
        onChange={handleChange}
        />

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
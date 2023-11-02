import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  updateUserStart,
  updateUserSuccess, 
  updateUserFailure, 
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from '../redux/user/userSlice';

const UpdateProfile = () => {
  const {currentUser, loading, errors} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [files, setFiles] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const [showGroundError, setShowGroundError] = useState(false);
  const [groundLoad, setGroundLoad] = useState(false);
  const [userGrounds, setUserGrounds] = useState([]);

  const handleShowGrounds = async (e) => {
    e.preventDefault();
    setGroundLoad(true);

    try {
      const res = await fetch(`/api/user/userGrounds/${currentUser._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data);
        setShowGroundError(true);
        setGroundLoad(false);
        return;
      }

      setUserGrounds(data);
      setGroundLoad(false);
      setShowGroundError(false);
      console.log(data);
    } catch (err) {
      setShowGroundError(true);
    }
  };

  const handleGroundDelete = async (gid) => {
    try {
      const res = await fetch(`/api/ground/delete/${gid}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        alert("Failed to delete ground");
        return;
      }

      console.log(data);
      setUserGrounds((prev) => prev.filter((ground) => ground._id !== gid));
      alert(`Ground deleted successfully.`);
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        console.log(data);
        dispatch(updateUserFailure(data.stack));
        return;
      }

      console.log(data);
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(err){
      dispatch(deleteUserFailure(err));
    }
  }

  const handleDeleteUser = async(e) => {
    e.preventDefault();

    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.stack));
        return;
      }

      dispatch(deleteUserSuccess());
    }catch(err){
      console.log("error while deleting : ", err);
    }
  }

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
    <div>
      <div className="max-w-xl mx-auto p-4 flex-1">
        <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-slate-500 p-6 rounded-xl"
        >
          <input
            onChange={(e) => setFiles(e.target.files[0])}
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData?.avatar || currentUser.avatar}
            alt="Avatar"
            className="rounded-full h-36 w-36 object-cover self-center cursor-pointer"
            id="avatar"
          />

          <p className="self-center text-sm">
            {fileUploadError ? (
              <span className="text-red-800">Error Image Upload</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-800">
                {`Uploading image ${filePerc}%`}
              </span>
            ) : filePerc === 100 ? (
              <span className="text-green-900">
                Image Uploaded Successfully!
              </span>
            ) : (
              ""
            )}
          </p>

          <input
            type="text"
            placeholder="username"
            className="p-3 rounded-xl"
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="email"
            className="p-3 rounded-xl"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="password"
            className="p-3 rounded-xl"
            id="password"
          />

          <button
            type="submit"
            className="uppercase bg-slate-800 font-semibold text-white p-4 rounded-xl"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
        <div className="text-red-700 font-medium text-lg flex justify-between mt-4 ">
          <span
            className="cursor-pointer hover:underline transition-all"
            onClick={handleDeleteUser}
          >
            Delete Account
          </span>
          <span
            className="cursor-pointer hover:underline transition-all"
            onClick={handleSignOut}
          >
            Sign out
          </span>
        </div>
        {errors && <p className="text-red-600">{errors}</p>}
        {updateSuccess && (
          <p className="text-green-700">User is updated Successfully</p>
        )}

        <div className="max-w-lg p-5 flex flex-col gap-2">
          <button
            onClick={handleShowGrounds}
            className="max-w-xs rounded-lg bg-slate-700 text-white font-semibold p-3 text-lg"
          >
            {groundLoad ? "loading Grounds..." : "Show Grounds"}
          </button>
          {showGroundError && (
            <p className="text-red-700">Error showing Grounds.</p>
          )}
          {userGrounds && userGrounds.length > 0 && (
            <div className="flex flex-col gap-3">
              {userGrounds.map((ground, index) => {
                return (
                  <div
                    className="gap-3 border border-gray-500 flex justify-between items-center rounded-lg p-3"
                    key={ground._id}
                  >
                    <Link to={`/campGrounds/${ground._id}`}>
                      <img
                        className="h-20 w-24 object-cover"
                        src={ground.imageUrls[0]}
                        alt="Ground Cover"
                      />
                    </Link>
                    <Link
                      className="text-slate-700 font-semibold flex-1 text-xl truncate hover:underline"
                      to={`/campGround/${ground._id}`}
                    >
                      <p>{ground.name}</p>
                    </Link>
                    <div className="flex flex-col gap-1 items-center">
                      <button
                        onClick={() => handleGroundDelete(ground._id)}
                        className="text-red-700 text-lg flex gap-1 items-center font-semibold"
                      >
                        <span className="uppercase">delete</span>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <Link to={`/update-ground/${ground._id}`}>
                        <button className="text-green-700 text-lg flex gap-1 items-center font-semibold">
                          <span className="uppercase">Edit</span>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default UpdateProfile;  
import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

const CreateGround = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    pets: false,
    tours: false,
    rentalEquip: false,
    foodService: false,
    accommodation: "",
    intake: 0,
    sites: 0,
    Rprice: 0,
    Dprice: 0,
    amenities: "",
    activities: "",
    imageUrls : [],
  });
  const [imageUploadError, setImageUploadError] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    e.preventDefault();

    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
      setImageLoading(true);
      setImageUploadError(false);
      const promises = [];

      for(let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData, imageUrls : formData.imageUrls.concat(urls)
        });
        setImageLoading(false);
        setImageUploadError(false);
      }).catch((err)=>{
        setImageUploadError(true);
      });
    } else {
      setImageUploadError("You can only add up to 6 images");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  }

  const storeImage = async(file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress : ${progress}`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
        );
    });
  }

  const handleChange = (e) => {
    const {name, type, value, checked} = e.target

    const newValue = type === 'checked' ? !formData[name] : value;

    setFormData({
      ...formData,
      [e.target.name]: newValue,
    });
  }

  const handleStringChange = (e) => {
    const { name, value } = e.target;

    // Split the comma-separated value into an array
    const valueArray = value.split(",").map((item) => item.trim());

    // Update the state
    setFormData({
      ...formData,
      [name]: valueArray,
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      if(formData.imageUrls.length < 1){
        return setError("You must upload atleast 1 image.");
      }
      if(+formData.Rprice < +formData.Dprice){
        return setError('The discounted price cannot be greater then regular price.');
      }
      setLoading(true);
      setError(false);

      const res = await fetch('/api/ground/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        console.log(data);
        setError(data);
        setLoading(false);
        return;
      }

      console.log(data);
      setLoading(false);
      setError(false);
      navigate(`/grounds/${data._id}`);
    }catch(err){
      setLoading(false);
      setError(err);
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold my-6 text-center">
        Create a Cmaping Ground.
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-10 mt-16">
        <div className="flex flex-col flex-1 gap-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-3 border border-gray-500 rounded-lg"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="p-3 border border-gray-500 rounded-lg"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="p-3 border rounded-lg border-gray-500"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-4 flex-wrap">
            <div className="p-2 bg-slate-400 rounded-lg flex gap-2 text-lg font-semibold">
              <input
                type="checkbox"
                name="pets"
                id="pets"
                className="w-5"
                onChange={handleChange}
                checked={formData.pets}
              />
              <label htmlFor="pets">Pets</label>
            </div>

            <div className="p-2 bg-slate-400 rounded-lg flex gap-2 text-lg font-semibold">
              <input
                type="checkbox"
                name="tours"
                id="tours"
                className="w-5"
                onChange={handleChange}
                checked={formData.tours}
              />
              <label htmlFor="tours">Guided Tours</label>
            </div>

            <div className="p-2 bg-slate-400 rounded-lg flex gap-2 text-lg font-semibold">
              <input
                type="checkbox"
                name="rentalEquip"
                id="rentalEquip"
                className="w-5"
                onChange={handleChange}
                checked={formData.rentalEquip}
              />
              <label htmlFor="rentalEquip">Rental Equipments</label>
            </div>

            <div className="p-2 bg-slate-400 rounded-lg flex gap-2 text-lg font-semibold">
              <input
                type="checkbox"
                name="foodService"
                id="foodService"
                className="w-5"
                onChange={handleChange}
                checked={formData.foodService}
              />
              <label htmlFor="foodService">Food Service</label>
            </div>

            <div className="p-2 bg-slate-400 rounded-lg">
              <div className="flex gap-2 text-lg font-semibold">
                <label htmlFor="accommodation">Accommodation:</label>
                <select
                  id="accommodation"
                  onChange={handleChange}
                  name='accommodation'
                  value={formData.accommodation}
                >
                  <option value="">Select an Accommodation</option>
                  <option value="Tents">Tents</option>
                  <option value="Cabins">Cabins</option>
                  <option value="RVs">RVs</option>
                  <option value="Glamping">Tree House</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-6 text-md font-semibold">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="intake"
                id="intake"
                className="w-16 p-3 border border-gray-400 rounded-lg"
                required
                onChange={handleChange}
                value={formData.intake}
              />
              <label htmlFor="capacity">Intake</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                name="sites"
                id="sites"
                className="w-16 p-3 border border-gray-500 rounded-lg"
                required
                onChange={handleChange}
                value={formData.sites}
              />
              <label htmlFor="sites">sites</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                name="Rprice"
                id="Rprice"
                className="w-16 p-3 border border-gray-500 rounded-lg"
                required
                onChange={handleChange}
                value={formData.Rprice}
              />
              <div className="flex items-center flex-col">
                <label htmlFor="Rprice">Regular Price</label>
                <span className="text-sm">($ / day)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                name="Dprice"
                id="Dprice"
                className="w-16 p-3 border border-gray-500 rounded-lg"
                required
                onChange={handleChange}
                value={formData.Dprice}
              />
              <div className="flex items-center flex-col">
                <label htmlFor="Dprice">Discounted Price</label>
                <span className="text-sm">($ / day)</span>
              </div>
            </div>
          </div>

          {formData.imageUrls.length > 0 && (
            <div className="flex flex-col gap-8 my-6 mb-16">
              <span className="font-semibold text-xl">
                Images Uploaded are :
              </span>
              <div className="flex flex-wrap gap-10">
                {formData.imageUrls.length > 0 &&
                  formData.imageUrls.map((Url, index) => {
                    return (
                      <div
                        key={Url}
                        className="p-2 flex flex-col items-center gap-2 rounded-lg border border-slate-900 bg-slate-500"
                      >
                        <img
                          src={Url}
                          alt="Camp Image"
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="text-black-700 hover:underline cursor-pointer hover:font-semibold hover:text-lg transition-all "
                          onClick={() => handleRemoveImage(index)}
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 gap-5">
          <input
            type="text"
            name="amenities"
            id="amenities"
            placeholder="Amenities (comma-separated)"
            className="p-3 border border-gray-500 rounded-lg"
            required
            onChange={handleStringChange}
            value={formData.amenities}
          />

          <input
            type="text"
            name="activities"
            id="activities"
            placeholder="Activities (comma-separated)"
            className="p-3 border border-gray-500 rounded-lg"
            required
            onChange={handleStringChange}
            value={formData.activities}
          />

          <span className="font-semibold text-lg">
            Add Location of Camp Ground :
          </span>
          <input
            type="text"
            name="Latitude"
            placeholder="Latitude : 51.505 (Only Value)"
            className="p-3 border border-gray-500 rounded-lg"
            required
            onChange={handleChange}
            // value={formData.lat}
          />

          <input
            type="text"
            name="Longitude"
            placeholder="Longitude : -36.56 (Only value)"
            className="p-3 border border-gray-500 rounded-lg"
            required
            onChange={handleChange}
            // value={formData.lng}
          />

          <div className="flex flex-col gap-2">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-700 ml-2 text-md">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-3">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="p-3 border border-gray-400 rounded w-full"
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                onClick={handleImageUpload}
                type="button"
                disabled={!files || files?.length === 0 || imageLoading}
                className="p-3 text-green-900 border text-xl border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                {imageLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {imageUploadError && (
              <p className="text-red-700 text-lg font-medium">
                {imageUploadError}
              </p>
            )}
            {!imageUploadError && formData.imageUrls.length > 0 && (
              <p className="text-green-700 text-lg font-medium">
                Image uploaded successfully
              </p>
            )}
          </div>
          <button disabled={loading || imageLoading} type='submit' className="disabled:opacity-70 p-3 bg-slate-800 text-white rounded-lg text-xl">
            {loading ? "Creating CampGround..." : "Create CampGround"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGround;
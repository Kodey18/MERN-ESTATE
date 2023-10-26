import React from 'react'
import AccommodationDropdown from '../components/DropDown';

const CreateGround = () => {

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold my-6 text-center">
        Create a Cmaping Ground.
      </h1>
      <form className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col flex-1 gap-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-3 border border-gray-500 rounded-lg"
            required
          />
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="p-3 border border-gray-500 rounded-lg"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="p-3 border rounded-lg border-gray-500"
            required
          />
          <div className="flex gap-4 flex-wrap">
            <div className="p-2 bg-slate-400 rounded-lg flex gap-2 text-lg font-semibold">
              <input type="checkbox" name="pets" id="pets" className="w-5" />
              <label htmlFor="pets">Pets</label>
            </div>

            <div className="p-2 bg-slate-400 rounded-lg flex gap-2 text-lg font-semibold">
              <input type="checkbox" name="Tours" id="Tours" className="w-5" />
              <label htmlFor="Tours">Guided Tours</label>
            </div>

            <div className="p-2 bg-slate-400 rounded-lg flex gap-2 text-lg font-semibold">
              <input
                type="checkbox"
                name="rentalEqip"
                id="rentalEquip"
                className="w-5"
              />
              <label htmlFor="rentalEquip">Rental Wquipments</label>
            </div>

            <div className="p-2 bg-slate-400 rounded-lg flex gap-2 text-lg font-semibold">
              <input
                type="checkbox"
                name="foodService"
                id="foodService"
                className="w-5"
              />
              <label htmlFor="foodService">Food Service</label>
            </div>
            <div className="p-2 bg-slate-400 rounded-lg">
              <AccommodationDropdown />
            </div>
          </div>

          <div className="flex gap-6 text-md font-semibold">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="capacity"
                id="capacity"
                className="w-16 p-3 border border-gray-400 rounded-lg"
                required
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
              />
              <div className="flex items-center flex-col">
                <label htmlFor="Dprice">Discounted Price</label>
                <span className="text-sm">($ / day)</span>
              </div>
            </div>
          </div>
          {/* 
          <input
            type="number"
            name="discountedPrice"
            placeholder="Discounted price"
          />
          <input type="checkbox" name="offer" /> */}
        </div>

        <div className="flex flex-col flex-1 gap-5">
          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma-separated)"
            className="p-3 border border-gray-500 rounded-lg"
            required
          />
          <input
            type="text"
            name="activities"
            placeholder="Activities (comma-separated)"
            className="p-3 border border-gray-500 rounded-lg"
            required
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
              />
              <button className="p-3 text-green-900 border text-xl border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                Upload
              </button>
            </div>
          </div>
          <button className="p-3 bg-slate-800 text-white rounded-lg text-xl">Create CampGround</button>
        </div>
      </form>
    </div>
  );
}

export default CreateGround;
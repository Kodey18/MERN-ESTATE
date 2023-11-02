import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import GroundItem from "../components/GroundItem";
import Map from '../components/Map';
// import Map from '../components/Map'


const Home = () => {
  const [grounds, setGrounds] = useState([]);
  const searchQuery =
    "?searchTerm=ground&foodService=false&rentalEquip=false&pets=false&tours=false&sort=created_at&order=desc";
  console.log()
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchGround = async() => {
      const res = await fetch(`/api/ground/grounds?${searchQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setGrounds(data);
    }

    fetchGround();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect Camping place</span>
          <br />
          with ease
        </h1>
        <div className="text-gray-400 text-lg font-bold">
          GoCamper is the best place to find your next perfect Camp.
          <br />
          We have a wide range of <span>Camping Grounds</span> for you to choose
          from.
        </div>
        <Link
          to={"/search"}
          className="text-lg text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {grounds &&
          grounds.length > 0 &&
          grounds.map((ground) => (
            <SwiperSlide key={ground._id}>
              <Link to={`/campGround/${ground._id}` }>
                <div
                  style={{
                    background: `url(${ground.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[2000px] mb-10"
                  // key={ground._id}
                ></div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className='max-w-[80vw] mb-10 mx-auto border rounded-2xl'>
        <Map />
      </div>
    </div>
  );
}

export default Home
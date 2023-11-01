import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CycleLoader from '../components/CycleLoader';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

const Ground = () => {
    const params = useParams();
    const [ground, setGround] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    SwiperCore.use([Navigation]);

    console.log(ground);

    useEffect( () => {
        const fetchGround = async () => {
            const groundId = params.groundId;

            setLoading(true);
            setError(false);
            const res = await fetch(`/api/ground/grounds/${groundId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            if (data.success == false) {
                setError(data.message);
                setTimeout(()=>{
                    setLoading(false);
                }, 1500);
                setError(data.message);
                return;
            }

            console.log(data);
            setGround(data);
            setTimeout(() => {
                setLoading(false);
            }, 1500);
            setError(false);
        };

        fetchGround();
    }, [params.groundId]);

  return (
    <div>
        {
        loading ? 
            <CycleLoader /> : 
        error ? 
            <div>
                {error}
            </div> :
            <>
                Ground
            </>
        }
    </div>
  )
}

export default Ground
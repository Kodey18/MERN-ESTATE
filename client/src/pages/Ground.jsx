import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CycleLoader from '../components/CycleLoader';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUp ,faArrowDown, faDollarSign} from '@fortawesome/free-solid-svg-icons'
import GroundMap from '../components/GroundMap';
import Food from '../assets/food.svg'
import Rent from "../assets/rental.svg";
import Tour from '../assets/tour.svg'
import Pet from '../assets/pets.svg'
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

const Ground = () => {
    const params = useParams();
    const [ground, setGround] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState(false);
    const {currentUser} = useSelector(state => state.user);
    // const [scrollPosition, setScrollPosition] = useState('ground-details')
    const glat = ground?.lat;
    const glng = ground?.lng;

    SwiperCore.use([Navigation]);

    // const scrollToDetails = () => {
    //     const detailsSection = document.getElementById(scrollPosition);
    //     if (detailsSection) {
    //         const yOffset =
    //         scrollPosition === 'images' ?
    //         0 :
    //         detailsSection.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust the offset as needed
    //         window.scrollTo({ top: yOffset, behavior: "smooth" });
    //         let position = scrollPosition === 'ground-details' ? 'images' : 'ground-details';
    //         setScrollPosition(position);
    //     }
    // };

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
                }, 1200);
                setError(data.message);
                return;
            }

            setGround(data);
            setTimeout(() => {
                setLoading(false);
            }, 1500);
            setError(false);
        };

        fetchGround();
    }, [params.groundId]);

  return (
    <div style={{overflow:'hidden'}} >
        {
        loading ? 
            <CycleLoader /> : 
        error ? 
            <div>
                {error}
            </div> :
            <div>
                <div id='images'>
                    {ground.imageUrls && ground.imageUrls.length > 0 &&
                        <div>
                            <Swiper navigation>
                                {ground.imageUrls.map((image, index) => {
                                    return(
                                        <SwiperSlide key={index}>
                                            <div 
                                            className='h-[2165px]' style={{background: `url(${image}) center no-repeat`, backgroundSize: 'cover'}} >
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            {/* <button
                                type='button'
                                className="fixed bottom-10 right-16 bg-opacity-60 bg-gray-500 p-5 hover:underline rounded-md cursor-pointer z-30 text-2xl font-bold"
                                onClick={scrollToDetails}
                            >
                                { scrollPosition === 'ground-details' ? (
                                    <>
                                        Scroll Down <FontAwesomeIcon icon={faArrowDown} />
                                    </>
                                ) : (
                                    <>
                                        Scroll Up <FontAwesomeIcon icon={faArrowUp} />
                                    </>
                                ) }
                            </button> */}
                        </div>
                    }
                </div>
                <div className='flex flex-row h-[100vh] p-4 gap-6 mt-7' id='ground-details'>

                    <div 
                        className=' w-[50vw] border border-gray-800 rounded-lg bg-slate-300 p-3'
                    >
                        <div className='p-4 bg-slate-300 rounded-lg mb-4'>
                            <p className='text-6xl text-slate-700 font-semibold'>
                                {ground.name}
                            </p>
                        </div>

                        <div className='flex justify-between font-semibold  text-xl '>
                                <p className='bg-red-600 p-2 rounded-lg'>
                                    <FontAwesomeIcon icon={faDollarSign} /> Rent : {ground.Rprice} $ / day 
                                </p>
                                <p className='bg-green-600 p-2 rounded-lg'>
                                    Discounted Rent : {ground.Dprice} $ / day
                                </p>
                        </div>

                        <div className='p-4 mt-4'>
                            <p className='font-semibold text-3xl text-left text-slate-800 '>
                                {ground.description}
                            </p>
                        </div>

                        <div className='flex justify-between items-center mt-5'>
                            {ground.foodService &&
                                <div className='flex gap-1'>
                                    <img src={Food} alt="" style={{ width: '130px', height: '130px' }} />
                                    <span className='font-semibold text-xl text-slate-700'>Food service</span>
                                </div>
                            }
                            {ground.rentalEquip && 
                                <div className='flex gap-1'>
                                    <img src={Rent} alt="" style={{ width: '130px', height: '130px' }} />
                                    <span className='font-semibold text-xl text-slate-700'>Rental Equipments</span>
                                </div>
                            }
                            {ground.tour && 
                                <div className='flex gap-1'>
                                    <img src={Tour} alt="" style={{ width: '130px', height: '130px'}} />
                                    <span className='font-semibold text-xl text-slate-700'>Tours</span>
                                </div>
                            }
                            {ground.pets && 
                                <div className='flex gap-1'>
                                    <img src={Pet} alt="" style={{ width: '130px', height: '130px'}} />
                                    <span className='font-semibold text-xl text-slate-700'>Pets</span>
                                </div>
                            }
                        </div>

                        <div className='mt-8'>
                            {/* {contact && 
                                <div>
                                    <p>Contact</p>
                                    <textarea 
                                        type="text" 
                                        placeholder='Enter your message here ...'
                                    />
                                </div>
                            } */}
                            {currentUser && currentUser._id !== ground.userRef && !contact &&
                                <button 
                                className='p-4 text-lg bg-slate-800 text-white font-semibold rounded-lg w-full'
                                onClick={()=>setContact(true)}
                                >
                                    Contant CampGround Owner
                                </button>
                            }
                            {contact && <Contact ground={ground} /> }
                        </div>
                    </div>

                    <div className='border bg-slate-300 rounded-lg border-slate-900 min-w-[1500px]'>
                        {glat && glng &&
                            <GroundMap 
                                lat={glat}
                                lng={glng}
                                gname={ground.name}
                            />
                        }
                        <div className='p-4 mt-3'>
                            <p className='font-semibold text-2xl text-slate-800'>
                                Address : {ground.address}
                            </p>

                            <div className='flex justify-between mt-4 font-semibold text-2xl text-slate-700'>
                                <p>Capacity : {ground.intake}</p>
                                <p>Veiwpoints : {ground.sites}</p>
                            </div>

                            <div className='mt-4 font-semibold text-2xl text-slate-800'>
                                <p>Accommodation type : {ground.accommodation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Ground
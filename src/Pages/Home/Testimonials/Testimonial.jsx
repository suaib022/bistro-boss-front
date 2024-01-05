import SectionTitle from '../../../Components/SectionTitle';

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
// import { Rating } from '@smastrom/react-rating';s

const Testimonial = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://exclusive-bistro-back.vercel.app/review')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);


    return (
        <section className='my-20'>
            <SectionTitle heading={'Testimonials'} subHeading={'What Our Client Said'}></SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className='space-y-4 mt-4 px-24'>
                            <div className='flex justify-center my-8'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                            </div>
                            <p className='text-center'>{review.details}</p>
                            <h3 className='text-2xl text-center text-orange-400'>{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonial;
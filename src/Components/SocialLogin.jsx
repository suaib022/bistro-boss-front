import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import UseAuth from '../Hooks/UseAuth';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {

    const { googleSignIn } = UseAuth();
    const axios = UseAxiosPublic();
    const navigate = useNavigate();

    const handlesignIn = () => {
        googleSignIn()
        .then(res => {
            console.log(res?.user);
            const userInfo = {
                email : res.user?.email,
                name : res.user?.displayName
            }
            axios.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
        })
    }

    return (
        <div>
            <div className='divider'></div>
            <div className='flex justify-center items-center py-4 gap-3'>
                <div>
                    <p>Continue With</p>
                </div>
                <div className=''>
                    <button onClick={handlesignIn} className='btn w-32 btn-outline border-b-4 border-b-orange-600'>
                        <FaGoogle></FaGoogle>
                        <p>Google</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import SocialLogin from '../../Components/SocialLogin';

const SignUp = () => {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const navigate = useNavigate();
    const axios = UseAxiosPublic();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // save user in database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axios.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire("user created Successfully!!!")
                                    navigate('/');
                                }
                            })
                    })
                    .catch(err => console.log(err))
            })
    }

    console.log(watch("example"));

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Sing Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", {
                                    required: true
                                })} type="text" placeholder="Your Name" name='name' className="input input-bordered" required />
                                {
                                    errors.name && <span className='text-red-600'>Name Is Required</span>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text" placeholder="Your Photo" name='photo' className="input input-bordered" required />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", {
                                    required: true
                                })} type="email" placeholder="email" name='email' className="input input-bordered" required />
                                {
                                    errors.email && <span className='text-red-600'>Email Is Required</span>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", {
                                    required: true, minLength: 6, maxLength: 20,
                                    pattern:
                                        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/
                                })} name='password' type="password" placeholder="password" className="input input-bordered" required />
                                {errors.password?.type === 'required' && <p className='text-red-600'>Password Is Required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-600'>Password Must Be At Least Of 6 Characters</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password Can't Be More Than 20 Characters</p>}
                                {errors.password?.type === 'pattern' && <p className='text-slate-600'>Password Must Have Atleast One <span className='text-red-700'>UpperCase,</span> One <span className='text-red-700'>LowerCase,</span> One <span className='text-red-700'>number</span> And A <span className='text-red-700'>Special Character</span></p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className='btn btn-primary' type="submit" value='Sign Up' />
                            </div>
                        </form>
                        <p><small>Already Have An Account? <Link to='/login'>log In</Link></small></p>
                        <div className='flex justify-center items-center py-4'>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
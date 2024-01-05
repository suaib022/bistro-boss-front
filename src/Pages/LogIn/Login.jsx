import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin';

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log(from);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(res => {
                console.log(res.user);
                Swal.fire({
                    title: "Logged In Successfully!!!",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true });
            });

        form.reset();
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Sing In</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate></LoadCanvasTemplate>
                                </label>
                                <input onBlur={handleValidateCaptcha} name='captcha' type="text" placeholder="Type The Text Above" className="input input-bordered" required />
                                {/* <button onClick={handleValidateCaptcha} className='btn btn-sm my-4 btn-outline'>Validate</button> */}
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className='btn btn-primary' type="submit" value='Log In' />
                            </div>
                        </form>
                        <p><small>New Here? <Link to='/signup'>Register Now</Link></small></p>
                        <div className='flex justify-center items-center py-4'>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
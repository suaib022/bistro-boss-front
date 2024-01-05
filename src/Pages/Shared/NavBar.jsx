
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaCartShopping } from "react-icons/fa6";
import UseCart from '../../Hooks/UseCart';
import UseAdmin from '../../Hooks/UseAdmin';

const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = UseAdmin();
    const [cart] = UseCart();


    const handleLogOut = () => {
        logOut();
    };

    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='menu'>Our Menu</Link></li>
        <li><Link to='order'>Order Food</Link></li>
        {
            user && isAdmin && <li><Link to='/dashboard/adminHome'>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to='/dashboard/userHome'>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to='/dashboard/cart'><button className="">
                <FaCartShopping />
            </button><div className="badge badge-secondary">{cart.length}</div></Link></li>
        }
        {
            user ? <li className=''><button onClick={handleLogOut}>Log Out</button></li> : <li><Link to='login'>log In</Link></li>
        }

    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-black bg-opacity-30 max-w-screen-xl text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu bg-black bg-opacity-30 text-white menu-sm dropdown-content bg-scroll mt-3 z-[1] p-2 shadow  rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">Bistro Boss</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-ghost">Button</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
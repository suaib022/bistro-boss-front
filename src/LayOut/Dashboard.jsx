
import { FaCalendar, FaCartShopping } from 'react-icons/fa6';
import { FaEnvelope, FaHome, FaListAlt, FaUser, FaUtensilSpoon } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { NavLink, Outlet } from 'react-router-dom';
import { TbBrandBooking } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import UseCart from '../Hooks/UseCart';
import UseAdmin from '../Hooks/UseAdmin';



const Dashboard = () => {

    const [cart] = UseCart();

    // TODO: get isAdmin value from database
    const [isAdmin] = UseAdmin();

    return (
        <div className='flex'>
            {/* DashBoard side bar */}
            <div className="w-64 min-h-full bg-orange-400">
                <ul className='menu p-4'>

                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to='/dashboard/adminHome'><FaHome></FaHome> Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addItem'><FaUtensilSpoon /> Add Items</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/manageItems'><FaListAlt /> Manage Items</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/manageBookings'><TbBrandBooking /> Manage Bookings</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/Users'><FaUser /> All Users</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to='/dashboard/userHome'><FaHome></FaHome> User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reservation'><FaCalendar /> Reservation</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/cart'><FaCartShopping></FaCartShopping> My Cart ({cart.length})</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/review'><MdOutlineRateReview /> Add Review</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/bookings'><TbBrandBooking /> My Bookings</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/paymentHistory'><MdOutlinePayment /> Payment History</NavLink>
                                </li>
                            </>
                    }

                    {/* shared navLink */}
                    <div className='divider'></div>

                    <li>
                        <NavLink to='/'><FaHome></FaHome>Home</NavLink>
                    </li>

                    <li>
                        <NavLink to='/menu'><MdMenuBook />Menu</NavLink>
                    </li>

                    <li>
                        <NavLink to='/contact'><FaEnvelope />Contact</NavLink>
                    </li>

                </ul>
            </div>
            {/* Outlet content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
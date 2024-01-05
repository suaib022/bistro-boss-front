
import { FaTrashAlt } from 'react-icons/fa';
import UseCart from '../../../Hooks/UseCart';
import Swal from 'sweetalert2';
import UseAxios from '../../../Hooks/UseAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {

    const [cart, refetch] = UseCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    console.log(totalPrice);

    const axios = UseAxios();

    const handleDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div>
            <div className='flex mb-8  justify-evenly'>
                <h2 className='text-4xl'>Items : {cart.length}</h2>
                <h2 className='text-4xl'>Total Price : {totalPrice.toFixed(2)}</h2>

                {cart.length ?
                    <Link to='/dashboard/payment'>
                        <button className='btn btn-ghost btn-outline border-b-4 w-24 border-b-orange-600'>Pay</button>  </Link> :
                    <button disabled className='btn btn-ghost btn-outline border-b-4 w-24 border-b-orange-600'>Pay</button>}

            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>price </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask ma w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn text-red-600 btn-ghost btn-md"><FaTrashAlt></FaTrashAlt></button>
                                    </th>
                                </tr>)
                            }
                            {/* row 1 */}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;
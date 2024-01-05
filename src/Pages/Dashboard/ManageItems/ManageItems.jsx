import { FaTrashAlt } from 'react-icons/fa';
import SectionTitle from '../../../Components/SectionTitle';
import UseMenu from '../../../Hooks/UseMenu';
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2';
import UseAxios from '../../../Hooks/UseAxiosSecure';
import { Link } from 'react-router-dom';


const ManageItems = () => {

    const [menu, loading, refetch] = UseMenu();
    const axios = UseAxios();

    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axios.delete(`/menu/${item._id}`);
                console.log(res.data);

                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div>
            <SectionTitle heading={'Manage All Items'} subHeading={'Hurry Up!'}></SectionTitle>

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
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button className="btn btn-ghost text-orange-700 btn-md text-xl"><CiEdit /></button>
                                        </Link>
                                    </td>

                                    <td>
                                        <button onClick={() => handleDelete(item)} className="btn text-red-600 btn-ghost btn-md"><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                        {/* foot */}

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;
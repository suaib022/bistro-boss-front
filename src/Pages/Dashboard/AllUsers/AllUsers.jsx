import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../Hooks/UseAxiosSecure";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {

    const axios = UseAxios();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('/users');
            return res.data;
        }
    });

    const handleDelete = user => {
        // console.log(id);
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

                axios.delete(`users/${user._id}`)
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

    const handleUpdateRole = user => {
        axios.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} Is An Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // /user/admin/:id

    return (
        <div>
            <div className="flex justify-evenly">
                <p>All users</p>
                <p>Users : {users.length}</p>
            </div>

            {/* table */}

            <div className="overflow-x-auto">
                <table className="w-full table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>Quality Control Specialist</td>
                                <td>
                                    {
                                        item.role === 'admin' ? 'Admin' : <button onClick={() => handleUpdateRole(item)} className="btn btn-ghost bg-transparent text-orange-500"><FaUser className="text-xl" /></button>
                                    }
                                </td>
                                <td>

                                    <button onClick={() => handleDelete(item)} className="btn text-red-600 btn-ghost btn-md"><FaTrashAlt></FaTrashAlt></button>

                                </td>
                            </tr>)
                        }
                        {/* row 1 */}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
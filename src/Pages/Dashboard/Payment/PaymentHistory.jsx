import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxios from "../../../Hooks/UseAxiosSecure";

const PaymentHistory = () => {

    const { user } = UseAuth();
    const axiosSecure = UseAxios();

    const { data: payments } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })

    console.log(payments);

    return (
        <div>
            <h3 className="text-3xl">Total Payments : {payments?.length}</h3>

            <>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Price</th>
                                <th>Transaction Id</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                payments?.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>${item.price}</td>
                                <td>{item.transactionId}</td>
                                <td>{item.status}</td>
                            </tr>)
                            }
                            
                        </tbody>
                    </table>
                </div>
            </>
        </div>
    );
};

export default PaymentHistory;
import Swal from "sweetalert2";
import UseAuth from "../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxios from "../Hooks/UseAxiosSecure";
import UseCart from "../Hooks/UseCart";


const FoodCard = ({ item }) => {

    const axios = UseAxios();
    const [, refetch] = UseCart();

    const navigate = useNavigate();
    const location = useLocation();

    const { user } = UseAuth();
    const { image, price, name, recipe, _id } = item;
    const handleAddToCart = () => {
        // console.log(food, user.email);

        if (user && user.email) {
            // console.log('object');

            const cartItem = {
                menuId : _id,
                email: user.email,
                name,
                image,
                price
            }

            axios.post('/carts', cartItem)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} Has Been Added To Cart Successfully!`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      // refetch the cart
                      refetch();
                }
            })
        }
        else {
            Swal.fire({
                title: "You are Not Logged In",
                text: "Please Log In To Add To The Cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Log In"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send the user to login page
                    navigate('/login', {state: {from : location}})
                }
            });
        }
    }

    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className='bg-slate-900 text-white absolute mr-4 mt-4 px-4 right-0'>${price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title ">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleAddToCart(item)} className='btn bg-slate-100 btn-outline border-0 border-orange-400 border-b-4 mt-4'>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
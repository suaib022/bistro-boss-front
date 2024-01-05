import SectionTitle from '../../../Components/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import UseAxios from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItem = () => {

    const { register, handleSubmit, reset } = useForm();
    const axios = UseAxiosPublic();
    const axiosSecure = UseAxios();

    const onSubmit = async(data) => {
        console.log(data);
        // upload image to imagebb and get url
        const imageFile = { image : data.image[0]};
        const res = await axios.post(imageHostingApi, imageFile, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        
        if(res.data.success){
            const menuItem = {
                name : data.name,
                category : data.category,
                price : parseFloat(data.price),
                recipe : data.recipe,
                image : res.data.data.display_url
            };
            //
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);

            if(menuRes.data.insertedId){
                reset();
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} Added Successfully!!!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }

        console.log(res.data);
    }

    return (
        <div>
            <SectionTitle heading={'add an item'} subHeading={"What's New?"}></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='my-6'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Name</span>
                        </div>
                        <input {...register('name')} required type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </label>

                </div>
                {/* ------------------ */}
                <div className='md:flex items-center w-full gap-6'>
                    <div className='w-full'>
                        <label htmlFor="">
                            <div className="label">
                                <span className="label-text">Category</span>
                            </div>
                        </label>
                        <select defaultValue="default" {...register('category')} required className="select select-bordered w-full">
                            <option disabled value="default">Select A Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </div>


                    <div className='w-full'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input required {...register('price')} type="number" placeholder="Type here" className="input input-bordered w-full" />
                        </label>

                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <label className='mb-1' htmlFor="">Recipe Details</label>
                    <textarea required {...register('recipe')} className="textarea mt-2 textarea-bordered h-32 w-full" placeholder="Details"></textarea>
                </div>

                <div>
                    <input required {...register('image')} type="file" className="file-input w-full mt-6 max-w-xs" />
                </div>
                {/* ------------------ */}
                <button className='btn border-none btn-outline bg-sky-500 text-white mt-6'>
                    Add Item <FaUtensils></FaUtensils>
                </button>
            </form>



        </div>
    );
};

export default AddItem;
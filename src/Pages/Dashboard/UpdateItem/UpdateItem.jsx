import React from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import UseAxios from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxios();
    const item = useLoaderData();
    console.log(item);
    const onSubmit = async (data) => {
        console.log(data);

        const imageFile = { image: data.image[0]}
        const res = await axiosPublic.post(image_Hosting_Api, imageFile, {
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
            }

            console.log(menuItem);

            const menuRes = axiosSecure.patch(`/menu/${item._id}`, menuItem);

              
            if(menuRes.data.modifiedCount > 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} Updated Successfully!!!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }



    return (
        <div>
            <SectionTitle heading={'Update an item'} subHeading={"What's New?"}></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='my-6'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Name</span>
                        </div>
                        <input {...register('name')} required type="text" defaultValue={item.name} placeholder="Type here" className="input input-bordered w-full" />
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
                        <select defaultValue={item.category} {...register('category')} required className="select select-bordered w-full">
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
                            <input defaultValue={item.price} required {...register('price')} type="number" placeholder="Type here" className="input input-bordered w-full" />
                        </label>

                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <label className='mb-1' htmlFor="">Recipe Details</label>
                    <textarea defaultValue={item.recipe} required {...register('recipe')} className="textarea mt-2 textarea-bordered h-32 w-full" placeholder="Details"></textarea>
                </div>

                <div>
                    <input {...register('image')} type="file" className="file-input w-full mt-6 max-w-xs" />
                </div>
                {/* ------------------ */}
                <button className='btn border-none btn-outline bg-sky-500 text-white mt-6'>
                    update Item <FaUtensils></FaUtensils>
                </button>
            </form>



        </div>
    );
};

export default UpdateItem;
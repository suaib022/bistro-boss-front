import featuredImg from '../../../assets/home/featured.jpg'
import SectionTitle from '../../../Components/SectionTitle';
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-4'>
            <div>
            <SectionTitle heading={'Featured items'} subHeading={'Check It Out'}></SectionTitle>
            </div>
            <div className='md:flex mt-12 bg-slate-500 bg-opacity-40 justify-center items-center pb-20 py-8 px-16 md:py-32'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'>Where Can I Get Some?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et dolore corporis assumenda laborum consequatur, dignissimos odio aperiam perferendis? At, deserunt non fugiat veritatis blanditiis tenetur reiciendis voluptatum consequatur sit corporis!</p>
                    <button className='btn btn-outline border-0 border-b-4 mt-4'>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
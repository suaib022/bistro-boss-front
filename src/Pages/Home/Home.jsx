
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner';
import Category from './Category';
import Featured from './Featured/Featured.jsx';
import PopularMenu from './PopularMenu';
import Testimonial from './Testimonials/Testimonial.jsx';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;
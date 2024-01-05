import Cover from '../../Shared/Cover/Cover';
import orderCover from '../../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import FoodCard from '../../../Components/FoodCard';
import UseMenu from '../../../Hooks/UseMenu';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    
    const [menu] = UseMenu();
    const {category} = useParams();
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    // console.log(category);
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
 
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover img={orderCover} title={"Order Food"}></Cover>
            {/* <div role="tablist" className="tabs tabs-lifted">
                <a role="tab" className="tab">Tab 1</a>
                <a role="tab" className="tab tab-active">Tab 2</a>
                <a role="tab" className="tab">Tab 3</a>
            </div> */}
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>

                {/* Salad */}
                <TabPanel>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            salad.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>

                {/* Pizza */}
                <TabPanel>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            pizza.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>

                {/* Soup */}
                <TabPanel>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            soup.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>

                {/* Dessert */}
                <TabPanel>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            dessert.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>
                
                {/* Drinks */}
                <TabPanel>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            drinks.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;
import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import menuImg from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import SectionTitle from "../../Components/SectionTitle";
import UseMenu from "../../Hooks/UseMenu";
import MenuCategory from "./MenuCategory/MenuCategory";

const Menu = () => {

    const [menu] = UseMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} title={'Our Menu'}></Cover>
            {/* Main Cover */}
            <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>

            {/* Menu items - offered */}
            <MenuCategory items={offered}></MenuCategory>

            {/* Menu items - dessert */}
            <MenuCategory items={dessert} title={"dessert"} coverImg={dessertImg}></MenuCategory>

            {/* Menu items - pizza */}
            <MenuCategory items={pizza} title={"pizza"} coverImg={pizzaImg}></MenuCategory>

            {/* Menu items - salad */}
            <MenuCategory items={salad} title={"salad"} coverImg={saladImg}></MenuCategory>
            
            {/* Menu items - soup */}
            <MenuCategory items={soup} title={"soup"} coverImg={soupImg}></MenuCategory>

        </div>
    );
};

export default Menu;
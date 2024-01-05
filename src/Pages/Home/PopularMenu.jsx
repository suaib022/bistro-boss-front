import SectionTitle from "../../Components/SectionTitle";
import MenuItem from "../../Components/MenuItem";
import UseMenu from "../../Hooks/UseMenu";


const PopularMenu = () => {

    const [menu] = UseMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className="mb-12">
            <SectionTitle heading={"From Our Menu"}
            subHeading={"Popular Items"}></SectionTitle>
            <div className="grid md:grid-cols-2 gap-8">
                {popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)}
            </div>
        </section>
    );
};

export default PopularMenu;
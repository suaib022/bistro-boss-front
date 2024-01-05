import UseAuth from '../../../Hooks/UseAuth';

const UserHome = () => {

    const {user} = UseAuth();

    return (
        <div>
            <h2 className="text-3xl">Hi, <span className="text-orange-700 font-bold">{user?.displayName}</span>. Welcome Back</h2>
        </div>
    );
};

export default UserHome;
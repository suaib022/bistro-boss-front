import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../Config/Firebase.config";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axios = UseAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser){
                const userInfo = { email : currentUser.email };
                axios.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('Access-token', res.data.token);
                        setLoading(false);
                    }
                })
            }
            else{
                localStorage.removeItem('Access-token');
                setLoading(false);
            }
            console.log('Current User', currentUser);
        });

        return () => {
            return unSubscribe();
        }
    }, []);


    const authInfo = {
        user,
        loading,
        createUser, 
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
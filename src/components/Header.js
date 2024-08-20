import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user);
    const handleSignOut=()=>{
        signOut(auth).then(() => {
          }).catch((error) => {
           navigate("/error")
          });
    }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
         
          const {uid,email,displayName, photoURL} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
          navigate('/browse');
          
        } else {
          // User is signed out 
          dispatch(removeUser());
          navigate('/');
          
        }
      });
    }, []);
  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
     <img className='w-44' src={LOGO}
     alt='logo'/>
     {user && <div className='flex'>
        <img className='w-12 h-12' src={user?.photoURL}
        alt='usericon'/>
        <button onClick={handleSignOut} className='font-bold text-white'> Sign out</button>
     </div>}
    </div>
  )
}
export default Header

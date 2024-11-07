import React, { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {  toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BG_URL } from "../utils/constants";
import { Alert, Snackbar } from "@mui/material";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState("false");
  const [snackmsg, setSnackmsg] = useState("default");
  const [transition, setTransition] = useState(null);
  const [sever, setSever] = useState(false);
  
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const name=useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message==="true"){
      if (!isSignInForm) {
        if(name.current.value.length > 0){
          createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // console.log("Sign up successfully", user);
            toast.success("Signed Up successfully !");
            setIsSignInForm(!isSignInForm);
            updateProfile(user, {
              displayName: name?.current?.value, 
              // photoURL:USER_AVATAR,
            }).then(() => {
              const {uid,email,displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
              
            }).catch((error) => {
              setErrorMessage(error.message)
              alert(error)
            });
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " - " + errorMessage);
            toast.error(error.code.substring(5));
          });
        }else{
          toast.error("Name can't be empty !");
        } 
      } else {
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
            // console.log("Sign in successfully", user);
            toast.success("Logged in Successfully");
            navigate('/browse')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " - " + errorMessage);
            toast.error(error.code.substring(5));
          });
      }
    }else{
      toast.error(message);
    }
    
  };

  const handleClose = (event, reason) => {
    setOpenSnackBar("false");
  };

  const handleForgotPassword = () => {
    if (email.current.value) {
      sendPasswordResetEmail(auth, email.current.value)
        .then(() => {
          toast.success("Password reset mail sent Successfully !");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(error);
          
        });
    } else {
      toast.error("Please enter your email");
    }
  };

  return (
    <div>
      <Header />
      <div className="fixed">
        <img
          src={BG_URL}
          alt="background_image"
         className=" md:h-full h-screen object-cover"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black bg-opacity-70 my-36 mx-auto right-0 left-0 text-white rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
          ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="abcde@gmail.com"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password@123"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="my-2 text-yl font-medium text-red-700">{errorMessage==="true"?"":errorMessage}</p>
        <button
          className="p-4 my-2 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm && (
          <p className="ml-[30%] hover:underline cursor-pointer">
            <h4 onClick={handleForgotPassword}>Forgot Password ?</h4>
          </p>
        )}
        <p className="p-2 my-1 cursor-pointer font-semibold" onClick={toggleSignInForm}>
          {isSignInForm
            ? (
              <div>
                <h4>
                  New to NetFlix ? &nbsp;
                  <span className="cursor-pointer text-red-500 hover:underline font-bold text-lg">
                    Sign-Up
                  </span>
                </h4>
              </div>
            )
            : (
              <div>
                <h4>
                  Already a registered User ? &nbsp;
                  <span className="cursor-pointer text-red-500 hover:underline font-bold text-lg">
                    Sign-In
                  </span>
                </h4>
              </div>
            )}
        </p>
      </form>
      <Snackbar
        open={openSnackBar === "true"}
        message={snackmsg}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={transition}
        autoHideDuration={3000}
      >
        <Alert
          variant="filled"
          severity={sever ? "success" : "error"}
          sx={{ marginTop: 1 }}
          onClose={handleClose}
        >
          {snackmsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;

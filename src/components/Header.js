import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../redux/gptSlice";
import { changeLanguage } from "../redux/configSlice";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import {deepOrange } from "@mui/material/colors";
import { removeMovieNames, removeMovies } from "../redux/suggestionsSlice";
import { toast } from "react-toastify";

function stringAvatar(name) {
  if (!name) return null;

  let char = name.split(" ");
  let charIcon = "";

  if (char.length == 1) charIcon = char[0][0] + char[0][char[0].length - 1].toUpperCase();
  else charIcon = `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;

  return {
    children: charIcon,
  };
}


const Header = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector(state => state.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => { toast.warning("Logged out !"); })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        dispatch(removeMovieNames());
        dispatch(removeMovies());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  const handleHome = () => {
    navigate('/browse')
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {
        !user && (
          <div className="absolute  bg-opacity-15 px-4 py-2 bg-gradient-to-b z-10 from-black">
            <img
              className="md:w-40 w-32 cursor-pointer"
              onClick={handleHome}
              src={LOGO}
            />
          </div>
        )
      }
      {user && (
        <div className="absolute flex justify-between md:bg-inherit bg-black  flex-row   w-[100%] px-4 py-2 md:bg-gradient-to-b z-10 md:from-black">
          <img
            className="md:w-40 w-32  md:mx-0 cursor-pointer"
            onClick={handleHome}
            src={LOGO}
          />

          {
            <div className="flex justify-between py-4">
              {showGptSearch && <select className="px-4 py-2 my-4 mx-4 bg-gray-700 text-white m-2 rounded-lg"
                onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>}
              <button
                onClick={handleGptSearchClick}
                className=" mr-6 rounded-lg text-white md:px-4 md:py-2 px-4 py-2 my-4 mx-4 bg-purple-800"
              >
                {showGptSearch ? 'Homepage' : 'GPT Search'}
              </button>

              <div className="cursor-pointer">
                <Avatar
                  // src={temp?.photoURL}
                  {...stringAvatar(user?.displayName)}
                  sx={{
                    width: 45,
                    height: 45,
                    marginRight: 2,
                    marginTop:2,
                    bgcolor: deepOrange[400],
                  }}
                  onClick={handleClickOpen}
                ></Avatar>
              </div>
            </div>
          }
        </div>
      )}
      <Dialog
        sx={{
          color: "white",
          "& .MuiPaper-root": {
            background: "#363636",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "transparent", // Try to remove this to see the result
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ textDecorationColor: "white", color: "white" }}
          id="alert-dialog-title"
        >
          Do you want to Logout?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            No
          </Button>
          <Button onClick={handleSignOut} variant="contained" color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Header;

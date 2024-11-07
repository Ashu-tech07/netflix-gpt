import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";

import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LOGO } from "../utils/constants";
import { auth } from "../utils/firebase";

function stringAvatar(name) {
  if (!name) return null;

  let spl = name.split(" ");
  let tt = "";

  if (spl.length == 1) tt = spl[0][0] + spl[0][spl[0].length - 1].toUpperCase();
  else tt = `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;

  return {
    children: tt,
  };
}

const TrailerHeader = () => {
    const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleHome = () => {
    navigate("/browse");
  };

  const handleSignOut = () => {
    handleClose();
    signOut(auth)
      .then(() => {
        toast.warning("Logged out !");
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="absolute flex justify-between bg-black   flex-row   w-[100%] px-4 py-1  z-10">
        <img
          className="md:w-40 w-32 cursor-pointer"
          onClick={handleHome}
          src={LOGO}
        />

        {
          <div className="flex py-4">
            <div className="cursor-pointer">
              <Avatar
                {...stringAvatar(user?.displayName)}
                sx={{
                  width: 45,
                  height: 45,
                  marginRight: 4,
                  bgcolor: "#ff7043",
                }}
                onClick={handleClickOpen}
              ></Avatar>
            </div>
          </div>
        }
      </div>
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
    </div>
  );
};

export default TrailerHeader;

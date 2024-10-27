"use client";

import React, { useState, useEffect } from "react";
import { signInWithGoogle, signOutUser } from "@/firebase/auth";
import { Button, Typography, Box } from "@mui/material";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const idToken = localStorage.getItem("firebaseIdToken");
    const userEmail = localStorage.getItem("firebaseUserEmail");
    const userUID = localStorage.getItem("firebaseUserUID");

    if (idToken && userEmail && userUID) {
      setUser({ email: userEmail, uid: userUID });
    }
  }, []);

  const handleSignIn = async () => {
    const { user, idToken } = await signInWithGoogle();
    if (user) {
      setUser(user);
      localStorage.setItem("firebaseIdToken", idToken);
      localStorage.setItem("firebaseUserEmail", user.email);
      localStorage.setItem("firebaseUserUID", user.uid);
    }
    window.location.href = "/users";
  };

  const handleSignOut = async () => {
    const signOutResult = await signOutUser();
    if (signOutResult) {
      setUser(null);
      localStorage.removeItem("firebaseIdToken");
      localStorage.removeItem("firebaseUserEmail");
      localStorage.removeItem("firebaseUserUID");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Innovision DashBoard
      </Typography>
      {user ? (
        <>
          <Typography variant="body1">
            Signed in as: <span className="text-teal-500"> {user.email} </span>
            {console.log(user)}
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleSignIn}>
          Sign in with Google
        </Button>
      )}
    </Box>
  );
};

export default HomePage;

"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_QUERY } from "@/graphQL/getUsers";
import { signInWithGoogle, signOutUser } from "@/firebase/auth";
import { Button, Typography, Box } from "@mui/material";

const HomePage = () => {
  const [user, setUser] = useState(null);

  const { loading, error, data } = useQuery(GET_USERS_QUERY, {
    variables: { orgId: "671bb67e578281c65287a545" },
  });

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
      localStorage.setItem("totalUsers", data.user.data.length);
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
      localStorage.removeItem("totalUsers");
    }
  };

  const totalFemale =
    data?.user?.data.filter((u) => u.gender === "FEMALE").length || 0;
  const totalMale = data?.user?.data.length - totalFemale || 0;

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
      <Typography variant="body1" gutterBottom>
        Total Users:
        <span className="text-violet-600 p-3 m-2">
          {data?.user?.data.length || "Login first"}
        </span>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Females:
        <span className="text-violet-600 p-3 m-2">{totalFemale}</span>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Males:
        <span className="text-violet-600 p-3 m-2">{totalMale}</span>
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

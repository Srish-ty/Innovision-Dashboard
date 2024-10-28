"use client";

import React, { use, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_QUERY } from "@/graphQL/getUsers";
import TableComponent from "./table";
import { CircularProgress, Typography, Box } from "@mui/material";

const Users = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { loading, error, data } = useQuery(GET_USERS_QUERY, {
    variables: { orgId: "671bb67e578281c65287a545" },
  });

  useEffect(() => {
    const userEmail = localStorage.getItem("firebaseUserEmail");
    const userUID = localStorage.getItem("firebaseUserUID");
    if (userEmail && userUID) {
      const user = { email: userEmail, uid: userUID };
      console.log(user);
      setCurrentUser(user);
    }
  }, []);

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box>
      <TableComponent users={data.user.data} loggedInUser={currentUser} />
      {localStorage.setItem("totalUsers", data.user.data.length)}
    </Box>
  );
};

export default Users;

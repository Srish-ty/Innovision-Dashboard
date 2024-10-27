"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_QUERY } from "@/graphQL/getUsers";
import TableComponent from "./table";
import { CircularProgress, Typography, Box } from "@mui/material";

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS_QUERY, {
    variables: { orgId: "671bb67e578281c65287a545" },
  });

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <TableComponent users={data.user.data} />
    </Box>
  );
};

export default Users;

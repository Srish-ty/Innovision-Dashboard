import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Switch,
  Snackbar,
  Alert,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/graphQL/updateUser";
import colleges from "@/config/data/colleges";

const TableComponent = ({ users, loggedInUser }) => {
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleToggle = async (userId, currentStatus) => {
    const authorizedUsers = [
      process.env.NEXT_PUBLIC_INNO_USER_UID,
      process.env.NEXT_PUBLIC_INNO_USER_EMAIL,
    ];

    if (
      authorizedUsers.includes(loggedInUser.uid) ||
      authorizedUsers.includes(loggedInUser.email)
    ) {
      try {
        const variables = {
          user: { hasPaid: !currentStatus },
          updateUserId: userId,
        };
        await updateUser({ variables });
        console.log(`User with ID ${userId} updated successfully`);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ padding: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  Email
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  Mobile
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  College
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  ID Card
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  Receipt
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  Transaction ID
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  Has Paid
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ padding: "4px" }}>{user.name}</TableCell>
                <TableCell sx={{ padding: "4px" }}>{user.email}</TableCell>
                <TableCell sx={{ padding: "4px" }}>{user.mobile}</TableCell>
                <TableCell sx={{ padding: "4px" }}>
                  {colleges[user.college] || "Unknown"}
                </TableCell>
                <TableCell sx={{ padding: "4px" }}>
                  <a
                    href={user.idCard}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View ID Card
                  </a>
                </TableCell>
                <TableCell sx={{ padding: "4px" }}>
                  <a
                    href={user.receipt}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Receipt
                  </a>
                </TableCell>
                <TableCell sx={{ padding: "4px" }}>
                  {user.transactionID}
                </TableCell>
                <TableCell sx={{ padding: "4px" }}>
                  <Switch
                    checked={user.hasPaid}
                    onChange={() => handleToggle(user.id, user.hasPaid)}
                    color="primary"
                  />
                  {user.hasPaid ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          You're not authorized to change this!
        </Alert>
      </Snackbar>
    </>
  );
};

export default TableComponent;

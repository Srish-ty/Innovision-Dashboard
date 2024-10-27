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
            <TableRow>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Mobile</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">College</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">ID Card</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Receipt</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Transaction ID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Has Paid</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{colleges[user.college] || "Unknown"}</TableCell>
                <TableCell>
                  <a
                    href={user.idCard}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View ID Card
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={user.receipt}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Receipt
                  </a>
                </TableCell>
                <TableCell>{user.transactionID}</TableCell>
                <TableCell>
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

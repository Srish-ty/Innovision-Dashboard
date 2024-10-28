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
  TextField,
  Box,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/graphQL/updateUser";
import colleges from "@/config/data/colleges";

const TableComponent = ({ users, loggedInUser }) => {
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.toString().includes(searchTerm) ||
      (colleges[user.college] || "Unknown")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

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
            {filteredUsers.map((user) => (
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
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View ID Card
                  </a>
                </TableCell>
                <TableCell sx={{ padding: "4px" }}>
                  {user.receipt ? (
                    <a
                      href={user.receipt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-500 underline hover:text-teal-700"
                    >
                      View Receipt
                    </a>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell sx={{ padding: "4px" }}>
                  {user.transactionID || (
                    <span className="text-gray-300">NITR Student</span>
                  )}
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
          You&apos;re not authorized to change this!
        </Alert>
      </Snackbar>
    </>
  );
};

export default TableComponent;

import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION, ADD_USER_HALL } from "@/graphQL/updateUser";
import colleges from "@/config/data/colleges";
import { MaleHostels, FemaleHostels } from "@/config/data/Halls";

const TableComponent = ({ users, loggedInUser }) => {
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [updateUserHall] = useMutation(ADD_USER_HALL);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [localUsers, setLocalUsers] = useState(users);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isViewer, setIsViewer] = useState(false);
  let sr_no = 1;

  const authorizedUsers = [
    process.env.NEXT_PUBLIC_INNO_USER_UID,
    process.env.NEXT_PUBLIC_INNO_USER_EMAIL,
  ];
  const viewAuthorisations = [
    process.env.NEXT_PUBLIC_INNO_VIEWER_EMAIL,
    "srishtymangutte@gmail.com",
    "jaiswal2nikhil@gmail.com",
    "srushtimangutte@gmail.com",
    "jayeshnayak2003@gmail.com",
  ];

  useEffect(() => {
    if (
      authorizedUsers.includes(loggedInUser.uid) ||
      authorizedUsers.includes(loggedInUser.email)
    ) {
      setIsAdmin(true);
    }
    if (viewAuthorisations.includes(loggedInUser.email)) {
      setIsViewer(true);
    }
  }, [loggedInUser]);

  const handleCityChange = async (userId, city) => {
    if (isAdmin) {
      try {
        const { data } = await updateUserHall({
          variables: {
            updateUserId: userId,
            user: { city: city },
          },
        });
        setSnackbarMessage(
          `Successfully Hall updated to ${data.updateUser.city}`
        );
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error updating user:", error);
        setSnackbarMessage("Failed to update city");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage("You are not authorized to update Hall");
    }
  };

  const handleToggle = async (userId, currentStatus) => {
    if (isAdmin) {
      try {
        const variables = {
          user: { hasPaid: !currentStatus },
          updateUserId: userId,
        };
        await updateUser({ variables });

        setLocalUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, hasPaid: !currentStatus } : user
          )
        );

        console.log(`User with ID ${userId} updated successfully`);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage("You are not authorized to update payment status");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredUsers = localUsers.filter((user) => {
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
                  Sr. No.
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  Gender
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
              <TableCell>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  Hall
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(
              (user) =>
                user.college !== "671a5be76748c70b7f893ccb" && (
                  <TableRow key={user.id}>
                    <TableCell sx={{ padding: "4px" }}>{sr_no++}</TableCell>
                    <TableCell
                      sx={{ padding: "4px" }}
                      className={!isViewer && "blur-sm"}
                    >
                      {user.name}
                    </TableCell>
                    <TableCell sx={{ padding: "4px" }}>
                      <span
                        className={
                          user.gender === "FEMALE"
                            ? "text-teal-500"
                            : "text-violet-600"
                        }
                      >
                        {user.gender}
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{ padding: "4px" }}
                      className={!isViewer && "blur-sm"}
                    >
                      {user.email}
                    </TableCell>

                    <TableCell
                      sx={{ padding: "4px", color: "#305353" }}
                      className={!isAdmin && "blur-sm"}
                    >
                      {user.mobile}
                    </TableCell>

                    <TableCell sx={{ padding: "4px", color: "#a0a0a0" }}>
                      {colleges[user.college] || "Unknown"}
                    </TableCell>
                    <TableCell sx={{ padding: "4px" }}>
                      <a
                        href={isViewer ? user.idCard : undefined}
                        target={isViewer ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className={`underline text-blue-500 ${
                          isViewer
                            ? "hover:text-blue-700"
                            : "text-gray-400 cursor-not-allowed"
                        } `}
                      >
                        View ID Card
                      </a>
                    </TableCell>
                    <TableCell sx={{ padding: "4px" }}>
                      <a
                        href={isViewer ? user.receipt : undefined}
                        target={isViewer ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className={`underline  ${
                          isViewer
                            ? "text-teal-500 hover:text-teal-700"
                            : "text-gray-400 cursor-not-allowed"
                        } `}
                      >
                        View Receipt
                      </a>
                    </TableCell>
                    <TableCell
                      sx={{ padding: "4px" }}
                      className={!isViewer && "blur-sm"}
                    >
                      {user.transactionID}
                    </TableCell>
                    <TableCell
                      sx={{ padding: "4px" }}
                      className={!isViewer && "blur-sm"}
                    >
                      <Switch
                        checked={user.hasPaid}
                        onChange={() => handleToggle(user.id, user.hasPaid)}
                        color="primary"
                      />
                      {user.hasPaid ? "Yes" : "No"}
                    </TableCell>

                    <TableCell className={!isViewer && "blur-sm"}>
                      <Select
                        value={user.city || ""}
                        onChange={(e) =>
                          handleCityChange(user.id, e.target.value)
                        }
                        displayEmpty
                        sx={{
                          width: 120,
                          height: 40,
                        }}
                      >
                        <MenuItem value="" disabled>
                          {user.city || "not selected"}
                        </MenuItem>
                        {(user.gender === "MALE"
                          ? MaleHostels
                          : FemaleHostels
                        ).map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.startsWith("You") ? "error" : "success"}
          sx={{ width: "100%", height: "120px" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TableComponent;

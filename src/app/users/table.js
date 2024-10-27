import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const TableComponent = ({ users }) => {
  return (
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
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.mobile}</TableCell>
              <TableCell>{user.idCard}</TableCell>
              <TableCell>{user.receipt}</TableCell>
              <TableCell>{user.transactionID}</TableCell>
              <TableCell>{user.hasPaid ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/topusers.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import getTopUsers from "../apis/getTopUsers";

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const authToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTUzNzYyLCJpYXQiOjE3NDMxNTM0NjIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRkOThiNDIwLTQ2YTUtNDhlYi05NDgwLTBlYjAxYmNhMTJiOCIsInN1YiI6IjcyNzcyMmV1ZWMwMTFAc2tjZXQuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTS0NFVCIsImNsaWVudElEIjoiZGQ5OGI0MjAtNDZhNS00OGViLTk0ODAtMGViMDFiY2ExMmI4IiwiY2xpZW50U2VjcmV0IjoiZUpiS0p1c2djZFR2SE9TVCIsIm93bmVyTmFtZSI6IkFqaW4gUmliaWEgUCIsIm93bmVyRW1haWwiOiI3Mjc3MjJldWVjMDExQHNrY2V0LmFjLmluIiwicm9sbE5vIjoiNzI3NzIyZXVlYzAxMSJ9.10sG-ebg4IUWLyI3W3WGAotWgKC2HrqlAp8aBVBvRYA"
;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getTopUsers();
        if (!response?.users) return;

        const userList = Object.entries(response.users).map(([id, name]) => ({
          id: Number(id),
          name,
        }));

        const usersWithPostCounts = await Promise.all(
          userList.map(async (user) => {
            try {
              const postResponse = await axios.get(
                `/test/users/${user.id}/posts`,
                {
                  headers: { Authorization: `Bearer ${authToken}` },
                }
              );

              return { ...user, postCount: postResponse.data.posts.length };
            } catch {
              return { ...user, postCount: 0 };
            }
          })
        );

        usersWithPostCounts.sort((a, b) => b.postCount - a.postCount);
        setUsers(usersWithPostCounts.slice(0, 5));
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="top-users-container">
      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Rankig</strong></TableCell>
              <TableCell><strong>User Name</strong></TableCell>
              <TableCell><strong>User's Post Count</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.postCount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Loading wait a second...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TopUsers;

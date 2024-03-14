import React, { useState, useEffect } from "react";
import UserArray from "../js/UserArray";
import { Link } from "react-router-dom";
import { UserCreate } from "./UserCreate";
import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export const UserList = () => {

  const [users, setUsers] = useState(UserArray);

  useEffect(() => {
    UsersGet();
  }, []);

  const UsersGet = () => {
    fetch("https://www.melivecode.com/api/users")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
  };

  const UpdateUser = (id) => {
    window.location = "/update/" + id;
  };

  const UserDelete = (id) => {
    var data = {
      id: id,
    };
    fetch("https://www.melivecode.com/api/users/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          UsersGet();
        }
      });
  };

  return (
    <div className="container">
      <div className="table-container">
        <div className="header">
        <Typography variant="h2" color="primary">Usuarios</Typography>
          <Link to="/create" element={<UserCreate />}>
            <Button variant="contained" color="primary">
              Crear
            </Button>
          </Link>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Nombre de Usuario</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <img
                      src={user.avatar}
                      alt={`Avatar de ${user.fname} ${user.lname}`}
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>{user.fname}</TableCell>
                  <TableCell>{user.lname}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => UpdateUser(user.id)}>Editar</Button>
                      <Button onClick={() => UserDelete(user.id)}>Borrar</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

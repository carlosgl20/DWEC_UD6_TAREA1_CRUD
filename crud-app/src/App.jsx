import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { UserCreate } from "./components/UserCreate";
import {NavBar} from "./components/NavBar"
import { UserList } from "./components/UserList";
import {UserUpdate} from "./components/UserUpdate"
import { useState } from "react";
import usersArray from "./js/UserArray";

export const App =()=> {
  const [users, setUsers] = useState(usersArray);

  const addUser = (user) => {
    setUsers([user, ...users]);
  }

  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/update/:id" element={<UserUpdate />} /> 
          <Route path="create" element={<UserCreate users={users} onAddUser={addUser}/>}></Route>  
        </Routes>
    </BrowserRouter>
  )
}

import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { UserContext } from './../context/user-context';

import Header from "../components/header/header.component";

import Cat from "./cat/code-cat";
import Login from "./Login/login";
import RandomDog from "./random-dog/random-dog";
import RandomUsers from './random-users/random-users';
import CRUD from './crud/crud';

const Router= () => {
  const auth = useContext(UserContext)
  
  // Component that checks if there is a user connected, it only allows access to private routes to users
  // Componente que confere se há usuario conectado, só permite acesso a rotas privadas a usuarios
  const PrivateRoute = () => {
    return auth.currentUser ? <Header> <Outlet /> </Header> : <Navigate to="/" />
  }
  
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/http-cat" element={<Cat />} />
          <Route path="/random-dog" element={<RandomDog />} />
          <Route path="/random-users" element={<RandomUsers />} />
          <Route path="/crud" element={<CRUD />} />
        </Route>

        <Route path="/" element={!auth.currentUser ? <Login /> : <Navigate to="/random-users" />} />
        <Route path='/*' element={<Navigate to='/' />} />

      </Routes>
    </>
  );
};

export default Router;

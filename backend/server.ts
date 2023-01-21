import { Request, Response } from "express";
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//config json
app.use(express.json());
app.use(cors());

// Models
const client = require('./controllers/client');
const login = require('./controllers/login');
const dog = require('./controllers/random-dog');
const randomUsers = require('./controllers/random-users');

// home page
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Está rodando" });
});

// Register User
app.post("/auth/register", login.registerUser);

// Login User
app.post("/auth/login", login.createSession);

// Random Users
app.get('/random-users', randomUsers.randomUsers)

// Random Dog
app.get('/randomdog', dog.randomDog);

// Create Client
app.post('/createClient', login.checkToken, client.createUser);

// Read Clients
app.get('/getClients', login.checkToken, client.getUsers);

// Read Client by id
app.post('/getClientById', login.checkToken, client.getUser);

// Update Client
app.post('/updateClient', login.checkToken, client.updateUser);

// Delete Client
app.post('/deleteClient', login.checkToken, client.deleteUser);

// Credenciais
const dbUser = "PauloVictor" || process.env.DB_USER;
const dbPass = "Yhz6TmPZD920UFEz" || process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.bejkqja.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
    console.log("conectou ao banco!");
  })
  .catch((error: Error) => console.log(error));

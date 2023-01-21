import { NextFunction, Request, Response } from "express";
require("dotenv").config();

const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = {
  async registerUser(req: Request, res: Response) {
    const { name, email, password, confirmPassword } = req.body;
    //check if there's a name
    if (!name) return res.status(422).json({ message: "please provide name" });

    //check if there's an email
    if (!email)
      return res.status(422).json({ message: "please provide email" });

      //check if there's a password
    if (!password)
      return res.status(422).json({ message: "please provide password" });

    //check if password and it's confirmation match
    if (password !== confirmPassword)
      return res.status(422).json({ message: "passwords don't match" });

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists)
      return res.status(422).json({ message: "email already used" });

    // create password
    const salt = await bycript.genSalt(12);
    const passwordHash = await bycript.hash(password, salt);

    // create user
    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      await user.save();

      res.status(201).json({ message: "user successfully created" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  // create session of user
  async createSession(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email)
      return res.status(422).json({ message: "please provide email" });

    if (!password)
      return res.status(422).json({ message: "please provide password" });

    // check if user exists
    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "user not found" });

    // check if password match
    const checkPassword = await bycript.compare(password, user.password);

    if (!checkPassword)
      return res.status(422).json({ message: "invalid password" });

      // criation of token for user to loggin
    try {
      const secret = "FA8SH8FAH8FA8H8R213FG40G480FQH80FG80HWT435AWE" || process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      return res.status(200).json({ message: "fully authenticated!", token });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  // check if token is valid token 
  async checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "access denied" });

    try {
      const secret = "FA8SH8FAH8FA8H8R213FG40G480FQH80FG80HWT435AWE" || process.env.SECRET;

      jwt.verify(token, secret);

      next();
    } catch (error) {
      res.status(400).json({ message: "unvalid token" });
    }
  },
};

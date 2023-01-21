import { Request, Response } from "express";
const fetch = require('node-fetch')

module.exports = {
  async randomUsers(req: Request, res: Response) {
    const response = await fetch("https://randomuser.me/api/?page=1&results=10&");
    const users = await response.json();

    res.json(users)
  },
};

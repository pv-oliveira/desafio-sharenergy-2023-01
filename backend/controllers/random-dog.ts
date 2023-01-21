import { Request, Response } from "express";
const fetch = require('node-fetch')

module.exports = {
  async randomDog(req: Request, res: Response) {
    const response = await fetch("https://random.dog/doggos");
    const dogs = await response.json();

    const filteredDogs = dogs.filter((dog: string) => !dog.includes(".mp4"));

    const randomNum = Math.floor(Math.random() * filteredDogs.length);
    res.set("Content-Type", "application/json");
    res.send({ message: filteredDogs[randomNum] });
  },
};

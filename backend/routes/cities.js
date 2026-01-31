import express from "express";
import City from "../models/City.js";
import mongoose from "mongoose";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    console.log(cities);
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET city by id
router.get("/:id", async (req, res) => {
  const city = await City.findById(req.params.id);
  res.json(city);
});

router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message:"Invalid City id"});
    }
    const deleteCity = await City.findByIdAndDelete(id);
    if (!deleteCity) {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(200).json({message:"City deleted successfully"});
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json(city);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

export default router;

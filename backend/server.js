import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import citiesRoutes from "./routes/cities.js";
// import fs from "fs";
// import City from "./models/City.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// const data = JSON.parse(fs.readFileSync("../data/cities.json", "utf-8"));

// async function importData() {
//   try {
//     await cities.deleteMany();
//     console.log(data);

//     const cleanData = data.cities.map((city) => ({
//       ...city,
//       position: {
//         lat: Number(city.position.lat),
//         lng: Number(city.position.lng),
//       },
//       date: new Date(city.date), // also convert date string to Date object
//     }));
    
//     await cities.insertMany(cleanData);
//     console.log("Data imported successfully!");
//     process.exit();
//   } catch (err) {
//     console.error("Error importing data:", err);
//     process.exit(1);
//   }
// }


mongoose
  .connect(process.env.MONGO_URI)
  .then(async() => {
    // importData();
    // const cities = await City.find();
    //     console.log(cities);
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.use("/cities", citiesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

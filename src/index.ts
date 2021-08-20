import mongoose from "mongoose";
import { app } from "./app";

const PORT = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://tickets-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

start();

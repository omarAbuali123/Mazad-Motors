const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://omar:WwEeRr1234567@cluster0.ho726.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

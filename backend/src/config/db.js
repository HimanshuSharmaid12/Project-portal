// const mongoose = require("mongoose");
// require("dotenv").config();

// const connectDB = async () => {
//   const uri = process.env.MONGO_URI;
//   if (!uri) throw new Error("MONGO_URI not set");
//   await mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
//   console.log("Connected to MongoDB");
// };

// module.exports = { connectDB };

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not set");

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("✅ Connected to MongoDB");
};

module.exports = { connectDB };

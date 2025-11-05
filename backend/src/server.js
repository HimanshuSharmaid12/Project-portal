// const http = require("http");
// const app = require("./app");
// const { connectDB } = require("./config/db");
// const notificationSocket = require("./sockets/notificationSocket");
// require("dotenv").config();

// const PORT = process.env.PORT || 8000;

// (async () => {
//   try {
//     await connectDB();

//     const server = http.createServer(app);
//     const io = require("socket.io")(server, {
//       cors: { origin: process.env.CORS_ORIGIN || "*" }
//     });

//     // attach io to app locals so services/controllers can use it
//     app.set("io", io);

//     // socket handlers
//     notificationSocket(io);

//     server.listen(PORT, () => {
//       console.log(`Backend listening on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Failed to start server:", err);
//     process.exit(1);
//   }
// })();

const http = require("http");
const app = require("./app");
const { connectDB } = require("./config/db");
const notificationSocket = require("./sockets/notificationSocket");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await connectDB();

    const server = http.createServer(app);
    const io = require("socket.io")(server, {
      cors: { origin: process.env.CORS_ORIGIN || "*" },
    });

    // Attach io for global use
    app.set("io", io);

    // Socket handlers
    notificationSocket(io);

    server.listen(PORT, () => {
      console.log(`✅ Backend listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();


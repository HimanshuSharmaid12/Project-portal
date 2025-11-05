module.exports = function(io) {
  io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);

    socket.on("join", (room) => {
      socket.join(room);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected:", socket.id);
    });
  });
};

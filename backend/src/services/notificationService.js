/**
 * Small wrapper to emit socket.io notifications
 * Usage: notificationService.notify(app.get('io'), 'new-application', payload)
 */
const notify = (io, channel, payload) => {
  try {
    if (!io) return;
    io.emit(channel, payload);
  } catch (err) {
    console.error("notify error", err);
  }
};

module.exports = { notify };

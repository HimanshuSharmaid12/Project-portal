const log = (...args) => console.log("[jobify]", ...args);
const error = (...args) => console.error("[jobify][error]", ...args);
module.exports = { log, error };

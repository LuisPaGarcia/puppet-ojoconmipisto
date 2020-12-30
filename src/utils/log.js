const log = (type, message) => console.log(`${{ red: '\x1b[33m', green: '\x1b[32m' }[type]}%s\x1b[0m`, message);

module.exports = log;

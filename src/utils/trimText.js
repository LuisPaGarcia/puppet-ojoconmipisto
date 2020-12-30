const trimText = text => text.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

module.exports = trimText;

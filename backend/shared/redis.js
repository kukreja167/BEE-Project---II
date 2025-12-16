const { createClient } = require("redis");

const Publisher = createClient();
Publisher.connect();

const Subscriber = createClient();
Subscriber.connect();

module.exports = { Publisher, Subscriber };

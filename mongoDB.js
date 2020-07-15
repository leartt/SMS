const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017/schoolDB';

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log("MongoDB database has been connected");
});
connection.on('disconnected', () => {
    console.log("MongoDB database has been disconnected");
});
connection.on('error', () => {
    console.log("MongoDB database ERROR");
});

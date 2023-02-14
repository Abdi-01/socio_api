const { join } = require("path");
require('dotenv').config({ path: join(__dirname, '../.env') });
const express = require('express');
const app = express();
const cors = require('cors');
const bearerToken = require('express-bearer-token')
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
app.use(bearerToken());
// #destination file storage(image/pdf/document)
app.use("/", express.static(__dirname + "/public"));

// DB Check Connection

app.get('/api/v1', (req, res) => {
    res.status(200).send('<h1>LOCAVEX API v1</h1>');
})

// Routing Config
const routerConfig = require('./routers');
app.use('/api/v1', routerConfig)

// Error Handling
app.use((err, req, res, next) => {
    // Error handling middleware functionality
    console.log(`error ${err}`); // log the error
    const status = err.status || 400;
    // send back an easily understandable error message to the caller
    res.status(status).send(err);
})

app.listen(PORT, (err) => {
    if (err) {
      console.log(`ERROR: ${err}`);
    } else {
      console.log(`APP RUNNING at ${PORT} ✅`);
    }
});
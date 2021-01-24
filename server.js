const express = require('express');
const https = require('https');
const app = express();
const port = 8080;
const apiServices = require('./routes/apiRoutes');

app.use('/', apiServices)
app.listen(port, () => console.log(`REST app listening on port ${port}!`));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Unexpected error occurred!');
});


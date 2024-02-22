const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api', (req, res) => {
    const requestBody = req.body; // This will contain the JSON data from the request body
    // Handle the request body here
    console.log(req.body);
    res.json(req.body);
});

app.listen(3000, () => {
    console.log('Server is running on port https://localhost:3000');
});
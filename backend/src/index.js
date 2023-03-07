const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors")
mongoose.set('strictQuery', true)

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/palnesto", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

//----------handling wrong api edge case--------------------------------------------
app.use((req, res) => {
    res.status(400).send({ status: false, error: "Endpoint is not Correct" });
})

app.listen(4000, function () {
    console.log('Express app running on port ' + 4000)
});
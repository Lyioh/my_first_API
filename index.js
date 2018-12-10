const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

require("./routes/userRoutes")(app);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running`);
});
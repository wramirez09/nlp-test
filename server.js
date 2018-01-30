var express = require('express');
var app = express();


app.use(express.static('src'));

app.listen(process.env.PORT || 3180, () => {
    console.log(`Listening on port ${process.env.PORT || 3180}`);
});
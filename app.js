const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

port = 80;

app.get('/', (req, res) => {
    res.render("home.ejs");
})
app.get('/booking', (req, res) => {
    res.render("booking.ejs");
})
app.get('/cancel', (req, res) => {
    res.render("cancel.ejs");
})
app.get('/addturf', (req, res) => {
    res.render("turf_add.ejs");
})
app.get('/contact', (req, res) => {
    res.render("contact.ejs");
})
app.listen(port, () => {
    console.log("Server started on port " + port);
})
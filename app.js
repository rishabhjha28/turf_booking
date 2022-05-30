const express = require("express");
const app = express();
const jsdom = require('jsdom');
const $ = require("jquery")(new jsdom.JSDOM().window);
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/turfData');
}
const turfSchema = new mongoose.Schema({
    turfName: { type: String, required: true },
    location: { type: String, required: true },
    ownerName: { type: String, required: true },
    phoneNo: { type: String, required: true },
    tnc: { type: String, required: true }
})
const turf = mongoose.model('turf', turfSchema);
app.set('view engine', 'ejs');
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
port = 80;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("home.ejs");
})
app.get('/home', (req, res) => {
    res.render("home.ejs");
})
app.get('/booking', (req, res) => {
    res.render("booking.ejs");
})
app.get('/cancel', (req, res) => {
    res.render("cancel.ejs");
})
app.get('/addturf', (req, res) => {
    res.render("turf_add.ejs")
})
app.post('/addturf', async (req, res) => {
    const turfData = new turf({
        turfName: req.body.turfName,
        location: req.body.location,
        ownerName: req.body.ownerName,
        phoneNo: req.body.phno,
        tnc: req.body.agreetnc
    });
    await turf.insertMany(turfData, function (err) {
        if (err) {
            res.render("result.ejs", { message: "Sorry, Adding Turf wasn't Successfull", amessage: "Try Again!!", result: "failure", link: "/addturf" })
        }
        else {
            res.render("result.ejs", { message: "Adding Turf Was Successfull You Will See Players On Your Turf Very Soon", amessage: "Want To Add Another??", result: "success", link: "/addturf" })
        }
    })
});
app.get('/contact', (req, res) => {
    res.render("contact.ejs");
})
app.listen(port, () => {
    console.log("Server started on port " + port);
})
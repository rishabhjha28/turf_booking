const express = require("express");
const app = express();
const mongoose = require('mongoose');
main().catch(err => console.log(err));
let db;
async function main() {
    db = await mongoose.connect('mongodb://localhost:27017/turfData');
}
const slotSchema = new mongoose.Schema({
    gameTime: { type: String, required: true }
})
const slot = mongoose.model("slot", slotSchema);
const bookingSchema = new mongoose.Schema({
    playerName: { type: String, required: true },
    playerMobileNo: { type: String, required: true },
    playerEmail: { type: String },
    dateOfPlay: { type: String, required: true },
    turfId: { type: String, required: true },
    bookingDate: { type: String, required: true },
    bookingTime: { type: String, required: true },
    // slotBooked: { type: String, required: true }
})
const bookingData = mongoose.model('bookingData', bookingSchema);
const turfSchema = new mongoose.Schema({
    turfName: { type: String, required: true },
    location: { type: String, required: true },
    ownerName: { type: String, required: true },
    phoneNo: { type: String, required: true },
    tnc: { type: String, required: true },
    bookingData: [bookingSchema]
})

const turf = mongoose.model('turf', turfSchema);
app.set('view engine', 'ejs');
app.use(express.static('public'));
const bodyParser = require('body-parser');
const { get } = require("express/lib/response");
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
app.get('/turfData', (req, res) => {
    turf.find({}, (err, foundTurfs) => {
        if (err) {
            res.send("err");
        }
        else {
            res.send(foundTurfs);
        }
    })
})
app.get('/booking', (req, res) => {
    turf.find({}, (err, foundTurfs) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Turves found");
            slot.find({}, (err, foundSlots) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render("booking.ejs", { data: foundTurfs, slot: foundSlots });
                }
            })
        }
    })

})
app.post('/booking', async (req, res) => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const booking = new bookingData({
        playerName: req.body.name,
        playerMobileNo: req.body.phno,
        playerEmail: req.body.email,
        bookingDate: date,
        bookingTime: time,
        dateOfPlay: req.body.playDate,
        turfId: req.body.turf
    });
    await bookingData.insertMany(booking, async function (err) {
        if (err) {
            console.log(err);
            res.render("result.ejs", { message: "Sorry, Booking Turf wasn't Successfull", amessage: "Try Again!!", result: "failure", link: "/booking" })
        }
        else {
            await turf.updateOne({ _id: booking.turfId }, {
                $push: { bookingData: booking }
            });
            res.render("result.ejs", { message: "Booking Turf Was Successfull See You On The Turf", amessage: "Book Another??", result: "success", link: "/booking" })
        }
    })
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
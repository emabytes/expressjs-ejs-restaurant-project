const express = require("express")
const app = express()
const nav = require("./menu.json")

const bodyParser = require('body-parser')

app.listen(5003, () => {
    console.log("server started at http://localhost:5003")
})

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static("public"))
app.set("view engine", "ejs")

// app.get("/", (res, req) => {
//     res.status(200).render("index")
// })

nav.forEach((elem) => {
    app.get(elem.url, (req, res) => {
        res.render(elem.name.toLowerCase(), { title: elem.name, nav: nav })
    })
});

app.post('/contactForm', urlencodedParser, (req, res) => {
    console.log(req.body)
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.phone);
    console.log(req.body.message);

    res.status(201).send("created")
})

app.use((req, res) => {
    res.render('404', { title: 'Not found', nav: nav })
});
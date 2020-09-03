const express = require("express")
const app = express()
const nav = require("./menu.json")

app.set("view engine", "ejs")

app.listen(5003, () => {
    console.log("server started at http://localhost:5003")
})

app.use(express.static("public"))

nav.forEach((elem) => {
    app.get(elem.url, (req, res) => {
        res.render(elem.name.toLowerCase(), { title: elem.name, nav: nav })
    })
});

app.use((req, res) => {
    res.render('404', { title: 'Not found', nav: nav })
});
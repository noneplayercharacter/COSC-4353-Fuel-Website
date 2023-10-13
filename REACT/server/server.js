const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

/*app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
*/
// GET Directories
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/Quote", (req, res) => {
    res.json({ gallons: 0,
               address: "8251 bob street",
               date: "",
               price: 0,
               amount: ""});
});

// Port in-use msg
app.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`)
});
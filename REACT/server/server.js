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
               date: "2022-01-01",
               price: 2.5,
               total: 0});
});

app.get("/api/QuoteHistory", (req, res) => {
    res.json({ gallons: 20,
               address: "1512 john street",
               date: "2022-01-01",
               price: 2.50,
               total: 50});
});


// Port in-use msg
app.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`)
});
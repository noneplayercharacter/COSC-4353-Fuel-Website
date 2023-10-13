const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');


/*app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
*/
// GET Directories
let userData = {
    fullName: 'Ricky Bobby',
    address1: '123 ShakenBake Dr',
    address2: 'Apt 456',
    city: 'Houston',
    state: 'TX',
    zipcode: '98745',
  };
  function updateUser(data) {
    if (!data.fullname || data.fullname.length === 0 || data.fullname.length > 50) {
      return { isValid: false, message: 'Invalid full name' };
    }
    userData = { ...userData, ...data };
  
    return { isValid: true, data: userData };
  }
app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/Quote", (req, res) => {
    res.json({
        gallons: 0,
        address: "8251 bob street",
        date: "2022-01-01",
        price: 2.5,
        total: 0
    });
});

app.get("/api/QuoteHistory", (req, res) => {
    res.json({
        gallons: 20,
        address: "1512 john street",
        date: "2022-01-01",
        price: 2.50,
        total: 50
    });
});
app.get("/api/modifyAccount", (req, res) => {
    res.json(userData);
});
app.post('/api/modifyAccount', (req, res) => {
    userData.fullName = req.body.fullName;
    userData.firstAddress = req.body.firstAddress;
    userData.secondAddress = req.body.secondAddress;
    userData.city = req.body.city;
    userData.state = req.body.state;
    userData.zipcode = req.body.zipcode;

    res.json({ message: 'User account updated successfully' });
});




// Port in-use msg
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`)
});
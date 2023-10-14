const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors'); //Cors middleware
const Yup = require('yup'); //Yup validation middleware

app.use(express.json());
// Enable CORS for all routes
app.use(cors());
let userData = {
    fullName: 'Ricky Bobby',
    address1: '1234 ShakenBake Dr',
    address2: 'Apt 456',
    city: 'Houston',
    state: 'TX',
    zipcode: '98745',
};



// GET Directories
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Get for Quote.js, Gets data from server(Can be changed to DB)
app.get("/api/Quote", (req, res) => {
    res.json({
        gallons: 0,
        address: "8251 bob street",
        date: "2022-01-01",
        price: 2.5,
        total: 0
    });
});


const quoteSchema = Yup.object({
    gallons: Yup.number()
        .required("Gallons is required")
        .min(5, "Gallons must be greater than 5")
        .max(5000, "Gallons must be less than 5000"),
    address: Yup.string()
        .required("Address is required")
        .min(5, "Address must be greater than 5")
        .max(100, "Address must be less than 100"),
});

//Quote Validation
app.post('/api/validateQuote', (req, res) => {
    const formData = req.body;
    quoteSchema.validate(formData).catch(err => {
        res.status(400).json({ errors: [err.errors] });
    }).then(valid => {
        if (valid) {
            formData.total = formData.gallons * formData.price;
            res.json({ formData })
        }
    })
});


// Get for QuoteHistory.js, Gets data from server(Can be changed to DB)
app.get("/api/QuoteHistory", (req, res) => {
    res.json({
        gallons: 20,
        address: "1512 john street",
        date: "2022-01-01",
        price: 2.50,
        total: 50
    });
});


const accountSchema = Yup.object({
    fullName: Yup.string()
        .required("Name is required")
        .min(2, "Name must be greater than 1 characters")
        .max(50, "Name cannot exceed 50 characters"),
    address1: Yup.string()
        .required("Address is required")
        .min(2, "Address must be greater than 2")
        .max(100, "Address must be less than 100"),
    address2: Yup.string()
        .optional("second Address is optional")
        .min(2, "Address must be greater than 2")
        .max(100, "Address must be less than 100"),
    city: Yup.string()
        .required("Address is required")
        .min(2, "City must be greater than 2")
        .max(100, "City must be less than 100"),
    zipcode: Yup.string()
        .required("Address is required")
        .min(5, "Zip-Code must be at least 5")
        .max(9, "Zip-Code must be at less than 9"),
});


const accSchema = Yup.object({
    user: Yup.string()
        .required("User is required")
        .min(5, "User must be greater than 5 characters")
        .max(25, "User must be less than 25 characters"),
    pass: Yup.string()
        .required("Password is required")
        .min(7, "Password must be greater than 7 characters")
        .max(100, "Password must be less than 100 characters"),
});

app.post('/api/validatecreateAcc', (req, res) => {
    const data = req.body;
    accSchema.validate({ user: data.username, pass: data.password }).catch(err => {
        res.status(400).json({ errors: [err.errors]});
    }).then(valid => {
        if (valid) {
            console.log("Validated")
            res.json({ message: 'Account Creation successful' });
        }
    })});



// Get for login.js, Gets data from server(Can be changed to DB)
app.get("/api/login", (req, res) => {
    res.json({
        user: "bobby123",
        password: "hibobby"
    });
});

const loginSchema = Yup.object({
    user: Yup.string()
        .required("Username is required"),
    pass: Yup.string()
        .required("Password is required")
});

app.post('/api/validateLogin', (req, res) => {
    const data = req.body;
    loginSchema.validate({ user: data.username, pass: data.password }).catch(err => {
        res.status(400).json({ errors: [err.errors]});
    }).then(valid => {
        if (valid) {
            fetch("http://localhost:5000/api/login")
            .then((response) => response.json())
            .then((loginData) => {
                if ( data.username === loginData.user && data.password === loginData.password)
                {
                    res.json({ message: 'Login successful' });
                } else {
                    res.json({ message: 'Account Login Failed' });
                }
        })}})});




app.get("/api/modifyAccount", (req, res) => {
    res.json(userData);
});
app.post('/api/modifyAccount', (req, res) => {
    const formData = req.body;

  accountSchema.validate(formData)
    .then((valid) => {
      if (valid) {
        userData = { ...userData, ...valid };
        res.json({ message: 'User account updated successfully', formData: valid });
      } else {
        res.status(400).json({ errors: ["Invalid Input"] });
      }
    })
    .catch((err) => {
      res.status(400).json({ errors: err.errors });
    });

    /*userData.fullName = req.body.fullName;
    userData.firstAddress = req.body.firstAddress;
    userData.secondAddress = req.body.secondAddress;
    userData.city = req.body.city;
    userData.state = req.body.state;
    userData.zipcode = req.body.zipcode;

    res.json({ message: 'User account updated successfully' });*/
});


// Port in-use msg
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`)
});
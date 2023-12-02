const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors'); //Cors middleware
const Yup = require('yup'); //Yup validation middleware
let getClientInfo, createClient, getFuelQuoteHistory, getQuote, saveQuote, updateClient;
try {
    const databaseFunction = require('./database.js');
    getClientInfo = databaseFunction.getClientInfo;
    createClient = databaseFunction.createClient;
    getFuelQuoteHistory = databaseFunction.getFuelQuoteHistory;
    getQuote = databaseFunction.getQuote;
    saveQuote = databaseFunction.saveQuote;
    updateClient = databaseFunction.updateClient;
}
catch {
    console.error("Error importing functions from database.js");
}


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

app.get("/clientinformation", async (req, res) => {
    try {
        const client = await getClientInfo();
        res.send(client);
    }
    catch (error) {
        console.error("error fetching client information", error);
        res.status(500).send("Internal Server Error");
    }

    //res.send("testing for database")
    //res.send(getClientInfo());

})

// GET Directories
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Get for Quote.js, Gets data from server(Can be changed to DB)
app.get("/api/Quote", async (req, res) => {
    try{
        const id = 1;
        const data = await getQuote(id);
        res.json({
            gallons: 0, //default value
            address: data[0].address1 + " " + data[0].address2, //client's address
            date: "",
            price: 0, //this needs to change to price from the pricing module
            total: 0   //default value
        });

    } catch(error) {
        res.status(500).json({ error: "An error occurred while fetching data" });
    }

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
app.post('/api/validateQuote', async (req, res) => {
    const id = 1;
    const formData = req.body;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const history = await getFuelQuoteHistory(id);
    quoteSchema.validate(formData).catch(err => {
        res.status(400).json({ errors: [err.errors] });
    }).then(valid => {
        if (valid) {
            
            let location_val = 0.04; // Out of State Value
            let history_val = 0.01; // No History Value
            let gal_factor = 0.02;  // Gallons Requested Factor less than 1000
            
            if (formData.inTexas === true) {
                location_val = 0.02;
            }
            if (history.length > 0){
                history_val = 0;
            }
            if (formData.gallons > 1000) {
                gal_factor = 0.03;
            }
            let margin = (location_val - history_val + gal_factor + .1) * 1.5;
            formData.price = 1.5 + margin;
            formData.total = formData.gallons * formData.price;
            res.json({ formData })

            // Saves data to database
            if (formData.flag === true) {
                saveQuote(id, formData.gallons, formData.date, formattedDate, formData.price, formData.total)
            }
        }
    })
});


// Get for QuoteHistory.js, Gets data from database
app.get("/api/QuoteHistory", async (req, res) => {
    try{
        const id = 1;
        const data = await getFuelQuoteHistory(id);
        const data2 = await getQuote(id);
        const address = data2[0].address1 + " " + data2[0].address2;

        for (let i = 0; i < data.length; i++) {
            data[i].date_created = data[i].date_created.toString().slice(4, 15);
            data[i].delivery_date = data[i].delivery_date.toString().slice(4, 15);
        }

        res.json({data, address})
        
    } catch(error) {
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
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

app.post('/api/validatecreateAcc', async (req, res) => {
    const data = req.body;
    try {
        const valid = await accSchema.validate({ user: data.username, pass: data.password });
        if (valid) {
            const result = await createClient(data.username, data.password);
            console.log("Validated");
            res.json({ message: 'Account Creation successful', result });
        } else {
            res.status(400).json({ errors: ['Validation failed'] });
        }
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).json({ message: 'Account Creation failed', error: error.message });
    }
});




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
        res.status(400).json({ errors: [err.errors] });
    }).then(valid => {
        if (valid) {
            fetch("http://localhost:5000/api/login")
                .then((response) => response.json())
                .then((loginData) => {
                    if (data.username === loginData.user && data.password === loginData.password) {
                        res.json({ message: 'Login successful' });
                    } else {
                        res.json({ message: 'Account Login Failed' });
                    }
                })
        }
    })
});




app.get("/api/modifyAccount", (req, res) => {
    res.json(userData);
});
app.post('/api/modifyAccount', async (req, res) => {
    const formData = req.body;
    try {
        // Validate the formData
        const validationResult = await accountSchema.validate(formData);

        if (validationResult) {
            // Assuming client ID is in the request body as 'clientId'
            //const clientId = req.body.clientId;
            const clientId = 1;

            if (clientId) {
                const result = await updateClient(clientId, formData.fullName, formData.address1, formData.address2, formData.city, formData.state, formData.zipcode);
                res.json({ message: 'User account updated successfully', formData: validationResult });
            } else {
                res.status(400).json({ errors: ["Invalid Input: Missing clientId"] });
            }
        } else {
            res.status(400).json({ errors: ["Invalid Input"] });
        }
    } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({ message: 'Update failed', error: error.message });
    }
});


// Port in-use msg
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`)
});
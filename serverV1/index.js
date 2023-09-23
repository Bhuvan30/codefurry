const express = require("express");
const bodyParser = require("body-parser");
const { router: routesHandler, User } = require("./routes/handler.js");
const cors = require("cors"); // Import the cors middleware

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.use("/", routesHandler);

let dataString = null; // Initialize an empty string to store the data

app.post("/signin", async (req, res) => {
  try {
    const { name, phoneNo, email, password } = req.body;
    // console.log(name);
    // console.log(phoneNo);
    // console.log(email);
    // console.log(password);

    const newUserData = new User({
      name: name,
      phoneNo: phoneNo,
      email: email,
      password: password,
    });

    User.find({})
      .then((users) => {
        // Convert the array of documents to a JSON string
        dataString = users;
        console.log(dataString);
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    newUserData.save();

    if (!name || !password || !email || !phoneNo) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

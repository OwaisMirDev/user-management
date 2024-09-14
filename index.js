// index.js

const express = require("express");
const bodyParser = require("body-parser");
const users = [
    {
        userName: "Owais Mir",
        userEmail: "owais@gmail.com",
        userAge: "22",
        userUniqueId: "1",
    },
    {
        userName: "Hamzah",
        userEmail: "hamzah@gmail.com",
        userAge: "21",
        userUniqueId: "2",
    },
    {
        userName: "osman",
        userEmail: "osman@gmail.com",
        userAge: "22",
        userUniqueId: "3",
    },
];

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.get("/", function (req, res) {
    res.render("home", {
        data: users,
    });
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.get("/update", (req, res) => {
    res.render("update");
});

app.post("/", (req, res) => {
    const inputUserName = req.body.userName;
    const inputUserEmail = req.body.userEmail;
    const inputUserAge = req.body.userAge;
    const inputUserUniqueId = req.body.userUniqueId;

    users.push({
        userName: inputUserName,
        userEmail: inputUserEmail,
        userAge: inputUserAge,
        userUniqueId: inputUserUniqueId,
    });

    res.render("home", {
        data: users,
    });
});

app.post("/delete", (req, res) => {
    var requestedUserUniqueId = req.body.userUniqueId;
    var j = 0;
    users.forEach((user) => {
        j = j + 1;
        if (user.userUniqueId === requestedUserUniqueId) {
            users.splice(j - 1, 1);
        }
    });
    res.render("home", {
        data: users,
    });
});

app.post("/update", (req, res) => {
    const inputUserName = req.body.userName;
    const inputUserEmail = req.body.userEmail;
    const inputUserAge = req.body.userAge;
    const inputUserUniqueId = req.body.userUniqueId;

    var j = 0;
    users.forEach((user) => {
        j = j + 1;
        if (user.userUniqueId === inputUserUniqueId) {
            user.userName = inputUserName;
            user.userEmail = inputUserEmail;
            user.userAge = inputUserAge;
        }
    });
    res.render("home", {
        data: users,
    });
});

app.listen(3000, (req, res) => {
    console.log("App is running on port 3000");
});

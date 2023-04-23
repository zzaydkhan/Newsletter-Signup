const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { dirname } = require("path");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
});
app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName, lastName, email)

var data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
};
const jsonData = JSON.stringify(data);


const url = "https://us8.api.mailchimp.com/3.0/lists/359a2d1c28";
const options = {
    method: "POST",
    auth: "Zaid:8da8352245d7286419342d91ebf3b333-us8"
}
const request = https.request(url, options,function(response) {
    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    }
    else {
        res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
})
request.write(jsonData);
request.end();
})
app.post("/failure", function(req, res) {
    res.redirect("/")
})
app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on port 3000");
}); 

// API Key
// 8a775fcdfe274dd9a140fc516f0129f3-us8
// app js
// 359a2d1c28
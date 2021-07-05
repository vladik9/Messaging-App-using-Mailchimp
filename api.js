const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { constants } = require("buffer");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/singUp.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(firstName + " " + lastName + " " + email);

  const utilData = {
    //make a JS object with an arr of object
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName },
      },
    ],
  };
  const url = "https://us6.api.mailchimp.com/3.0/lists/afab3d11ee"; // create a varibale called
  //url that have the endpoint of api an us6 for the server we operatede on
  // at the end we have added the list audience code

  const options = {
    // make a options object for autentication method and post request option
    method: "POST",
    auth: "vladik:c7b88f3dfe9c947593429ff27ecf0e58-us6", // the authentification login can be random until the api key is unchanged
  };
  const JsonUtilaData = JSON.stringify(utilData); // transform data in JSON flat pack
  const sendingData = https.request(url, options, function (response) {
    //store https request in a variable and make a request to the server
    response.on("data", function (data) {
      // manage the response from the server and print data in normal JSON format
      console.log(JSON.parse(data));

      if (response.statusCode === 200)
        res.sendFile(__dirname + "/succses.html");
      else res.sendFile(__dirname + "/fail.html");
    });
  });
  // write the data into a buferr and send to the server
  sendingData.write(JsonUtilaData);
  sendingData.end();
});
//################################
//util Data for Application
//################################
// APIkey for current list
// f6978fc4100cc4d81e53db73e899b844-us6
// idList for audience list
// afab3d11ee
//################################
app.listen(process.env.PORT, () => {
  // hiroku default port
  console.log("server is running at localhost: 3000");
});
app.listen(3000, () => {
  console.log("server is running at localhost: 3000");
});

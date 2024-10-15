// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
// ways to declare
//const invalidDate = (date) => date.toUTCString() === "Invalid Date";
//const invalidDate = (date) => isNaN(date.getTime());
// your first API endpoint... 
// basically, when date is given in parameter(so its provided), we input in the format given

// why it gives error, well u only need one endpoint?? because u set req.params to read the data.
//   // let date = new Date(); udah dicoba tapi sepertinya gak bisa

    //mungkin params ini assosiated dengan endpoint awal
const InvalidDate = (date) => date.toUTCString() === "Invalid Date"; //harus pakai fungsi ini agar bisa konversi ke date
app.get("/api/:date?", function (req, res) {
  let date = new Date(req.params.date)

  if(InvalidDate(date)){
    date = new Date(+req.params.date) 
  }

  if(InvalidDate(date)){
    return res.json({error : "Invalid Date"}); 
  }

  res.json({
    unix : date.getTime(),
    utc : date.toUTCString()
  });
});

app.get("/api", function (req, res) {
    res.json({
        unix : new Date().getTime(),
        utc : new Date().toUTCString()
      });
    });
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

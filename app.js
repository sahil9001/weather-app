var express = require('express');
var app = express();
var request = require('request');
var dotenv = require('dotenv');
dotenv.config();
const api_key = process.env.API_KEY;
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index");
   // console.log(process.env.API_KEY);
});

app.get('/results', (req, res) => {
    var query = req.query.city;
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + api_key;
    console.log(url);
    request(url, (err, res1, body) => {
        if(err){
            console.log(err);
            return ;
        }
        else{
            var obj = JSON.parse(body);
            var weather = JSON.stringify(obj);
            res.render("nr", {data: obj});
            console.log(weather);
        }
    });
});
var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server is listening.")
})

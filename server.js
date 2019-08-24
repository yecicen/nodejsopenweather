const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = 3000;
const apiKey = '9418823dd76d6827e52817a532547fec';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res,next){
    //res.send('Welcome to Weather App!');
    res.render('index');
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })

app.listen(port,function(){
    console.log(`Server is listening ${port}!`);
});

var express = require('express');
var stormpath = require('express-stormpath');
var requestIp = require('request-ip'); 
var path = require('path');
var app = express();
require('dotenv').config();


app.set('views', './views');
app.set('view engine', 'jade');
 
app.use(stormpath.init(app, {
  


  expand: {
    customData: true
  }
}));

app.get('/', stormpath.getUser, function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
  
  const ipify = require('ipify');
  ipify((err, ip) => {
    console.log(ip);
    //=> '82.142.31.236'
}); 
});

//app.use('/battle',stormpath.loginRequired); 
app.get('/all', stormpath.getUser, function(req, res) {
  res.render('battlehome',{

    title: 'Duel'
  });
 //res.sendFile(path.join(__dirname + '/views/battlehome.html'));

})


app.use('/profile',stormpath.loginRequired,require('./profile')()); 
app.on('stormpath.ready',function(){

  console.log('Stormpath Ready');
});
 
app.listen(80);



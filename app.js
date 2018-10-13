var express = require('express');
var app = express();
var ipa = require('ip');
var os = require('os');
var winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

function log(type,label,){
  
  // logger.log(type);
}

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'blue',
    debug: 'cyan',
    silly: 'white'
  }
};
winston.addColors(myCustomLevels.colors);
// const myMsg = printf(info => {
//   return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
// });
const logger = createLogger({
  levels: myCustomLevels.levels,
  format: format.combine(
    // winston.format.colorize(),
    timestamp(),
    // myMsg
    format.splat(),
    format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' })
  ]
});

const { promisify } = require('util');

const dns = require('dns');
const lookup = promisify(dns.lookup);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


function getIp(req) {
  var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7)
  }
  return ip;
}

app.get('/', function (request, response) {
  response.render("pages/index.ejs");

  console.log(getIp(request));
});

app.get('/about', function (request, response) {
  response.render("pages/about.ejs");
});
app.get('/blog', function (request, response) {
  response.render("pages/blog.ejs");
});
app.get('/blogp', function (request, response) {
  response.render("pages/blog-post.ejs");
});
app.get('/contact', function (request, response) {
  response.render("pages/contact.ejs");
});

// app.get('/administration', function (request, response) {
//   response.render("pages/administration.ejs");
// });

// app.get('/faculty', function (request, response) {
//   response.render("pages/faculty.ejs");
// });

// app.get('/awards', function (request, response) {
//   response.render("pages/awards&honors.ejs");
// });

// app.get('/commities', function (request, response) {
//   response.render("pages/commities.ejs");
// });

// app.get('/media', function (request, response) {
//   response.render("pages/media.ejs");
// });

// app.get('/approval', function (request, response) {
//   response.render("pages/approval.ejs");
// });

// app.get('/infrastructure', function (request, response) {
//   response.render("pages/infrastructure.ejs");
// });


app.get('/hospital', function (request, response) {
  response.render('pages/hospital.ejs');

});

//hospital services
app.get('/gs',function(request,response){
  response.render('pages/gs.ejs');
});
app.get('/gm',function(request,response){
  response.render('pages/gm.ejs');
});
app.get('/og',function(request,response){
  response.render('pages/og.ejs');
});
app.get('/pml',function(request,response){
  response.render('pages/pml.ejs');
});
app.get('/dmt',function(request,response){
  response.render('pages/dmt.ejs');
});
app.get('/pdt',function(request,response){
  response.render('pages/pdt.ejs');
});
app.get('/pct',function(request,response){
  response.render('pages/pct.ejs');
});
app.get('/otp',function(request,response){
  response.render('pages/otp.ejs');
});
app.get('/opl',function(request,response){
  response.render('pages/opl.ejs');
});
app.get('/ent',function(request,response){
  response.render('pages/ent.ejs');
});
app.get('/ats',function(request,response){
  response.render('pages/ats.ejs');
});
app.get('/rdd',function(request,response){
  response.render('pages/rdd.ejs');
});
app.get('/hmt',function(request,response){
  response.render('pages/hmt.ejs');
});
app.get('/dtt',function(request,response){
  response.render('pages/dtt.ejs');
});
app.get('/pst',function(request,response){
  response.render('pages/pst.ejs');
});
app.get('/cbc',function(request,response){
  response.render('pages/cbc.ejs');
});
app.get('/cpt',function(request,response){
  response.render('pages/cpt.ejs');
});
app.get('/cmb',function(request,response){
  response.render('pages/cmb.ejs');
});
app.get('/nulhs',function(request,response){
  response.render('pages/nulhs.ejs');
});
app.get('/nus',function(request,response){
  response.render('pages/nus.ejs');
});
app.get('/pds',function(request,response){
  response.render('pages/pds.ejs');
});
app.get('/url',function(request,response){
  response.render('pages/url.ejs');
});
app.get('/npl',function(request,response){
  response.render('pages/npl.ejs');
});
app.get('/cdl',function(request,response){
  response.render('pages/cdl.ejs');
});

// app.get('/gjier/:id', function (request, response) {
//   var id = request.params.id;

//   if (id == "gs") {
//     response.render('pages/gs.ejs');
//   } else if (id == "gm") {
//     response.render('pages/gm.ejs');
//   } else if (id == "og") {
//     response.render('pages/og.ejs');
//   } else if (id == "pml") {
//     response.render('pages/pml.ejs');
//   } else if (id == "dmt") {
//     response.render('pages/dmt.ejs');
//   } else if (id == "pdt") {
//     response.render('pages/pdt.ejs');
//   } else if (id == "pct") {
//     response.render('pages/pct.ejs');
//   } else if (id == "otp") {
//     response.render('pages/otp.ejs');
//   } else if (id == "opl") {
//     response.render('pages/opl.ejs');
//   } else if (id == "ent") {
//     response.render('pages/ent.ejs');
//   } else if (id == "ats") {
//     response.render('pages/ats.ejs');
//   } else if (id == "rdd") {
//     response.render('pages/rdd.ejs');
//   } else if (id == "hmt") {
//     response.render('pages/hmt.ejs');
//   } else if (id == "dtt") {
//     response.render('pages/dtt.ejs');
//   } else if (id == "pst") {
//     response.render('pages/pst.ejs');
//   } else if (id == "cbc") {
//     response.render('pages/cbc.ejs');
//   } else if (id == "cpt") {
//     response.render('pages/cpt.ejs');
//   } else if (id == "cmb") {
//     response.render('pages/cmb.ejs');
//   } else if (id == "nul") {
//     response.render('pages/nul.ejs');
//   } else if (id == "nus") {
//     response.render('pages/nus.ejs');
//   } else if (id == "pds") {
//     response.render('pages/pds.ejs');
//   } else if (id == "url") {
//     response.render('pages/url.ejs');
//   } else if (id == "npl") {
//     response.render('pages/npl.ejs');
//   } else if (id == "cdl") {
//     response.render('pages/cdl.ejs');
//   }
//   else {
//     // console.log("Request:105 /hospital/:id");
//   }
//   // console.log(Date.now()+" "+id);
//   // response.send("ID: " +id);
// });

app.get('*', function (request, response) {
  response.render("pages/404.ejs");
});

// async function k() {
//   const { address: ip } = await lookup(os.hostname());
//   var networkAddress = `http://${ip}:${port}`;
//   return networkAddress;
// }
app.listen(app.get('port'), process.env.IP, function () {
  const { address: ip } = lookup(os.hostname());
  var networkAddress = `http://${os.networkInterfaces()}:${app.get('port')}`;
  // var networkAddress = `http://${os.hostname()}:${app.get('port')}`;

  logger.info("Node server is running at localhost:" + app.get('port'));
  logger.info(networkAddress);
  // console.log();
});

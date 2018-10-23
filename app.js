var express = require('express');
var app = express();
// var ipa = require('ip');
// var os = require('os');
var winston = require('winston');

const sgMail = require('@sendgrid/mail');
const cors = require('cors');



const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myMsg = printf(info => {
  return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

function log(msg, ip, method, route, level) {
  if (level == null) {
    level = "info";
  }
  var message = "";
  if (ip != null && ip != "") {
    message = ` ip= ${ip} `;
  }
  if (method != null && method != "") {
    message += ` method= ${method} `;
  }
  if (route != null && route != "") {
    message += ` route= ${route} `;
  }
  message += msg;
  logger.log(level, message);
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

const logger = createLogger({
  levels: myCustomLevels.levels,
  format: format.combine(
    timestamp(),
    myMsg
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

const { promisify } = require('util');

const dns = require('dns');
const lookup = promisify(dns.lookup);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());



app.use(cors({ origin: true }));


function getIp(req) {
  var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7);
  }
  return ip;
}

function rotcc13(str) {
  var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm0987654321';
  var index = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  return str.split('').map(translate).join('');
}


function errLog(err, req, res, next) {
  log(err.stack, getIp(req), req.method, req.route.path, 'error');
  res.status(500).send('Oops Something broke..!');
}



app.get('/', function (request, response) {
  response.render("pages/index.ejs");
  log("", getIp(request), request.method, request.route.path);
});

app.get('/about', function (request, response) {

  response.render("pages/about.ejs");
  log("", getIp(request), request.method, request.route.path);

});

app.get('/blog', function (request, response) {

  response.render("pages/blog.ejs");
  log("", getIp(request), request.method, request.route.path);


});

app.get('/blogp', function (request, response) {

  response.render("pages/blog-post.ejs");
  log("", getIp(request), request.method, request.route.path);

});

app.get('/contact', function (request, response) {

  response.render("pages/contact.ejs");
  log("", getIp(request), request.method, request.route.path);

});

app.get('/hospital', function (request, response) {

  response.render('pages/hospital.ejs');
  log("", getIp(request), request.method, request.route.path);


});

app.get('/hospital1', function (request, response) {

  response.render('pages/hospital.1.ejs');
  log("", getIp(request), request.method, request.route.path);


});

app.get('/education', function (request, response) {
  response.render('pages/education.ejs');
  log("", getIp(request), request.method, request.route.path);
});
app.get('/course', function (request, response) {
  response.render('pages/course.ejs');
  log("", getIp(request), request.method, request.route.path);
})
//hospital services
app.get('/gs', function (request, response) {

  response.render('pages/gs.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/gm', function (request, response) {

  response.render('pages/gm.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/og', function (request, response) {

  response.render('pages/og.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/pml', function (request, response) {

  response.render('pages/pml.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/dmt', function (request, response) {

  response.render('pages/dmt.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/pdt', function (request, response) {

  response.render('pages/pdt.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/pct', function (request, response) {

  response.render('pages/pct.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/otp', function (request, response) {

  response.render('pages/otp.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/opl', function (request, response) {

  response.render('pages/opl.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/ent', function (request, response) {

  response.render('pages/ent.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/ats', function (request, response) {

  response.render('pages/ats.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/rdd', function (request, response) {

  response.render('pages/rdd.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/hmt', function (request, response) {

  response.render('pages/hmt.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/dtt', function (request, response) {

  response.render('pages/dtt.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/pst', function (request, response) {

  response.render('pages/pst.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/cbc', function (request, response) {

  response.render('pages/cbc.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/cpt', function (request, response) {

  response.render('pages/cpt.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/cmb', function (request, response) {

  response.render('pages/cmb.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/nulhs', function (request, response) {

  response.render('pages/nulhs.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/nus', function (request, response) {

  response.render('pages/nus.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/pds', function (request, response) {

  response.render('pages/pds.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/url', function (request, response) {

  response.render('pages/url.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/npl', function (request, response) {

  response.render('pages/npl.ejs');
  log("", getIp(request), request.method, request.route.path);

});
app.get('/cdl', function (request, response) {

  response.render('pages/cdl.ejs');
  log("", getIp(request), request.method, request.route.path);

});


//mailer service
app.post("/send", function (request, response) {
  var ap1 = "FT";
  var ap2 = "OBEsnUdNExXryjJybYuq4t";
  var ap3 = "r8SJp0fiib41Su5YeYdzSTc76pH0cqWoBPOStbVuM5N";
  var api = ap1 + "." + ap2 + "." + ap3;
  sgMail.setApiKey(rotcc13(api));

  if (request.method !== "POST") {
    response.send(405, "Invalid Request")
  } else {
    const msg = {
      to: 'paritoshsrivastava9199@gmail.com',
      // cc: rotcc13(request.query.e),
      from: 'noreply@esichyd.org',
      subject: 'Message from ' + rotcc13(request.query.n) + ' regarding ' + rotcc13(request.query.s),
      html: `<html>
      <head>
      </head>
      <body>
          <p>Hello Admin</p>
          <p>You have a new message from a ${rotcc13(request.query.n)} regarding ${rotcc13(request.query.s)}.</p>
          <p>
              <em><strong>Name:</strong></em> ${rotcc13(request.query.n)}<br>
              <em><strong>Subject:</strong></em> ${rotcc13(request.query.s)}<br>
              <em><strong>Email:</strong></em> ${rotcc13(request.query.e)}<br>
              <strong><em>Message:</em></strong><br>
              ${request.query.m}
              <br>
              <p>To reply back to ${rotcc13(request.query.n)} please reply back to this email <a href="mailto:${rotcc13(request.query.e)}">${rotcc13(request.query.e)}</a></p>
              <p><em>This is an auto generated email.Please do not reply back to this email.</em></p>
      
          </p>
          <p>Thanks and Regards,<br>
              Your ESIC Team.</p>
      </body>
      </html>`
      // texdt: rotcc13(request.query.n) + " Email: " + rotcc13(request.query.e) + " Phone: " + rotcc13(request.query.p) + " Message: " + rotcc13(request.query.m),
      // html: "<strong>" + rotcc13(request.query.n) + "</strong><br>Email: " + rotcc13(request.query.e) + " <br>Phone: " + rotcc13(request.query.p) + " <br><h5>Message: </h5>" + rotcc13(request.query.m),
    };

    const msg_ack = {
      to: 'paritoshsrivastava9199@gmail.com',
      // cc: rotcc13(request.query.e),
      from: 'noreply@esichyd.org',
      subject: 'Message from ' + rotcc13(request.query.n) + ' regarding ' + rotcc13(request.query.s),
      html: `<html>
      <head>
      </head>
      <body>
          <p>Dear ${rotcc13(request.query.n)}</p>
          <p>Thank you for your message regarding ${rotcc13(request.query.s)}. Resolving your issues and answering questions are a top priority for us. A member of our support team will follow up with you today to resolve your inquiry.</p>
          <p><em>The entire ESIC team looks forward to a very professional working relationship with you, and we ready to
              support you in any way possible to serve you better.</em></p>
          <p>Thank you for contacting us! We value your feedback/suggestions/complaint. To give your valued opinion please use this <a href="#">link</a>.<br><em>This is an auto generated email.Please do not reply back to this email.</em></p>
          
          Thanks and Regards,<br>
          Your ESIC Team.
      </body>
      </html>`
    };
    try {
      var b = 0;
      sgMail.send(msg).then(function () {

        sgMail.send(msg_ack).then(function () {
          b = 1;
          response.send({ success: true });
          response.end();
          return { success: true };
          // response.send(rotcc13(request.query.n)+" Email: "+rotcc13(request.query.e)+" Phone: "+rotcc13(request.query.p)+" Message: "+rotcc13(request.query.m));
        }).catch(function (err) {
          b = 0;
          console.log(err);
          response.send({ success: false });
          response.end();
        });


        // b = 1;
        // response.send({ success: true });
        // response.end();
        // return { success: true };
        // response.send(rotcc13(request.query.n)+" Email: "+rotcc13(request.query.e)+" Phone: "+rotcc13(request.query.p)+" Message: "+rotcc13(request.query.m));
      }).catch(function (err) {
        b = 0;
        console.log(err);
        response.send({ success: false });
        response.end();
      });

    } catch (err) {
      // console.log(err);
      // response.send("mail not sent! Server err: "+err);
    }
    // response.send("yo!");
  }
});


app.get('*', function (request, response) {

  response.render("pages/404.ejs");
  log("", getIp(request), request.method, request.route.path);

});


app.use(errLog);
app.listen(app.get('port'), process.env.IP, function () {

  // const { address: ip } = lookup(os.hostname());
  // var networkAddress = `http://${os.networkInterfaces()}:${app.get('port')}`;
  // var networkAddress = `http://${os.hostname()}:${app.get('port')}`;
  log("Node Server running at port:" + app.get('port'));
  // log("hello error", "", "", "", 'error');

});



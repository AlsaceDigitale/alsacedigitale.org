
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var message = require( './routes/message');
var http = require('http');
var path = require('path');
var pug = require('pug');
var redirect = require("./routes/redirect");
var fresh = require('fresh');


var app = express();

// Express 3 expects res._headers, which does not exist on modern Node.
Object.defineProperty(express.request, 'fresh', {
  configurable: true,
  enumerable: true,
  get: function() {
    var method = this.method;
    var status = this.res.statusCode;

    if ('GET' !== method && 'HEAD' !== method) return false;
    if ((status >= 200 && status < 300) || 304 === status) {
      var responseHeaders = this.res._headers;
      if (!responseHeaders && typeof this.res.getHeaders === 'function') {
        responseHeaders = this.res.getHeaders();
      }
      return fresh(this.headers, responseHeaders || {});
    }
    return false;
  }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// redirector for Cassini
app.get('/cassini', redirect.redirect );
app.get('/adhesion', redirect.redirect );
app.get('/robotechgirls', redirect.redirect );
app.get('/robotkraft', redirect.redirect );
app.get('/semaineia', redirect.redirect );
app.get('/mixitedanslatech', redirect.redirect);
app.get('/work/:id', routes.showWork );
app.get('/users', user.list);
app.post('/send/msg', message.send )

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

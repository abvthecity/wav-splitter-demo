var path = require('path');
var express = require('express');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');

var serveStatic = require('serve-static');
var exphbs = require('express-handlebars');

var api = require('./routes/api');
var render = require('./render');

var hbs = exphbs.create({ extname: '.html' })

function routeManager(app, data) {

  // handlebars (for server-side rendering).
  app.set('views', path.join(__dirname, 'views'));
  app.engine('.html', hbs.engine);
  app.set('view engine', '.html');

  // serve static files
  app.use('/', serveStatic(path.join(__dirname, '..', 'public')));
  app.use('/dist', serveStatic(path.join(__dirname, '..', 'dist')));

  // route api
  app.use('/api', api(data));

  // route all other pages
  app.get('*', function (req, res) {
    // render(req.url, res);
    res.render('index', {
      content: '',
      title: 'Deep Emotion Demo — BCG Digital Ventures',
    });
  });

};

module.exports = routeManager;

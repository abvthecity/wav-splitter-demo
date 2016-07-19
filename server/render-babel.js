import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';

// import routes from './../src/react/routeConfig';

var render = function (location, res) {

  // match({ routes, location }, (err, redirectLocation, renderProps) => {
  //   if (err) res.sendStatus(500);
  //   else if (redirectLocation) {
  //     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
  //   } else if (renderProps) {
  //     var html = renderToString(<RouterContext {...renderProps} />);
  //     res.render('index', {
  //         content: html,
  //         title: 'Deep Emotion Demo — BCG Digital Ventures',
  //       });
  //   } else {
  //     res.status(404);
  //   }
  // });

  res.render('index', {
    content: '',
    title: 'Deep Emotion Demo — BCG Digital Ventures',
  });
}

export default render;

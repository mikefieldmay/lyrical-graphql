import './style/style.css'; 
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'; // Apollo client is agnostic to what frontend uses it
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ApolloProvider } from 'react-apollo'; // apollo provider creas a bridge to react from React to Apollo Client

import { App } from './components/App'
import { SongsList } from './components/SongsList';
import { SongCreate } from './components/SongCreate';
import { SongDetail } from './components/SongDetail';

const client = new ApolloClient({
  dataIdFromObject: o => o.id 
}); // this takes every piece of data retrieved from the server and attaches it's own identifier to it. This way, when a record updates, it will re-render the component
//  a caveat is that now whenever we make a query we need to get back the id every time

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongsList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import TripContainer from './containers/TripContainer';
import './stylesheets/index.scss';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <TripContainer /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  </ApolloProvider>,
);

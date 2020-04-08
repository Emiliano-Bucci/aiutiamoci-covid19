import React from 'react'
import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloLink } from 'apollo-link'
import apolloLogger from 'apollo-link-logger'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const WithApollo = withApollo(
  ({ initialState }) => {
    const link = new HttpLink({
      uri: process.env.graphqlEndpoint,
    })

    const cache = new InMemoryCache({
      freezeResults: true,
      addTypename: true,
    }).restore(initialState || {})

    return new ApolloClient({
      link: ApolloLink.from([apolloLogger, link]),
      cache,
    })
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page />
        </ApolloProvider>
      )
    },
  },
)

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { API_ENDPOINT, BUILD_ENDPOINT } from '@/constants'

const cache = new InMemoryCache()

const link = new HttpLink({
  uri: API_ENDPOINT,
})

const linkBuild = new HttpLink({
  uri: BUILD_ENDPOINT,
})

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().endpointIntent === 'build',
    linkBuild, //if above
    link,
  ),
  cache,
})

export default client

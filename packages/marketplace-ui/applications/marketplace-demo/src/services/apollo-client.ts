import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { API_ENDPOINT, FALLBACK_ENDPOINT } from '@/constants'
import { onError } from '@apollo/client/link/error'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: API_ENDPOINT,
})

const errorLink = onError(({ networkError, operation, forward }) => {
  if (networkError) {
    // Log the error or perform any action needed
    console.error('Network error:', networkError)

    // Modify the operation to use the fallback endpoint
    console.log('Changing Endpoint with fallback')
    operation.setContext({
      uri: FALLBACK_ENDPOINT || API_ENDPOINT,
    })

    // Retry the request with the modified operation
    return forward(operation)
  }
})

const client = new ApolloClient({
  link: errorLink.concat(link),
  cache,
})

export default client

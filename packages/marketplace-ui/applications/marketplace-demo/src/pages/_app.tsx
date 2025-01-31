import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/services'
import { MeshProvider } from '@meshsdk/react'
import theme from '../theme'
import '@meshsdk/react/styles.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <MeshProvider>
            <Component {...pageProps} />
          </MeshProvider>
        </ApolloProvider>
      </ThemeProvider>
    </AppCacheProvider>
  )
}

export default App

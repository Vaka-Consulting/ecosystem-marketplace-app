import React from 'react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Collections, Layout } from '@/components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Marketplace Demo on Cardano</title>
      </Head>
      <Layout>
        <Box component="section" mb={2} py={4}>
          <Container>
            <Typography component="h1" variant="h3">
              Hello 👋
            </Typography>
            <Typography>This is the Marketplace demo</Typography>
          </Container>
        </Box>
        <Box component={'section'} bgcolor={'grey.50'} py={4}>
          <Container>
            <Box component="header" mb={2}>
              <Typography component="h2" variant="h4">
                Peep the Collections
              </Typography>
            </Box>
            <Box>
              <Collections />
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  )
}

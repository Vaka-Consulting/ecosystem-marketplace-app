import type {
  // GetStaticProps,
  // GetStaticPaths,
  GetServerSideProps,
} from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { replaceIpfsWithGatewayUrl } from '@vakaconsulting/common-ui'
import { Layout, NextLinkComposed } from '@/components'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { ErrorBoundary } from 'react-error-boundary'
import AuthWall from '@/components/AuthWall'
import { IPFS_GATEWAY_URL } from '@/constants'
// import collectionsData from '@/data/collections.json'
import { PolicyAsset } from '@/gql/graphql'
import {
  // POLICY_ASSETS_IDS_QUERY,
  SINGLE_POLICY_ASSET_QUERY,
} from '@/queries/policyAssets'
import client from '@/services/apollo-client'

const Marketplace = dynamic(() => import('@/components/Marketplace'), {
  loading: () => <Typography>Loading Marketplace Content...</Typography>,
  ssr: false, // Disable SSR for this component if it relies on browser APIs
})

function AssetPage({ asset, policy_id, onchain_metadata }: PolicyAsset) {
  return (
    <>
      <Head>
        <title>{`${onchain_metadata?.name} | Marketplace Demo`}</title>
      </Head>
      <Layout>
        <Container sx={{ py: 5 }}>
          <Box sx={{ mb: 2 }}>
            <NextLinkComposed to={`/collection/${policy_id}`}>⬅ Go back to Collection</NextLinkComposed>
          </Box>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              {onchain_metadata?.image && (
                <Box sx={{ position: 'relative', height: '100%', pb: '100%' }}>
                  <Image
                    src={replaceIpfsWithGatewayUrl(onchain_metadata?.image, IPFS_GATEWAY_URL)}
                    alt="Policy Asset thumbnail image"
                    fill={true}
                  />
                </Box>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} py={1}>
              <Box mb={5}>
                <Typography variant="h4" component="h1" lineHeight={1.2} mb={1}>
                  {onchain_metadata?.name}
                </Typography>
                <Typography>{onchain_metadata?.description}</Typography>
              </Box>

              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" lineHeight={1.2} mb={2}>
                    Sale Information
                  </Typography>
                  <AuthWall>
                    <ErrorBoundary fallback={<Typography>Failed to load content</Typography>}>
                      <Marketplace asset={asset!} />
                    </ErrorBoundary>
                  </AuthWall>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  )
}

export default AssetPage

/** ************************************************************* */

/**
 * Static Site Generation
 */
// export const getStaticPaths = (async () => {
//   const policyIds = collectionsData.collections.map((collection) => collection.policyId)
//
//   const { data } = await client.query({
//     context: { endpointIntent: 'build' },
//     query: POLICY_ASSETS_IDS_QUERY,
//     variables: {
//       policyIds,
//     },
//   })
//
//   const ids = data?.policy_assets?.results
//     .map((policyAsset) => policyAsset?.asset?.toString())
//     .filter(Boolean) as string[]
//
//   const paths = ids.map((id) => ({ params: { id } }))
//
//   return {
//     fallback: false,
//     paths,
//   }
// }) satisfies GetStaticPaths

// export const getStaticProps = (async (context) => {
//   const id = context?.params?.id as string
//
//   const { data } = await client.query({
//     context: { endpointIntent: 'fallback' },
//     query: SINGLE_POLICY_ASSET_QUERY,
//     variables: {
//       id,
//     },
//   })
//
//   const policyAsset = data?.policy_assets?.results[0]
//
//   return {
//     props: {
//       id,
//       ...policyAsset,
//     },
//   }
// }) satisfies GetStaticProps

/**
 * Server Side Rendering
 * In case we want to re-render data on every request
 */
export const getServerSideProps = (async (context) => {
  const id = context?.params?.id as string

  const { data } = await client.query({
    context: { endpointIntent: 'build' },
    query: SINGLE_POLICY_ASSET_QUERY,
    variables: {
      id,
    },
  })

  const policyAsset = data?.policy_assets?.results[0]

  return {
    props: {
      ...policyAsset,
    },
  }
}) satisfies GetServerSideProps

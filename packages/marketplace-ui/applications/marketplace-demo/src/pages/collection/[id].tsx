import { GetStaticPropsContext } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { ErrorBoundary } from 'react-error-boundary'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import collectionData from '@/data/collections.json'
import { Layout } from '@/components'

const PolicyAssets = dynamic(() => import('@/components/PolicyAssets'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR for this component because it relies on browser APIs
})

interface Collection {
  name: string
  description: string
  image: string
  policyId: string
}

interface CollectionPageProps {
  data: Collection
}

function CollectionPage({ data }: CollectionPageProps) {
  return (
    <>
      <Head>
        <title>Collection | Marketplace Demo</title>
      </Head>
      <Layout>
        <Box component="section" mb={2} sx={{ position: 'relative', height: 300 }}>
          <Image src={data.image} alt={data.name} fill={true} style={{ objectFit: 'cover' }} />
          <Container>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                color: 'white',
                position: 'absolute',
              }}
            >
              <Typography component="h1" variant="h2">
                {data.name}
              </Typography>
              <Typography>{data.description}</Typography>
            </Box>
          </Container>
        </Box>
        <Box component={'section'} bgcolor={'grey.50'} py={4}>
          <Container>
            <Box>
              <ErrorBoundary fallback={<div>Error fetching data</div>}>
                <PolicyAssets policyId={data.policyId} />
              </ErrorBoundary>
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  )
}

export default CollectionPage

/** ************************************************************* */

/**
 * Static Site Generation
 * In case we want to build pages and serve them as static files
 */
// export async function getStaticPaths() {
//   const paths = collectionData.collections.map((collection) => ({
//     params: { id: collection.policyId },
//   }))
//
//   return { paths, fallback: false }
// }
//
// export async function getStaticProps({ params }: GetStaticPropsContext) {
//   const data = collectionData.collections.find((collection) => collection.policyId === params!.id)
//
//   return { props: { data } }
// }

/**
 * Server Side Rendering
 * In case we want to re-render data on every request
 */
export async function getServerSideProps({ params }: GetStaticPropsContext) {
  const data = collectionData.collections.find((collection) => collection.policyId === params!.id)

  return { props: { data } }
}

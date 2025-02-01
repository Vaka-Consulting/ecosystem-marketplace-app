import React, { SyntheticEvent } from 'react'
import { PolicyAsset } from '@/gql/graphql'
import { usePolicyAssets } from '@/components/PolicyAssets/hooks'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { replaceIpfsWithGatewayUrl } from '@empowa-tech/common'
import { NextLinkComposed } from '@/components'
import { IPFS_GATEWAY_URL, TOKEN_LABEL } from '@/constants'
import { useWallet } from '@meshsdk/react'

function Item({ onchain_metadata, extend }: PolicyAsset) {
  const { price } = extend?.[0] || { price: undefined }

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea>
        {onchain_metadata?.image && (
          <CardMedia sx={{ position: 'relative', height: 300 }}>
            <Image
              src={replaceIpfsWithGatewayUrl(onchain_metadata.image, IPFS_GATEWAY_URL)}
              alt="Policy Asset thumbnail image"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
            {price && (
              <Box sx={{ bgcolor: 'secondary.main', position: 'absolute', top: 8, left: 0, px: 3, py: 1 }}>
                <Typography sx={{ color: 'common.white' }}>
                  {price} {TOKEN_LABEL}
                </Typography>
              </Box>
            )}
          </CardMedia>
        )}
        <CardContent>
          <Typography variant="h6" component="h2" lineHeight={1.2} mb={1}>
            {onchain_metadata?.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

function Filter({ onChange }: { onChange: (event: SyntheticEvent) => void }) {
  return (
    <>
      <FormControlLabel control={<Checkbox onChange={onChange} />} label="Owned by me" name="wallet" />
    </>
  )
}

interface PolicyAssetsProps {
  policyId: string
}

function PolicyAssets({ policyId }: PolicyAssetsProps) {
  const { connected } = useWallet()
  const { data, loading, error, handleFilters } = usePolicyAssets({ policyId })

  if (loading) return <>Fetching policy assets...</>

  if (error) throw error

  const total = data?.policy_assets?.total || 0
  const assets = data?.policy_assets?.results as PolicyAsset[]

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: connected ? 3 : 12 }}>
        {connected && (
          <>
            <Typography variant="h5" mb={2}>
              Filters
            </Typography>
            <Filter onChange={handleFilters} />
          </>
        )}
      </Grid>
      <Grid size={{ xs: 12, md: connected ? 9 : 12 }}>
        <Typography variant="h5" mb={2}>
          {total} total
        </Typography>
        <Box>
          <Grid container spacing={4}>
            {assets.map((asset) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={asset._id}>
                <Box component={'article'} sx={{ height: '100%' }}>
                  <NextLinkComposed to={`/asset/${asset.asset}`} sx={{ textDecoration: 'none' }}>
                    <Item {...asset} />
                  </NextLinkComposed>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export default PolicyAssets

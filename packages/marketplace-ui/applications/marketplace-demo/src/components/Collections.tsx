import React from 'react'
import Grid from '@mui/material/Grid2'
import { NextLinkComposed } from '@/components'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import data from '@/data/collections.json'

function Collections() {
  return (
    <Grid spacing={4} container>
      {data.collections.map((collection) => (
        <Grid size={{ xs: 12, sm: 6 }} key={collection.policyId}>
          <Box component="article" sx={{ height: '100%' }}>
            <NextLinkComposed to={`/collection/${collection.policyId}`} sx={{ textDecoration: 'none' }}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea>
                  <CardMedia sx={{ position: 'relative', height: 300 }}>
                    <Image src={collection.image} alt={collection.name} fill={true} style={{ objectFit: 'cover' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {collection.name}
                    </Typography>
                    <Typography>{collection.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </NextLinkComposed>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default Collections

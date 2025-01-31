import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import { MarketplaceStatus } from './types'

interface ApiStatusProps {
  status: MarketplaceStatus
}

function MarketplaceApiStatus({ status }: ApiStatusProps) {
  return (
    <>
      {status === MarketplaceStatus.Created && (
        <Box mt={2}>
          <Alert severity="info">Waiting for the transaction to be processed...</Alert>
        </Box>
      )}
      {status === MarketplaceStatus.Pending && (
        <Box mt={2}>
          <Alert severity="info">Waiting for the transaction to be confirmed on the blockchain...</Alert>
        </Box>
      )}
      {status === MarketplaceStatus.Invalid && (
        <Box mt={2}>
          <Alert severity="error">Transaction has failed to process. Please contact support.</Alert>
        </Box>
      )}
    </>
  )
}

export default MarketplaceApiStatus

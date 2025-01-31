import React from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'

interface TransactionStatusProps {
  txSigning: boolean
  txSignError: Error | undefined
}

function MarketplaceTransactionStatus({ txSigning, txSignError }: TransactionStatusProps) {
  return (
    <>
      {txSigning && (
        <Box mt={2}>
          <Alert severity="info">
            <AlertTitle>Building transaction</AlertTitle>
            Waiting for a response back from the wallet.
          </Alert>
        </Box>
      )}
      {txSignError && (
        <Box mt={2}>
          <Alert severity="error">
            <AlertTitle>Failed to build the transaction</AlertTitle>
            {txSignError.message}
          </Alert>
        </Box>
      )}
    </>
  )
}

export default MarketplaceTransactionStatus

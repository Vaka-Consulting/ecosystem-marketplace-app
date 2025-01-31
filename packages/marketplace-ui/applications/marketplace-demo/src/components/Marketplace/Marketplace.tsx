import { MarketplaceContext } from './types'
import { useMarketplace } from './hooks'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { OperationType } from '@empowa-tech/common'
import { SellForm, EditSaleForm, BuyForm } from '@/components'
import MarketplaceApiStatus from './MarketplaceApiStatus'
import MarketplaceTransactionStatus from './MarketplaceTransactionStatus'

interface MarketplaceProps {
  asset: string
}

function Marketplace({ asset }: MarketplaceProps) {
  const { data, loading, error, submitting, txSigning, txSignError, handleSubmit } = useMarketplace({ asset })

  if (loading) return <>Getting Marketplace information...</>
  if (error) return <>Error getting Marketplace information</>
  if (data) {
    return (
      <>
        {data.context === MarketplaceContext.Seller ? (
          <EditSaleForm
            feePercentage={0.2}
            defaultValues={{
              price: data.price,
              type: OperationType.Update,
            }}
            lastKnownType={data.type!}
            submitting={submitting}
            disabled={submitting}
            handleSubmit={handleSubmit}
          />
        ) : data.context === MarketplaceContext.Buyer ? (
          <BuyForm
            defaultValues={{ price: data.price, type: OperationType.Buy }}
            submitting={submitting}
            disabled={submitting}
            handleSubmit={handleSubmit}
          />
        ) : data.context === MarketplaceContext.Owner ? (
          <>
            <SellForm
              feePercentage={0.2}
              defaultValues={{ price: data.price, type: OperationType.Sell }}
              submitting={submitting}
              disabled={submitting}
              onSubmit={handleSubmit}
            />
          </>
        ) : (
          <Typography>This asset is not for sale yet.</Typography>
        )}
        {(txSigning || txSignError) && (
          <Box mt={2}>
            <MarketplaceTransactionStatus txSigning={txSigning} txSignError={txSignError} />
          </Box>
        )}
        {data.status && (
          <Box mt={2}>
            <MarketplaceApiStatus status={data.status} />
          </Box>
        )}
      </>
    )
  }

  return <>Error displaying marketplace information</>
}

export default Marketplace

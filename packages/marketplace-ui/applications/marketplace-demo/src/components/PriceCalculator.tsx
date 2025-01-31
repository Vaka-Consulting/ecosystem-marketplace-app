import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useState } from 'react'
import { calcFromLovelace, calcToLovelace } from '@empowa-tech/common'

const calculateFeeAmount = (price: number, feePercentage: number) => {
  const priceInLovelace = calcToLovelace(price)
  const feePriceInLovelace = priceInLovelace * feePercentage

  return calcFromLovelace(feePriceInLovelace)
}

const calculateSellerAmount = (price: number, feePercentage: number) => {
  const priceLovelace = calcToLovelace(price)
  const feePriceLovelace = priceLovelace * feePercentage
  return calcFromLovelace(priceLovelace - feePriceLovelace)
}

function PriceCalculator({ price, feePercentage }: { price: number; feePercentage: number }) {
  const calculatedFullPrice = calculateSellerAmount(price, feePercentage)
  const defaultFeePrice = calculateFeeAmount(calculatedFullPrice, feePercentage)
  const defaultEarningPrice = calculatedFullPrice

  const [feePrice, setFeePrice] = useState(defaultFeePrice)
  const [earningPrice, setEarningPrice] = useState(defaultEarningPrice)

  const calculatePrices = useCallback(() => {
    if (price === 0) {
      setFeePrice(0)
      setEarningPrice(0)
    } else {
      const calculatedEarningPrice = price - price * feePercentage
      const calculatedFeePrice = price * feePercentage

      setFeePrice(calculatedFeePrice)
      setEarningPrice(calculatedEarningPrice)
    }
  }, [price, feePercentage])

  useEffect(() => {
    calculatePrices()
  }, [price, calculatePrices])

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box mb={4}>
        <Typography sx={{ mb: 1 }} fontWeight="bold">
          Marketplace Fee
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>{feePrice}</Typography>
      </Box>
      <Box>
        <Typography sx={{ mb: 1 }} fontWeight="bold">
          You will receive
        </Typography>
        <Typography fontWeight="bold">{earningPrice}</Typography>
      </Box>
    </Paper>
  )
}

export default PriceCalculator

import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { mixed, number, object } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AccountBalanceWallet as AccountBalanceWalletIcon } from '@mui/icons-material'
import { Box, Button, ButtonGroup, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { OperationType } from '@empowa-tech/common'
import { FormSubmitData, FormDefaultValues } from './types'
import { PriceCalculator } from '@/components'

interface EditSaleFormProps {
  feePercentage: number
  defaultValues: FormDefaultValues
  lastKnownType: OperationType
  submitting: boolean
  disabled: boolean
  handleSubmit: (data: FormSubmitData) => void
}

const updateSchema = object({
  price: number().min(0.1).required(),
  type: mixed<OperationType>().oneOf(Object.values(OperationType)).required(),
})

function CancelOrUpdateSaleForm({
  defaultValues,
  submitting,
  disabled,
  handleSubmit,
  handleEdit,
}: Omit<EditSaleFormProps, 'lastKnownType'> & { handleEdit: () => void }) {
  const { handleSubmit: submitHandler } = useForm({
    defaultValues: {
      ...defaultValues,
      type: OperationType.Cancel,
    },
  })

  const { price } = defaultValues

  const onSubmit = useCallback(
    (data: FieldValues): void => {
      handleSubmit(data as FormSubmitData)
    },
    [handleSubmit],
  )

  return (
    <form onSubmit={submitHandler(onSubmit)}>
      <Box mb={2}>{price}</Box>

      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button variant="contained" onClick={handleEdit} disabled={disabled}>
          Edit Price
        </Button>
        <LoadingButton
          loadingPosition="start"
          startIcon={<AccountBalanceWalletIcon />}
          variant="contained"
          type="submit"
          loading={submitting}
          disabled={disabled}
        >
          Remove NFT from Sale
        </LoadingButton>
      </ButtonGroup>
    </form>
  )
}

function UpdateSaleForm({
  defaultValues,
  feePercentage,
  submitting,
  disabled,
  handleSubmit,
  handleCancelEdit,
}: Omit<EditSaleFormProps, 'lastKnownType'> & { handleCancelEdit: () => void }) {
  const {
    register,
    handleSubmit: submitHandler,
    watch,
    formState,
  } = useForm({
    resolver: yupResolver(updateSchema),
    defaultValues: {
      ...defaultValues,
      type: OperationType.Update,
    },
  })

  const { price } = defaultValues

  const onSubmit = (data: FieldValues): void => {
    console.log(data)
    handleSubmit(data as FormSubmitData)
  }

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.currentTarget.value
    const cleanValue = value.replace(/[^1-9]/g, '')

    console.log(value, cleanValue)

    if (cleanValue) {
      return cleanValue
    }
  }, [])

  console.log(formState, watch('price'))

  return (
    <form onSubmit={submitHandler(onSubmit)}>
      <Box mb={2}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            type="number"
            label="Price"
            placeholder="Enter the new price"
            disabled={disabled}
            defaultValue={price}
            {...register('price')}
            onChange={handleChange}
          />
          <input type="hidden" value={OperationType.Update} {...register('type')} />
        </FormControl>
      </Box>
      {watch('price') > 0 && <PriceCalculator price={price} feePercentage={feePercentage} />}
      <Box>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <LoadingButton
            loadingPosition="start"
            startIcon={<AccountBalanceWalletIcon />}
            variant="contained"
            type="submit"
            loading={submitting}
            disabled={disabled}
          >
            Update Price
          </LoadingButton>
          <Button disabled={disabled} onClick={handleCancelEdit}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  )
}

function EditSaleForm({ lastKnownType, submitting, defaultValues, ...props }: EditSaleFormProps) {
  const defaultEditMode = useMemo(() => {
    const isUpdating = lastKnownType === OperationType.Update
    return isUpdating && submitting
  }, [lastKnownType, submitting])

  const [editMode, setEditMode] = useState(defaultEditMode)

  const handleEdit = useCallback(() => {
    setEditMode(true)
  }, [setEditMode])

  const handleCancelEdit = useCallback(() => {
    setEditMode(false)
  }, [setEditMode])

  if (editMode) {
    return (
      <UpdateSaleForm
        defaultValues={{ ...defaultValues, type: OperationType.Update }}
        submitting={submitting}
        handleCancelEdit={handleCancelEdit}
        {...props}
      />
    )
  }
  return (
    <CancelOrUpdateSaleForm
      defaultValues={{ ...defaultValues, type: OperationType.Cancel }}
      submitting={submitting}
      handleEdit={handleEdit}
      {...props}
    />
  )
}

export default EditSaleForm

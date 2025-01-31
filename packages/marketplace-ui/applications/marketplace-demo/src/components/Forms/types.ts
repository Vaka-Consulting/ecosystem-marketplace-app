import { OperationType } from '@empowa-tech/common'

export interface FormDefaultValues {
  price: number
  type: OperationType
}

export interface FormSubmitData {
  price?: number
  type: OperationType
}

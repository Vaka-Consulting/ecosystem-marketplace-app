import { OperationType } from '@vakaconsulting/common-ui'

export interface FormDefaultValues {
  price: number
  type: OperationType
}

export interface FormSubmitData {
  price?: number
  type: OperationType
}

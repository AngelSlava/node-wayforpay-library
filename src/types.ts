import { regularMode, requestType } from './enums'

export interface WayForPayCredentials {
  merchantAccount: string
  merchantPassword: string
}

export interface RegularPaymentStatusRequest extends WayForPayCredentials {
  requestType: requestType
  orderReference: string
}

export interface RegularPaymentCreateRequest extends RegularPaymentStatusRequest {
  regularMode: regularMode
  amount: string,
  dateNext: string,
  dateEnd: string,
  orderReference: string,
  email: string
}

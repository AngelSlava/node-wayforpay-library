export interface WayForPayCredentials {
  merchantAccount: string
  merchantPassword: string
}

export interface RegularPaymentStatusRequest extends WayForPayCredentials {
  requestType: string
  orderReference: string
}

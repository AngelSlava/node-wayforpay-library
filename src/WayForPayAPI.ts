import { PurchaseCredentials, WayForPayCredentials } from './types'
import RegularPayments from './RegularPayments'
import Purchase from './Purchase'

class WayForPayAPI {
  private readonly credentials: WayForPayCredentials
  public regularPayments: RegularPayments
  public purchase: Purchase

  constructor(credentials: WayForPayCredentials | PurchaseCredentials) {
    this.credentials = credentials
    this.regularPayments = new RegularPayments(this.credentials as WayForPayCredentials)
    this.purchase = new Purchase(this.credentials as PurchaseCredentials)
  }
}

export default WayForPayAPI

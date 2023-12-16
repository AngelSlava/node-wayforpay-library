import { WayForPayCredentials } from './types'
import RegularPayments from './RegularPayments'

class WayForPayAPI {
  private readonly credentials: WayForPayCredentials
  public regularPayments: RegularPayments

  constructor(credentials: WayForPayCredentials) {
    this.credentials = credentials
    this.regularPayments = new RegularPayments(this.credentials)
  }
}

export default WayForPayAPI

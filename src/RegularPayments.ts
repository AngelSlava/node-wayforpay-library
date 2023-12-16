import HTTPClient from './HTTPClient';
import { RegularPaymentStatusRequest, WayForPayCredentials } from './types'

class RegularPayments {
  private credentials: WayForPayCredentials

  constructor(credentials: WayForPayCredentials) {
    this.credentials = credentials
  }

  async checkStatus(orderReference: string): Promise<any> {
    const payload: RegularPaymentStatusRequest = {
      requestType: 'STATUS',
      merchantAccount: this.credentials.merchantAccount,
      merchantPassword: this.credentials.merchantPassword,
      orderReference
    }
    try {
      const response = await HTTPClient.post('/regularApi', payload)
      return response.data
    } catch (error) {
      console.error('Error in RegularPayments:checkStatus', error)
      throw error
    }
  }
}

export default RegularPayments

import { RegularPaymentStatusRequest, WayForPayCredentials } from './types'
import axios, { AxiosInstance } from 'axios'

class RegularPayments {
  private httpClient: AxiosInstance;
  private credentials: WayForPayCredentials

  constructor(credentials: WayForPayCredentials) {
    this.credentials = credentials
    this.httpClient = axios.create({
      baseURL: 'https://api.wayforpay.com/regularApi'
    })
  }

  async checkStatus(orderReference: string): Promise<any> {
    const payload: RegularPaymentStatusRequest = {
      requestType: 'STATUS',
      merchantAccount: this.credentials.merchantAccount,
      merchantPassword: this.credentials.merchantPassword,
      orderReference
    }
    try {
      const response = await this.httpClient.post('', payload)
      return response.data
    } catch (error) {
      console.error('Error in RegularPayments:checkStatus', error)
      throw error
    }
  }
}

export default RegularPayments

import { HTTPClientRegularPayments } from './HTTPClient'
import { RegularPaymentCreateRequest, WayForPayCredentials } from './types'
import { requestType } from './enums'

class RegularPayments {
  private credentials: WayForPayCredentials

  constructor(credentials: WayForPayCredentials) {
    this.credentials = credentials
  }

  status(orderReference: string): Promise<any> {
    return this.crud(orderReference, requestType.STATUS)
  }

  suspend(orderReference: string): Promise<any> {
    return this.crud(orderReference, requestType.SUSPEND)
  }

  resume(orderReference: string): Promise<any> {
    return this.crud(orderReference, requestType.RESUME)
  }

  remove(orderReference: string): Promise<any> {
    return this.crud(orderReference, requestType.REMOVE)
  }

  async create(config: any) {
    const payload: RegularPaymentCreateRequest = {
      merchantAccount: this.credentials.merchantAccount,
      merchantPassword: this.credentials.merchantPassword,
      requestType: requestType.CREATE,
      currency: 'UAH',
      ...config
    }
    try {
      const response = await HTTPClientRegularPayments.post('/regularApi', payload)
      return response.data
    } catch (error) {
      console.error('Error in RegularPayments:create', error)
      throw error
    }
  }

  async change(config: any) {
    const payload: RegularPaymentCreateRequest = {
      merchantAccount: this.credentials.merchantAccount,
      merchantPassword: this.credentials.merchantPassword,
      requestType: requestType.CHANGE,
      currency: 'USD',
      ...config
    }
    try {
      const response = await HTTPClientRegularPayments.post('/regularApi', payload)
      return response.data
    } catch (error) {
      console.error('Error in RegularPayments:create', error)
      throw error
    }
  }

  async crud(orderReference: string, requestType: requestType) {
    const payload = {
      requestType,
      merchantAccount: this.credentials.merchantAccount,
      merchantPassword: this.credentials.merchantPassword,
      orderReference
    }
    try {
      const response = await HTTPClientRegularPayments.post('/regularApi', payload)
      return response.data
    } catch (error) {
      console.error(`Error in RegularPayments:${requestType}`, error)
      throw error
    }
  }
}

export default RegularPayments

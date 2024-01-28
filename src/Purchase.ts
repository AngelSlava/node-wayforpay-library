import crypto, { verify } from 'crypto'
import { PurchaseCredentials, RegularPaymentCreateRequest } from './types'
import { requestType } from './enums'
import { HTTPClientPurchase } from './HTTPClient'

class Purchase {
  private credentials: PurchaseCredentials

  constructor(credentials: PurchaseCredentials) {
    this.credentials = credentials
  }

  generatePurchaseData (data: any) {
    const signaturePayload = {
      merchantAccount: this.credentials.merchantAccount,
      merchantDomainName: this.credentials.merchantDomainName,
      orderReference: data.orderReference,
      orderDate: Math.floor(Date.now() / 1000),
      amount: data.amount,
      currency: 'USD',
      productName: data.productName,
      productCount: 1,
      productPrice: data.amount
    }

    const merchantSignature = this.generateSignature(signaturePayload)
    return {
      ...signaturePayload,
      language: data.language,
      clientEmail: data.clientEmail,
      returnUrl: this.credentials.returnUrl,
      serviceUrl: this.credentials.serviceUrl,
      merchantSignature
    }
  }

  generateSignature(payload: any) {
    const str = Object.values(payload).join(';')
    const hmac = crypto.createHmac('md5', this.credentials.merchantSecret)
    hmac.update(str)
    return hmac.digest('hex')
  }

  generateVerifyData(data: any) {
    const merchantSignature = this.generateSignature({
      merchantAccount: this.credentials.merchantAccount,
      merchantDomainName: this.credentials.merchantDomainName,
      orderReference: data.orderReference,
      amount: data.amount,
      currency: data.currency,
    })

    return {
      merchantAccount: this.credentials.merchantAccount,
      merchantDomainName: this.credentials.merchantDomainName,
      merchantAuthType: 'SimpleSignature',
      merchantSignature,
      orderReference: data.orderReference,
      amount: data.amount,
      currency: data.currency,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      returnUrl: this.credentials.returnUrl,
      serviceUrl: this.credentials.serviceUrl,
      language: data.language,
      paymentSystem: data.paymentSystem || 'card',
      verifyType: data.verifyType || 'simple'
    }
  }
}

export default Purchase

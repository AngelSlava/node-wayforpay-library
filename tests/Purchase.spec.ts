import { JSDOM } from 'jsdom'
import axios from 'axios'

require('dotenv').config()

import WayForPayAPI from '../src/WayForPayAPI';
import * as querystring from 'querystring'

describe('Purchase', () => {
  const merchantAccount = process.env.WFP_ACCOUNT as string;
  const merchantPassword = process.env.WFP_PASWORD as string;
  const merchantSecret = process.env.WFP_SECRET as string;
  const merchantDomainName = process.env.WFP_DOMAIN as string;
  const returnUrl = process.env.WFP_RETURN_URL as string;
  const serviceUrl = process.env.WFP_SERVICE_URL as string;
  const clientEmail = process.env.CLIENT_EMAIL as string;
  const clientPhone = process.env.CLIENT_PHONE as string;

  const wayForPay = new WayForPayAPI({
    merchantAccount,
    merchantPassword,
    merchantSecret,
    merchantDomainName,
    serviceUrl,
    returnUrl
  });

  it('Create',async () => {
    const payload = {
      amount: '0.01',
      orderReference: 'qwerty' + Date.now(),
      language: 'en',
      clientEmail,
      productName: 'TEST',
    }

    const data = wayForPay.purchase.generatePurchaseData(payload) as any
    const response = await axios.post(
      'https://secure.wayforpay.com/pay',
      querystring.stringify(data), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })

    const dom = new JSDOM(response.data)
    const title: HTMLElement | null = dom.window.document.querySelector('.title')
    const text = title?.textContent?.split('\n')
      .map(c => c.trim())
      .filter(c => c)
      .join('. ')

    if (!text?.includes('Sign in MasterPass')) {
      throw new Error(text)
    }

    const url = response.request.res.responseUrl
    expect(url.includes('?vkh=')).toBeTruthy()
  })

  it('Verify', async () => {
    const payload = {
      orderReference: 'test_lbx_' + Date.now(),
      currency: 'UAH',
      amount: 0,
      clientEmail,
      clientPhone,
      language: 'uk'
    }
    const data = wayForPay.purchase.generateVerifyData(payload)
    const response = await axios.post(
      'https://secure.wayforpay.com/verify',
      querystring.stringify(data), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })

    const dom = new JSDOM(response.data)
    const title: HTMLElement | null = dom.window.document.querySelector('title')
    const text = title?.textContent?.split('\n')
    expect(text?.includes('Верифікація картки')).toBeTruthy()
  })
})

import WayForPayAPI from '../src/WayForPayAPI'

(async () => {
  const merchantAccount: string = 'YOUR_MERCHANT_ACCOUNT';
  const merchantPassword: string = 'YOUR_MERCHANT_PASSWORD';
  const orderReference: string = 'ORDER_REFERENCE';
  const wfp = new WayForPayAPI({ merchantAccount, merchantPassword })

  try {
    const status = await wfp.regularPayments.status(orderReference)
    console.log('Status:', status)
  } catch (error) {
    console.log('Status check error:', error)
  }
})()

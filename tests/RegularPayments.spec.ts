require('dotenv').config()

import { regularMode } from '../src/enums'
import WayForPayAPI from '../src/WayForPayAPI';

describe.skip('RegularPayments', () => {
  const merchantAccount = process.env.WFP_ACCOUNT as string;
  const merchantPassword = process.env.WFP_PASWORD as string;
  const orderReference = process.env.WFP_ORDER_REFERENCE as string;

  const wayForPay = new WayForPayAPI({ merchantAccount, merchantPassword });

  const fakeResponse = {
    reasonCode: 4100,
    reason: "Ok",
    orderReference
  };

  it('Create regular payment', async () => {
    const payload = {
      regularMode: regularMode.ONCE,
      amount: (0.01 * 37.7).toFixed(2),
      dateBegin: '27.12.2023',
      dateEnd: '28.12.2023',
      orderReference,
      email: process.env.CLIENT_EMAIL as string
    }

    const response = await wayForPay.regularPayments.create(payload)
    expect(response.reasonCode).toBe(fakeResponse.reasonCode)
  })

  it('Check regular payment status', async () => {
    const response = await wayForPay.regularPayments.status(orderReference);
    expect(response.reasonCode).toBe(fakeResponse.reasonCode)
  })

  it('Suspend regular payment', async () => {
    const response = await wayForPay.regularPayments.suspend(orderReference)
    expect(response.reasonCode).toBe(fakeResponse.reasonCode)
  })

  it('Resume regular payment', async () => {
    const response = await wayForPay.regularPayments.resume(orderReference)
    expect(response.reasonCode).toBe(fakeResponse.reasonCode)
  })

  it('Change regular payment', async () => {
    const payload = {
      regularMode: regularMode.DAILY,
      amount: (0.5).toFixed(2),
      dateBegin: '28.12.2023',
      dateEnd: '29.12.2023',
      orderReference,
    }

    const response = await wayForPay.regularPayments.change(payload)
    expect(response.reasonCode).toBe(fakeResponse.reasonCode)
  })

});

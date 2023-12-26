require('dotenv').config()

import { regularMode } from '../src/enums'
import WayForPayAPI from '../src/WayForPayAPI';

describe('RegularPayments', () => {
  const merchantAccount = process.env.WFP_ACCOUNT as string;
  const merchantPassword = process.env.WFP_PASWORD as string;
  const orderReference = process.env.WFP_ORDER_REFERENCE as string;

  const wayForPay = new WayForPayAPI({ merchantAccount, merchantPassword });

  it.skip('Create regular payment', async () => {
    const payload = {
      regularMode: regularMode.ONCE,
      amount: (0.01 * 37.7).toFixed(2),
      dateBegin: '27.12.2023',
      dateEnd: '28.12.2023',
      orderReference,
      email: process.env.CLIENT_EMAIL as string
    }

    const fakeResponse = {
      data: {
        reasonCode: 4100,
        reason: 'Ok',
        orderReference
      }
    };

    const response = await wayForPay.regularPayments.create(payload)
    expect(response).toEqual(expect.objectContaining(fakeResponse.data));
  })

  it('Check regular payment status', async () => {
    const fakeResponse = {
      data: {
        reasonCode: 4100,
        reason: 'Ok',
        orderReference
      }
    };

    const status = await wayForPay.regularPayments.status(orderReference);
    expect(status).toEqual(expect.objectContaining(fakeResponse.data));
    console.log(status)
  })

  it.skip('Suspend regular payment', async () => {
    const fakeResponse = {
      data: {
        reasonCode: 4100,
        reason: 'Ok'
      }
    };
    const response = await wayForPay.regularPayments.suspend(orderReference)
    expect(response).toEqual(expect.objectContaining(fakeResponse.data))
  })

  it.skip('Resume regular payment', async () => {
    const fakeResponse = {
      data: {
        reasonCode: 4100,
        reason: 'Ok'
      }
    };
    const response = await wayForPay.regularPayments.resume(orderReference)
    expect(response).toEqual(expect.objectContaining(fakeResponse.data))
    console.log(response)
  })

  it.skip('Change regular payment', async () => {
    const payload = {
      regularMode: regularMode.DAILY,
      amount: (0.01 * 37.7).toFixed(2),
      dateBegin: '27.12.2023',
      dateEnd: '28.12.2023',
      orderReference,
    }

    const fakeResponse = {
      data: {
        reasonCode: 4100,
        reason: 'Ok'
      }
    };

    const response = await wayForPay.regularPayments.change(payload)
    expect(response).toEqual(expect.objectContaining(fakeResponse.data))
  })
});

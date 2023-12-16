require('dotenv').config()

import WayForPayAPI from '../src/WayForPayAPI';

describe('RegularPayments', () => {
  const merchantAccount = process.env.WFP_ACCOUNT as string;
  const merchantPassword = process.env.WFP_PASWORD as string;
  const orderReference = process.env.WFP_ORDER_REFERENCE as string;;

  it('Check regular payment status', async () => {
    const fakeResponse = {
      data: {
        reasonCode: 4100,
        reason: 'ok',
        orderReference
      }
    };

    const wayForPay = new WayForPayAPI({ merchantAccount, merchantPassword });
    const status = await wayForPay.regularPayments.checkStatus(orderReference);

    expect(status).toEqual(expect.objectContaining(fakeResponse.data));
  });
});

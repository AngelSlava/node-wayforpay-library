import WayForPayAPI from '../src/WayForPayAPI';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RegularPayments', () => {
  const merchantAccount = 'YOUR_MERCHANT_ACCOUNT';
  const merchantPassword = 'YOUR_MERCHANT_PASSWORD';
  const orderReference = 'ORDER_REFERENCE';

  it('Check regular payment status', async () => {
    const fakeResponse = {
      data: {
        reasonCode: 4100,
        reason: 'ok',
        orderReference
      }
    };
    mockedAxios.post.mockResolvedValue(fakeResponse);

    const wayForPay = new WayForPayAPI({ merchantAccount, merchantPassword });
    const status = await wayForPay.regularPayments.checkStatus(orderReference);

    expect(mockedAxios.post).toHaveBeenCalledWith('https://api.wayforpay.com/regularApi', {
      requestType: 'STATUS',
      orderReference,
      merchantAccount,
      merchantPassword
    });
    expect(status).toEqual(expect.objectContaining(fakeResponse.data));
  });
});

![npm](https://img.shields.io/npm/v/vue-custom-range-input)

# WayForPay nodejs library

## Installation
You can install the component using yarn:
```bash
npm install node-wayforpay-library
```
or
```bash
yarn add node-wayforpay-library
```

## Usage
```javascript
import WayForPayAPI from 'node-wayforpay-library';

const merchantAccount: string = 'YOUR_MERCHANT_ACCOUNT';
const merchantPassword: string = 'YOUR_MERCHANT_PASSWORD';

// Init api
const wfp = new WayForPayAPI({ merchantAccount, merchantPassword })

// Check status
const response = await wfp.regularPayments.status('ORDER_REFERENCE')

// Create payment
const payment = await wfp.regularPayments.create({
  regularMode: 'weekly', // once, daily, quarterly, weekly, monthly, halfyearly, yearly 
  amount: '100',
  dateBegin: 'DD.MM.YYYY',
  dateEnd: 'DD.MM.YYYY',
  orderReference: 'ORDER_REFERENCE',
  email: 'CLIENT_EMAIL'
})

// ...
```


## Regular Payment methods
- `create`: Create regular payment
- `status`: Check regular payment status
- `suspend`: To suspend the possibility of recurrent payments from the card, the merchant may pause the payment.
- `resume`: In order to resume previously suspended recurrent payment
- `change`: Change regular payment.


## Purchase methods
- `generatePurchaseData`: Generate data (JSON) for payment form with signature


## Changelog
For detailed information on changes between versions, please refer to our [changelog](./CHANGELOG.md).


## License
This project is licensed under the MIT License.


## Author
Viacheslav Angel

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
const orderReference: string = 'ORDER_REFERENCE';
const wfp = new WayForPayAPI({ merchantAccount, merchantPassword })

const status = await wfp.regularPayments.checkStatus(orderReference)
```



Now you can use the component in your template:
```html
<VueCustomRangeInput v-model="yourValue" :min="minValue" :max="maxValue" :step="stepValue" />
```

## Regular Payments
- `checkStatus`: Check regular payment status by order reference

## License
This project is licensed under the MIT License.

## Author
Viacheslav Angel

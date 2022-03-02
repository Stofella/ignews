import Stripe from 'stripe';
import * as packageInfos from '../../package.json'

export const stripe = new Stripe(
    process.env.STRIPE_API_KEY,
    {
        apiVersion: '2020-08-27',
        appInfo: {
            name: 'Ignews',
            version: packageInfos.version
        }
    }
);
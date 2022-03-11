import { query as q } from 'faunadb';

import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  //Buscar o usuario no banco do faunadb com o id {custumerId}
   const userRef = await fauna.query(
     q.Select(
       "ref",
       q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
     )
   )

   const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
      id: subscription.id,
      userId: userRef,
      status: subscription.status,
      price_id: subscription.items[0].price.id,
    }

    // salvar o dados da subscription no faunadb
   await fauna.query(
     q.Create(
       q.Collection('subscriptions'),
       {data: subscriptionData}
     )
   )
}
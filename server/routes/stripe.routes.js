const router = require("express").Router();
const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", (req, res) => {
  let line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.productId.name,
        },
        unit_amount: item.productId.price * 100,
      },
      quantity: item.quantity,
    };
  });

  stripe.checkout.sessions
    .create({
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1000,
              currency: "eur",
            },
            display_name: "Local delivery",
          },
        },
      ],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/user/cart`,
    })
    .then((session) => {
      res.send({ url: session.url });
    })
    .catch((error) => {
      res.status(500).send({ error: "Error creating checkout session" });
    });
});

module.exports = router;

const fetch = require("node-fetch");

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const amount = body.price_amount;

        const apiKey = "9M8W65Y-79P4MR8-HTCJGW4-ZBPH9V8";
        const walletAddress = "TTpiMM1sLUkPys6teMz4TN2FtTxMqN27mU";

        const response = await fetch("https://api.nowpayments.io/v1/invoice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey
            },
            body: JSON.stringify({
                price_amount: amount,
                price_currency: "usd",
                pay_currency: "usdttrc20",
                payout_address: walletAddress,
                is_fixed_rate: true,
                is_fee_paid_by_user: true,
                order_id: "stayworld_" + Date.now(),
                order_description: "StayWorld Booking Payment"
            })
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Invoice creation failed" })
        };
    }
};

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({
      status: 405,
      error: "Method Not Allowed",
    });
  }

  try {
    // Define payment details
    const payment_capture: number = 1; // Capture the payment immediately
    const { amount, currency }: { amount: number; currency: string } =
      await req.json();

    // Prepare options object for creating an order
    const options = {
      amount: (amount * 100).toString(), // Razorpay expects amount in paisa (1 INR = 100 paisa)
      currency,
      receipt: shortid.generate(), // Generate a unique receipt ID using shortid
      payment_capture,
    };

    // Create an order with Razorpay
    const response: any = await razorpay.orders.create(options);

    // Return success response with the order details
    return NextResponse.json({
      status: 200,
      order: {
        id: response.id, // Order ID generated by Razorpay
        currency: response.currency,
        amount: response.amount / 100, // Convert amount back to rupees from paisa
      },
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({
      status: 400,
      error: "Order creation failed",
      message: error.message,
    });
  }
}
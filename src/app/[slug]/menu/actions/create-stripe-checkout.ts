"use server";

import Stripe from "stripe"; 
import { CartProduct } from "../contexts/cart";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { ConsumptionMethod } from "@prisma/client";
import { removeCpfPunctuation } from "../helpers/cpf";


interface CreateStripeCheckoutInput{
    products: CartProduct[],
    orderId: number;
    slug: string;
    consumptionMethod: ConsumptionMethod;
    cpf: string;
}

export const createStripeCheckout = async ({
    orderId,
    products,
    slug,
    consumptionMethod,
    cpf,
}: CreateStripeCheckoutInput) => {
    try {
        if(!process.env.STRIPE_SECRET_KEY) {
            throw new Error('Stripe secret key is not defined ou ausente');
        }
        const origin = (await headers()).get("origin") as string;
        const productsWithPrices = await db.product.findMany({
        where: {
            id: {
            in: products.map((product) => product.id),
            },
        },
        });
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2025-02-24.acacia',
        })
        const searchParams = new URLSearchParams();
        searchParams.set("consumptionMethod", consumptionMethod);
        searchParams.set("cpf", removeCpfPunctuation(cpf));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${origin}/${slug}/orders?${searchParams.toString()}`, 
            cancel_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
            metadata: {
                orderId,
            },
            line_items: products.map((product) => ({
                price_data:{
                    currency: "brl",
                    product_data:{
                        name: product.name,
                        images: [product.imageUrl],
                        
                    },
                    unit_amount: productsWithPrices.find((p) => p.id === product.id)!.price * 100,
                },
                quantity: product.quantity,
            })),
        });
        return { sessionId: session.id };
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
    }
}
"use client"
import { BiCheck } from "react-icons/bi";
import DefaultButton from "../Mixed/Button";
import DefaultLayout from "../Mixed/Layout";
import { TextGenerateEffect } from "../ui/Text";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../ui/Gradient";

const plans = [
    {
        name: "Basic",
        price: 187.99,
        features: [
            "10 users",
            "1 server",
            "2 messages",
        ],
        popular: false
    },
    {
        name: "Standard",
        price: 200.99,
        features: [
            "10 users",
            "10 connections",
            "1 channel",
            "1 server",
            "2 messages",
            "2 attachments",
            "2 emojis",
            "20 reactions"
        ],
        popular: true
    },
    {
        name: "Premium",
        price: 499.99,
        features: [
            "10 users",
            "10 connections",
            "1 channel",
            "1 server",
            "30 custom servers",
            "30 custom channels",
            "30 custom guilds",
            "30 custom servers",
            "30 custom webhooks",
        ],
        popular: false
    }
]

export default function PremiumComponent() {
    return (
        <DefaultLayout className="mb-10">
            <div className="w-full flex items-center gap-3 flex-col">
                <div className="flex gap-1 flex-col items-center">
                    <span className="font-bold text-2xl">Connections</span>
                    <h1 className="text-6xl p-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">Premium</h1>
                </div>
                <TextGenerateEffect className="text-center flex items-center text-lg text-neutral-300" words="Acesse recursos exclusivos" />
            </div>
            <div className="gap-4 w-full grid grid-cols-3 tablet:grid-cols-1 mt-6">
                {plans.map((plan, index) => {
                    const PlanComponent = (
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            key={index}
                            className="flex flex-col gap-4 p-6 rounded-lg bg-neutral-800 items-start relative h-full"
                        >
                            {plan.popular && <div className="absolute px-2 font-semibold -top-3 flex rounded-full bg-fuchsia-500 left-3">Popular</div>}
                            <div className="flex gap-3 flex-col">
                                <span className="font-bold text-3xl">{plan.name}</span>
                                <h1 className="flex items-end">
                                    <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">R$ {plan.price}</span>
                                    <span className="text-neutral-300 text-sm">/mês</span>
                                </h1>
                            </div>
                            <div className="flex-grow mb-4">
                                {plan.features.map((feature, index) => (
                                    <div key={index} className="flex gap-1 items-center">
                                        <BiCheck fill="#7DDA58" />
                                        <span className="font-semibold">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <DefaultButton onClick={() => window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0"} className="p-3">
                                <div className="font-bold">Comprar</div>
                            </DefaultButton>
                        </motion.div>
                    );

                    if (!plan.popular) return PlanComponent;

                    return (
                        <BackgroundGradient initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.2 }} className="h-full" key={index}>
                            {PlanComponent}
                        </BackgroundGradient>
                    );
                })}
            </div>
        </DefaultLayout>
    )
}

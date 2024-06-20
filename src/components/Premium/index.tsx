"use client"
import DefaultButton from "../Mixed/Button";
import DefaultLayout from "../Mixed/Layout";
import { useState } from "react";
import Carousel from "./Carousel";
import { IoIosArrowForward } from "react-icons/io";
import { TextGenerateEffect } from "../ui/Text";
import Plans from "./Plans";
import { motion } from "framer-motion";

const plans = [
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
];

export default function PremiumComponent() {
    const [morePlans, setMorePlans] = useState(false);

    return (
        <DefaultLayout>
            {!morePlans ? (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex w-full gap-6 tablet:flex-col">
                    <div className="flex-grow flex flex-col gap-4">
                        <div className="flex items-end gap-2 mobile:flex-col mobile:items-start">
                            <span className="text-3xl mobile:text-2xl font-bold text-center">Connections</span>
                            <h1 className="mobile:text-4xl text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">Premium</h1>
                        </div>
                        <div className=" max-w-[70%]">
                            <TextGenerateEffect words="Connections premium é um premium daora e bonito, nao penso muito mas faço programda." className="text-neutral-300 text-lg" />
                        </div>
                        <div className="max-w-60 mt-10">
                            <DefaultButton onClick={() => setMorePlans(true)} className="p-3 group flex">
                                <span>Ver planos</span>
                                <IoIosArrowForward className="group-hover:translate-x-10 group-hover:opacity-0 opacity-100 transition-all" />
                            </DefaultButton>
                        </div>
                    </div>
                    <Carousel plans={plans} />
                </motion.div>
            ) : <Plans setMorePlans={setMorePlans} plans={plans} />}
        </DefaultLayout>
    )
}
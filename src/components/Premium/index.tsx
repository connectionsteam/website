"use client"
import DefaultButton from "../Mixed/Button";
import DefaultLayout from "../Mixed/Layout";
import { useContext, useState } from "react";
import Carousel from "./Carousel";
import { IoIosArrowForward } from "react-icons/io";
import { TextGenerateEffect } from "../ui/Text";
import Plans from "./Plans";
import { motion } from "framer-motion";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";

export default function PremiumComponent() {
    const [morePlans, setMorePlans] = useState(false);
    const { language } = useContext(LanguageContext);

    const plans = [
        {
            name: "Premium",
            price: 49.99,
            features: languages[language].plans.premium.features,
            popular: true
        },
        {
            name: "Basic Premium",
            price: 19.99,
            features: languages[language].plans.basicpremium.features,
            popular: false
        }
    ];

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
"use client";
import DefaultButton from "../Mixed/Button";
import DefaultLayout from "../Mixed/Layout";
import { useState } from "react";
import Carousel from "./Carousel";
import { IoIosArrowForward } from "react-icons/io";
import Plans from "./Plans";
import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";

export default function PremiumComponent() {
    const [morePlans, setMorePlans] = useState(false);
    const l = useLanguage();

    const plans = [
        {
            name: "Vip",
            price: 29.99,
            features: l.plans.premium.features,
            popular: true
        },
        {
            name: "Premium",
            price: 9.99,
            features: l.plans.basicpremium.features,
            popular: false
        }
    ];

    return (
        <DefaultLayout className="overflow-x-hidden">
            {!morePlans ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, x: 0 }} className="flex w-full gap-6 tablet:flex-col tablet:items-center">
                    <div className="flex-grow flex flex-col gap-4 tablet:items-center mobile:items-center mobile:text-center">
                        <div className="flex flex-col gap-2 tablet:items-center mobile:items-center mobile:text-center mobile:px-2">
                            <div className="flex items-end gap-2 mobile:flex-col mobile:items-start">
                                <span className="text-3xl mobile:text-2xl font-bold text-center">Connections</span>
                                <h1 className="mobile:text-4xl text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">Premium</h1>
                            </div>
                            <div className="max-w-[70%]">
                                <span className="text-neutral-30">{l.plans.description}</span>
                            </div>
                            <div className="max-w-60 mt-4 tablet:w-full tablet:max-w-[350px] mobile:min-w-[328px] mobile:px-2">
                                <DefaultButton onClick={() => setMorePlans(true)} className="p-3 group flex">
                                    <span>{l.plans.seeplans}</span>
                                    <IoIosArrowForward className="group-hover:translate-x-2 transition-all" />
                                </DefaultButton>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 tablet:items-center mobile:items-center mobile:text-center mobile:px-2">
                            <div className="flex items-end gap-2 mobile:flex-col mobile:items-start">
                                <span className="text-3xl mobile:text-2xl font-bold text-center">Connections</span>
                                <h1 className="mobile:text-4xl text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-700">Promoted</h1>
                            </div>
                            <div className="max-w-[70%]">
                                <span className="text-neutral-30">{l.plans.promoted}</span>
                            </div>
                            <div className="max-w-60 mt-4 tablet:w-full tablet:max-w-[350px] mobile:min-w-[328px] mobile:px-2">
                                <DefaultButton notarget href="/promote" pink onClick={() => setMorePlans(true)} className="p-3 group flex">
                                    <span>{l.plans.seehow}</span>
                                    <IoIosArrowForward className="group-hover:translate-x-2 transition-all" />
                                </DefaultButton>
                            </div>
                        </div>
                    </div>
                    <Carousel plans={plans} />
                </motion.div>
            ) : <Plans setMorePlans={setMorePlans} plans={plans} />}
        </DefaultLayout>
    )
}
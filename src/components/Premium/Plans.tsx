"use client"
import { PlanStructure } from "@/types";
import { TextGenerateEffect } from "../ui/Text";
import { motion } from "framer-motion";
import { BiCheck } from "react-icons/bi";
import DefaultButton from "../Mixed/Button";
import { BackgroundGradient } from "../ui/Gradient";
import { LuArrowLeft } from "react-icons/lu";
import { useLanguage } from "@/hooks/useLanguage";

export default function Plans({ plans, setMorePlans }: { plans: PlanStructure[], setMorePlans: (value: boolean) => void }) {
    const l = useLanguage();
    
    return (
        <>
            <div className="w-full flex items-center gap-3 flex-col">
                <div className="flex gap-1 flex-col items-center w-full">
                    <div className="w-full flex items-center text-center">
                        <button className="flex gap-2 items-center transition hover:bg-neutral-700 bg-neutral-800 p-2 rounded-lg group" onClick={() => setMorePlans(false)}>
                            <LuArrowLeft size={20} />
                            <span>{l.dashboard.guilds.connections.infos.back}</span>
                        </button>
                        <span className="font-bold text-2xl w-full text-center mr-[88px]">Connections</span>
                    </div>
                    <h1 className="text-6xl p-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">Premium</h1>
                </div>
                <TextGenerateEffect className="text-center flex items-center text-lg text-neutral-300" words={l.plans.pageDescription} />
            </div>
            <div className="gap-4 w-full flex justify-center mt-6 mb-10 flex-wrap">
                {plans.map((plan, index) => {
                    const PlanComponent = (
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            key={index}
                            className="flex flex-col gap-4 p-6 rounded-lg bg-neutral-800 items-start relative h-full w-[350px] tablet:w-full min-h-[460px]"
                        >
                            {plan.popular && <div className="absolute px-2 font-semibold -top-3 flex rounded-full bg-fuchsia-500 left-3">Popular</div>}
                            <div className="flex gap-3 flex-col">
                                <span className="font-bold text-3xl">{plan.name}</span>
                                <h1 className="flex items-end">
                                    <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">R$ {plan.price}</span>
                                    <span className="text-neutral-300 text-sm">/{l.plans.month}</span>
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
                                <div className="font-bold">{l.plans.buy}</div>
                            </DefaultButton>
                        </motion.div>
                    );

                    if (!plan.popular) return PlanComponent;

                    return (
                        <BackgroundGradient initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.2 }} className="h-full tablet:w-full" key={index}>
                            {PlanComponent}
                        </BackgroundGradient>
                    );
                })}
            </div>
        </>
    )
}
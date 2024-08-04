"use client";
import { BiCheck } from "react-icons/bi";
import DefaultButton from "../Mixed/Button";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PlanStructure } from "../../types";
import { useLanguage } from "../../hooks/useLanguage";
import { Modal, useDisclosure } from "@nextui-org/modal";
import PopUpBuy from "./Buy";

export default function Carousel({ plans }: { plans: PlanStructure[] }) {
    const l = useLanguage();

    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="max-w-[350px] mobile:max-w-screen mobile:px-2 h-full rounded-lg">
            <Slider className="h-full rounded-lg" {...settings}>
                {plans.map((plan, index) => {
                    const Component = (
                        <div key={index} className="flex flex-col p-6 rounded-lg bg-neutral-800 items-start relative h-[480px]">
                            <div className="flex gap-3 flex-col w-full">
                                <div className="flex items-start w-full">
                                    <span className="font-bold text-3xl flex flex-grow">{plan.name}</span>
                                    {plan.popular && <div className="px-3 font-semibold flex rounded-full bg-fuchsia-500">Popular</div>}
                                </div>
                                <h1 className="flex items-end">
                                    <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">R$ {plan.price}</span>
                                    <span className="text-neutral-300 text-sm">/{l.plans.month}</span>
                                </h1>
                            </div>
                            <div className="h-[270px] flex flex-col gap-0.5 flex-grow mt-2">
                                {plan.features.map((feature, index) => (
                                    <div key={index} className="flex gap-1 items-center">
                                        <div className="w-6">
                                            <BiCheck size={20} fill="#7DDA58" />
                                        </div>
                                        <span className="font-semibold">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <DefaultButton onClick={onOpen} className="p-3">
                                <div className="font-bold">{l.plans.buy}</div>
                            </DefaultButton>
                        </div>
                    );

                    if (!plan.popular) return Component;

                    return (
                        <div className="p-[3px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full" key={index}>
                            {Component}
                        </div>
                    );
                })}
            </Slider>
            <Modal classNames={{
                closeButton: "transition hover:bg-neutral-700",
                wrapper: "overflow-y-hidden",
                base: "max-h-screen overflow-y-auto",
            }} isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <PopUpBuy/>
            </Modal>
        </div>
    )
}

const NextArrow = ({ onClick }: CustomArrowProps) => {
    return (
        <div className="absolute top-1/2 left-[380px] transform -translate-y-1/2 bg-neutral-700 bg-opacity-50 rounded-full p-2 mobile:p-1 cursor-pointer z-10" onClick={onClick}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </div>
    );
};

const PrevArrow = ({ onClick }: CustomArrowProps) => {
    return (
        <div className="absolute top-1/2 right-[380px] transform -translate-y-1/2 bg-neutral-700 bg-opacity-50 rounded-full p-2 mobile:p-1 cursor-pointer z-10" onClick={onClick}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </div>
    );
};
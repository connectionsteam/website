import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import Image from "next/image";
import { IoIosWarning } from "react-icons/io";
import { useLanguage } from "../../hooks/useLanguage";

const discordLink = "https://discord.gg/4dMmpmDmsS";

export default function PromotedPopUpBuy({ onClose }: { onClose: () => void }) {
    const l = useLanguage();

    return (
        <ModalContent className="bg-neutral-800 text-white">
            <ModalHeader className="pb-1">
                <div>{l.plans.poppromoted.title}</div>
            </ModalHeader>
            <ModalBody className="flex gap-2">
                <div className="bg-yellow-500/10 rounded-lg p-2 flex gap-2 items-center mobile:flex-col">
                    <IoIosWarning className="fill-yellow-300" size={30} />
                    <div className="font-bold">
                        {l.plans.buypopUp.warning}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-lg">
                        {l.plans.poppromoted.fristimageDescription}
                        <a
                            href={discordLink}
                            target="_blank"
                            className="ml-1.5 text-blue-500 transition hover:text-blue-400 underline"
                        >
                            {l.plans.buypopUp.discordServer}
                        </a>
                        {l.plans.poppromoted.firstimageDescriptiontwo}
                    </div>
                    <Image
                        className="rounded-lg w-full"
                        alt="buy"
                        width={1195}
                        height={625}
                        src="/promote/buy.png"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-lg">{l.plans.poppromoted.secondImageDescription}</div>
                    <Image
                        className="rounded-xl w-full object-cover"
                        alt="buy"
                        width={1116}
                        height={899}
                        src="/promote/promoted.png"
                    />
                    <div></div>
                </div>
            </ModalBody>
            <ModalFooter className="flex w-full justify-end border-t rounded-t-xl
                    border-neutral-700 mt-2">
                <button
                    onClick={onClose}
                    className="rounded-lg bg-neutral-700 transition hover:bg-neutral-700/50 
                    p-2 px-3"
                >
                   {l.plans.buypopUp.understand}
                </button>
            </ModalFooter>
        </ModalContent>
    )
}
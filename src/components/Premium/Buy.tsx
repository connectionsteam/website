import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

export default function PopUpBuy() {
    return (
        <ModalContent className="bg-neutral-800 text-white">
            <ModalHeader>
                <div>Como comprar premium?</div>
            </ModalHeader>
            <ModalBody>
                <a
                    className="transition text-blue-500 hover:text-blue-600"
                    href="https://discord.gg/9GTS9yUkV6"
                    target="_blank"
                >
                    Discord
                </a>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </ModalContent>
    )
}
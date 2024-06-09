import { Avatar as NextUIAvatar } from "@nextui-org/avatar";

export default function Avatar({ src, className }: { src: string, className?: string }) {
    return (
        <NextUIAvatar
            src={src}
            alt="avatar"
            className={className}
            classNames={{
                base: "bg-gradient-to-r from-fuchsia-500 to-indigo-500",
                icon: "text-black/80",
            }}
            showFallback
        />
    )
}
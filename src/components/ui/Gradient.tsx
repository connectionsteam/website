"use client"
import { cn } from "@/utils/cn";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
    children,
    className,
    containerClassName,
    initial,
    animate,
    transition
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    initial?: any;
    animate?: any;
    transition?: any;
}) => {
    return (
        <div className={cn("relative p-[4px] group", containerClassName)}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1 }}
                style={{
                    backgroundSize: "400% 400%",
                }}
                className={cn(
                    "absolute inset-0 rounded-lg h-full z-[1] group-hover:opacity-100 blur-lg transition duration-500 will-change-transform",
                    "h-full bg-[radial-gradient(circle_farthest-side_at_0_100%,#D946EF,transparent),radial-gradient(circle_farthest-side_at_100%_0,#D946EF,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#6366f1,transparent),radial-gradient(circle_farthest-side_at_0_0,#6366f1,#6366f1)]"
                )}
            />
            <motion.div
                initial={initial}
                animate={animate}
                transition={transition}
                style={{
                    backgroundSize: "400% 400%",
                }}
                className={cn(
                    "absolute inset-0 rounded-lg z-[1] will-change-transform h-full",
                    "bg-[radial-gradient(circle_farthest-side_at_0_100%,#D946EF,transparent),radial-gradient(circle_farthest-side_at_100%_0,#D946EF,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#6366f1,transparent),radial-gradient(circle_farthest-side_at_0_0,#6366f1,#6366f1)]"
                )}
            />

            <div className={cn("relative z-10", className)}>{children}</div>
        </div>
    );
};
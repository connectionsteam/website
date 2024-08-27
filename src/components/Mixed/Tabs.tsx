import { motion } from "framer-motion";

interface Props {
	tabs: { id: string; label: string }[];
	cursor?: string;
	activeTab: string;
	setActiveTab: (activeTab: string) => void;
}

export default function DefaultTabs({
	tabs,
	cursor,
	activeTab,
	setActiveTab,
}: Props) {
	return (
		<div className="flex space-x-1">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => setActiveTab(tab.id)}
					className={`${activeTab === tab.id ? "" : "hover:text-white/70"} 
                    relative rounded-lg px-3 py-1.5 text-white transition z-20`}
				>
					{activeTab === tab.id && (
						<motion.span
							layoutId="bubble"
							className={`absolute inset-0 -z-10 ${!cursor ? "bg-neutral-700" : cursor}`}
							style={{ borderRadius: "8px" }}
							transition={{
								type: "spring",
								bounce: 0.3,
								duration: 0.5,
							}}
						/>
					)}
					{tab.label}
				</button>
			))}
		</div>
	);
}

import { Input } from "@nextui-org/input";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import DefaultLayout from "../../../components/Mixed/Layout";
import { useLanguage } from "../../../hooks/useLanguage";
import { useState } from "react";
import DefaultTabs from "../../Mixed/Tabs";
import DefaultButton from "../../Mixed/Button";
import { LuPlusCircle } from "react-icons/lu";

export default function ConnectionsProtectedSkeleton() {
	const l = useLanguage();
	const [activeTab, setActiveTab] = useState("connections");

	const tabs = [
		{
			id: "connections",
			label: l.dashboard.connections.title,
			component: <Skeleton />,
		},
		{
			id: "guilds",
			label: l.dashboard.guilds.title,
			component: <Skeleton />,
		},
		{
			id: "teams",
			label: l.dashboard.teams.title,
			component: <Skeleton />,
		},
	];

	return (
		<DefaultLayout>
			<div className="flex flex-col gap-6 w-full">
				<DefaultTabs
					cursor="bg-neutral-800"
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					tabs={tabs}
				/>
				{tabs.find((t) => t.id === activeTab)?.component}
			</div>
		</DefaultLayout>
	);
}

function Skeleton() {
	const l = useLanguage();

	return (
		<div className="flex w-full items-start flex-col gap-4 z-10 tablet:px-3">
			<div className="flex flex-col gap-2">
				<div className="font-bold text-3xl">
					{l.dashboard.connections.title}
				</div>
				<div className="text-neutral-300">
					{l.dashboard.connections.description}
				</div>
			</div>
			<div className="flex w-full h-full gap-1">
				<Input
					classNames={{
						inputWrapper:
							"rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
					}}
					type="string"
					label={l.dashboard.misc.filterConnections}
				/>
				<DefaultButton divclass="w-fit" className="w-[52px]">
					<LuPlusCircle size={20} />
				</DefaultButton>
			</div>
			<div className="grid grid-cols-3 gap-3 w-full tablet:grid-cols-2 mobile:grid-cols-1">
				<ConnectionsSkeleton />
			</div>
		</div>
	);
}

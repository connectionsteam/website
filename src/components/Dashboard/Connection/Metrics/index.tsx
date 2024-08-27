import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../../../utils/api";
import type { ConnectionMetrics, ConnectionPayload } from "../../../../types";
import { useLanguage } from "../../../../hooks/useLanguage";
import ChartComponent from "./Chart";

interface Props {
	connection: ConnectionPayload;
}

export default function PromotedMetricsComponent({ connection }: Props) {
	const [metrics, setMetrics] = useState<ConnectionMetrics>();
	const l = useLanguage();
	const seven_days = 7 * 24 * 60 * 60 * 1000;

	const fetchMetrics = async () => {
		const { data } = await api.get(`/connections/${connection.name}/metrics`);

		setMetrics(data);
	};

	useEffect(() => {
		fetchMetrics();
	}, []);

	const lastViews = metrics?.views.filter(
		(view) => new Date(view).getTime() > Date.now() - seven_days,
	);

	const lastServers = metrics?.servers.filter(
		(view) => new Date(view).getTime() > Date.now() - seven_days,
	);

	const views =
		metrics?.views && metrics.views.length > 1
			? l.dashboard.connections.metrics.visualizations.title
			: l.dashboard.connections.metrics.visualizations.visu;

	const servers =
		metrics?.servers && metrics.servers.length > 1
			? l.dashboard.connections.metrics.servers.title
			: l.dashboard.connections.metrics.servers.serv;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="bg-neutral-800 w-full rounded-lg p-4 flex flex-col gap-4"
		>
			{metrics ? (
				<div className="flex flex-col gap-3">
					<div>
						<div className="flex items-center gap-2">
							<h1 className="font-bold text-xl">
								{l.dashboard.connections.metrics.title}
							</h1>
							<div className="rounded-full bg-gradient-to-r from-pink-600 to-rose-700 px-2 text-sm mt-1">
								{l.dashboard.connections.promotedRecurse}
							</div>
						</div>
						<span className="text-neutral-300">
							{l.dashboard.connections.metrics.description}
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-2">
							<h2 className="font-bold text-lg">
								{l.dashboard.connections.metrics.visualizations.title}
							</h2>
							<div className="bg-neutral-900/50 rounded-lg w-full p-4 flex flex-col gap-2">
								{lastViews?.length === 0 ? (
									<span>
										{l.dashboard.connections.metrics.visualizations.noViews}
									</span>
								) : (
									<>
										<div>
											{l.dashboard.connections.metrics.visualizations.has}
											<span className="font-bold text-lg">
												{" "}
												{metrics.views?.length}{" "}
											</span>
											{views}{" "}
											{l.dashboard.connections.metrics.visualizations.total}
										</div>
										<div>
											<span className="text-[#0DF228] font-bold text-lg">
												+{lastViews?.length ?? 0}{" "}
											</span>
											{views}{" "}
											{l.dashboard.connections.metrics.visualizations.lastseven}
										</div>
									</>
								)}
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<h2 className="font-bold text-lg">
								{l.dashboard.connections.metrics.servers.title}
							</h2>
							<div className="bg-neutral-900/50 rounded-lg w-full p-4 flex flex-col gap-2">
								<div>
									{metrics?.servers.length === 0 ? (
										<span>
											{l.dashboard.connections.metrics.servers.noServers}
										</span>
									) : (
										<>
											<div>
												{l.dashboard.connections.metrics.servers.servers}
												<span className="font-bold text-lg">
													{" "}
													{metrics.servers.length}{" "}
												</span>
												{servers}
											</div>
											<div>
												<span className="text-[#0DF228] font-bold text-lg">
													+{lastServers?.length ?? 0}{" "}
												</span>
												{l.dashboard.connections.metrics.servers.connections}
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<h2 className="font-bold text-lg">Feedbacks</h2>
							<div className="bg-neutral-900/50 rounded-lg w-full p-3 flex flex-col gap-2 items-center justify-center">
								<div className="text-lg">
									👀 {l.dashboard.connections.metrics.feedbacks.commingSoon}
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<h2 className="font-bold text-lg">
								{l.dashboard.connections.metrics.graphic}
							</h2>
							<ChartComponent
								views={metrics?.views}
								servers={metrics?.servers}
								feedbacks={metrics?.feedbacks}
							/>
						</div>
					</div>
				</div>
			) : (
				<div>oi</div>
			)}
		</motion.div>
	);
}

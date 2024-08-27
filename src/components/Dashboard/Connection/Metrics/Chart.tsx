import { Line } from "react-chartjs-2";
import {
	Chart,
	LinearScale,
	LineElement,
	PointElement,
	CategoryScale,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import type { ConnectionMetrics } from "../../../../types";
import { useLanguage } from "../../../../hooks/useLanguage";

Chart.register(
	LinearScale,
	LineElement,
	PointElement,
	CategoryScale,
	Title,
	Tooltip,
	Legend,
);

const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
const PERIODS = {
	SEVEN_DAYS: 7 * MILLISECONDS_IN_A_DAY,
	FOURTEEN_DAYS: 14 * MILLISECONDS_IN_A_DAY,
	THIRTY_DAYS: 30 * MILLISECONDS_IN_A_DAY,
};

const countViewsInPeriod = (views: number[], period: number): number => {
	const now = Date.now();
	return views.filter((view) => now - view <= period).length;
};

export default function ChartComponent({
	views,
	servers,
	feedbacks,
}: ConnectionMetrics) {
	const l = useLanguage();

	const viewsInLast7Days = countViewsInPeriod(views, PERIODS.SEVEN_DAYS);
	const viewsInLast14Days =
		countViewsInPeriod(views, PERIODS.FOURTEEN_DAYS) - viewsInLast7Days;
	const viewsInLast30Days =
		countViewsInPeriod(views, PERIODS.THIRTY_DAYS) -
		viewsInLast14Days -
		viewsInLast7Days;
	const viewsOlderThan30Days =
		views.length - viewsInLast30Days - viewsInLast14Days - viewsInLast7Days;

	const serversInLast7Days = countViewsInPeriod(servers, PERIODS.SEVEN_DAYS);
	const serversInLast14Days =
		countViewsInPeriod(servers, PERIODS.FOURTEEN_DAYS) - serversInLast7Days;
	const serversInLast30Days =
		countViewsInPeriod(servers, PERIODS.THIRTY_DAYS) -
		serversInLast14Days -
		serversInLast7Days;
	const serversOlderThan30Days =
		servers.length -
		serversInLast30Days -
		serversInLast14Days -
		serversInLast7Days;

	const feedbacksInLast7Days = countViewsInPeriod(
		feedbacks,
		PERIODS.SEVEN_DAYS,
	);
	const feedbacksInLast14Days =
		countViewsInPeriod(feedbacks, PERIODS.FOURTEEN_DAYS) - feedbacksInLast7Days;
	const feedbacksInLast30Days =
		countViewsInPeriod(feedbacks, PERIODS.THIRTY_DAYS) -
		feedbacksInLast14Days -
		feedbacksInLast7Days;
	const feedbacksOlderThan30Days =
		feedbacks.length -
		feedbacksInLast30Days -
		feedbacksInLast14Days -
		feedbacksInLast7Days;

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	if (!ctx) return;

	const gradient = ctx.createLinearGradient(0, 0, 0, 400);
	gradient.addColorStop(0, "#f472b6");
	gradient.addColorStop(1, "#E85785");

	const discordGradient = ctx.createLinearGradient(0, 0, 0, 400);
	discordGradient.addColorStop(0, "#7289da");
	discordGradient.addColorStop(1, "#ABBCFA");

	const feedbacksGradient = ctx.createLinearGradient(0, 0, 0, 400);
	feedbacksGradient.addColorStop(0, "#2BE76A");
	feedbacksGradient.addColorStop(1, "#71F89E");

	const data: ChartData<"line", number[]> = {
		labels: [
			l.dashboard.connections.metrics.days.older,
			l.dashboard.connections.metrics.days.month,
			l.dashboard.connections.metrics.days.fourteen,
			l.dashboard.connections.metrics.days.seven,
		],
		datasets: [
			{
				label: "Views",
				data: [
					viewsOlderThan30Days,
					viewsInLast14Days,
					viewsInLast7Days,
					viewsInLast30Days,
				],
				backgroundColor: gradient,
				borderColor: gradient,
				borderWidth: 2,
				pointBackgroundColor: "#be123c",
				pointBorderColor: "#ec4899",
			},
			{
				label: "Servers",
				data: [
					serversOlderThan30Days,
					serversInLast14Days,
					serversInLast7Days,
					serversInLast30Days,
				],
				backgroundColor: "#7289da",
				borderColor: "#7289da",
				borderWidth: 2,
				pointBackgroundColor: "#ABBCFA",
				pointBorderColor: "#ABBCFA",
			},
			{
				label: "Feedbacks",
				data: [
					feedbacksOlderThan30Days,
					feedbacksInLast14Days,
					feedbacksInLast7Days,
					feedbacksInLast30Days,
				],
				backgroundColor: feedbacksGradient,
				borderColor: feedbacksGradient,
				borderWidth: 2,
				pointBackgroundColor: "#2BE76A",
				pointBorderColor: "#2BE76A",
			},
		],
	};

	const options: ChartOptions<"line"> = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<div>
			<Line data={data} options={options} />
		</div>
	);
}

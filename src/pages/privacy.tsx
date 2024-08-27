import DefaultLayout from "../components/Mixed/Layout";
import { useLanguage } from "../hooks/useLanguage";

export default function PolicyPage() {
	const l = useLanguage();

	return (
		<DefaultLayout>
			<h1 className="font-bold text-2xl">{l.policy.title}</h1>
			<div className="flex flex-col gap-2">
				<p>{l.policy.intro}</p>
				<ul className="flex flex-col gap-2 ml-2 list-disc">
					<li>{l.policy.dataCollection}</li>
					<li>{l.policy.username}</li>
					<li>{l.policy.serverInfo}</li>
					<li>{l.policy.messages}</li>
					<li>{l.policy.activities}</li>
					<li>{l.policy.noSensitiveData}</li>
					<li>{l.policy.dataSecurity}</li>
					<li>{l.policy.changes}</li>
				</ul>
				<p className="font-bold">{l.policy.contact}</p>
			</div>
		</DefaultLayout>
	);
}

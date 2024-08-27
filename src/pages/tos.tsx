import DefaultLayout from "../components/Mixed/Layout";
import { useLanguage } from "../hooks/useLanguage";

export default function TosPage() {
	const l = useLanguage();

	return (
		<DefaultLayout>
			<div className="flex flex-col gap-2">
				<h1 className="font-bold text-2xl">{l.tos.title}</h1>
				<div>
					<p>{l.tos.intro1}</p>
					<p>{l.tos.intro2}</p>
					<p>{l.tos.intro3}</p>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<h2 className="font-bold text-lg">{l.tos.prohibited.title}</h2>
						<ul className="list-disc ml-4 flex flex-col gap-2">
							<li>{l.tos.prohibited.item1}</li>
							<li>{l.tos.prohibited.item2}</li>
							<li>{l.tos.prohibited.item3}</li>
							<li>{l.tos.prohibited.item4}</li>
							<li>{l.tos.prohibited.item5}</li>
							<li>{l.tos.prohibited.item6}</li>
							<li>{l.tos.prohibited.item7}</li>
							<li>{l.tos.prohibited.item8}</li>
						</ul>
					</div>
					<div className="flex flex-col gap-2">
						<h2 className="font-bold text-lg">{l.tos.discordRules.title}</h2>
						<ul className="list-disc ml-4 flex flex-col gap-2">
							<li>{l.tos.discordRules.item1}</li>
							<li>{l.tos.discordRules.item2}</li>
							<li>{l.tos.discordRules.item3}</li>
						</ul>
					</div>
					<div className="flex flex-col gap-2">
						<h2 className="font-bold text-lg">{l.tos.limitations.title}</h2>
						<ul className="list-disc ml-4 flex flex-col gap-2">
							<li>{l.tos.limitations.item1}</li>
							<li>{l.tos.limitations.item2}</li>
							<li>{l.tos.limitations.item3}</li>
						</ul>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}

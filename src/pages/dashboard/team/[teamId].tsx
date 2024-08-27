import { useRouter } from "next/router";
import TeamPageComponent from "../../../components/Dashboard/Team";

export default function TeamsPage() {
	const {
		query: { teamId },
	} = useRouter();

	return <TeamPageComponent teamId={teamId as string} />;
}

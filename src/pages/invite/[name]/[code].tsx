import { useRouter } from "next/router";
import DashboardPage from "../../dashboard";

export default function Invite() {
	const { query } = useRouter();

	const code = query.code?.toString() ?? "";
	const name = query.name?.toString() ?? "";

	return <DashboardPage query={{ code, name }} />;
}

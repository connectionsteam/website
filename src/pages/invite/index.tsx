import { useEffect } from "react";
import { useIsClient } from "../../contexts/Client";

export default function Invite() {
	const isClient = useIsClient();

	if (!isClient) return null;

	useEffect(() => {
		window.location.href =
			"https://discord.com/oauth2/authorize?client_id=1243234162077470802";
	}, []);
}

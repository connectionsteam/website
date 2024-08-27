"use client";
import { IsClientProvider } from "../contexts/Client";
import { LanguageProvider } from "../contexts/Language";
import { NotificationsProvider } from "../contexts/Notification";
import { UserProvider } from "../contexts/User";
import { NextUIProvider } from "@nextui-org/react";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<NextUIProvider>
			<NotificationsProvider>
				<UserProvider>
					<LanguageProvider>
						<IsClientProvider>{children}</IsClientProvider>
					</LanguageProvider>
				</UserProvider>
			</NotificationsProvider>
		</NextUIProvider>
	);
}

import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

const IsClientCtx = createContext(false);

export const IsClientProvider = ({ children }: { children: ReactNode }) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<IsClientCtx.Provider value={isClient}>{children}</IsClientCtx.Provider>
	);
};

export function useIsClient() {
	return useContext(IsClientCtx);
}

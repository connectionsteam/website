import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { useIsClient } from "@/contexts/Client";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const isClient = useIsClient();
    const router = useRouter();

    useEffect(() => {
        if (!isClient) return;
        
        const fetchAuth = async () => {
            try {
                const token = await api.get("/auth/user");

                if (token.data) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    window.location.href = "/login"; 
                }
            } catch {
                setIsAuthenticated(false);
                window.location.href = "/login"; 
            }
        };

        fetchAuth();
    }, [router]);

    return { isAuthenticated };
};

export default useAuth;

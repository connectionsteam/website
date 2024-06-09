import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const token = await api.get("/auth/user");

                if (token.data) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.push("/login");
                }
            } catch (error) {
                setIsAuthenticated(false);
                router.push("/login");
            }
        };

        fetchAuth();
    }, [router]);

    return { isAuthenticated };
};

export default useAuth;

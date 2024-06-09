import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({ children, loading }: { children: ReactNode, loading: ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated === false) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated === null) {
        return <>{loading}</>; 
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

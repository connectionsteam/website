import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({ children, loading }: { children: ReactNode, loading: ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    // return <>{loading}</>;

    useEffect(() => {
        if (isAuthenticated === false) {
            window.location.href = "/login"; 
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

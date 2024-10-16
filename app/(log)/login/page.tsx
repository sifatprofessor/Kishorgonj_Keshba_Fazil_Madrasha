"use client"
import { redirect, useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm/LoginForm";
import { MenuBar } from "@/components/Navbar/MenuBar";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

const Login: React.FC = () => {
    const { data: session }: { data: Session | null } = useSession();
    const router = useRouter();

    return (
        <div className="relative">
            <div className="sticky top-0">
                <MenuBar />
            </div>
            <LoginForm />
        </div>
    );
};

export default Login;

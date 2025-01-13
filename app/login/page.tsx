/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

const LoginForm = dynamic(() => import("@/components/LoginForm/LoginForm"), { ssr: false });
const MenuBar = dynamic(() => import("@/components/Navbar/MenuBar").then((mod) => mod.default));

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

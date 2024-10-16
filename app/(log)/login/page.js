"use client"
import { redirect, useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm/LoginForm";
import { MenuBar } from "@/components/Navbar/MenuBar";
import { useSession } from "next-auth/react";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  
  return (
    <div className="relative">
    <div className="sticky top-0">
    <MenuBar/>
    </div>
      <LoginForm />
    </div>
  );
};

export default Login;

"use client";
import Lottie from "lottie-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import toast from "react-hot-toast";
import LoginAnimation from "../../assets/LoginAnimation.json";
import InputField from "../InputField/InputField";
import Spinner from "../Loading/Spinner";
import '../Navbar/menu.css';

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formFilled, setFormFilled] = useState(false);

    useEffect(() => {
        if (email && password) {
            setFormFilled(true);
        }
    }, [email, password]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
        const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
        const response = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (response?.error) {
            setLoading(false);
            toast.error("Login Fail!");

        } else {
            setLoading(false);
            toast.success("Successfully login!");
            router.push("/dashboard");
        }
    };

    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="Navbar hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <Lottie
                    style={{ height: "90vh", marginTop: "90px" }}
                    animationData={LoginAnimation}
                />
            </div>

            <div
                id="range"
                className="w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12   flex items-center justify-center"
            >
                <section className="w-full h-100">
                    <div className="flex items-center justify-center">
                        <p className="text-center text-3xl">
                            <span className="text-3xl font-black">
                                কিশোরগঞ্জ কেশবা ফাজিল মাদরাসা
                            </span>
                        </p>
                    </div>

                    <h1 className="text-xl md:text-2xl font-bold leading-tight text-center mt-2">
                        Log in to Admin Panel
                    </h1>

                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700">User Name</label>
                            <InputField
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Enter Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg mt-2text-gray-700 bg-white border focus:border-purple-400 dark:focus:border-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-purple-300"
                                autoFocus
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Password</label>
                            <InputField
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg mt-2 text-gray-700 bg-white border focus:border-purple-400 dark:focus:border-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-purple-300"
                                required
                            />
                        </div>

                        <div className="text-right mt-2">
                            <a
                                href="#"
                                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        {formFilled ? (
                            !loading ? (
                                <button
                                    type="submit"
                                    className="w-full block bg-purple-400 hover:bg-purple-500 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                                >
                                    Log In
                                </button>
                            ) : (
                                <Spinner />
                            )
                        ) : (
                            <div className="h-20">
                                <button
                                    type="submit"
                                    className=" block bg-purple-400 hover:bg-purple-500 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-4 w-full"
                                >
                                    Log In
                                </button>
                            </div>
                        )}
                    </form>
                    <hr className="my-6 border-gray-300 w-full" />
                </section>
            </div>
        </section>
    );
};

export default LoginForm;

"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import ErrorAnimation from "@/public/404.json";

const NotFound: React.FC = () => {
    const router = useRouter();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "100vh",
            }}
        >
            <div>
                <Lottie
                    animationData={ErrorAnimation}
                    style={{
                        maxWidth: "600px",
                        maxHeight: "600px",
                        margin: "0 auto",
                    }}
                />
            </div>
            <div style={{ textAlign: "center", marginTop: "-20px" }}>
                <h1 className="text-4xl font-bold">404</h1>
                <h2 className="text-2xl font-bold">Page Not Found</h2>
                <button
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "20px",
                        backgroundColor: "#8B5CF6",
                        color: "white",
                        border: "2px solid #7C3AED",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;

import Navbar from "@/components/Navbar/Navbar";
import "../globals.css";
import MenuBar from "@/components/Navbar/MenuBar";
import Footer from "@/components/Footer/Footer";
import { ReactNode } from "react";

interface MetadataParams {
    params: Record<string, unknown>;
}

export async function generateMetadata({ }: MetadataParams) {
    return {
        title: `Kishorgonj Keshba Fazil Madrasha | Home`,
        description: "Created by MD. Abdur Rahman Sifat",
    };
}

interface HomeLayoutProps {
    children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <section>
            <Navbar data-testid="nab" />
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    zIndex: 20,
                    transition: "ease-in-out",
                }}
            >
                <MenuBar />
            </div>

            <div className="px-4 lg:px-20 mx-auto">{children}</div>
            <Footer />
        </section>
    );
}

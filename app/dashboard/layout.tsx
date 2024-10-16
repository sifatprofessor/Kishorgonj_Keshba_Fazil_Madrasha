import DashNav from "@/components/Navbar/DashNav/DashNav";
import "../globals.css";

export const metadata = {
    title: "Madrasha || Admin Panel",
    description: "Generated by Sifat",
};

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <section>
            <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
                <div>
                    <DashNav />
                </div>
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        backgroundImage: "url('https://utfs.io/f/1eb265aa-e8ff-46f6-a75d-cb71f9b08205-2f9.png')",
                    }}
                    className="mt-16 lg:mt-12 px-4 md:px-10"
                >
                    {children}
                </div>
            </div>
        </section>
    );
};

export default DashboardLayout;

import { useEffect, useState } from "react";

function useDarkTheme(): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [mode, setMode] = useState<string>("");

    useEffect(() => {
        const preferDarkTheme = "(prefers-color-scheme: dark)";
        const userPref = window.localStorage.getItem("theme");
        const mediaQuery = window.matchMedia(preferDarkTheme);

        const handleTheme = () => {
            let check: string;
            if (userPref) {
                check = userPref === "dark" ? "dark" : "light";
            } else {
                check = mediaQuery.matches ? "dark" : "light";
            }
            setMode(check);
            if (check === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        };

        mediaQuery.addEventListener("change", handleTheme);
        handleTheme();

        return () => {
            mediaQuery.removeEventListener("change", handleTheme);
        };
    }, []);

    useEffect(() => {
        if (mode === "dark") {
            window.localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else if (mode === "light") {
            window.localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    return [mode, setMode];
}

export default useDarkTheme;

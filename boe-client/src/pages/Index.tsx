import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
export default function Index() {
    useEffect(() => {
        document.title = "BOE Analyzer - Analizador Profesional del Boletín Oficial del Estado";
    });
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                <HeroSection />
            </main>
        </div>
    );
};
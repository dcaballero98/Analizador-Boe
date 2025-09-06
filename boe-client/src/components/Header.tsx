import { useLocation, useNavigate } from "react-router-dom";
import { Search, Scale, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <Scale className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-xl font-bold text-foreground">BOE Analyzer</h1>
                            <p className="text-xs text-muted-foreground">Analizador del Boletín Oficial del Estado</p>
                        </div>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <Button 
                        variant={location.pathname === '/search' ? "professional" : "ghost"}
                        className="gap-2"
                        onClick={() => navigate('/search')}
                    >
                        <Search className="h-4 w-4" />
                        Buscar
                    </Button>
                    <Button 
                        variant={location.pathname === '/documents' ? "professional" : "ghost"}
                        className="gap-2"
                        onClick={() => navigate('/documents')}
                    >
                        <FileText className="h-4 w-4" />
                        Documentos
                    </Button>
                    <Button variant="professional">
                        Acceso Profesional
                    </Button>
                </nav>
            </div>
        </header>
    );
};
import { useNavigate } from "react-router-dom";
import { useBoeDailyStats } from "@/hooks/useBoeDailyStats";
import heroBg from "../assets/hero-bg.jpg";
import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

const HeroSection = () => {
    const navigate = useNavigate();
    const stats = useBoeDailyStats();
  
    return (
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.8) 100%), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Analizador
                  <span className="block text-accent">BOE</span>
                  Profesional
                </h1>
                <p className="text-xl text-blue-100 max-w-lg">
                  La herramienta más avanzada para buscar, analizar y monitorizar 
                  el Boletín Oficial del Estado español
                </p>
              </div>
  
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="gap-2 bg-white text-primary hover:bg-white/90"
                  onClick={() => navigate('/search')}
                >
                  Comenzar análisis
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => navigate('/documents')}
                >
                  Ver demo
                </Button>
              </div>
  
              <div className="flex items-center gap-8 text-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">IA</div>
                  <div className="text-sm">Análisis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99%</div>
                  <div className="text-sm">Documentos</div>
                </div>
              </div>
            </div>
  
            <div className="hidden lg:block">
              <Card className="p-6 card-shadow bg-white/95 backdrop-blur">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Actividad Legislativa</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                      <span className="text-sm font-medium">Nuevas Leyes</span>
                      <span className="text-primary font-bold">+10</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-accent/5">
                      <span className="text-sm font-medium">Real Decretos</span>
                      <span className="text-accent-foreground font-bold">+13</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                      <span className="text-sm font-medium">Órdenes</span>
                      <span className="text-secondary-foreground font-bold">+258</span>
                    </div>
                  </div>
  
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center">
                      Datos actualizados en tiempo real
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
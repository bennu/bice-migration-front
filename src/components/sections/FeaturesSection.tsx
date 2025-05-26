import { Box, Typography, Grid, CardContent, alpha } from "@mui/material";
import { Storage, Code, CloudUpload, Assessment } from "@mui/icons-material";
import { GlassCard } from "@/components/common/GlassCard";
import { Feature } from "@/types/migration.types";
import { useState, useEffect, useRef } from "react";

const features: Feature[] = [
  {
    icon: <CloudUpload sx={{ fontSize: 36 }} />,
    title: "Carga Masiva de Operaciones",
    description:
      "Genera scripts SQL optimizados para la carga masiva de grandes volúmenes de operaciones bancarias en segundos.",
    color: "#667eea",
  },
  {
    icon: <Code sx={{ fontSize: 36 }} />,
    title: "Scripts Personalizados por Parámetro",
    description:
      "Adapta la generación de scripts SQL según la cantidad de operaciones y detalles requeridos por el usuario.",
    color: "#10b981",
  },
  {
    icon: <Storage sx={{ fontSize: 36 }} />,
    title: "Compatibilidad Multi-Base de Datos",
    description:
      "Soporta generación de scripts para diferentes motores de base de datos como SQL Server, PostgreSQL y Oracle.",
    color: "#ec4899",
  },
  {
    icon: <Assessment sx={{ fontSize: 36 }} />,
    title: "Validación y Reporte de Resultados",
    description:
      "Incluye validaciones automáticas y reportes de éxito o error tras la ejecución de los scripts generados.",
    color: "#f59e0b",
  },
];

export default function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(features.length).fill(false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleCards(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          },
          {
            threshold: 0.3, // Se activa cuando el 30% del elemento es visible
            rootMargin: "0px 0px -50px 0px", // Offset para activar un poco antes
          }
        );
        observer.observe(cardRef);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <Box
      sx={{
        mt: 12,
        background: "linear-gradient(135deg, #18192a 0%, #1a1a2e 100%)",
        borderRadius: 4,
        boxShadow: 3,
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          background: "linear-gradient(135deg, #b3baff 0%, #94a3b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 6,
        }}
      >
        Características Principales
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {features.map((feature, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            <Box
              ref={el => cardRefs.current[index] = el}
              sx={{
                transform: visibleCards[index] ? "translateY(0px) scale(1)" : "translateY(40px) scale(0.95)",
                opacity: visibleCards[index] ? 1 : 0,
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDelay: `${index * 150}ms`, // Delay escalonado
              }}
            >
              <GlassCard
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 200,
                  minWidth: 180,
                  maxWidth: 220,
                  background: "rgba(24,25,42,0.85)",
                  height: 300,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 16px 40px ${alpha(feature.color, 0.3)}`,
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    p: 3,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      p: 1.5,
                      borderRadius: "50%",
                      backgroundColor: alpha(feature.color, 0.12),
                      color: "#b3baff",
                      mb: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: alpha(feature.color, 0.2),
                        transform: "rotate(10deg) scale(1.1)",
                      },
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ 
                      color: "#b3baff", 
                      fontWeight: 600,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ 
                      color: "#b3baff", 
                      opacity: 0.8, 
                      fontSize: 13,
                      transition: "opacity 0.3s ease",
                    }}
                    textAlign={"justify"}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </GlassCard>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
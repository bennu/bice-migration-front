// components/layout/BackgroundElements.tsx
import { Box } from "@mui/material";
import { pulse } from "@/styles/animations";

export default function BackgroundElements() {
  return (
    <>
      {/* Elemento principal más sutil */}
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(25, 118, 210, 0.06) 0%, transparent 70%)",
          top: "-200px",
          right: "-200px",
          animation: `${pulse} 8s ease-in-out infinite`,
          zIndex: -1,
        }}
      />

      {/* Elemento secundario corporativo */}
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(46, 125, 50, 0.04) 0%, transparent 70%)",
          bottom: "-100px",
          left: "-100px",
          animation: `${pulse} 10s ease-in-out infinite`,
          zIndex: -1,
        }}
      />

      {/* Patrón de grid sutil */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(rgba(25, 118, 210, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(25, 118, 210, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          zIndex: -2,
        }}
      />

      {/* Gradiente corporativo de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)",
          zIndex: -3,
        }}
      />
    </>
  );
}

// styles/theme.ts
import { createTheme, PaletteMode } from "@mui/material/styles";

// Función para crear el tema basado en el modo (light/dark)
export const getTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#6366f1",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#ec4899",
        contrastText: "#ffffff",
      },
      ...(mode === "dark"
        ? {
            // Configuración para tema oscuro
            background: {
              default: "#0a0a0a",
              paper: "rgba(255, 255, 255, 0.05)",
            },
            text: {
              primary: "#ffffff",
              secondary: "rgba(255, 255, 255, 0.7)",
            },
          }
        : {
            // Configuración para tema claro
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            text: {
              primary: "#1a1a1a",
              secondary: "rgba(0, 0, 0, 0.6)",
            },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      // Sobreescribir estilos de componentes específicos para ambos modos
      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(20px)",
            border: "1px solid",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            borderRadius: "20px",
            transition: "all 0.3s ease-in-out",
            ...(mode === "dark"
              ? {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.5)",
                    borderColor: "rgba(99, 102, 241, 0.3)",
                  },
                }
              : {
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.5)",
                    borderColor: "rgba(99, 102, 241, 0.3)",
                  },
                }),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            padding: "12px 30px",
            fontSize: "16px",
            fontWeight: 600,
            transition: "all 0.3s ease",
          },
        },
      },
    },
  });
};

// Tema por defecto (puede ser eliminado si solo usas getTheme)
export const theme = getTheme("dark");

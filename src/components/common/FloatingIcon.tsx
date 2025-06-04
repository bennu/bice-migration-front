// components/common/FloatingIcon.tsx
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { float } from "@/styles/animations";

export const FloatingIcon = styled(Box)(({}) => ({
  animation: `${float} 3s ease-in-out infinite`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

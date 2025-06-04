// components/ui/LoadingProgress.tsx
import { Box, LinearProgress, Typography, alpha } from '@mui/material'

export default function LoadingProgress() {
  return (
    <Box sx={{ mt: 4 }}>
      <LinearProgress
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: alpha('#667eea', 0.1),
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
          }
        }}
      />
      <Typography align="center" sx={{ mt: 2 }} color="text.secondary">
        Generando script de migración SQL...
      </Typography>
    </Box>
  )
}

// components/sections/HeroSection.tsx
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Fade,
  alpha
} from '@mui/material'
import { Verified } from '@mui/icons-material'
import AnimatedDatabase from '@/components/ui/AnimatedDatabase'

export default function HeroSection() {
  return (
    <Container maxWidth="lg" sx={{ pt: 6, pb: 10 }}>
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Fade in timeout={1000}>
            <Box>
              {/* Badge corporativo */}
              <Chip
                icon={<Verified />}
                label="Solución Empresarial Certificada"
                sx={{
                  mb: 3,
                  backgroundColor: alpha('#1976d2', 0.1),
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  fontWeight: 500,
                  '& .MuiChip-icon': { color: '#1976d2' }
                }}
                variant="outlined"
              />

              <Typography
                variant="h1"
                fontWeight={700}
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  background: '#1754c9',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                Generador de Scripts de Data Mock
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  maxWidth: '500px',
                  color: '#64748b'
                }}
              >
                Transfiera y procese grandes volúmenes de datos con la máxima
                seguridad, cumplimiento normativo y eficiencia operacional que
                su institución requiere.
              </Typography>
            </Box>
          </Fade>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <AnimatedDatabase />
        </Grid>
      </Grid>
    </Container>
  )
}

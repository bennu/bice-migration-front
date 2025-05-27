import { Box, Typography, Fade } from '@mui/material'
import { GradientButton } from '@/components/common/GradientButton'

export default function CallToAction() {
  return (
    <Box sx={{ mt: 12, textAlign: 'center' }}>
      <Fade in timeout={3000}>
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ¿Listo para modernizar tu infraestructura bancaria?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Únete a las principales entidades financieras que confían en nuestra
            solución
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <GradientButton size="large">Comenzar Ahora</GradientButton>
          </Box>
        </Box>
      </Fade>
    </Box>
  )
}

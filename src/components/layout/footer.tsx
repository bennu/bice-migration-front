// components/layout/Footer.tsx
import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
  alpha,
  useTheme
} from '@mui/material'
import { Code, PlayArrow } from '@mui/icons-material'

const Footer = () => {
  const year = new Date().getFullYear()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        bgcolor: theme.palette.background.paper,
        borderTop: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.2 : 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: '2fr repeat(4, 1fr)'
            },
            gap: 4
          }}
        >
          <Box sx={{ gridColumn: { xs: '1 / -1', md: '1' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 1000,
                  backgroundColor: 'transparent',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease-in-out',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Container maxWidth="lg">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    {/* Logo SQL compuesto */}
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        background:
                          'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(16,185,129,0.1) 100%)',
                        borderRadius: 2,
                        p: 1,
                        border: '1px solid rgba(102,126,234,0.2)'
                      }}
                    >
                      {/* Icono principal - Code (representa SQL) */}
                      <Code
                        sx={{
                          fontSize: 32,
                          color: '#667eea',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          zIndex: 1
                        }}
                      />
                      {/* Icono de ejecución - PlayArrow */}
                      <PlayArrow
                        sx={{
                          fontSize: 16,
                          color: '#10b981',
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        overflow: 'hidden',
                        width: 'auto',
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                          background:
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: 'translateX(0px)',
                          opacity: 1,
                          whiteSpace: 'nowrap',
                          minWidth: '180px'
                        }}
                      >
                        Bulk Loader
                      </Typography>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              align="justify"
              sx={{ color: theme.palette.text.secondary }}
            >
              Herramienta simple y eficiente para generar cargas masivas de
              datos en bases de datos SQL.
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              component="a"
              href="https://bennu.cl"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: 'none',
                color: theme.palette.text.secondary
              }}
            >
              powered by bennu
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              Empresa
            </Typography>
            <Stack spacing={1}>
              <Link
                component="button"
                variant="body2"
                underline="none"
                sx={{
                  textAlign: 'left',
                  color: theme.palette.text.secondary
                }}
                onClick={() => {
                  window.open('https://bennu.cl', '_blank')
                }}
              >
                Acerca de
              </Link>
              <Link
                component="button"
                variant="body2"
                underline="none"
                sx={{
                  textAlign: 'left',
                  color: theme.palette.text.secondary
                }}
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                Contacto
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: theme.palette.divider }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: theme.palette.text.secondary }}
        >
          © {year} Bulk Loader. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer

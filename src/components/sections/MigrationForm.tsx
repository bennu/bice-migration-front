import React, { useState } from 'react'
import {
  Box,
  CardContent,
  Typography,
  Grid,
  TextField,
  Fade,
  alpha,
  Button,
  Paper,
  LinearProgress,
  Chip,
  Container,
  keyframes,
  useTheme
} from '@mui/material'
import {
  CloudUpload,
  Analytics,
  Code,
  DataObject,
  TrendingUp
} from '@mui/icons-material'

// Animaciones keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
  50% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.8), 0 0 30px rgba(102, 126, 234, 0.4); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

export default function MigrationForm() {
  const theme = useTheme()
  const [formData, setFormData] = useState({
    fundCounter: 5,
    operationsMax: 30,
    operationDetailsMax: 8
  })
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  const fields = [
    {
      key: 'fundCounter',
      label: 'Fund Counter',
      icon: Analytics,
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      bgColor: 'rgba(102, 126, 234, 0.1)',
      description: 'Número de fondos a procesar',
      maxValue: 100
    },
    {
      key: 'operationsMax',
      label: 'Operations Max',
      icon: Code,
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      bgColor: 'rgba(236, 72, 153, 0.1)',
      description: 'Máximo de operaciones por lote',
      maxValue: 200
    },
    {
      key: 'operationDetailsMax',
      label: 'Operation Details',
      icon: DataObject,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      description: 'Máximo de detalles por operación',
      maxValue: 50
    }
  ]

  return (
    <Box
      sx={{
        minHeight: '80vh',
        py: 4,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        {/* Header animado */}
        <Fade in timeout={1000}>
          <Box textAlign="center" mb={6}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                mb: 3
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <TrendingUp sx={{ fontSize: 32, color: 'white' }} />
              </Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  background:
                    'linear-gradient(135deg, #b3baff 0%, #667eea 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Configurar Migración
              </Typography>
            </Box>
            <Typography
              variant="h6"
              color="rgba(255,255,255,0.7)"
              fontWeight={300}
            >
              Configura los parámetros para generar tu script de base de datos
            </Typography>
          </Box>
        </Fade>

        {/* Formulario principal */}
        <Fade in timeout={1500}>
          <Paper
            elevation={0}
            sx={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px'
              }
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Box component="form" onSubmit={handleSubmit}>
                {/* Grid de campos mejorado */}
                <Grid container spacing={4} mb={6}>
                  {fields.map((field, index) => {
                    const Icon = field.icon
                    const isHovered = hoveredCard === field.key
                    const isFocused = focusedField === field.key

                    return (
                      <Grid size={{ xs: 12, md: 4 }} key={field.key}>
                        <Fade in timeout={1000 + index * 200}>
                          <Paper
                            elevation={isHovered ? 6 : 2}
                            onMouseEnter={() => setHoveredCard(field.key)}
                            onMouseLeave={() => setHoveredCard(null)}
                            sx={{
                              p: 3,
                              borderRadius: 4,
                              background: field.bgColor,
                              border: `1px solid ${alpha(field.color, 0.3)}`,
                              backdropFilter: 'blur(10px)',
                              transition:
                                'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              position: 'relative',
                              overflow: 'hidden',
                              transform: isHovered
                                ? 'translateY(-1px) scale(1.02)'
                                : 'translateY(0) scale(1)',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(90deg, transparent, ${alpha(
                                  field.color,
                                  0.1
                                )}, transparent)`,
                                transition: 'left 0.5s',
                                ...(isHovered && { left: '100%' })
                              },
                              ...(isFocused && {
                                transform: 'translateY(-8px) scale(1.02)'
                              })
                            }}
                          >
                            {/* Header del campo */}
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={2}
                              mb={3}
                            >
                              <Box
                                sx={{
                                  p: 1.5,
                                  borderRadius: 2,
                                  background: field.gradient,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  animation: isHovered
                                    ? `${pulse} 1s ease-in-out infinite`
                                    : 'none'
                                }}
                              >
                                <Icon sx={{ color: 'white', fontSize: 20 }} />
                              </Box>
                              <Box flex={1}>
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  color="white"
                                  mb={0.5}
                                >
                                  {field.label}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="rgba(255,255,255,0.6)"
                                >
                                  {field.description}
                                </Typography>
                              </Box>
                            </Box>

                            {/* Input con efectos */}
                            <Box position="relative" mb={2}>
                              <TextField
                                fullWidth
                                type="number"
                                value={formData[field.key]}
                                onChange={handleInputChange(field.key)}
                                onFocus={() => setFocusedField(field.key)}
                                onBlur={() => setFocusedField(null)}
                                placeholder="0"
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                    borderRadius: 3,
                                    transition: 'all 0.3s ease',
                                    '& fieldset': {
                                      borderColor: alpha(field.color, 0.3),
                                      borderWidth: 2
                                    },
                                    '&:hover fieldset': {
                                      borderColor: field.color,
                                      borderWidth: 2
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: field.color,
                                      borderWidth: 2,
                                      boxShadow: `0 0 10px ${alpha(
                                        field.color,
                                        0.5
                                      )}`
                                    }
                                  },
                                  '& .MuiOutlinedInput-input': {
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                  }
                                }}
                              />

                              {/* Indicador de valor */}
                              <Box
                                sx={{
                                  position: 'absolute',
                                  right: 12,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  background: field.gradient,
                                  animation: `${pulse} 2s ease-in-out infinite`
                                }}
                              />
                            </Box>
                          </Paper>
                        </Fade>
                      </Grid>
                    )
                  })}
                </Grid>

                {/* Botón de envío mejorado */}
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? null : <CloudUpload />}
                    sx={{
                      px: 6,
                      py: 2,
                      borderRadius: 4,
                      background:
                        'linear-gradient(135deg, #667eea 0%, #ec4899 50%, #10b981 100%)',
                      backgroundSize: '200% 100%',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        backgroundPosition: '100% 0',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
                      },
                      '&:active': {
                        transform: 'translateY(0)'
                      },
                      '&:disabled': {
                        background: 'rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.5)'
                      }
                    }}
                  >
                    {loading ? (
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTop: '2px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            '@keyframes spin': {
                              '0%': { transform: 'rotate(0deg)' },
                              '100%': { transform: 'rotate(360deg)' }
                            }
                          }}
                        />
                        Procesando...
                      </Box>
                    ) : (
                      'Generar Script'
                    )}
                  </Button>
                </Box>
              </Box>

              {/* Indicador de carga */}
              {loading && (
                <Fade in>
                  <Paper
                    sx={{
                      mt: 4,
                      p: 3,
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={3}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          border: '3px solid rgba(102, 126, 234, 0.3)',
                          borderTop: '3px solid #667eea',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}
                      />
                      <Box>
                        <Typography
                          variant="h6"
                          color="white"
                          fontWeight="bold"
                        >
                          Generando script de migración...
                        </Typography>
                        <Typography
                          variant="body2"
                          color="rgba(255,255,255,0.6)"
                        >
                          Por favor espera mientras procesamos tu configuración
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Fade>
              )}
            </CardContent>
          </Paper>
        </Fade>

        {/* Preview de estadísticas */}
        <Fade in timeout={2000}>
          <Grid container spacing={3} mt={4}>
            {fields.map((field, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={field.key}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${alpha(field.color, 0.2)}`,
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      border: `1px solid ${alpha(field.color, 0.5)}`,
                      boxShadow: `0 8px 25px ${alpha(field.color, 0.2)}`
                    }
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body2" color="rgba(255,255,255,0.6)">
                      {field.label}
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        background: field.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {formData[field.key]}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Fade>
      </Container>
    </Box>
  )
}

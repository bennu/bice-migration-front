'use client'

import React, { useState, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Alert,
  Snackbar,
  useTheme,
  alpha
} from '@mui/material'
import {
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { generateMinutelyTwoFactor } from '@bennu-cl/commons-js'

interface PasswordGeneratorProps {
  open: boolean
  onClose: () => void
}

const ModernDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
    borderRadius: '24px',
    border: 'none',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 24px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        : '0 24px 48px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    maxWidth: '420px',
    width: '100%',
    margin: '16px',
    overflow: 'hidden'
  }
}))

const ModernButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.06)'
      : 'rgba(0, 0, 0, 0.03)',
  border: '1px solid',
  borderColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.06)',
  borderRadius: '14px',
  color: theme.palette.text.primary,
  fontWeight: 500,
  textTransform: 'none',
  padding: '14px 20px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
        : 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 100%)',
    opacity: 0,
    transition: 'opacity 0.2s ease'
  },
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.06)',
    borderColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 8px 25px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2)'
        : '0 8px 25px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.08)',
    '&::before': {
      opacity: 1
    }
  },
  '&:active': {
    transform: 'translateY(-1px)',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 4px 15px rgba(0, 0, 0, 0.2)'
        : '0 4px 15px rgba(0, 0, 0, 0.08)'
  },
  '& .MuiButton-startIcon': {
    marginRight: '8px',
    '& svg': {
      fontSize: '1.1rem'
    }
  }
}))


export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({
  open,
  onClose
}) => {
  const theme = useTheme()
  const [code, setCode] = useState('')
  const [length] = useState(4)
  const [timeLeft, setTimeLeft] = useState(60)
  const [copyAlert, setCopyAlert] = useState(false)

  const handleGenerate = useCallback(() => {
    const newCode = generateMinutelyTwoFactor(length)
    setCode(newCode)
    setTimeLeft(60)
  }, [length])

  const handleCopy = useCallback(async () => {
    if (code) {
      try {
        await navigator.clipboard.writeText(code)
        setCopyAlert(true)
      } catch (err) {
        console.error('Failed to copy code:', err)
      }
    }
  }, [code])

  React.useEffect(() => {
    if (open) {
      handleGenerate()
    }
  }, [open, handleGenerate])

  React.useEffect(() => {
    if (timeLeft > 0 && open) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && open) {
      handleGenerate()
    }
  }, [timeLeft, open, handleGenerate])

  const getTimerColor = () => {
    if (timeLeft > 30) return theme.palette.primary.main // #6366f1 (índigo)
    if (timeLeft > 15) return theme.palette.secondary.main // #ec4899 (rosa)
    return '#ef4444' // rojo para urgente
  }

  const getProgressValue = () => {
    return (timeLeft / 60) * 100
  }

  return (
    <>
      <ModernDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Box
          sx={{
            textAlign: 'center',
            pt: 3,
            pb: 2,
            position: 'relative'
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 1
            }}
          >
            Código de Autenticación
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem'
            }}
          >
            Tú código de 2FA
          </Typography>
        </Box>

        <DialogContent sx={{ pt: 0, pb: 4, px: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4
            }}
          >
            {/* Main code display */}
            <Box
              sx={{
                position: 'relative',
                width: 220,
                height: 220,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                isolation: 'isolate',
                overflow: 'hidden',
                borderRadius: '50%'
              }}
            >
              {/* Background circle */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background:
                    theme.palette.mode === 'dark' ? '#1a1a1a' : '#f8f9fa',
                  border: 'none',
                  isolation: 'isolate',
                  zIndex: 1
                }}
              />

              {/* Progress ring track */}
              <CircularProgress
                variant="determinate"
                value={100}
                size={220}
                thickness={4}
                sx={{
                  position: 'absolute',
                  color:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'rgba(0, 0, 0, 0.04)',
                  transform: 'rotate(-90deg)',
                  zIndex: 2
                }}
              />

              {/* Progress ring */}
              <CircularProgress
                variant="determinate"
                value={getProgressValue()}
                size={220}
                thickness={4}
                sx={{
                  position: 'absolute',
                  transform: 'rotate(-90deg)',
                  transition: 'all 0.3s ease',
                  zIndex: 3,
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                    stroke: `url(#progress-gradient-${
                      timeLeft <= 15
                        ? 'urgent'
                        : timeLeft <= 30
                        ? 'warning'
                        : 'safe'
                    })`,
                    filter: 'none'
                  }
                }}
              />

              {/* SVG Gradients */}
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  <linearGradient
                    id="progress-gradient-safe"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                  <linearGradient
                    id="progress-gradient-warning"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#db2777" />
                  </linearGradient>
                  <linearGradient
                    id="progress-gradient-urgent"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="50%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Code content */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  zIndex: 4,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    fontFamily: '"SF Mono", "Monaco", "Consolas", monospace',
                    color: 'text.primary',
                    letterSpacing: '0.15em',
                    cursor: 'pointer',
                    userSelect: 'all',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    lineHeight: 1,
                    '&:hover': {
                      color: getTimerColor(),
                      transform: 'scale(1.05)'
                    },
                    '&:active': {
                      transform: 'scale(0.95)'
                    }
                  }}
                  onClick={handleCopy}
                  title="Click to copy"
                >
                  {code}
                </Typography>
                
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  px: 2,
                  py: 0.5,
                  borderRadius: '12px',
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.06)'
                    : 'rgba(0, 0, 0, 0.04)',
                  width: 'auto',
                }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: getTimerColor(),
                      animation: timeLeft <= 15 ? 'pulse 1s infinite' : 'none',
                      '@keyframes pulse': {
                        '0%': { opacity: 1, transform: 'scale(1)' },
                        '50%': { opacity: 0.7, transform: 'scale(1.2)' },
                        '100%': { opacity: 1, transform: 'scale(1)' },
                      }
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: getTimerColor(),
                      fontWeight: 600,
                      fontSize: '0.8rem'
                    }}
                  >
                    {timeLeft}s
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Action buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                width: '100%',
                maxWidth: 320,
                mt: 1
              }}
            >
              <ModernButton
                onClick={handleCopy}
                startIcon={<CopyIcon />}
                fullWidth
                sx={{
                  flex: 1,
                  '&:hover': {
                    '& .MuiSvgIcon-root': {
                      color: theme.palette.primary.main
                    },
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? alpha(theme.palette.primary.main, 0.1)
                        : alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                Copiar
              </ModernButton>
              <ModernButton
                onClick={handleGenerate}
                startIcon={<RefreshIcon />}
                fullWidth
                sx={{
                  flex: 1,
                  '&:hover': {
                    '& .MuiSvgIcon-root': {
                      color: theme.palette.secondary.main
                    },
                    borderColor: alpha(theme.palette.secondary.main, 0.3),
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? alpha(theme.palette.secondary.main, 0.1)
                        : alpha(theme.palette.secondary.main, 0.05)
                  }
                }}
              >
                Re generar
              </ModernButton>
            </Box>
          </Box>
        </DialogContent>
      </ModernDialog>

      <Snackbar
        open={copyAlert}
        autoHideDuration={2000}
        onClose={() => setCopyAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setCopyAlert(false)}
          severity="success"
          variant="filled"
          sx={{
            borderRadius: '12px',
            fontWeight: 500,
            '& .MuiAlert-icon': {
              color: 'inherit'
            }
          }}
        >
          Codigo copiado al portapapeles!
        </Alert>
      </Snackbar>
    </>
  )
}

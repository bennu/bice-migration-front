'use client'

import React, { useState } from 'react'
import { Fab, useTheme, alpha, Tooltip } from '@mui/material'
import { Security as SecurityIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { PasswordGenerator } from './PasswordGenerator'

const GlassFloatingButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  width: '64px',
  height: '64px',
  backdropFilter: 'blur(20px)',
  border: '1px solid',
  zIndex: 1000,
  animation: 'breathingButton 6s infinite ease-in-out',

  '@keyframes breathingButton': {
    '0%': {
      transform: 'scale(0.95)',
      backgroundColor: theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.4)
        : alpha(theme.palette.primary.main, 0.35),
      borderColor: theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.6)
        : alpha(theme.palette.primary.main, 0.7),
      boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
      color: theme.palette.primary.main
    },
    '50%': {
      transform: 'scale(1.15)',
      backgroundColor: theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.5)
        : alpha(theme.palette.primary.main, 0.45),
      borderColor: theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.7)
        : alpha(theme.palette.primary.main, 0.8),
      boxShadow: `0 20px 56px ${alpha(theme.palette.primary.main, 0.6)}`,
      color: theme.palette.primary.main
    },
    '100%': {
      transform: 'scale(0.95)',
      backgroundColor: theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.4)
        : alpha(theme.palette.primary.main, 0.35),
      borderColor: theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.6)
        : alpha(theme.palette.primary.main, 0.7),
      boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
      color: theme.palette.primary.main
    }
  },

  '&:hover': {
    animation: 'none',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.5)
        : alpha(theme.palette.primary.main, 0.45),
    borderColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.7)
        : alpha(theme.palette.primary.main, 0.8),
    boxShadow: `0 16px 48px ${alpha(theme.palette.primary.main, 0.4)}`,
    transform: 'translateY(-2px) scale(1.1)',
    color: theme.palette.primary.main
  },

  '&:active': {
    transform: 'translateY(0px) scale(1.0)'
  },

  '& .MuiSvgIcon-root': {
    fontSize: '28px',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
    transition: 'inherit'
  },

  '@media (max-width: 600px)': {
    width: '56px',
    height: '56px',
    bottom: '20px',
    right: '20px',
    '& .MuiSvgIcon-root': {
      fontSize: '24px'
    }
  }
}))


export const FloatingPasswordButton: React.FC = () => {
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)

  const handleClick = () => {
    setIsGeneratorOpen(true)
  }

  const handleClose = () => {
    setIsGeneratorOpen(false)
  }

  return (
    <>
      <Tooltip title="Generate 2FA Code" placement="left" arrow>
        <GlassFloatingButton
          onClick={handleClick}
          aria-label="Generate 2FA code"
        >
          <SecurityIcon />
        </GlassFloatingButton>
      </Tooltip>

      <PasswordGenerator open={isGeneratorOpen} onClose={handleClose} />
    </>
  )
}

// components/layout/Header.tsx
import { Box, Container, Typography } from '@mui/material'
import { Code, PlayArrow, TableChart } from '@mui/icons-material'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'transparent',
        borderBottom: isScrolled ? '1px solid' : 'none',
        borderColor: 'divider',
        transition: 'all 0.3s ease-in-out',
        backdropFilter: 'blur(10px)',
        py: isScrolled ? 1 : 2
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
                fontSize: isScrolled ? 24 : 32,
                color: '#667eea',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 1
              }}
            />
            {/* Icono de ejecución - PlayArrow */}
            <PlayArrow
              sx={{
                fontSize: isScrolled ? 12 : 16,
                color: '#10b981',
                position: 'absolute',
                top: isScrolled ? -4 : -6,
                right: isScrolled ? -4 : -6,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </Box>

          <Box
            sx={{
              overflow: 'hidden',
              width: isScrolled ? 0 : 'auto',
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Typography
              variant={isScrolled ? 'h5' : 'h4'}
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isScrolled
                  ? 'translateX(-100px)'
                  : 'translateX(0px)',
                opacity: isScrolled ? 0 : 1,
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
  )
}

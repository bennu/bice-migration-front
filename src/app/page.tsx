'use client'

import React, { useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material'
import { theme } from '@/styles/theme'
import Header from '@/components/layout/Header'
import AnimatedBackground from '@/components/layout/BackgroundElements'
import HeroSection from '@/components/sections/HeroSection'
import MigrationForm from '@/components/sections/MigrationForm'
import FeaturesSection from '@/components/sections/FeaturesSection'
import CallToAction from '@/components/sections/CallToAction'

export default function MigrationLandingPage() {
  const [formData, setFormData] = useState({
    fundCounter: 5,
    operationsMax: 30,
    operationDetailsMax: 8
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {}, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulación de resultado
    setTimeout(() => {
      setResult({
        uuid: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        scriptZip: 'UEsDBAoAAAAAAIdO4kMAAAAAAAAAAAAAAAAJA...'
      })
      setLoading(false)
    }, 2000)
  }

  // Maneja el cambio de los campos del formulario
  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: parseInt(e.target.value) || 0
      })
    }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <AnimatedBackground />
        <Header />
        <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>
          <HeroSection />
          <MigrationForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            loading={loading}
            result={result}
          />
          <FeaturesSection />
          <CallToAction />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

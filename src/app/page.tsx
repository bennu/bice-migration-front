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
import Footer from '@/components/layout/footer'
export default function MigrationLandingPage() {
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
          <MigrationForm />
          <FeaturesSection />
          <CallToAction />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

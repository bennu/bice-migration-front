// components/ui/AnimatedDatabase.tsx
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Storage, DataObject } from '@mui/icons-material'
import { FloatingIcon } from '@/components/common/FloatingIcon'
import { pulse, dataFlow } from '@/styles/animations'

export default function AnimatedDatabase() {
  const [animateDatabase, setAnimateDatabase] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateDatabase((prev) => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box sx={{ position: 'relative', height: 400 }}>
      <FloatingIcon sx={{ position: 'absolute', top: 0, right: 50 }}>
        <Storage sx={{ fontSize: 80, color: '#667eea' }} />
      </FloatingIcon>
      <FloatingIcon sx={{ position: 'absolute', bottom: 0, left: 50 }}>
        <Storage sx={{ fontSize: 80, color: '#ec4899' }} />
      </FloatingIcon>

      {animateDatabase && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: 2,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '50px',
              height: '100%',
              animation: `${dataFlow} 2s linear`
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <DataObject
          sx={{
            fontSize: 60,
            color: '#10b981',
            animation: `${pulse} 2s ease-in-out infinite`
          }}
        />
      </Box>
    </Box>
  )
}

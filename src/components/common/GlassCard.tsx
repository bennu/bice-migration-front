// components/common/GlassCard.tsx
import { styled } from '@mui/material/styles'
import { Card, alpha } from '@mui/material'

export const GlassCard = styled(Card)(({ theme }) => ({
  backdropFilter: 'blur(20px)',
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  border: '1px solid',
  borderColor: alpha(theme.palette.common.white, 0.1),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  borderRadius: '20px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
    borderColor: alpha(theme.palette.primary.main, 0.3)
  }
}))

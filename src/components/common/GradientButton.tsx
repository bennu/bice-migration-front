// components/common/GradientButton.tsx
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

export const GradientButton = styled(Button)(({}) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  border: 0,
  borderRadius: '12px',
  boxShadow: '0 3px 20px 2px rgba(102, 126, 234, .3)',
  color: 'white',
  padding: '12px 30px',
  fontSize: '16px',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 30px 2px rgba(102, 126, 234, .5)',
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
  }
}))

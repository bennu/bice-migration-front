// components/ui/MigrationResult.tsx
import { Box, Paper, Typography, Button, Fade, alpha } from '@mui/material'
import { CheckCircle, Download } from '@mui/icons-material'
import { MigrationResult as MigrationResultType } from '@/types/migration.types'

interface MigrationResultProps {
  result: MigrationResultType
}

export default function MigrationResult({ result }: MigrationResultProps) {
  return (
    <Fade in>
      <Paper
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: alpha('#10b981', 0.1),
          border: '1px solid',
          borderColor: alpha('#10b981', 0.3),
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <CheckCircle sx={{ color: '#10b981' }} />
          <Typography variant="h6" sx={{ color: '#10b981' }}>
            ¡Migración Completada!
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
          UUID: {result.uuid}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 2 }}>
          Script ZIP: {result.scriptZip.substring(0, 50)}...
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Download />}
          sx={{
            borderColor: '#10b981',
            color: '#10b981',
            '&:hover': {
              borderColor: '#10b981',
              backgroundColor: alpha('#10b981', 0.1)
            }
          }}
        >
          Descargar Script
        </Button>
      </Paper>
    </Fade>
  )
}

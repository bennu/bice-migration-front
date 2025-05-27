// services/migrationService.ts
import axios from 'axios'

// Tipos para la request y response
export interface MigrationRequest {
  fundCounter: number
  operationsMax: number
  operationDetailsMax: number
}

export interface MigrationResponse {
  uuid: string
  scriptZip: string
}

const API_BASE_URL = process.env.BASE_URL_MIGRATION

export const migrationService = {
  async generateMigrationScript(data: MigrationRequest): Promise<MigrationResponse> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/v1/migration`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      })
      
      return response.data
    } catch (error) {
      console.error('Error generating migration script:', error)
      
      // Manejo de errores más específico
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // El servidor respondió con un código de error
          throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data?.message || 'Error desconocido'}`)
        } else if (error.request) {
          // La petición se hizo pero no hubo respuesta
          throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.')
        } else {
          // Error en la configuración de la petición
          throw new Error(`Error de configuración: ${error.message}`)
        }
      }
      
      throw new Error('Error inesperado al generar el script de migración')
    }
  }
}
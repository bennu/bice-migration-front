// hooks/useMigration.ts
import { useState } from 'react'
import { migrationService, MigrationRequest, MigrationResponse } from '@/services/bulkLoadService'

export interface MigrationFormData {
  fundCounter: number
  operationsMax: number
  operationDetailsMax: number
}

export interface MigrationResult {
  uuid: string
  scriptZip: string
}

export const useMigration = () => {
  const [formData, setFormData] = useState<MigrationFormData>({
    fundCounter: 5,
    operationsMax: 30,
    operationDetailsMax: 8
  })
  
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<MigrationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Preparar los datos para el API
      const requestData: MigrationRequest = {
        fundCounter: formData.fundCounter,
        operationsMax: formData.operationsMax,
        operationDetailsMax: formData.operationDetailsMax
      }

      // Llamar al servicio real
      const response = await migrationService.generateMigrationScript(requestData)
      
      // Mapear la respuesta al formato esperado
      const migrationResult: MigrationResult = {
        uuid: response.uuid,
        scriptZip: response.scriptZip
      }

      setResult(migrationResult)
      setShowNotification(true)
      
      console.log('Migration script generated successfully:', migrationResult.uuid)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      console.error('Migration generation failed:', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof MigrationFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      fundCounter: 5,
      operationsMax: 30,
      operationDetailsMax: 8
    })
    setResult(null)
    setError(null)
    setShowNotification(false)
  }

  const downloadScript = () => {
    if (!result?.scriptZip) {
      console.error('No script available for download')
      return
    }

    try {
      // Decodificar el base64 y crear un blob
      const binaryData = atob(result.scriptZip)
      const bytes = new Uint8Array(binaryData.length)
      
      for (let i = 0; i < binaryData.length; i++) {
        bytes[i] = binaryData.charCodeAt(i)
      }

      const blob = new Blob([bytes], { type: 'application/zip' })
      const url = URL.createObjectURL(blob)
      
      // Crear un enlace de descarga
      const link = document.createElement('a')
      link.href = url
      link.download = `migration-script-${result.uuid}.zip`
      document.body.appendChild(link)
      link.click()
      
      // Limpiar
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      console.log('Download initiated for migration script')
    } catch (err) {
      console.error('Error downloading script:', err)
      setError('Error al descargar el archivo. Por favor, inténtalo de nuevo.')
    }
  }

  return {
    formData,
    loading,
    result,
    error,
    showNotification,
    setShowNotification,
    handleSubmit,
    handleInputChange,
    resetForm,
    downloadScript
  }
}
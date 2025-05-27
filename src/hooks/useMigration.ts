// hooks/useMigration.ts
import { useState } from 'react'
import { MigrationFormData, MigrationResult } from '@/types/migration.types'

export const useMigration = () => {
  const [formData, setFormData] = useState<MigrationFormData>({
    fundCounter: 5,
    operationsMax: 30,
    operationDetailsMax: 8
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<MigrationResult | null>(null)
  const [showNotification, setShowNotification] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de llamada API
    setTimeout(() => {
      const mockResult: MigrationResult = {
        uuid: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        scriptZip: 'UEsDBAoAAAAAAIdO4kMAAAAAAAAAAAAAAAAJA...'
      }
      setResult(mockResult)
      setLoading(false)
      setShowNotification(true)
    }, 3000)
  }

  const handleInputChange =
    (field: keyof MigrationFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: parseInt(e.target.value) || 0
      })
    }

  return {
    formData,
    loading,
    result,
    showNotification,
    setShowNotification,
    handleSubmit,
    handleInputChange
  }
}

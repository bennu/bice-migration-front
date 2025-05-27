// types/migration.types.ts
export interface MigrationFormData {
  fundCounter: number
  operationsMax: number
  operationDetailsMax: number
}

export interface MigrationResult {
  uuid: string
  scriptZip: string
}

export interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

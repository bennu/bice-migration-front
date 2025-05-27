import type { NextConfig } from 'next'

type EnvConfig = {
  HOST: string
  BASE_URL_MIGRATION?: string
}

type EnvsType = {
  local: EnvConfig
  dev: EnvConfig
  stg: EnvConfig
  pro: EnvConfig
}

const commonsEnvs = {
  HOST: 'host'
}

const envs: EnvsType = {
  local: {
    ...commonsEnvs,
    BASE_URL_MIGRATION: 'http://localhost:8080/'
  },
  dev: {
    ...commonsEnvs,
    BASE_URL_MIGRATION: 'https://api-bice.bennu.cl/'
  },
  stg: {
    ...commonsEnvs
  },
  pro: {
    ...commonsEnvs
  }
}

// Define valid stage values
type StageType = keyof EnvsType

// Get the current stage with type safety
const getStage = (): StageType => {
  const stage = process.env.STAGE as StageType | undefined
  return stage && stage in envs ? stage : 'local'
}

const nextConfig: NextConfig = {
  output: 'standalone',
  env: envs[getStage()],
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: false
}

export default nextConfig

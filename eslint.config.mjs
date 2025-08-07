import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: ['**/*', '!src/**'],
  },
  ...compat.extends('next', 'next/core-web-vitals', 'next/typescript'),
]

export default antfu(eslintConfig)

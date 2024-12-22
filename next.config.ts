import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // turn on source maps
  experimental: {
    serverSourceMaps: true,
    forceSwcTransforms: true,
  },

  // Fixes 'require.extensions is not supported by webpack. Use a loader instead.' warning
  // Source: https://github.com/handlebars-lang/handlebars.js/issues/953#issuecomment-2492080985
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
      handlebars: 'handlebars/dist/cjs/handlebars',
    }

    // Necessary to have next work w/ ESM 🤮
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return config
  },
}

export default withPayload(nextConfig)

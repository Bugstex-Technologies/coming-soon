import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useMock = env.VITE_MOCK_API === 'true'
  const proxyTarget = env.VITE_BACKEND_PROXY || 'http://127.0.0.1:8001'

  return {
    plugins: [
      react(),
      {
        name: 'ethica-standalone-mock-assets',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (useMock && req.url) {
              if (req.url.includes('/report.pdf')) {
                res.writeHead(302, { Location: '/mock/Ethica_Sample_Certificate.pdf' })
                res.end()
                return
              }
              if (req.url.includes('/v1/cli/ethica_runner.py')) {
                res.writeHead(200, {
                  'Content-Type': 'text/x-python',
                  'Content-Disposition': 'attachment; filename="ethica_runner.py"',
                })
                res.end(
                  '# Ethica Standalone CLI Runner (Mock Frontend Preview)\n' +
                  '# Connect to production API to download the live proctored agent.\n' +
                  'print("[Ethica CLI] Mock preview script downloaded successfully.")\n'
                )
                return
              }
            }
            next()
          })
        },
      },
    ],
    server: {
      port: 5173,
      proxy: useMock
        ? undefined
        : {
            '/api': proxyTarget,
            '/v1': proxyTarget,
          },
    },
  }
})

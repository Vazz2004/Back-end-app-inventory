import cors from 'cors'

const ACEEPTED_ORIGINS = [
  'http://localhost:5000',
  'http://localhost:1234',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://anvic.vercel.app',
  'https://anvic-git-dev-coders1.vercel.app',
  'https://anvic-7r9l4ouua-coders1.vercel.app',
  'http://localhost:5173',
  'https://anvicaccesorios.com',
  'http://190.156.12.14',
  'http://192.168.10.12'
]

export const corsMiddleware = ({ acceptedOrigins = ACEEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return (callback(new Error('No almacenado en los CORS')))
  }
})

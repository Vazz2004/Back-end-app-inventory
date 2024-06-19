import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { productoRoutes } from './routes/productoRoutes.js'
import cors from 'cors'

const PORT = process.env.PORT || 5000

const app = express() // Declaración de 'app' antes de su uso
app.use(cookieParser())
app.use(cors())
app.use(cookieParser())
app.use(json())
app.use(corsMiddleware())

app.disable('x-powered-by')
app.use(express.urlencoded({ extended: false }))


app.use('/producto', productoRoutes)

app.listen(PORT, () => {
  console.log(`Aplicacion corriendo en el puerto http://localhost:${PORT}`)
})

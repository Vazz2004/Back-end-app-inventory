import mysql from 'mysql2/promise'
import 'dotenv/config'

const DEFAULT_CONFIG = {
  host: process.env.DB_HOST || 'srv1440.hstgr.io',
  user: process.env.DB_USER || 'u844692423_user',
  password: process.env.DB_PASSWORD || 'Samuel200420022',
  database: process.env.DB_NAME || 'u844692423_respaldo',
  port: process.env.DB_PORT || 3306
}

const pool = mysql.createPool(DEFAULT_CONFIG)

pool.getConnection()
  .then(pool => {
    console.log('Conexión a la base de datos exitosa')
    pool.release()
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error)
  })

export default pool
import { Router } from 'express'
import { ProductoController } from '../controllers/productoController.js'

// Creacion de variable router

export const productoRoutes = Router()

// Creacion endpoints

productoRoutes.get('/ver', ProductoController.verProductoController)
productoRoutes.get('/ver-venta', ProductoController.verVentaController)
productoRoutes.post('/create', ProductoController.createProducController)
productoRoutes.post('/detalle-venta', ProductoController.detalleVentaCOntroller)
productoRoutes.patch('/update-product-basic/:id', ProductoController.updateProductoBasic)
productoRoutes.patch('/desactivar-product/:id', ProductoController.deleteProductController)
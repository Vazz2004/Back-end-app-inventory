import { response } from 'express'
import { ProductoModel } from '../models/productosModels.js'

export class ProductoController {
  static verProductoController (req, res) {
    ProductoModel.verProductos()
      .then(response => {
        if (response) {
          res.send(response)
        } else {
          res.status(404).json({ error: 'Productos no encontrados' })
        }
      })
      .catch(error => {
        console.error('Error en verProductoController:', error)
        res.status(500).json({ error: 'Error al obtener los productos' })
      })
  }

  static createProducController(req, res) {
    const data = req.body;
  
    // Llama al método del modelo para crear un producto
    ProductoModel.createProductoModel(data)
        .then(response => {
            // Responde con éxito
            res.status(201).json({message:'Producto registrado con exito'});
        })
        .catch(error => {
            // Captura y maneja cualquier error ocurrido durante el proceso
            console.error('Error en createProducController:', error.message);
            res.status(500).json({ error: 'Error al crear el producto' });
        });
}


  static updateProductoBasic (req, res) {
    const data = req.body
    const { id } = req.params
    ProductoModel.updateBasicProduct(id, data)
      .then(response => {
        if (response) {
          res.json(response)
        } else {
          res.status(400).json({ error: 'Error al actualizar el producto' })
        }
      })
      .catch(error => {
        console.error('Error en updateProductoBasic:', error)
        res.status(500).json({ error: 'Error al actualizar el producto' })
      })
  }


  static deleteProductController (req, res) {
    const { id } = req.params
    ProductoModel.deleteProduct(id)
      .then(response => {
        if (response) {
          res.json(response)
        } else {
          res.status(400).json({ error: 'Error al eliminar el producto' })
        }
      })
      .catch(error => {
        console.error('Error en deleteProductController:', error)
        res.status(500).json({ error: 'Error al eliminar el producto' })
      }) 
  }

  

  static detalleVentaCOntroller(req , res ){
    const data = req.body
    ProductoModel.agregarDetalleVenta(data)
    .then(response => {
      if(response){
        res.json(response)
      }else{
        res.status(400).json({message: 'Agregado con exito',response})
      }
    })
  }

  static verVentaController(req , res){
    ProductoModel.verVentas()
    .then(response =>{
      if(response){
        res.json(response)
      }else{
        res.status9(404).json({error:'Error , no se encontraron ventas'})
      }
    } )

  }
}

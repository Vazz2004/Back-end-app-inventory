/* eslint-disable camelcase */
import pool from './connection_dabase.js'
import _ from 'lodash'
export class ProductoModel {
  static async verProductos() {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id_producto,
          nombreProducto,
          codigoProducto,
          descripcion,
          precio,
          cantidad,
          estado
        FROM 
          producto 
        WHERE 
          estado = true
      `);
  
      return rows;
    } catch (error) {
      console.error('Error al recuperar los productos:', error.message);
      throw new Error('Hubo un problema al recuperar los productos');
    }
  }
  

  static async createProductoModel (data ) {
    console.log(data)
    const {
      nombreProducto,
      codigoProduct,
      descripcion,
      precio,
      cantidad
    } = data;

    try {
       await pool.query(`
        INSERT INTO producto 
        (nombreProducto, codigoProducto, descripcion, precio, cantidad) 
        VALUES (?, ?, ?, ?, ?);
      `, [nombreProducto, codigoProduct, descripcion, precio, cantidad]);
    } catch (error) {
      console.log(error)
    } 
  }


  
  static async updateBasicProduct(id, data) {
    const {
      nombreProducto,
      codigoProducto,
      descripcion,
      precio,
      cantidad
    } = data;
  
    try {
      const [result] = await pool.query(`
        UPDATE producto
        SET 
          nombreProducto = ?,
          codigoProducto = ?,
          descripcion = ?,
          precio = ?,
          cantidad = ?
        WHERE id_producto = ?
      `, [nombreProducto, codigoProducto, descripcion, precio, cantidad, id]);
  
      // Comprobar si se realizó la actualización correctamente
      if (result.affectedRows > 0) {
        console.log(`Se actualizó el producto con id ${id}`);
        return true; // Retornar true si la actualización fue exitosa
      } else {
        console.log(`No se encontró ningún producto con id ${id} para actualizar`);
        return false; // Retornar false si no se encontró el producto para actualizar
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return false; // Retornar false en caso de error
    }
  }
  

  static async deleteProduct (data) {
    try {
      const res = await pool.query(`
        UPDATE producto
        SET estado = false
        WHERE id_producto = ?
      `, [data])

      return res
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
      return error // Lanzar el error para manejarlo adecuadamente en la capa superior
    }
  }



// Método para agregar un detalle a una venta
static async agregarDetalleVenta(data) {
  const {  id_producto, cantidad, precio_unitario ,fecha_venta} = data;
  try {
    await pool.query(`
      INSERT INTO detalle_venta 
      ( id_producto, cantidad, precio_unitario, subtotal, fecha_venta) 
      VALUES ( ?, ?, ?, ? ,?);
    `, [ id_producto, cantidad, precio_unitario, cantidad * precio_unitario , fecha_venta]);
    return ({message: 'Agregado con exito' })
  } catch (error) {
    console.error('Error al agregar detalle de la venta:', error);
    return error
  }
}

  // Método para ver detalles de las ventas
  static async verVentas() {
    try {
      const [rows] = await pool.query(`
      SELECT 
  dv.id_detalle_venta,
  dv.fecha_venta,
  p.nombreProducto,
  p.codigoProducto,
  dv.cantidad,
  dv.precio_unitario,
  dv.subtotal
FROM 
  detalle_venta dv
JOIN 
  producto p ON dv.id_producto = p.id_producto;

      `);
      return rows;
    } catch (error) {
      console.error('Error al recuperar las ventas:', error.message);
      throw new Error('Hubo un problema al recuperar las ventas');
    }
  }

}

const idCapturado = null

function capturaId (id) {
  // eslint-disable-next-line no-const-assign
  idCapturado = id
  console.log('este es el id en la utilo', id)
}

export { capturaId, idCapturado }

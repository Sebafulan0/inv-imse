import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebaseconfig/firebase"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const List = () => {

  // 1 - configurar hooks
  const [inv, setInv] = useState([]);

  // 2 - referenciar db de firestore
  const inventario = collection(db, "demo");

  // 3 - mostrar todos los docs
  const getInv = async () => {
    const data = await getDocs(inventario)
    setInv(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  };

  // 4 - eliminar un doc
  const deleteItem = async (id) => {
    const itemDoc = doc(db, "demo", id)
    await deleteDoc(itemDoc)
    getInv()
  };

  // 5 - confirmacion para sweet alert
  // eslint-disable-next-line
  const MySwal = withReactContent(Swal);

  const confirmDelete = (id) =>
  Swal.fire({
    title: 'Estas seguro?',
    text: "no podemos revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteItem(id)
      Swal.fire(
        'Eliminado!',
        'Este registro ha sido borrado',
        'listo'
      )
    }
  })

  // 6 - captamos el cambio
  useEffect(() => {
    getInv()
  }, [])

  // 7 - devolver la vista
  return (
    <>
      <div className='container-fluid'>
        <h1>Inventario</h1>
      </div>
      <div className='container'>
        <div className='row' >
          <div className='col' >
            <div className="d-grid gap-2">
              <Link to="/create" className='btn btn-primary mt-2 mb-2' > Agregar nuevo registro</Link>
            </div>

            <table className="table table-striped table-hover table-sm table-responsive">
              <thead className="thead-light">
                <tr>

                  <th>Nombre</th>
                  <th>Comparte</th>
                  <th>Acciones</th>

                </tr>
              </thead>

              <tbody>
                {inv.map((item) => (
                  <tr key={item.id}>


                    <td>{item.nombre}</td>
                    <td>{item.comparte ? 'si' : 'no'}</td>



                    <td>
                      <Link to={`/edit/${item.id}`} className="btn btn-sm btn-secondary mx-1"><i className="fa-solid fa-pencil"></i></Link>
                      <button onClick={() => { confirmDelete(item.id) }} className="btn btn-sm btn-danger mx-1"><i className="fa-solid fa-trash-can"></i></button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>
      </div>
    </>
  )
}

export default List;
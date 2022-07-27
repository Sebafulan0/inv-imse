import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebaseconfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'

const MySwal = withReactContent(Swal)

// Aqui seteo la db a la que quiero acceder
const DB = 'demo'

// Componente
const List = () => {
    // inventario es donde vamos a almacenar los datos que traemos de firebase
    // setInventario es la funcion que vamos a usar para setearle el valor a inventario.
    // ambos accesibles a traves de useState() que es una funcion de react para poder
    // acceder al estado del componente.
    // El parametro [] dentro de useState es el valor inicial que va a tomar la variable de estado "inventario"
    // como inventario va a contener un array de objetos, el valor inicial va a ser un array vacio.
    const [inventario, setInventario] = useState([])

    // useEffect hook donde vamos a obtener los datos.
    // useEffect es una funcion de react que permite provocar side effects en el componente.
    // cambiar el dom / html manualmente, obtener datos de una api, etc. son side effects.
    useEffect(() => {
        // getInventarioFromFirebase devuelve una promesa, por eso usamos el then().
        getInventarioFromFirebase(DB).then((data) => {
            setInventario(data) // aca llamamos a la funcion para setear el valor de "inventario". (la que definimos en linea 21)
        })
    }, []) // Cuando se le pasa vacio como segundo argumento de useEffect esto quiere decir que ejecute lo que esta adentro siempre que haya un cambio.
    // Alternativamente podemos pasarle algun parametro para que useEffect solo actue cuando cambia una cosa en particular.

    // Obtener el inventario desde firebase
    // y seteamos el state
    const getInventarioFromFirebase = async (dbName) => {
        const dataCollection = collection(db, dbName)
        const data = await getDocs(dataCollection)
        // Obtenemos el inventario desde la collection
        // y llamamos a la funcion setInventario que configuramos en el hook (linea 18)
        // esto devuelve un array de objetos dentro de una promesa (por eso el then mas arriba),
        // que tiene todos los atributos de la collection, mas el ID.

        // NOTA: esto deberia devolver un array y no una promesa, pero me falta investigar como hacerlo.
        // por ahora, funca.
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    }

    // Ya con el inventario cargado, iteramos:

    return (
        <ul>
            {
                // Iteramos sobre los items del inventario (variable definida en linea 22 cuando configuramos el state, y seteada en la linea 29)
                inventario.map((item, index) => {
                    return (
                        <div className="card" >
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Comparte</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{index}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.comparte ? 'si' : 'no'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
        </ul>
    )


    /* return (
      <ul>
        {
          // Iteramos sobre los items del inventario (variable definida en linea 22 cuando configuramos el state, y seteada en la linea 29)
          inventario.map((item, index) => {
            return (
              <div>
              
              <li key={index}>
                id: {item.id} <br />
                nombre: {item.nombre} <br />
                comparte: {item.comparte ? 'si' : 'no'}
              </li>
              </div>
            )
          })
        }
      </ul>
    ) */
}

export default List

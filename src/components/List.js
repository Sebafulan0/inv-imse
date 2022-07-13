import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseconfig/firebase";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { async } from '@firebase/util';

const MySwal = withReactContent(Swal);

const List = () => {

// configurar hooks
const [demo, setDemo] = useState ([]);

// referenciar db de firestore
const inventario = collection(db, "demo");

// mostrar todos los docs
const getInventario = async () => {
    const data = await getDocs(inventario)
    return data.docs.map( (doc) => ( {...doc.data(), id:doc.id}))
}


// eliminar un doc

// confirmacion para sweet alert

// captamos el cambio
useEffect ( () => {
  getInventario().then( data => {
    console.log(data)
  }

  )
    // console.log(getInventario())
}, [] );

// devolver la vista

  return (
    <div>List</div>
  )
}

export default List;
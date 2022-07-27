import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig/firebase';

/* const stringToBoolean= function(string){
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
} */

const Create = () => {
    const [nombre, setNombre] = useState('')
    const [comparte, setComparte] = useState()
    const navigate = useNavigate()

    const inventario = collection(db, "demo")

    const datos = async (e) => {
        e.preventDefault()
        await addDoc(inventario, { nombre: nombre, comparte: comparte })
        navigate('/')
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Crear Registro</h1>
                    <form onSubmit={datos}>

                        <div className='mb-3'>
                            <label className='form-label mx-2'>Nombre</label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type="text"
                                className='form-conrtrol'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label mx-2'>Comparte</label>
                            <input
                                value={comparte}
                                onChange={(e) => setComparte(e.target.value)}
                                type="boolean"
                                className='form-conrtrol'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create

import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig/firebase";

const Edit = () => {
    const [nombre, setNombre] = useState('')
    const [comparte, setComparte] = useState('false')
    const navigate = useNavigate()
    const { id } = useParams()

    // eslint-disable-next-line 
    const update = async (e) => {
        e.preventDefault()
        const item = doc(db, "demo", id)
        const data = { nombre: nombre, comparte: comparte }
        await updateDoc(item, data)
        navigate('/')
    }

    const getInvById = async (id) => {
        const item = await getDoc(doc(db, "demo", id))
        if (item.exists()) {
            setNombre(item.data().nombre)
            setComparte(item.data().comparte)

        } else {
            console.log('El ITEM NO EXISTE')
        }


    }

    useEffect(() => {
        getInvById(id)
    }, [])


    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar Registro</h1>
                <form onSubmit={update}>

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
                    <button type='submit' className='btn btn-primary'>Guardar Cambios</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Edit
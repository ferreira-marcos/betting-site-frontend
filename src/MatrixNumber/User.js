import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function User() {

    let navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        cpf: "",
    })

    const { username, cpf } = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/matrixNumber/${username}/${cpf}`);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Registrar Aposta</h2>

                    {/* <form onSubmit={(e) => onSubmit(e)}> */}
                    <form onSubmit={handleSubmit}>

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Nome
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Digite o seu Nome'
                                name='username'
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>
                                CPF
                            </label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='digite o seu CPF'
                                name='cpf'
                                value={cpf}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                    
                        {/* <Link type='submit' className='btn btn-outline-primary' to={`/matrixNumber`}>Fazer Aposta</Link> */}
                        <button type='submit' className='btn btn-outline-primary'>Fazer Aposta</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to='/'>Cancel</Link>
                    </form>
                </div>
            </div>
            
        </div>
        
        
    )
}

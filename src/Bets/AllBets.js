import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AllBets() {
    const [bets, setBets] = useState([])

    useEffect(() => {
        loadBets()
    }, [])

    const loadBets = async () => {
        const result = await axios.get(`http://localhost:8080/allbets`)
        setBets(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className=' col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className=' text-center m-4'>Todas as Apostas</h2>
                    {bets.map((bet, index) => (
                        <div  className='card' key={index}>
                            <div className='bg-white card-header'>
                                <ul className='list-group list-group-flush'>
                                    <li className='list-group-item'>
                                        <b>Id da Aposta: </b>
                                        {bet.id}
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Nome: </b>
                                        {bet.punter.name}
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Cpf: </b>
                                        {bet.punter.cpf}
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Números: </b>
                                        {bet.numbers}

                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                    <Link className='btn btn-primary my-2' to={"/"}>Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

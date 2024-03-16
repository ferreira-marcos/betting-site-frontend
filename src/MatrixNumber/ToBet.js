import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

export default function ToBet() {

    const [clickedNumbers, setClickedNumbers] = useState([]);

    let navigate = useNavigate()
    let edit = false
    const [bet, setBet] = useState({
        name: "",
        cpf: "",
    })

    useEffect(() => {
        loadClickedButtons()
    }, [])

    const loadClickedButtons = () => {
        if (edit) {
            return clickedNumbers = ""
        }
        return clickedNumbers.join(', ')
    }

    const { name, cpf } = bet

    const onInputChange = (e) => {
        setBet({ ...bet, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/newBet", bet)
        navigate("/Allbets")
    }

    const handleClick = (number) => {
        if (clickedNumbers.length < 5) {
            const newClickedNumbers = [...clickedNumbers, number];
            setClickedNumbers(newClickedNumbers);
            setBet({ ...bet, numbers: newClickedNumbers.join(',') });
        } else {
            alert('Quantidade de números permitidos por aposta atingida');
        }
    };

    const handleSurprise = () => {
        const randomNumbers = [];
        while (randomNumbers.length < 5) {
            const num = Math.floor(Math.random() * 50) + 1;
            if (!randomNumbers.includes(num)) {
                randomNumbers.push(num);
            }
        }
        setClickedNumbers(randomNumbers);
        setBet({ ...bet, numbers: randomNumbers.join(',') });
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Registrar Aposta</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Nome
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Digite o seu nome'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>
                                Cpf
                            </label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='digite seu cpf'
                                name='cpf'
                                value={cpf}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='container-fluid text-center'>
                            <h2 className='text-center mt-5'>Escolher os Números</h2>

                            {[...Array(50).keys()].map((i) => (
                                <button
                                    type="button" // Alterado para type="button"
                                    className='btn btn-outline-primary mx-2 btn-lg m-2 shadow btnNumber'
                                    key={i}
                                    onClick={() => handleClick(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <h1 className='text-center mt-5'>Surpresinha</h1>
                            <button type='button' className='btn btn-primary mx-2 btn-lg' onClick={handleSurprise}>
                                Gerar números
                            </button>

                            <h3 className='text-center mt-5'>Números da Aposta:</h3>
                            <div className='text-center'>
                                <p>{loadClickedButtons()}</p>
                            </div>
                        </div>




                        <button type='submit' className='btn btn-outline-primary mx-2'>Submit</button>
                        <button type='button' className='btn btn-outline-secondary mx-2'
                            onClick={() => edit = true}  >Editar</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to='/'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )

}

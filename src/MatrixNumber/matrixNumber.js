// MatrixNumbers.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// import '../App.css'

export default function MatrixNumbers() {

    const [clickedNumbers, setClickedNumbers] = useState([]);
    const { username, cpf } = useParams();

    const handleClick = (number) => {
        if (clickedNumbers.length < 5) {
            setClickedNumbers([...clickedNumbers, number]);
        } else {
            alert('quantidade de números permitidos por aposta atingido');
        }
    };

    const handleSurprise = () => {
        const numbers = [];
        while (numbers.length < 5) {
            const num = Math.floor(Math.random() * 50) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        setClickedNumbers(numbers);
    };

    return (
        <div className='container'>
             <h1 className='text-center'>Bem-vindo, {username}! Seu CPF é {cpf}.</h1>
            <h1 className='text-center'> Escolha os Números</h1>
            {[...Array(50).keys()].map((i) => (

                <button className='btn btn-outline-primary mx-2 btn-lg' key={i} onClick={() => handleClick(i + 1)}>
                    {i + 1}
                </button>
            ))}


            <h1 className='text-center'>Surpresinha</h1>
            <div className=' text-center'>

                <button className='btn btn-primary mx-2 btn-lg' onClick={handleSurprise}>
                    Gerar números
                </button>

            </div>
            <h3 className='text-center mt-5'>Números clicados: </h3>
            <div className='text-center'>
                <text >{clickedNumbers.join(', ')}</text>
            </div>

        </div>
    );
}


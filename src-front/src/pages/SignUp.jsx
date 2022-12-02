import React, {useEffect, useState} from 'react';
import {json, useNavigate} from "react-router-dom";
import axios from "axios";

const SignUp = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [answer, setAnswer] = useState('')
    let navigate = useNavigate();

    const toMain = () => {
        let path = `/home`;
        navigate(path);
        axios.post('http://localhost:5000/login', {
            email: login,
            password: password,
            name: "da",
        }, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setAnswer(response.data)
                console.log(answer)
            })
    }

    //
    // useEffect(() => {
    //     fetch('http://localhost:5001/todos/', {
    //         'methods': 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             setTodos(response)
    //         })
    //         .catch(error => console.log(error))
    // }, [login, password])

    return (
        <div className={'pt-10 px-7 place-content-start text-start bg-white-200 h-full'}>
            <div className={'flex items-start mb-2'}>
                <p className={'font-article text-5xl font-bold mb-0'}>СОЗДАЙТЕ АККАУНТ</p>
            </div>
            <div className={'mt-8 max-w-[90%]'}>
                <div className={'flex items-center justify-between'}>
                    <div className={'text-xl'}>Email</div>
                </div>
                <div className={'border-b-[1px] border-grey-100 '}>
                    <input type="text"
                           placeholder="Введите email"
                           value={login}
                           onChange={e => setLogin(e.target.value)}
                           className="input input-ghost w-full h-7 max-w-xs
                           p-0 rounded-0 bg-transparent  text-grey-100"/>

                </div>
                <div className={'flex items-center justify-between mt-4'}>
                    <div className={'text-xl'}>Пароль</div>
                </div>
                <div className={'border-b-[1px] border-grey-100 mt-2'}>
                    <input type="password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           placeholder="Придумайте пароль"
                           className="input input-ghost w-full h-7 max-w-xs
                           p-0 rounded-0 bg-transparent  text-grey-100"/>
                </div>
            </div>
            <div className="mt-3 max-w-[90%]">
                <label className="label cursor-pointer">
                    <input type="checkbox"  className="checkbox" />
                    <span className="label-text text-black pl-1 ">Я принимаю условия обработки данных</span>
                </label>
            </div>

            <div className={'mt-4'}>
                <div className={'px-10 py-[12px] rounded-xl w-max bg-yellow'} onClick={toMain}>
                    <p className={'text-start text-base font-medium text-black m-0'}>Зарегистрироваться</p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
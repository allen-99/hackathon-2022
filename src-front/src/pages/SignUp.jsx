import React from 'react';
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    let navigate = useNavigate();

    const toMain = () => {
        let path = `/cards`;
        navigate(path);
    }
    return (
        <div className={'pt-10 px-7 place-content-start text-start bg-white-200 h-full'}>
            <div className={'flex items-start mb-2'}>
                <p className={'font-article text-5xl font-bold mb-0'}>СОЗДАЙТЕ АККАУНТ</p>
            </div>
            <div className={'mt-8 max-w-[90%]'}>
                <div className={'flex items-center justify-between'}>
                    <div className={'text-xl'}>Пароль</div>
                </div>
                <div className={'border-b-[1px] border-grey-100 mt-2'}>
                    <input type="text"
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
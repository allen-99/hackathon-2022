import React from 'react';
import {useNavigate} from "react-router-dom";

const Password = () => {
    let navigate = useNavigate();

    const toMain = () => {
        let path = `/cards`;
        navigate(path);
    }
    return (
        <div className={'pt-10 px-7 place-content-start text-start bg-white-200 h-full'}>
            <div className={'flex items-start mb-2'}>
                <p className={'font-article text-5xl font-bold mb-0'}>ВВЕДИТЕ ПАРОЛЬ</p>
            </div>
            <div className={'mt-8 max-w-[90%]'}>
                <div className={'flex items-center justify-between'}>
                    <div className={'text-xl'}>Пароль</div>
                    <div className={'border-b-[1px] border-grey-100 h-max text-sm text-grey-100 ml-3 text-sm'}>
                        Восстановить
                    </div>
                </div>
                <div className={'border-b-[1px] border-grey-100 mt-2'}>
                    <input type="text"
                           placeholder="Введите пароль"
                           className="input input-ghost w-full h-7 max-w-xs
                           p-0 rounded-0 bg-transparent  text-grey-100"/>
                </div>
            </div>
            <div className={'mt-8'}>
                <div className={'px-10 py-[12px] rounded-xl w-max bg-yellow'} onClick={toMain}>
                    <p className={'text-start text-base font-medium text-black m-0'}>Войти</p>
                </div>
            </div>
        </div>
    );
};

export default Password;
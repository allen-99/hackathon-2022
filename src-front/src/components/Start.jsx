import React from 'react';
import {useNavigate} from "react-router-dom";

const Start = () => {
    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/login`;
        navigate(path);
    }

    return (

        <div id={'start'} className={'w-screen h-screen ml-8 pt-10 relative z-10'}>
            <div className={'grid justify-items-end absolute top-10 right-0'}>
                <img src={'./logo.png'}/>
            </div>
            <div className={'absolute top-[36%] pr-8'}>
                <div className={'font-article text-9xl font-bold mb-0 text-start'}>LITERA</div>
                <div className={'text-2xl text-start'}>Ваши новые любимые</div>
                <div className={'text-2xl text-start'}>книги здесь</div>
                <div className={'px-10 py-[12px] rounded-md w-max bg-yellow mt-10'} onClick={routeChange}>
                    <p className={'text-start text-base font-medium text-black m-0'}>Получить рекомендации</p>
                </div>
            </div>

        </div>
    );
};

export default Start;
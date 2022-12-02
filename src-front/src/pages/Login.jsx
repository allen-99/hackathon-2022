import React from 'react';
import {useNavigate} from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const toRegistration = () =>{
        let path = `/signup`;
        navigate(path);
    }
    const toPassword = () =>{
        let path = `/password`;
        navigate(path);
    }


    return (
        <div className={'pt-10 px-7 place-content-start text-start bg-white-200 h-full'}>
            <div className={'flex items-start mb-2'}>
                <p className={'font-article text-5xl font-bold mb-0'}>LITERA</p>
            </div>
            <div className={'mt-8 max-w-[90%]'}>
                <div className={'flex items-center justify-between'}>
                    <div className={'text-xl'}>Email</div>
                    <div className={'border-b-[1px] border-grey-100 h-max text-sm text-grey-100 ml-3 text-sm'}
                    onClick={toRegistration}>
                        Регситрация
                    </div>
                </div>
                <div className={'border-b-[1px] border-grey-100 '}>
                    <input type="text"
                           placeholder="Введите email"
                           className="input input-ghost w-full h-7 max-w-xs
                           p-0 rounded-0 bg-transparent  text-grey-100"/>

                </div>
            </div>
            <div className={'mt-6 flex'}>
                <div className={'px-10 py-[12px] rounded-xl w-max bg-yellow'} onClick={toPassword}>
                    <p className={'text-start text-base font-medium text-black m-0'}>Продолжить</p>
                </div>
                <div className={'flex gap-2 ml-4 pt-1'}>
                    <div className="avatar w-9 h-9 border-[1px] border-grey-100 rounded-full grid place-content-center">
                        <div className="w-5 h-5  ">
                            <img src={"./card/google.svg"}/>
                        </div>
                    </div>
                    <div className="avatar w-9 h-9 border-[1px] border-grey-100 rounded-full grid place-content-center">
                        <div className="w-5 h-5  ">
                            <img src={"./card/vk.svg"}/>
                        </div>
                    </div>
                    <div className="avatar w-9 h-9 border-[1px] border-grey-100 rounded-full grid place-content-center">
                        <div className="w-5 h-5  ">
                            <img src={"./card/LibeLib.svg"}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
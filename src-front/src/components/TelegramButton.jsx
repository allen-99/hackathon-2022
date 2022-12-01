import React from 'react';

const TelegramButton = ({click}) => {
    return (
        <a className={'px-3 py-1 rounded-xl bg-yellow w-max flex py-2'} href={click}>
            <img  src={'./user/telegram.svg'} className={'w-6 h-6'} />
            <div className={'pl-1 text-start font-medium h-2 text-black '}>Написать в Telegram</div>
        </a>

    );
};

export default TelegramButton;
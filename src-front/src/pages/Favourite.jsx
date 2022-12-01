import React from 'react';
import FavCard from "../components/favourite/FavCard";


const Favourite = () => {
    return (
        <div className={'pt-10 px-7 place-content-start text-start bg-white-200 h-full'}>
            <div className={'flex items-start justify-between mb-5'}>
                <p className={'font-article text-5xl font-bold mb-0'}>КОЛЛЕКЦИЯ</p>
                <img src={'./user/user_icon.svg'} className={'pt-1'}/>
            </div>
            <FavCard />
        </div>
    );
};

export default Favourite;
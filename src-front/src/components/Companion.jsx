import React from 'react';
import FavCard from "./favourite/FavCard";
import BookTag from "./favourite/BookTag";
import TagModalFavCard from "./favourite/TagModalFavCard";
import TelegramButton from "./TelegramButton";

const Companion = () => {
    const equivocals = [
        {
            name: 'Лёша Бураков',
            power: 'Дизайнер',
            tgLink: 'https://t.me/AlexeyBurakov',
            photo: './user/we/lesha.png',
            favBooks: ['Десять негритят'],
            favTags: ['Детективы','Исторический роман','Фэнтези','Экранизация'],
        },
        {
            name: 'Саша Ильченко',
            power: 'Программист',
            tgLink: 'https://t.me/Aight99',
            photo: './user/we/sasha.png',
            favBooks: ['Показания Рэндольфа Картера'],
            favTags: ['Зарубежная литература','Ужасы','Мистика','Экранизация'],
        },
        {
            name: 'Наташа Крючкова',
            power: 'Программист',
            tgLink: 'https://t.me/allen99',
            photo: './user/we/natasha.png',
            favBooks: ['451 градус по Фаренгейту'],
            favTags: ['Зарубежная фантастика','Роман','Зарубежная классика','Антиутопия'],
        }
    ]
    return (

        <div className={'pt-10 px-7 place-content-start text-start bg-white-200 h-full'}>
            <div className={'flex items-start justify-between mb-2'}>
                <p className={'font-article text-5xl font-bold mb-0'}>СОБЕСЕДНИК</p>
                <img src={'./user/settings.svg'} className={''}/>
            </div>
            <div className={'flex'}>
                <img src={'./user/reload_arrows.svg'} className={'mr-2 h-5 w-5'}/>
                <p className={'p-0 m-0 text-sm text-grey-100'}>Обновится 5 декабря</p>
            </div>
            <div className={'mt-8 flex'}>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={equivocals[0].photo}/>
                    </div>
                </div>
                <div className={'ml-3 self-center'}>
                    <div className={'text-xl'}>{equivocals[0].name}</div>
                    <div>{equivocals[0].power}</div>
                </div>
            </div>
            <div className={'mt-4 gap-1 flex flex-wrap'}>
                {equivocals[0].favBooks.map((book) => (
                    <BookTag title={book}/>
                ))}

            </div>
            <div className={'gap-1 flex flex-wrap'}>
                {equivocals[0].favTags.map((book) => (
                    <TagModalFavCard title={book}/>
                ))}
            </div>
            <div className={'grid justify-items-start mt-4'}>
                <TelegramButton click={equivocals[0].tgLink} />
            </div>
        </div>

    );
};

export default Companion;
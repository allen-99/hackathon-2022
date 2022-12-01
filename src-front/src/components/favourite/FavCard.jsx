import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import ModalFavCard from "./ModalFavCard";

const FavCard = () => {
    let item = {title: 'TitleTitle eTitle',
                author: 'Author Author',
                link: 'link',
                cover: 'cover_link',
                description: 'Гарри взрослеет, и вместе с тем жить в Хогвартсе всё страшнее. Из тюрьмы для волшебников Азкабан сбежал опасный преступник - Сириус Блэк. Мир наполнился слухами, что он ищет и хочет убить одного тринадцатилетнего парня, совсем обычного на первый взгляд. Его имя — Гарри Поттер.\n' +
                    'Специальное издание для учеников и выпускников «Гриффиндора» к 20-летию первой публикации книги «Гарри Поттер и узник Азкабана».',
                tags: ['one', 'two', 'three']}
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className={'w-full p-[12px] rounded-xl shadow grid content-center'} >
                <div className={'flex'}>
                    <div className={'mr-3 rounded w-[70px] h-[105px]'}>
                        <img src={'./covers/small_book_cover.png'} className={'object-fill w-[70px] rounded h-[105px]'} />
                    </div>
                    <div className={'w-9/12 h-max'}>
                        <div className={'flex justify-between w-auto h-max'}>
                            <div className={'text-grey-100'}>{item.author}</div>
                            <img className={''} src={'./card/info_fav_card.svg'} onClick={handleShow} />
                        </div>
                        <div>{item.title}</div>
                        <div className={'flex justify-end h-14 grid content-end'}>
                            <div className={'w-max h-max rounded-xl border-2 border-white-400 bottom-0'}>
                                <div className={'flex px-2 py-2'}>
                                    <img  src={'./card/LibeLib.svg'} className={'w-4 h-4'} />
                                    <p className={'pl-2 text-grey-100 text-xs text-center mb-0'}
                                       onClick={()=> console.log('open in livelib')}>Открыть в LiveLib</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalFavCard handleClose={handleClose} show={show} item={item}/>
        </>
    );
};

export default FavCard;
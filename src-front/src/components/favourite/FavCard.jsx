import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import ModalFavCard from "./ModalFavCard";

const FavCard = ({card, index}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className={'w-full p-[12px] rounded-xl shadow grid content-center'} >
                <div className={'flex'}>
                    <div className={'mr-3 rounded w-[70px] h-[105px]'}>
                        <img src={card.cover_url} className={'object-fill w-[70px] rounded h-[105px]'} />
                    </div>
                    <div className={'w-9/12 h-max'}>
                        <div className={'flex justify-between w-auto h-max'}>
                            <div className={'text-grey-100'}></div>
                            <img className={''} src={'./card/info_fav_card.svg'} onClick={handleShow} />
                        </div>
                        <div>{card.title}</div>
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
            <ModalFavCard handleClose={handleClose} show={show} item={card} cover={card.cover_url}/>
        </>
    );
};

export default FavCard;
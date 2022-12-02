import React from 'react';
import {Modal} from "react-bootstrap";
import TagModalFavCard from "./TagModalFavCard";

const ModalFavCard = ({show, handleClose, item, cover}) => {
    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Body className={'bg-white-200 rounded-2xl'}>
                <div className={'pt-3 px-1 '}>
                    <div className={'flex'}>
                        <div className={'w-[173px]'}>
                            <img src={'card/back_arrow_fav_card_modal.svg'} className={'mb-3'} onClick={handleClose}/>
                            <p className={'text-start text-grey-100 text-sm m-0'}></p>
                            <p className={'text-start m-0 h-6'}>{item.title}</p>
                            <div className={'flex pt-10 w-max'}>
                                <img src={'card/done_fav_card_modal.svg'} className={'pr-4'}/>
                                <img src={'card/no_fav_card_modal.svg'} className={'pr-4'}/>
                                <img src={'card/skip_fav_card_modal.svg'} className={''}/>
                            </div>
                        </div>
                        <div className={'grid justify-items-end w-full'}>
                            <img src={cover}
                                 className={'object-fill w-[95px] rounded h-[143px] '} />
                        </div>
                    </div>
                    <div className={'mt-4'}>
                        <p className={'text-start'}>
                            {item.description}
                        </p>
                    </div>
                    <div className={'flex gap-1.5'}>
                        {/*{Object.values(item.genres).((tag) => (*/}
                        {/*        <TagModalFavCard title={tag} />*/}
                        {/*    )*/}
                        {/*)}*/}
                        {/*{Object.values(item.tags).map((tag) => (*/}
                        {/*    <TagModalFavCard title={tag} />*/}
                        {/*    )*/}
                        {/*)}*/}
                    </div>
                    <div className={'grid justify-items-center mt-4'}>
                        <div className={'px-3 py-1 rounded-xl bg-yellow w-max flex'} onClick={item.link}>
                            <img  src={'./card/LibeLib.svg'} className={'w-6 h-6'} />
                            <p className={'pl-1 text-start font-medium h-2'}>Открыть в LiveLib</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalFavCard;
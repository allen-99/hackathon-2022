import React from 'react';

const FavCard = () => {
    let item = {title: 'Title', author: 'Author Author', link: 'link', cover: 'cover_link'}
    return (
        <div className={'w-full h-[130px] flex p-[12px] rounded-xl shadow'}>
            <div className={'mr-3 rounded w-[70px] h-[105px]'}>
                <img src={'./covers/small_book_cover.png'} className={'object-fill w-[70px] rounded h-[105px]'} />
            </div>
            <div className={'w-9/12'}>
                <div className={'flex justify-between w-auto'}>
                    <div className={'text-grey-100'}>{item.author}</div>
                    <img className={''} src={'./card/info_fav_card.svg'} onClick={() => console.log('open menu')}/>
                </div>
                <div>{item.title}</div>
                <div className={'w-[156px] h-[32px] rounded-xl border border-white-400 ml-[95px] mt-[26px]'}>
                    <div className={'flex pl-4 py-2'}>
                        <img  src={'./card/LibeLib.svg'} className={'w-4 h-4'} />
                        <p className={'pl-2 text-grey-100 text-xs text-center mb-0'}>Открыть в LiveLib</p>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default FavCard;
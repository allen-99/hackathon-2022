import React from 'react';

const WillRead = ({add}) => {
    return (
        <div className={'top_panel grid mt-3 text-grey-100 font-normal text-xs '} onClick={add}>
            <img src={'./card/read_arrow.svg'} className={'mx-auto'}/>
            <div className={'mt-1'}>Сохранить</div>
        </div>
    );
};

export default WillRead;
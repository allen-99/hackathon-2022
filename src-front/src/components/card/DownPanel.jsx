import React, {useState} from 'react';
import { ButtonGroup} from "react-bootstrap";

const DownPanel = ({dislike}) => {

    return (

        <ButtonGroup className="justify-content-center gap-10 mb-20">
            <div className={'m-0 button'}
                 onClick={dislike}
            >
                <img src={'./card/left_arrow.svg'} className={'mx-auto'}/>
                <div className={'text-xs'}>Не предлагать</div>
            </div>
            <div className={'m-0 button'}>
                <img src={'./card/down_arrow.svg'} className={'mx-auto'}/>
                <div className={'text-xs'}>Пропустить</div></div>
            <div className={'m-0 button'}
                 onClick={() => console.log('da')}
            >
                <img src={'./card/right_arrow.svg'} className={'mx-auto'}/>
                <div className={'text-xs'}>Люблю такое</div> </div>
        </ButtonGroup>

    );
};

export default DownPanel;
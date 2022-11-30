import React, {useState} from 'react';
import { ButtonGroup} from "react-bootstrap";

const DownPanel = ({dislike, like, skip}) => {

    return (

        <ButtonGroup className="grid grid-cols-3 gap-10 text-grey-100 down_panel">
            <div className={'button content-end'}
                 onClick={dislike}
            >
                <img src={'./card/left_arrow.svg'} className={'mx-auto'}/>
                <div className={'text-xs pt-1'}>Не предлагать</div>
            </div>
            <div className={'button content-end'} onClick={skip}>
                <img src={'./card/down_arrow.svg'} className={'mx-auto'}/>
                <div className={'text-xs pt-1'}>Пропустить</div></div>
            <div className={'button content-end'}
                 onClick={like}
            >
                <img src={'./card/right_arrow.svg'} className={'mx-auto'}/>
                <div className={'text-xs pt-1'}>Люблю такое</div> </div>
        </ButtonGroup>

    );
};

export default DownPanel;
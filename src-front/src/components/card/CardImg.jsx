import React from 'react';
import {Card} from "react-bootstrap";

const CardImg = () => {
    return ( //
        <div style={{backgroundImage: `url("./covers/cover.jpg")`}} className="bg-cover bg-center rounded" id={'bg'}>
            <Card.Img src={"./covers/CardShadow.png"} alt="book cover"/>
        </div>
    );
};

export default CardImg;
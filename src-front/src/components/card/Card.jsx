import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import CardImg from "./CardImg";
// import cover from './covers/cover.jpg'

const CustomCard = ({author, title, createNewCard, id, z_index, change}) => {
    const [beginX, setBeginX] = useState(0)
    const [beginY, setBeginY] = useState(0)

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const [iseMove, setIsMove] = useState(false)

    const startPosition = (event) => {

        // eslint-disable-next-line no-restricted-globals
        setBeginX(event.touches[0].clientX)

        // eslint-disable-next-line no-restricted-globals
        setBeginY(event.touches[0].clientY)

        change(event)
        setIsMove(false)
        let grid = document.getElementById('card-grid')

    }
    const moveTouch = () => {

        // eslint-disable-next-line no-restricted-globals
        setX(event.touches[0].clientX)
        // eslint-disable-next-line no-restricted-globals
        setY(event.touches[0].clientY)

        setIsMove(true)
    }
    const endTouch = (event) => {
        let diffX = beginX - x
        let diffY = beginY - y
        if (!iseMove) {
            diffX = 0
            diffY = 0
        }
        else {

            if ((diffX < 100 || diffX > -100) && diffY > 70) {
                console.log('up')
            }
            else if ((diffX < 100 || diffX > -100) && diffY < -70) {
                console.log('down')
            }
            else if ((diffX < -10) && diffY < 100) {
                console.log('right')
            }
            else {
                console.log('left')
            }
        }
        createNewCard(event)
        console.log('x ', (diffX) )
        console.log('y ', (diffY) )
        // console.log(event)
    }

    return (
        <Card className={`w-80 
                          h-[477px]
                          absolute
                          top-0
                          left-0
                          z-${z_index} 
                          select-none 
                          overflow-auto 
                          touch-auto 
                          cust_card`}
              onTouchStart={(event) => startPosition(event)}
              onTouchEnd={(event) =>  endTouch(event)}
              onTouchMove={() => moveTouch()}
              id={id}
        >
            <CardImg />
            <Card.ImgOverlay className={'content-end grid'}>
                <Card.Text className={'text-yellow text-left m-0 pl-1'}>{author}</Card.Text>
                <Card.Text className={'text-white-200 text-left m-0 pl-1'}>{title}</Card.Text>
            </Card.ImgOverlay>
        </Card>
    );
};

export default CustomCard;
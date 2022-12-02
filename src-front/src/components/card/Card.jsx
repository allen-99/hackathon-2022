import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import CardImg from "./CardImg";
// import cover from './covers/cover.jpg'

const CustomCard = ({author, title, createNewCard, zindex, id='1', link, cover}) => {
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
        setIsMove(false)

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
        let a = document.getElementById('1')
        if (!iseMove) {
            diffX = 0
            diffY = 0
        }
        else {
            if ((diffX < 100 || diffX > -100) && diffY > 10) {
                a.className += 'moveup'
                console.log('up')
            }
            else if ((diffX < 100 || diffX > -100) && diffY < -10) {
                a.className += 'movedown'
                console.log('down')
            }
            else if ((diffX < -10) && diffY < 100) {
                a.className += 'moveright'
                console.log('right')
            }
            else {
                a.className += 'moveleft'
                console.log('left')
            }
            createNewCard(event)
        }
    }

    return (
        <div id={id} className={`fixed inset-auto z-${zindex} `}>
            <Card className={`w-[304px]
                          h-[501px]
                          absolute
                          select-none 
                          overflow-auto 
                          touch-auto 
                          `}
                  onTouchStart={(event) => startPosition(event)}
                  onTouchEnd={(event) =>  endTouch(event)}
                  onTouchMove={() => moveTouch()}
            >
                <CardImg cover={cover} />
                <Card.ImgOverlay className={'content-end grid'}>
                    <Card.Text className={'text-yellow text-left m-0 pl-1'}>{author}</Card.Text>
                    <Card.Text className={'text-white-200 text-left m-0 pl-1'}>{title}</Card.Text>
                </Card.ImgOverlay>
            </Card>
        </div>
    );
};

export default CustomCard;
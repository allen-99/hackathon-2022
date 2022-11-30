import React, {useState} from 'react';
import CardGrid from "../components/CardGrid";
import WillRead from "../components/card/WillRead";
import DownPanel from "../components/card/DownPanel";

const Home = () => {
    const [first, setFirst] = useState(true)
    const [cards, setCards] = useState([{
        title: 'Da',
        author: 'Da',
        cover: 'url//'
    }, {
        title: 'Nea',
        author: 'Nea',
        cover: 'url//'
    }, {
        title: 'sd',
        author: 'Nesda',
        cover: 'url//'
    },{
        title: 'Da',
        author: 'Da',
        cover: 'url//'
    }, {
        title: 'Nea',
        author: 'Nea',
        cover: 'url//'
    }, {
        title: 'sd',
        author: 'Nesda',
        cover: 'url//'
    }
    ])
    const createNewCard = () => {

        setTimeout(() => {
            document.getElementById('1').className = ' fixed inset-auto z-20 '
            setCards(cards.slice(1, cards.length))
        },1000)

    }

    const dislike = () => {
        document.getElementById('1').className += 'moveleft'
        createNewCard()
    }
    const like = () => {
        document.getElementById('1').className += 'moveright'
        createNewCard()
    }
    const skip = () => {
        document.getElementById('1').className += 'movedown'
        createNewCard()
    }
    const add = () => {
        document.getElementById('1').className += 'moveup'
        createNewCard()
    }
    return (
        <div className={'overflow-hidden h-full'}>
            <WillRead add={add} />
            <CardGrid cards={cards} createNewCard={createNewCard} first={first}/>
            <DownPanel dislike={dislike} like={like} skip={skip}/>
        </div>
    );
};

export default Home;
import React from 'react';
import CardGrid from "../components/CardGrid";
import WillRead from "../components/card/WillRead";
import DownPanel from "../components/card/DownPanel";

const Home = () => {
    const items = [{
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
    }]

    const dislike = () => {

    }
    const like = () => {

    }
    return (
        <div>
            <WillRead />
            <CardGrid cards={items} />
            <DownPanel dislike={dislike}/>
        </div>
    );
};

export default Home;
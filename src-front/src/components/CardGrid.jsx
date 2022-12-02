import CustomCard from "./card/Card";
import {useState} from "react";


const CardGrid = ({cards, createNewCard}) => {
    return (
        <div
            className={'justify-center relative h-[66%] content-center card_place_top card_place py-6'}
            id={'card-grid'}
        >
            {cards.length > 0 && <CustomCard author={Object.values(cards[0].authors)}
                                             title={cards[0].title}
                                             cover={cards[0].cover_url}
                                             link={cards[0].link}
                                             tags={cards[0].tags}
                                             createNewCard={createNewCard}
                                             zindex={20}
            />}
            {cards.length > 1 && <CustomCard author={Object.values(cards[1].authors)}
                                             title={cards[1].title}
                                             createNewCard={createNewCard}
                                             cover={cards[1].cover_url}
                                             link={cards[1].link}
                                             tags={cards[1].tags}
                                             zindex={0}
                                             id={'2'}
            />}

        </div>

    );
};

export default CardGrid;
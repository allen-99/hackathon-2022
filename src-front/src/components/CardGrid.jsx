import CustomCard from "./card/Card";


const CardGrid = ({cards, createNewCard}) => {

    return (
        <div
            className={'justify-center relative h-[66%] content-center card_place_top card_place py-6'}
            id={'card-grid'}
        >
            {cards.length > 0 && <CustomCard author='Author'
                                             title={cards[0].title}
                                             createNewCard={createNewCard}
                                             zindex={20}
            />}
            {cards.length > 1 && <CustomCard author='Author'
                                             title={cards[1].title}
                                             createNewCard={createNewCard}
                                             zindex={0}
                                             id={'2'}
            />}

        </div>

    );
};

export default CardGrid;
import React, {useState} from 'react';
import CustomCard from "./card/Card";

import 'swiper/css';
import SecondCard from "./card/SecondCard";

const CardGrid = ({cards}) => {

    const [first, setFirst] = useState(true)
    const [zindexF, setZindexF] = useState(10)
    const [zindexS, setZindexS] = useState(0)


    const changeCard = (event, id) => {
        if (first){
            setZindexF(10)
            setZindexS(-10)
        }
        else {
            setZindexF(-10)
            setZindexS(10)
        }

    }
    const createNewCard = (event) => {
        if (first){
            setFirst(false)
        }
        else {
            setFirst(true)
        }
    }

    return (
        <div className={'grid justify-center relative content-center overflow-hidden w-full h-[700px]'} id={'card-grid'}>
            {/*{cards.map((card, i) => (*/}
            {/*            <CustomCard author='Author'*/}
            {/*                        title={'AAAA'}*/}
            {/*                        createNewCard={createNewCard}*/}
            {/*                        id={i}*/}
            {/*                        z_index={10 * i}*/}
            {/*                        change={changeCard}*/}
            {/*            />*/}
            {/*    )*/}
            {/*)}*/}
            {/*{first && <CustomCard author='Author'*/}
            {/*                      title={'AAAA'}*/}
            {/*                      createNewCard={createNewCard}*/}
            {/*                      id={1}*/}
            {/*                      z_index={zindexF}*/}
            {/*                      change={changeCard}*/}
            {/*/>}*/}
            {/*{!first && <CustomCard author='Author'*/}
            {/*                       title={'BBBB'}*/}
            {/*                       createNewCard={createNewCard}*/}
            {/*                       z_index={zindexS}*/}
            {/*                       change={changeCard}*/}
            {/*/>}*/}
            <SecondCard />
        </div>

    );
};

export default CardGrid;
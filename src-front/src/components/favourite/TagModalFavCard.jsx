import React from 'react';

const TagModalFavCard = ({title}) => {
    return (
        <div className={'px-3 py-1 rounded-2xl border-yellow border-2 w-max bg-white-100 mb-1'}>
            <p className={'text-start text-grey-800 text-sm h-2'}>{title}</p>
        </div>
    );
};

export default TagModalFavCard;
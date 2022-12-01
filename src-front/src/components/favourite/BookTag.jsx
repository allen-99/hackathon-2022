import React from 'react';

const BookTag = ({title}) => {
    return (
        <div className={'px-3 py-1 rounded-2xl w-max bg-yellow mb-2'}>
            <p className={'text-start text-grey-800 text-sm h-2'}>{title}</p>
        </div>
    );
};

export default BookTag;
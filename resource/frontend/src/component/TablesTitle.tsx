import React from 'react';

interface TitleProps {
    tableName: string;
    onClick: () => void;
}

function Title({ tableName, onClick }: TitleProps) {
    return (
        <div className='flex justify-between mb-3 mx-4'>
            <p className='text-[#002a47] text-4xl font-medium'>{tableName}</p>
            <button
                className='bg-[#002A47] px-3 py-1 text-white rounded-md'
                onClick={onClick}
            >
                {tableName}
            </button>
        </div>
    );
}

export default Title;

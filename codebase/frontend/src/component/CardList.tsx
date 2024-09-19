import { Card, CardContent } from '@mui/material';

interface CardListProps {
    name: string,
    detaile: number
}

const CardList: React.FC<CardListProps> = ({ name, detaile }) => {
    return (
        <Card sx={{ width: 200 }} className='dark:bg-[#313131] dark:text-gray-200 transition ease-in-out delay-150 hover:scale-110 duration-700 '  >
            <CardContent>
                <p className='text-[20px] text-[#002A47]'>
                    {name}
                </p>
                <div className=' flex gap-3 text-gary ms-5 text-[#5d6269] items-center'>
                    <p className=' dark:text-gray-400  text-[18px]' >
                        {detaile}
                    </p>
                    <p className=' text-[14px]'>employee</p>
                </div>

            </CardContent>
        </Card>
    );
}
export default CardList;
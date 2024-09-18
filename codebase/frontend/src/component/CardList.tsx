import { Card, CardContent, Typography } from '@mui/material';

interface CardListProps {
    name: string,
    detaile: number
}

const CardList: React.FC<CardListProps> = ({ name, detaile }) => {
    return (
        <Card sx={{ width: 200 }} className='dark:bg-[#313131] dark:text-gray-200 transition ease-in-out delay-150 hover:scale-110 duration-700 '  >
            <CardContent >
                <Typography gutterBottom component="div" className='text-[lg]  text-black'>
                    {name}
                </Typography>
                <Typography className=' dark:text-gray-400  text-[17px] text-center text-gary' >
                    {detaile}
                </Typography>


            </CardContent>
        </Card>
    );
}
export default CardList;
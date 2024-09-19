import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { StoreType } from '../../../_types/store_type';



interface Column {
    id: keyof RowData;
    label: string;
    minWidth?: number;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

interface RowData {
    no: number;
    storeName: string;
    city: string;
    subCity: string;
    wereda: string;
}

const columns: Column[] = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'storeName', label: 'Store Name', minWidth: 200 },
    { id: 'city', label: 'City', minWidth: 200, align: 'left' },
    { id: 'subCity', label: 'Sub City', minWidth: 200, align: 'left' },
    { id: 'wereda', label: 'Wereda', minWidth: 200, align: 'left' },
];

function createData(no: number, storeName: string, city: string, subCity: string, wereda: string): RowData {
    return { no, storeName, city, subCity, wereda };
}

interface StoreProps {
    storeList: StoreType[];
}

const WareHouseTable: React.FC<StoreProps> = ({ storeList }) => {
    const rows: RowData[] = storeList.map((store, index) =>
        createData(
            index + 1,
            store.name,
            store.address?.city || '',
            store.address?.subCity || '',
            store.address?.wereda || ''
        )
    );

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="flex mx-[7%]">
            <Paper sx={{ overflow: 'hidden', width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    Details
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <button
                                                    className="flex items-center"
                                                    onClick={() => handleToggle(index)}
                                                >
                                                    <div className="mr-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">
                                                        {openFaqIndex === index ? (
                                                            <ExpandLessIcon />
                                                        ) : (
                                                            <ExpandMoreIcon />
                                                        )}
                                                    </div>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                        {openFaqIndex === index && (
                                            <TableRow>
                                                <TableCell colSpan={columns.length + 1}>
                                                    <div className="pl-[62px] bg-gray-100 p-4 rounded-lg">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <p className="text-md">Store Name: <span className="text-sm">{storeList[index].name}</span></p>
                                                            <p className="text-md">Attributes:</p>
                                                            <div className="col-span-2 grid grid-cols-2 text-sm gap-2">
                                                                {/* {storeList && storeList[index].attributes && storeList[index].attributes?.map((attr: { name: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, idx: React.Key | null | undefined) => (
                                                                    <p key={idx} className="ms-3">{attr.name} - {attr.value}</p>
                                                                ))} */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default WareHouseTable;
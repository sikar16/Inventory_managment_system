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

const columns = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'storeName', label: 'store Name', minWidth: 200 },
    { id: 'city', label: 'City', minWidth: 200, align: 'left' },
    { id: 'subCity', label: 'Sub city', minWidth: 200, align: 'left' },
    { id: 'wereda', label: 'Wereda', minWidth: 200, align: 'left' },

];

function createData(no: number, storeName: string, city: string, subCity: string, wereda: string,) {
    return { no, storeName, city, subCity, wereda };
}

const rows = [
    createData(1, "Lebu Branch", "Addis ababa", "Bole", "08"),
    createData(1, "Lebu Branch", "Addis ababa", "Bole", "08"),
    createData(1, "Lebu Branch", "Addis ababa", "Bole", "08"),
    createData(1, "Lebu Branch", "Addis ababa", "Bole", "08"),
    createData(1, "Lebu Branch", "Addis ababa", "Bole", "08"),
    createData(1, "Lebu Branch", "Addis ababa", "Bole", "08"),
    createData(1, "Lebu Branch", "Addis ababa", "Bole", "08"),

];
function WareHouseTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleToggle = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
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
                                        <React.Fragment key={row.templateId}>
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
                                                        className=" flex items-center"
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
                                                        <div id={`faq-content-${index}`} className=" pl-[62px] bg-gray-100 h-[150px]">
                                                            <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                                                                <div className=' grid grid-cols-2 gap-4'>
                                                                    <p className='text-md'>Store Name: <span className='text-sm'>Mobile </span></p>
                                                                    <p className='text-md '>Attributes:
                                                                        <div className='grid grid-cols-2 w-full text-sm  gap-2 mt-2 '>
                                                                            <p className='ms-3'>RAM  - 8GB</p>
                                                                            <p className='ms-3'>ROM  - 8GB</p>
                                                                            <p className='ms-3'>Graphics  - 8GB</p>
                                                                            <p className='ms-3'>Screen size  - 8GB</p>

                                                                        </div>
                                                                    </p>
                                                                </div>                                                            </p>
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
        </>
    )
}

export default WareHouseTable
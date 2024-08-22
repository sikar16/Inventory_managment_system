import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import chart from '../../assets/growth.png'


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

export default function UserList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>

            <div>

                <div className='flex justify-between mb-3 mx-2' >
                    <p className='text-[#002a47] text-4xl font-medium'>User</p>
                    <button className='bg-[#002A47] px-3 py-1 text-white rounded-md'>Add User</button>
                </div>

                <div className='grid grid-cols-5 mb-5 gap-3 text-center align-middle items-center'>
                    <div className="bg-[#F5F5F5] py-4 w-full relative flex justify-around mt-6 text-gray-700 shadow-md bg-clip-border rounded-sm  ">
                        <div className="">
                            <h5 className="block mb-2 font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                                All user
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                123
                            </p>
                        </div>
                        <div>
                            <img src={chart} alt="" width={50} height={50} />
                        </div>

                    </div>
                    <div className="bg-[#F5F5F5] py-4 w-full relative flex justify-around mt-6 text-gray-700 shadow-md bg-clip-border rounded-sm  ">
                        <div className="">
                            <h5 className="block mb-2 font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                                Finance
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                123
                            </p>
                        </div>
                        <div>
                            <img src={chart} alt="" width={50} height={50} />
                        </div>

                    </div>
                    <div className="bg-[#F5F5F5] py-4 w-full relative flex justify-around mt-6 text-gray-700 shadow-md bg-clip-border rounded-sm  ">
                        <div className="">
                            <h5 className="block mb-2 font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                                Human Resource
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                123
                            </p>
                        </div>
                        <div>
                            <img src={chart} alt="" width={50} height={50} />
                        </div>

                    </div>
                    <div className="bg-[#F5F5F5] py-4 w-full relative flex justify-around mt-6 text-gray-700 shadow-md bg-clip-border rounded-sm  ">
                        <div className="">
                            <h5 className="block mb-2 font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                                Finance                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                123
                            </p>
                        </div>
                        <div>
                            <img src={chart} alt="" width={50} height={50} />
                        </div>

                    </div>
                    <div className="bg-[#F5F5F5] py-4 w-full relative flex justify-around mt-6 text-gray-700 shadow-md bg-clip-border rounded-sm  ">
                        <div className="">
                            <h5 className="block mb-2 font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900">

                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                123
                            </p>
                        </div>
                        <div>
                            <img src={chart} alt="" width={50} height={50} />
                        </div>

                    </div>
                    <div className="bg-[#F5F5F5] py-4 w-full relative flex justify-around mt-6 text-gray-700 shadow-md bg-clip-border rounded-sm  ">
                        <div className="">
                            <h5 className="block mb-2 font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                                All user
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                123
                            </p>
                        </div>
                        <div>
                            <img src={chart} alt="" width={50} height={50} />
                        </div>

                    </div>
                </div>

            </div>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
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
        </>
    );
}

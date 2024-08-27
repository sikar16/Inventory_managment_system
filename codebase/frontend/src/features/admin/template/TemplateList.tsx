import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddTemplate from './AddTemplate';
import TemplateTable from './TemplateTable';



export default function TemplateList() {

    const [openDialog, setOpenDialog] = React.useState(false);


    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className='mt-10'>
            <div className='flex justify-between mb-3 mx-2'>
                <p className='text-[#002a47] text-4xl font-medium'>Template</p>
                <button className='bg-[#002A47] px-3 py-1 text-white rounded-md' onClick={handleOpenDialog}>Add Template</button>
            </div>

            <div className='flex flex-wrap gap-2 mt-10 mx-10 mb-5'>
                <div className='bg-[#F5F5F5] px-3 py-3 rounded-md mb-2 flex items-center '>
                    <p className='me-3 text-gray-500'>Category :</p>
                    <select className='bg-[#F5F5F5] text-gray-700'>
                        <option value="">Electronics</option>
                        <option value="">Stationary</option>
                        <option value="">Food</option>
                        <option value="">Drink</option>
                    </select>
                </div>
            </div>

            <hr className='w-full text-black bg-black' />
            <div className='my-4 ms-[10%]'>
                <input type="text" placeholder='Search' className='w-[70%] m-auto bg-[#f5f5f5] rounded-2xl py-[5px] px-3' />
            </div>
            {/* <div className="flex mx-[7%]">
                <Paper sx={{ overflow: 'hidden', maxWidth: 800, width: '100%' }}>
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
                                                                    <p className='text-md'>Template: <span className='text-sm'>Mobile </span></p>
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
            </div> */}
            <TemplateTable />

            <Dialog open={openDialog} onClose={handleCloseDialog} >
                <div className='flex justify-between me-5'>
                    <DialogTitle>Add new template</DialogTitle>
                    <DialogActions>
                        <svg onClick={handleCloseDialog} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path></svg>
                    </DialogActions>
                </div>
                <DialogContent>
                    <AddTemplate />
                </DialogContent>
            </Dialog>
        </div>
    );
}

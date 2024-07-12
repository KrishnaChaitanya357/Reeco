import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { approvedData, missingData } from '../Redux/Actions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Modal, IconButton, FormControlLabel, RadioGroup, Radio, Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import productsData from "./ProductsData.json";
import avacado from '../Images/Avocadohass.jpg';
import { useDispatch, useSelector } from 'react-redux';
import "./ProductsList.css"

const ProductsList = () => {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [item, setItem] = useState("");
    const [itemIndex, setIndex] = useState();
    const dispatch = useDispatch();
    const updatedList = useSelector((state) => state.products);
    console.log("updatedList", updatedList)

    console.log("selected Option", selectedOption)
    const shippingDetails = productsData.shippingData;
    const productsList = productsData.productsData;
    console.log("productsList", productsList);

    // filtering and assigning the status 
       
        if (updatedList.length > 0) {
            updatedList.forEach((item) => {
                const index = item.index;
                productsList[index].status = item.type
            })
        }


    //dispatching approved products
    const handleApprove = (index) => {
        console.log("index in approve", index)
        dispatch(approvedData({ type: "Approved", index: index }))

    }

    //dispatching missing products

    const handleMissing = () => {

        console.log("index in missing", selectedOption, itemIndex);
        dispatch(missingData({ type: selectedOption, index: itemIndex }));
        setOpen(false);
        setSelectedOption('');
    }

    
    // MUI modal 

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const handleOpen = (product, index) => {
        setIndex(index);
        setItem(product);
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            {/* navbar */}
            <div className='navbar'>
                <div className='leftNav'>
                    <h4 className='brand'>REECOO</h4>
                    <h5>Store</h5>
                    <h5>Order</h5>
                    <h5>Analytics</h5>
                </div>
                <div className='rightNav'>
                    {/* <ShoppingCartIcon/> */}
                    <h5><ShoppingCartIcon /></h5>
                    <h5>Hello,Krishna</h5>
                </div>
            </div>

            {/* orders block */}

            <div className='orderDetails'>
                <div className='leftBlock'>
                    <span>Orders &gt; 32457ABC</span>
                    <span className='bold'>Order 32457ABC</span>
                </div>

                <div className='rightBlock'>
                    <button className='btn1'>Back</button>
                    <button className='btn2'>Approve Order</button>

                </div>

            </div>

            {/* //Shipping Details */}
            <div className='mainBlock'>
                <div className='ShippingDetails'>
                    <div className='shipping'>
                        <span>Supplier</span>
                        <h5>{shippingDetails.supplier}</h5>
                    </div>
                    <div className='shipping'>
                        <span>Shipping Date</span>
                        <h5>{shippingDetails.shippingDate}</h5>
                    </div>
                    <div className='shipping'>
                        <span>Total</span>
                        <h5>{shippingDetails.total}</h5>
                    </div>
                    <div className='shipping'>
                        <span>Category</span>
                        <h5>BAC</h5>
                    </div>
                    <div className='shipping'>
                        <span>Department</span>
                        <h5>{shippingDetails.department}</h5>
                    </div>
                    <div className='shipping'>
                        <span>Status</span>
                        <h5>{shippingDetails.status}</h5>
                    </div>

                </div>
            </div>

            <div className='productsTable'>
                <div className='searchBar'>
                <input className='input' type='text' placeholder='search...'/>
                <button className='btn'>Add Item</button>
                </div>
                <TableContainer component={Paper} sx={{ width: '90%', margin: 'auto' }}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Brand</TableCell>
                <TableCell align="left">Price($)</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {productsList.map((item, index) => (
                <TableRow key={item.index}>
                    <TableCell align="left">
                        <img className='avacado' src={avacado} alt='Avacado'/>  {item.productName}
                    </TableCell>
                    <TableCell align="left">{item.brand}</TableCell>
                    <TableCell align="left">{item.price}</TableCell>
                    <TableCell align="left">{item.quantity}</TableCell>
                    <TableCell align="left">{item.total}</TableCell>
                    <TableCell align="left">
                        {item.status === "" ? (
                            " "
                        ) : (
                            <span
                                style={{
                                    backgroundColor: item.status === "Approved" ? "green" : "red",
                                    color: "white",
                                    padding: "3px 5px",
                                    borderRadius: "4px",
                                }}
                            >
                                {item.status}
                            </span>
                        )}
                    </TableCell>
                    <TableCell align="left">
                        {item.status === "Approved" ? <DoneIcon style={{ color: "green" }} onClick={() => handleApprove(index)} /> : <DoneIcon onClick={() => handleApprove(index)} />}
                        {item.status === "Missing" || item.status === "Missing Urgent" ? <CloseIcon style={{ color: "red" }} onClick={() => handleOpen(item.productName, index)} /> : <CloseIcon onClick={() => handleOpen(item.productName, index)} />}
                        <EditIcon />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>

            </div>

            <div>
                <Modal open={open} onClose={handleClose}>
                    <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, p: 2 }}>
                        <IconButton aria-label="close" sx={{ position: 'absolute', top: 5, right: 5 }} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                        <h4>Missing Product</h4>
                        <p>Is <b>{item} ?</b></p>
                        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                            <FormControlLabel value="Missing" control={<Radio />} label="Missing" />
                            <FormControlLabel value="Missing Urgent" control={<Radio />} label="Missing Urgent" />
                        </RadioGroup>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                            <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>
                                No
                            </Button>
                            <Button variant="contained" onClick={handleMissing}>
                                Yes
                            </Button>
                        </div>
                    </Paper>
                </Modal>
            </div>
        </>
    );
};

export default ProductsList;

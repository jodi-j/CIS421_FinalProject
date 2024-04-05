import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import './HomePage.css';

const HomePage = () => {

    return(
        <Container component="main" style={{ textAlign: "center", marginTop: "25px" }}>
        <CssBaseline>
            <div>
                <Typography variant='h3'>Bookstore!</Typography>
                <form>
                    <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    >Admin View</Button>
                    <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    >Book & Merchandise</Button>
                    <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    >Customer View</Button>
                    <Link to="/ordering">
                        <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        >Ordering</Button>
                    </Link>
                </form>
            </div>
        </CssBaseline>
        </Container>
    )
}



export default HomePage;
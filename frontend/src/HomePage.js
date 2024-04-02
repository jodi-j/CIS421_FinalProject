import React, {useState, useEffect} from 'react';

import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import './HomePage.css';

const HomePage = () => {

    return(
        <Container component="main" style={{ textAlign: "center", marginTop: "25px" }}>
        <CssBaseline>
            <div>
                <Typography variant='h3'>This Title</Typography>
                <form>
                    <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    >Admin Page</Button>
                    <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    >Admin Page</Button>
                    <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    >Admin Page</Button>
                </form>
            </div>
        </CssBaseline>
        </Container>
    )
}



export default HomePage;
import IconButton from '@mui/material/IconButton';
import { Grid, Box, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import * as React from 'react';

function FlagCard({ description, startDate, endDate, state }) {
    const handleCopy = async (text) => {
        await navigator.clipboard.writeText(text);
    }

    return (
        <Box width="100%" sx={{ my: 2 }}>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography sx={{ marginTop: 0, fontSize: "2rem", color: "#B6B6B6", textAlign: "left" }}>{state}</Typography>
                </Grid>
                <Grid>
                    <IconButton sx={{ '&:hover': { backgroundColor: '#4B4B4B' } }} onClick={() => handleCopy(description)}><ContentCopyIcon sx={{ color: "#378CE7" }} /></IconButton>
                </Grid>
            </Grid>
            <Typography sx={{ fontSize: "1.2rem", color: "#B6B6B6", textAlign: "left" }}>{startDate} - {endDate}</Typography>
            <Box sx={{ marginTop: 1 }}>
                <Typography sx={{ fontSize: "0.9rem", color: "#B6B6B6", textAlign: "left" }}>{description}</Typography>
            </Box>
        </Box>
    )
}

export default FlagCard;

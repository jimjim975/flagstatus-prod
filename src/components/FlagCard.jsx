import IconButton from '@mui/material/IconButton';
import { Paper, Grid, Box, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import * as React from 'react';

function FlagCard({ description, startDate, endDate, state }) {
    const handleCopy = async (text) => {
        await navigator.clipboard.writeText(text);
      }

    return (
        <Box width="100%">
            <Paper sx={{ my: 1, padding: 2, backgroundColor: "#282828" }} elevation={20}>
                <Grid container justifyContent="space-between">
                    <Grid>
                        <Typography sx={{ fontSize: "2rem", color: "#B6B6B6", textAlign: "left" }}>{state}</Typography>
                    </Grid>
                    <Grid>
                        <IconButton onClick={() => handleCopy(description)}><ContentCopyIcon sx={{ color: "#378CE7" }} /></IconButton>
                    </Grid>
                </Grid>
                <Typography sx={{ fontSize: "1.2rem", color: "#B6B6B6", textAlign: "left" }}>{startDate} - {endDate}</Typography>
                <Box sx={{ marginTop: 1 }}>
                    <Typography sx={{ fontSize: "0.9rem", color: "#B6B6B6", textAlign: "left" }}>{description}</Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export default FlagCard;

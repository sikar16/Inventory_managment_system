// CardList.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function CardList({ name, detaile }) {
    return (
        <Card sx={{ width: 200 }}>
            <CardContent>
                <Typography gutterBottom variant="p" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {detaile} users
                </Typography>
            </CardContent>
        </Card>
    );
}

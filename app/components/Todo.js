"use client"

import { useRouter } from "next/navigation";
import {Card,CardActions,CardContent,Typography,Button,Grid,CircularProgress,Box} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useState } from "react";

export default function Todo({todo})
{
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    const markAsDoing = async () => {
        setLoading(true);
        await fetch(`${location.origin}/todo/doing`,{
            method: "put",
            body: JSON.stringify({ id: todo.id }),
        });
        router.refresh();
        setLoading(false);
    }

    return (
        <Card sx={{ maxWidth: 275}} variant="outlined">
             <CardContent>
                <Grid container spacing={1} direction="column">
                    <Grid item >
                        <Grid container spacing={1}>
                            <Grid item> 
                                {

                                    loading ? <CircularProgress size={20}/> : 
                                    <FormatListBulletedIcon/>
                                }
                            </Grid>
                            <Grid item>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Todo
                                </Typography >
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Box maxWidth={270} padding={1}>
                            <Typography variant="h5" sx={{wordWrap: 'break-word'}}>
                                {
                                todo.todo
                                }
                            </Typography >
                        </Box>
                    </Grid>
                </Grid>
             </CardContent>
            <CardActions >
                <Button onClick={markAsDoing} startIcon={<DirectionsRunIcon/>} disabled={loading}>
                    Doing
                </Button>
            </CardActions>
        </Card>
    );
}
"use client"

import { useRouter } from "next/navigation";
import {Card,CardActions,CardContent,Typography,Button,Grid,CircularProgress,Box} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react"
export default function Doing({doing})
{
    const router = useRouter();
    const [loading,setLoading] = useState(false);

    const markAsComplete = async () => {
        setLoading(true);
        await fetch(`http://localhost:3000/todo/done`,{
            method: "put",
            body: JSON.stringify({ id: doing.id }),
        });
        router.refresh();
        setLoading(false);
    };
    
    return (
        <Card sx={{ maxWidth: 275 }} variant="outlined">
             <CardContent>
                <Grid container spacing={1} direction="column">
                    <Grid item >
                        <Grid container spacing={1}>
                            <Grid item> 
                            {

                                loading ? <CircularProgress size={20}/> : 
                                <DirectionsRunIcon/>
                            }
                            </Grid>
                            <Grid item>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    doing
                                </Typography >
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Box maxWidth={270} padding={1}>
                            <Typography variant="h5" sx={{wordWrap: 'break-word'}}>
                                {
                                doing.todo
                                }
                            </Typography >
                        </Box>
                    </Grid>
                </Grid>
                
             </CardContent>
            <CardActions >
                <Button onClick={markAsComplete} startIcon={<CheckIcon />} disabled={loading}>
                    Done
                </Button>
            </CardActions>
        </Card>
    )
}
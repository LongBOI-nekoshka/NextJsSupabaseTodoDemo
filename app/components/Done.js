"use client"

import { useRouter } from "next/navigation";
import {Card,CardActions,CardContent,Typography,Button,Grid,CircularProgress,IconButton,Tooltip,Box} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CheckIcon from '@mui/icons-material/Check';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useState } from "react"

export default function Done({done})
{
    const router = useRouter();
    const [loading,setLoading] = useState(false);

    const markAsTodo = async () => {
        setLoading(true);
        await fetch(`${location.origin}/todo`,{
            method: "put",
            body: JSON.stringify({ id: done.id }),
        });
        router.refresh();
        setLoading(false);
    };
    
    const moveToArchive = async () => {
        setLoading(true);
        await fetch(`${location.origin}/todo/archived`,{
            method: "put",
            body: JSON.stringify({ id: done.id }),
        });
        router.refresh();
        setLoading(false);
    }
    

    return(
        <Card sx={{ maxWidth: 275 }} variant="outlined">
             <CardContent>
                <Grid container spacing={1} direction="column">
                    <Grid item >
                        <Grid container spacing={1}>
                            <Grid item> 
                                {
                                    loading ? <CircularProgress size={20}/>:  
                                    <CheckIcon/>
                                }
                            </Grid>
                            <Grid item>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Done
                                </Typography >
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Box maxWidth={270} padding={1}>
                            <Typography variant="h5" sx={{wordWrap: 'break-word'}}>
                                {
                                done.todo
                                }
                            </Typography >
                        </Box>
                    </Grid>
                </Grid>
                
             </CardContent>
            <CardActions >
                <Grid 
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Button onClick={markAsTodo} startIcon={<FormatListBulletedIcon />} disabled={loading}>
                            Back to Todo
                        </Button>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Move to Archive">
                            <IconButton onClick={moveToArchive}>
                                <ArchiveIcon/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                
            </CardActions>
        </Card>
    )
}
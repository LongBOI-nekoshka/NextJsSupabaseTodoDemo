"use client"

import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import {Grid,Card,Box,CardContent,Typography,CircularProgress,IconButton,TextField,InputAdornment,Tooltip } from '@mui/material';
import { useState } from "react"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Archived () {
    const [loading,setLoading] = useState(false);
    const [todo,setTodo] = useState('');
    const [searchedTodo,setSearchedTodo] = useState([])
    const [openSnack,setSnack] = useState(false);

    const getSearched = async () => {
        setLoading(true)
        const todos = await (await fetch(`${location.origin}/todo/archived?q=${todo}`)).json()
        setSearchedTodo(todos.data)
        if(todos.data.length === 0)
        {  
            setSnack(true);
        }
        setLoading(false);

    }

    const handleClose = () => 
    {
        setSnack(false)
    }

    return (
        <>
            <Snackbar 
            open={openSnack} 
            autoHideDuration={4000} 
            onClose={() => {setSnack(false)}}
            anchorOrigin ={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert
                    onClose={handleClose}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    No Data Fetched
                </Alert>
            </Snackbar>
            <Grid container direction={'column'}>
                <Grid item>
                    <Grid 
                        container
                        direction={'column'}
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <Grid item>
                            <TextField
                                size="small"
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment position="start">
                                        <SearchIcon/>
                                        </InputAdornment>
                                    ),
                                    endAdornment:(
                                        <InputAdornment position="end">
                                            <Tooltip title='search'>
                                                <IconButton size='small' onClick={getSearched} disabled={todo == '' || todo.length > 45 ? true : false}>
                                                    {
                                                        !loading ? 
                                                        <DirectionsIcon/>
                                                        :
                                                        <CircularProgress size={23}/>
                                                    }
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={(e) => setTodo(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter")
                                        getSearched()
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="caption" display="block" gutterBottom color="text.secondary">{todo.length}/45</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction={"column"} spacing={0.2}>
                        {
                            searchedTodo.map((searched) => {
                                return (
                                    <Grid item key={searched.id}>
                                        <Card sx={{ maxWidth: 275}} variant="outlined">
                                            <CardContent >
                                                <Box maxWidth={270} padding={1}>
                                                    <Typography variant="subtitle1" sx={{wordWrap: 'break-word'}}>
                                                        {
                                                            searched.todo
                                                        }
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                                        archived date: 
                                                        {
                                                            searched.archive_at
                                                        }
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
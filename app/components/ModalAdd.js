"use client"

import {Dialog,DialogTitle,DialogContent,DialogActions,Button,IconButton,TextField,Grid,Typography,CircularProgress} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

export default function ModalAddTodo() {
    const [open,setOpen] = useState(false);
    const [todo,setTodo] = useState('');
    const [loading,setLoading] = useState(false);
    const [openSnack,setSnack] = useState(false);

    const router = useRouter();

    const handleClose = () => 
    {
        setOpen(false)
    }

    const AddTodo = async () => {
        setLoading(true);
        await fetch(`http://localhost:3000/todo`,{
            method: "POST",
            body: JSON.stringify({ todo: todo}),
        });
        router.refresh();
        setLoading(false);
        setSnack(true);
        setTodo('');
        
    }

    return (
        <>
            <Snackbar 
                open={openSnack} 
                autoHideDuration={6000} 
                onClose={() => setSnack(false)}
                anchorOrigin ={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                >
                    Added todo Successfully
                </Alert>
            </Snackbar>
            <Tooltip title="Add Todo">
                <IconButton onClick={() => setOpen(true)}>
                    <AddCircleIcon/>
                </IconButton>
            </Tooltip>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>
                    <Grid 
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item >
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Add todo</Typography>
                        </Grid>
                        <Grid item >
                            <IconButton onClick={() => handleClose()}>
                                <CloseIcon fontSize='small'/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid 
                        container 
                        direction={'column'}
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <Grid item>
                            <TextField label="Todo" variant="filled" value={todo} onChange={(e) => setTodo(e.target.value)}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="caption" display="block" gutterBottom color="text.secondary">{todo.length}/45</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {

                        loading ? <CircularProgress size={20}/> : <></>
                    }
                    <Button disabled={todo == '' || todo.length > 45 ? true : false} onClick={() => AddTodo()}>
                        Add Todo
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
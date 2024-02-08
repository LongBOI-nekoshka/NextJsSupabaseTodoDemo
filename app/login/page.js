"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { createClient } from '@supabase/supabase-js'
import { useRouter } from "next/navigation";
import {Button,Grid,LinearProgress,Box,TextField} from '@mui/material';
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Login({isLogin}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const supabase = createClientComponentClient();
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");

  const [openSnack,setOpenSnack] = useState(false)
  const [typeError,setTypeError] = useState("");

  const handleClose = () => 
  {
    setOpenSnack(false)
    setTypeError("")
  }


  const handleSignUp = async () => {
    setLoading(true);
    const {data,error} = await supabase.auth.signUp({
      email: username,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
    setLoading(false);
    if(error)
    {
      setOpenSnack(true)
      setTypeError(error.message)
    }else{
      setOpenSnack(true)
    }
    setPassword('')
    setUsername('')
  };

  const handleSignIn = async () => {
    setLoading(true);
    const {data,error} = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    router.refresh();
    if(error)
    {
      setOpenSnack(true)
      setTypeError(error.message)
    }
    setLoading(false);
    setPassword('')
    setUsername('')
  };

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    router.refresh();
  };

  return (
      <>
        <Snackbar 
          open={openSnack} 
          autoHideDuration={4000} 
          onClose={() => {setOpenSnack(false);setTypeError("")}}
          anchorOrigin ={{vertical: 'top', horizontal: 'center'}}
        >
          <Alert
          onClose={handleClose}
          severity={typeError == "" ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
          >
            {
              typeError == "" ? "Please Check Email" : typeError
            }
          </Alert>
        </Snackbar>
        <Box sx={{maxHeight:5,minHeight:5}}>
          {
            loading ? 
            <LinearProgress/>: <></>
          }
        </Box>
        <Grid 
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          padding={1}
        >
          {
            isLogin == false ? 
            <>
              <Grid item>
                <Button variant="outlined" onClick={handleSignUp}>Sign up</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={handleSignIn}>Sign in</Button>
              </Grid>
            </> : null
          }
          <Grid item>
            {
              isLogin == true ? <Button variant="outlined" onClick={handleSignOut}>Sign out</Button> : null
            }
          </Grid>
          
        </Grid>
        {
          isLogin == false ? 
            <Grid 
              container 
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <TextField size="small" label="Email" value={username} type="email" onChange={(e) => setUsername(e.target.value)}/>
              </Grid>
              <Grid item>
                <TextField size="small" label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
              </Grid>
            </Grid>
            :
            <></>
        }
      </>
  );
}

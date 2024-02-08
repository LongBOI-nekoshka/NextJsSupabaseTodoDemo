import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Todo from "./components/Todo";
import Doing from "./components/Doing";
import Done from "./components/Done";
import {Grid,Card,CardContent,Typography} from '@mui/material';
import ChangeThemeButton from "./components/ChangeTheme";
import Login from "./login/page";
import ModalAddTodo from "./components/ModalAdd";
import Archived from "./components/Archived";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();


  const { data: todos } = await supabase
    .from("Todo")
    .select()
    .match({ Is_done: false })
    .match({ Is_doing: false});

  const { data: onGoing } = await supabase
    .from("Todo")
    .select()
    .match({ Is_done: false })
    .match({ Is_doing: true});

  const { data: done } = await supabase
    .from("Todo")
    .select()
    .match({ Is_done: true })
    .match({ Is_doing: false})
    .match({ Is_archived: false});

  return (
    <Grid 
      container 
      direction={"column"} 
      spacing={1} 
      justifyContent="center"
      alignItems="center"
    >
      <Grid item sx={{width:'100%'}}>
        <Login isLogin={!session ? false : true}/>
        
      </Grid>
      <Grid item>
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid item>
            <ChangeThemeButton session={session}/>
          </Grid>
          {
            !session ? 
              <Grid item>
                <Typography> Sign-in to see your todo input your email and password to sign up or input your email and password to login</Typography>
              </Grid> : 
              <>
              </>
          }
          
        </Grid>
      </Grid>
      {
        !session ? <></> : 
        <>
          <Grid item >
            <Typography Typography variant="h5" component="div">
              Hello, {session.user.email}
            </Typography>
          </Grid>
          <Grid item >
            <Grid container spacing={1} direction={"row"} >
              <Grid item>
                <Card sx={{ maxWidth: 500, minWidth:200, boxShadow: 10}}>
                  <CardContent>
                    <Grid container
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center" 
                      spacing={1}
                    >
                      <Grid item>
                        <Typography Typography variant="h5" component="div">
                          Todo
                        </Typography>
                      </Grid>
                      <Grid item>
                        <ModalAddTodo/>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} direction={"column"}>
                      {
                        todos.map((todo) => {
                          return (
                            <Grid item key={todo.id}>
                              <Todo todo={todo} key={todo.id}/>
                            </Grid>
                          );
                        })
                      }
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card sx={{ maxWidth: 500 , minWidth:200,  boxShadow: 10}}>
                  <CardContent>
                      <Typography variant="h5" component="div">
                        Doing
                      </Typography>
                      <Grid container spacing={1} direction={"column"}>
                        {
                          onGoing.map((doing) => {
                            return (
                              <Grid item key={doing.id}>
                                <Doing doing={doing} key={doing.id}/>
                              </Grid>
                            );
                          })
                        }
                      </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card sx={{maxWidth: 500 , minWidth:200,  boxShadow: 10}}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Done
                    </Typography>
                    <Grid container spacing={1} direction={"column"}>
                      {
                        done.map((done) => {
                          return (
                            <Grid item key={done.id}>
                              <Done done={done} key={done.id}/>
                            </Grid>
                          );
                        })
                      }
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card sx={{maxWidth: 500 , minWidth:200,  boxShadow: 10}}>
                  <CardContent>
                      <Typography variant="h5" component="div">
                        Archived
                      </Typography>
                      <Archived/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </>
      }
    </Grid>
  );
}

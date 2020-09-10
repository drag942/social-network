import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {initializeAppAsyncAction} from "./redux/appReducer";
import {getIsInitialized} from "./redux/appSelectors";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Users from "./components/Users/Users";


const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));


const navItems = ['Messages','Users', 'News', 'Music', 'Settings'];



const App = () => {

    const dispatch = useDispatch();
    const isInitialized = useSelector(state => getIsInitialized(state));

    React.useEffect(() => {
        dispatch(initializeAppAsyncAction());
    },[dispatch]);

    if (!isInitialized) return <LinearProgress/>;

    return (
        <Router>
            <div className="app-wrapper">
                <Header/>
                <Container>
                    <div className="app-content">
                        <Grid container spacing={3}>
                            <Grid spacing={3} xs={2}><NavBar navItems={navItems}/></Grid>
                            <Grid spacing={3} xs={10} className="app-wrapper-content">
                                <Route path={`/profile/:userId`} component={Profile}/>
                                <Route path={`/${navItems[0]}`} render={() => {
                                    return <React.Suspense fallback={<LinearProgress/>}><Dialogs/></React.Suspense>
                                }}/>
                                <Route path={`/${navItems[1]}`} component={Users}/>
                                <Route path='/login' component={Login}/>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        </Router>
    );
};

export default App;

import './header.css';
import { AppBar, Box, Stack, Switch, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { IsMetricContext } from '../../App';

export const Header: React.FC = () => {
    const { isMetric, toggleIsMetric } = useContext(IsMetricContext);
    const location = useLocation();
    const setIsMetric = () => {
        toggleIsMetric(!isMetric)
    }

    return (
    <Toolbar>
        <Box>
            <AppBar>
            <section className="weather-menu">
                <span className="title">Shaked's weather app</span>
                <div className='links'>
                    <div className="links-wrapper">
                        <Link className={`link ${location.pathname === '/weather-app/details' ? 'active' : ''}`} {...{to: "/weather-app/details"}}>forecast</Link>
                        <Link className={`link ${location.pathname === '/weather-app/favorites' ? 'active' : ''}`} {...{to: "/weather-app/favorites"}}>Favorites </Link>
                    </div>
                </div>
                <div className="units">
                    <div className="units-wrapper">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography style={{color: 'white'}}>°C</Typography>
                            <Switch onChange={setIsMetric}color="default" />
                            <Typography style={{color: 'white'}}>°F</Typography>
                        </Stack>
                    </div>
                </div>
            </section>
        </AppBar>
        </Box>
    </Toolbar>
    );
}
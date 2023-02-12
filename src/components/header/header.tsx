import './header.css';
import { AppBar, Box, Card, CardContent, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { IsMetricContext } from '../../App';

export const Header: React.FC = () => {
    const { toggleIsMetric } = useContext(IsMetricContext);

    return (
    <Toolbar>
        <Box>
            <AppBar>
            <section className="weather-menu">
                <span className="title">Shaked's weather app</span>
                <div className='links'>
                    <div className="links-wrapper">
                        <Link {...{to: "/weather-app/details"}}>Weather forecast</Link>
                        <Link {...{to: "/weather-app/favorites"}}>Favorites </Link>
                    </div>
                </div>
                <div className="units">
                    <div className="units-wrapper">
                    <Card 
                        className="unit"
                        onClick={() => toggleIsMetric(true)}>
                            <span>°C</span>
                    </Card>        
                    <Card   
                        className="unit"
                        onClick={() => toggleIsMetric(false)}>
                            <span>°F</span>
                    </Card>        
                    </div>
                </div>
            </section>
        </AppBar>
        </Box>
    </Toolbar>
    );
}
import './header.css';
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { IsMetricContext } from '../../App';

export const Header: React.FC = () => {
    const { toggleIsMetric } = useContext(IsMetricContext);

    return (
    <Toolbar>
        <AppBar>
            <section className="weather-menu">
                <span className="title">Shaked's weather app</span>
                <div className="links-wrapper">
                    <Link {...{to: "/details"}}>Weather forecast</Link>
                    <Link {...{to: "/favorites"}}>Favorites </Link>
                </div>
                <div className='units'>
                    <span onClick={() => toggleIsMetric(true)}>°C</span>        
                    <span onClick={() => toggleIsMetric(false)}>°F</span>        
                </div>
            </section>
        </AppBar>
    </Toolbar>
    );
}
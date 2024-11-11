import React from 'react';
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Topbar from './global/Topbar';
import Sidebar from './global/Sidebar';

const CitizenLayout = () => {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar />
                    <main className="content">
                        <Topbar />
                        <Outlet /> {/* Renders child components like Dashboard, MyCases, etc. */}
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default CitizenLayout;

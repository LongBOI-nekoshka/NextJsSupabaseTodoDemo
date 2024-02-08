"use client";

import { ThemeProvider } from "@emotion/react";
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { ColorModeContext } from '../../src/context-color';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useState, useEffect, useMemo} from 'react';
import { deepmerge } from '@mui/utils';
import { getDesignTokens, getThemedComponents } from '../../src/theme';

import {
    createTheme,
    responsiveFontSizes,
  } from '@mui/material/styles';

export default function Theme({children}) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState();

    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, [prefersDarkMode]);

    const colorMode = useMemo(
        () => ({
          toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
          },
    }),[]);

    let theme = useMemo(
        () =>
          createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))),
        [mode]
      );
    
      theme = responsiveFontSizes(theme);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
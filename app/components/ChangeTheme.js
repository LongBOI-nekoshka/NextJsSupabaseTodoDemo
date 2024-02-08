"use client"
import React from 'react';
import { IconButton, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../src/context-color';
import Tooltip from '@mui/material/Tooltip';

export default function ChangeThemeButton({session}) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Tooltip title=
      {
        theme.palette.mode === 'dark' ? 
        "change theme to light" : "change theme to dark"
      }
      placement={session ? 'right' : 'bottom'}
    >
      <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
      >
      {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
      ) : (
          <Brightness4Icon />
      )}
      </IconButton>
    </Tooltip>
  );
}
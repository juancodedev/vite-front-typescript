import './App.css'
import { AppRouter } from './router/AppRouter'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import React from 'react';

// Set Spanish locale as default
dayjs.locale('es');
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRouter/>
    </LocalizationProvider>
  )
}

export default App

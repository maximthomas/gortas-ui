import React from 'react';
import './index.scss';
import { GortasApp } from './components/GortasApp';
import { createRoot } from 'react-dom/client';
import { RestAuthService } from './services/authservice';
import { RestSessionService } from './services/sessionservice';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<GortasApp authService={RestAuthService} sessionService={RestSessionService}  />);



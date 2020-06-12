import React from 'react';
import ReactDOM from 'react-dom';
import {LoginApp} from './LoginApp'


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginApp />, div);
});
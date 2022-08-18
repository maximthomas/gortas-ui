import { Button, TextField } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { ICallback } from '../../commons/types';

export const mapCallback = (callback: ICallback, setCallback: (name: string, value: string) => void): ReactElement | null => {
    switch (callback.type) {
        case "text":
            return textCallback(callback, 'text', setCallback);
        case "password":
            return textCallback(callback, 'password', setCallback);
        default:
            return null
    }
}

export const getSubmitButton = (callbacks: ICallback[] | null | undefined, submitCallbacks :()=>void): ReactElement | null => {
    if(callbacks && callbacks.filter((c) => c.type === 'button').length == 0) {
        return <Button onClick={submitCallbacks}>Submit</Button>;
    }
    return null;
}

const textCallback = (callback: ICallback, type: string, setCallback: (name: string, value: string) => void): ReactElement => {
    return <TextField key={callback.name} fullWidth type={type}
        error={!!callback.error} helperText={callback.error}
        placeholder={callback.prompt ? callback.prompt : ""}
        required={callback.required ? callback.required : false}
        onChange={(e) => setCallback(callback.name, e.target.value)}
        value={callback.value}>            
    </TextField>
}
import React from 'react';
import {Button, Link, TextField} from '@material-ui/core'
import {AutoSubmit} from "./callbacks/AutoSubmit";

export class Callbacks extends React.Component {

    render() {
        const callbacks = this.props.callbacks.map(callback =>
            <div key={callback.name + "-container"}>
                {this.getCallback(callback)}
            </div>)
        const submitBtn = <div style={{textAlign: 'center'}}><Button  variant="contained" type="submit" color="default">Proceed</Button></div>
        const form = <form onSubmit={this.props.submitCallbacks} autoComplete={"off"}>{callbacks}{submitBtn}</form>
        return <div><h1>{this.props.title}</h1>{form}
            <div id="links">
                <Link href="/login/users/login"  color="inherit">Login</Link>
                <Link href="/login/users/registration"  color="inherit">Registration</Link>
                <Link href="/login/users/qr"  color="inherit">QR</Link>
            </div>
        </div>
    }

    getCallback(callback) {
        switch (callback.type) {
            case "image": {
                return <img src={callback.properties["image"]} alt={callback.prompt} style={{display: 'block', margin: '0 auto'}}/>
            }
            case "autosubmit": {
                return <AutoSubmit interval={callback.properties["interval"]} submitFunction={this.props.submitCallbacks}/>
            }
            default: {
                return <TextField error={!!callback.error} style={{width:"100%", marginTop: "14px"}} key={callback.name}
                                  id={callback.name} type={callback.type} placeholder={callback.prompt}
                                  onChange={(e) => this.props.updateCallback(e.target.value, callback.name)} helperText={callback.error}
                                  value={callback.value} required={callback.required}/>
            }
        }
    }
}
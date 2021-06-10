import React, { Component } from 'react'

import { MsalContext } from '@azure/msal-react'

//import { loginRequest } from './authConfig'
import { InteractionStatus } from '@azure/msal-browser'

import { getToken } from './AuthProvider'
import GraphData from './GraphData'
import { tokenRequestScopes } from './authConfig'

export default class ProfileContent extends Component {

    // Example on hot to use context
    static contextType = MsalContext

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    async componentDidMount() {
        if (this.context.accounts[0] && this.context.inProgress === InteractionStatus.None) {
            // getToken(tokenRequestScopes.graph)
            //     .then(resp => {
            //         console.log(resp)
            //     })
        }
    }

    render() {
        return (
            <div>
                <GraphData></GraphData>
            </div>
        )
    }
}

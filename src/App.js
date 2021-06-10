import React, { Component } from 'react'

import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import ProfileContent from './ProfileContent'
import { InteractionType } from '@azure/msal-browser'
import { loginRequest } from './authConfig'

export default class App extends Component {

  onLogin = async () => {
    this.props.pca.loginPopup(loginRequest)
      .then(x => {
        const accounts = this.props.pca.getAllAccounts();
        if (accounts && accounts.length !== 0) {
          this.props.pca.setActiveAccount(accounts[0]);
        }
      })
  }

  onLogout = () => {
    this.props.pca.logoutPopup();
  }


  render() {
    return (
      <MsalProvider instance={this.props.pca} >
        <AuthenticatedTemplate
          interactionType={InteractionType.Popup}
        // authenticationRequest={authRequest}
        // errorComponent={ErrorComponent}
        // loadingComponent={Loading}
        >
          <h1>Logged In</h1>
          <button onClick={this.onLogout} >Log out</button>
          <ProfileContent />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <h1>
            Logged Out
          </h1>
          <button onClick={this.onLogin} >Log in</button>
        </UnauthenticatedTemplate>
      </MsalProvider>
    )
  }
}
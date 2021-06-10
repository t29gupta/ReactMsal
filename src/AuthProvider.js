import { msalInstance } from './index'
import { tokenRequestScopes } from './authConfig'

export const getAccessToken = async (type) => {

    try {
        var token = await getToken(type)
        return token.accessToken;
    } catch (err) {
        console.error(err)
        throw err;
    }
}

export const getToken = async (type) => {

    try {
        console.log(type)
        const activeAccount = msalInstance.getActiveAccount(); // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API

        if (!activeAccount) {

            const accounts = msalInstance.getAllAccounts();

            msalInstance.setActiveAccount(accounts[0]);

            console.log(accounts)
        }
        console.log(activeAccount)
        // Get the access token silently
        // If the cache contains a non-expired token, this function
        // will just return the cached token. Otherwise, it will
        // make a request to the Azure OAuth endpoint to get a token
        var silentResult = await msalInstance
            .acquireTokenSilent({
                scopes: [...type],
                account: activeAccount || msalInstance.getActiveAccount()
            });

        return silentResult;
    } catch (err) {
        console.error(err)
        throw err;
    }
}
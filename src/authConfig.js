import { LogLevel } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        // clientId: "0a61c279-646b-4055-a5f1-1c3da7f70f18",
        clientId: "1d0cbbbc-f45a-4c5f-9f39-1127d363a450",
        authority: "https://login.microsoftonline.com/4eea6844-62c2-4421-8b17-472c57875f31",
        redirectUri: "http://localhost:3000/",
        // redirectUri: "/",
        postLogoutRedirectUri: "/",

    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    //scopes: ["api://1522df36-5d5f-4321-b408-4dc7bc665d35/access_as_user"],
    scopes: ["User.Read", "Calendars.Read", "api://1522df36-5d5f-4321-b408-4dc7bc665d35/access_as_user"],
    LoginHint: 'tushar.gupta@egonzehnder.com',
    extraQueryParameters: { domain_hint: 'egonzehnder.com' },
};

export const tokenRequestScopes = {
    graph: ["User.Read", "Calendars.Read"],
    API: ["api://1522df36-5d5f-4321-b408-4dc7bc665d35/access_as_user"]
}

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    baseGraphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    baseGraphMePhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
    // calendarEndpoint: '/calendarview?startdatetime=2021-03-29T00:00:00&enddatetime=2021-03-29T23:59:59'
    calendarEndpoint: '/calendarview?startdatetime=DatePartT00:00:00&enddatetime=DatePartT23:59:59'
};

export const apiConfig = {
    apiEndpoint: "https://localhost:44393/WeatherForecast"
}

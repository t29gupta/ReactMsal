import { graphConfig, apiConfig } from "./authConfig";
import { getAccessToken } from './AuthProvider';
import { tokenRequestScopes } from './authConfig'

async function callMsGraphForPhoto() {
    console.log(tokenRequestScopes.graph)
    const accessToken = await getAccessToken(tokenRequestScopes.graph)

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append('Prefer', 'outlook.timezone="India Standard Time"');

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.baseGraphMePhotoEndpoint, options)
        
        .catch(error => console.log(error));
}

async function callMsGraph() {
    console.log(tokenRequestScopes.graph)
    const accessToken = await getAccessToken(tokenRequestScopes.graph)

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append('Prefer', 'outlook.timezone="India Standard Time"');

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.baseGraphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

async function getMsGraphCalendar() {
    console.log(tokenRequestScopes.graph)

    const today = new Date();
    //2021-03-29
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date)

    const selectQuery = "subject,organizer,attendees,start,end"

    const accessToken = await getAccessToken(tokenRequestScopes.graph)

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append('Prefer', 'outlook.timezone="India Standard Time"');

    const options = {
        method: "GET",
        headers: headers
    };

    const endpoint = graphConfig.baseGraphMeEndpoint + graphConfig.calendarEndpoint.replace(/DatePart/g, date) + "&$select=" + selectQuery
    console.log(endpoint)
    return fetch(endpoint, options)
        .then(response => response.json()
            .then(resp => resp.value)
        )
        .catch(error => console.log(error));
}

async function callAPI() {
    console.log(tokenRequestScopes.API)

    const accessToken = await getAccessToken(tokenRequestScopes.API)
    console.log(accessToken)
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(apiConfig.apiEndpoint, options)
        .then(response => response.json()
            .then(resp => resp)
        )
        .catch(error => console.log(error));
}

export const graphCalls = {
    Me: callMsGraph,
    MePhoto: callMsGraphForPhoto,
    Calendar: getMsGraphCalendar,
    API: callAPI
}
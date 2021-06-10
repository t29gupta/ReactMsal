import React, { Component } from 'react'
import { graphCalls } from './graph'

export default class GraphData extends Component {

    constructor(props){
        super(props);

        this.state={

        }
    }

    async componentDidMount() {
    }

    getUser = async () => {
        try {
            const userDetails = await graphCalls.Me()
            console.log(userDetails)
        } catch (error) {
            console.log(error)
        }
    }

    getUserPhoto = async () => {
        try {
             graphCalls.MePhoto()
             .then(response => {
                if(response&&response.ok){
                    response.blob()
                    .then(data=>{
                        console.log(data)
                        if(data){
                            window.URL=window.URL||window.webkitURL;
                            console.log( window.URL.createObjectURL(data));

                            this.setState({
                                profilePhoto:window.URL.createObjectURL(data)
                            })

                        }else{
                            return "Not Found"
                        }
                    })
                }
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    getUserCalendar = async () => {
        try {
            const userCalendar = await graphCalls.Calendar()
            console.log(userCalendar)

            const events = userCalendar.map(eve => {
                return {
                    attendees: eve.attendees.filter(x => x.type === 'required').map(ant => ant.emailAddress.name),
                    start: new Date(eve.start.dateTime),
                    end: new Date(eve.end.dateTime),
                    subject: eve.subject,
                    duration: ((new Date(eve.end.dateTime)) - (new Date(eve.start.dateTime))) / (1000 * 60) //+ " mins"
                }
            });

            console.log(events)

        } catch (error) {
            console.log(error)
        }
    }

    getAPIData = async () => {
        try {
            const userCalendar = await graphCalls.API()
            console.log(userCalendar)

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.getUser} >Get User data</button>
                <button onClick={this.getUserPhoto} >Get User Photo</button>
                <button onClick={this.getUserCalendar} >Get User Calendar</button>
                <button onClick={this.getAPIData} >Call API</button>
                <img src={this.state.profilePhoto} alt="" height='200' width='200' />
            </div>
        )
    }
}

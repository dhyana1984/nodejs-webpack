import React from 'react'

export default class App extends React.Component{
    render(){
        return(<div onClick={this.handleClick} >
            Hello World
            </div>)
    }

    handleClick = (event) =>{
        alert(event)
    }
}
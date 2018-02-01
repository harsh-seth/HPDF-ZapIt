import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Mui from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'; 
import {blue500} from 'material-ui/styles/colors';

import IconButton from 'material-ui/IconButton';

import AtomIcon from 'material-ui/svg-icons/hardware/toys';

import './App.css';

const muiTheme = getMuiTheme({
		palette: {
			primary1Color: blue500,
		},
	    fontFamily: 'Arial, sans-serif',
});


class APITest extends Component {
  constructor(props)
  {
  	super(props);
  	this.state = {
  		message: 'awaiting response from server...',
  	};
  }

  fetchMessage() {
  	fetch(
  		'https://app.cramping38.hasura-app.io/json', 
  		{
  			method: "GET",
  		}
  	).then(response => {
  		if(response.ok)
	  		return response.json();
	  	else
	  		return {message: "There is a network connectivity problem! Request Error code: " + response.status}
  	}).then(result => {
  		this.setState({message: result['message']});
  	})
  }

  componentDidMount() {
  	this.fetchMessage();
  }

  render() {
    return (
      <Mui muiTheme={muiTheme}>
        <div>
        	{this.state.message}
        </div>
      </Mui>
    );
  }
}


function RouteTest(props){
  return(
  	<Mui muiTheme={muiTheme}>
	    <h4>
    	Test Route Successful!
    	</h4>
    	<IconButton tooltip="Go to Index" iconStyle={{width: 30, height: 30}} style={{width: 30, height: 30, padding: 0, marginLeft: '4%'}} href="/">
				<AtomIcon color={muiTheme.palette.primary1Color}/>
		</IconButton>
	</Mui>
    );
}


function Home(props){
	return(
		<h4>
			Work in progress... Try /testapi or /testroute
		</h4>);
}


const Redirect = () => (
  <Switch>
    <Route exact path="/testapi" component={APITest}/>
    <Route exact path="/testroute" component={RouteTest}/>
    <Route path="/" component={Home}/>
  </Switch>
);


export default Redirect;

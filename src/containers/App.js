import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css'

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			robots: [],
			searchField: ''	
		}
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then( user => this.setState({ robots : user }));
	}
  
  onSearchChange = (event) => {
  	this.setState({ searchField : event.target.value });
  }

	render() {
		const { robots, searchField } = this.state;
		const filteredRobots = robots.filter( robot => {
  		return robot.name.toLowerCase().includes(searchField.toLowerCase()) 
  	})
		if(!robots.length){
			return <h1 className="tc "> LOADING... </h1>
		}
		else {
			return (
				<div className="tc">
					<h1 className="f2">Search Robots</h1>
					<SearchBox searchChange={ this.onSearchChange } />
					<Scroll>
						<ErrorBoundary>
							<CardList robots={ filteredRobots }/>
						</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
	}
} 

export default App;
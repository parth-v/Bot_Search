import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import { setSearchField } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		searchField : state.searchField
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSearchChange : event => dispatch(setSearchField(event.target.value))
	}
}

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			robots: []
		}
	}
	
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then( user => this.setState({ robots : user }));
	}

	render() {
		const { robots } = this.state;
		const { searchField,onSearchChange } = this.props;
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
					<SearchBox searchChange={ onSearchChange } />
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

export default connect(mapStateToProps,mapDispatchToProps)(App);
import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import { setSearchField, requestRobotsApi } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		searchField : state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSearchChange: event => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobotsApi())
	}
}

class App extends React.Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter( robot => {
  		return robot.name.toLowerCase().includes(searchField.toLowerCase()) 
  	})
		if(isPending){
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
import React from 'react';

const Card = ({id,email,name}) => {
	return (
		<div className="tc bg-light-pink dib ma2 br3 pa3 grow shadow-5 bw2">
			<img src={`https://robohash.org/${id}?200x200`} alt="Robo" />
			<div>
				<h2>{name}</h2>
				<p>{email}</p>
			</div>
		</div>
	);
}

export default Card;
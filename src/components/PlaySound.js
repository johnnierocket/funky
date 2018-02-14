import React from 'react';
export default class PlaySound extends React.Component {
	render() {
		return (
			<audio autoPlay>
				<source src={this.props.src} type="audio/mpeg" />
			</audio>
		);
	}
}

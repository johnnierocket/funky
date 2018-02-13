import React, { Component } from 'react';
import styled from 'styled-components';

const Root = styled.div`
	color: #cc0000;
	font-size: 3rem;
	font-family: Lato, sans-serif;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

class App extends Component {
	render() {
		return <Root>HELLO FUNKY</Root>;
	}
}

export default App;

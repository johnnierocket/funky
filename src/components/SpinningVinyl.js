import React from 'react';
import styled from 'styled-components';

const VinylRecord = styled.div`
	height: 250px;
	width: 250px;
	background-color: black;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	animation: ${props => props.isSpinning} 2s infinite linear;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const RecordLabel = styled.div`
	display: flex;
	position: relative;
	height: 100px;
	width: 100px;
	background: linear-gradient(${props => props.labelColor}, blue);
	border-radius: 50%;
	color: ${props => props.textColor};
	font-variant: bold;
`;

const CircleArcs1 = styled.div`
	border: 2px solid #fff;
	display: inline-block;
	min-width: 11em;
	padding: 0.5em;
	border-radius: 100%;
	border-left-color: transparent;
	border-right-color: transparent;
	margin: -3.85rem -3rem;
	opacity: 1;
`;

const CircleArcs2 = styled.div`
	border: 2px solid #fff;
	display: inline-block;
	min-width: 6.5em;
	min-height: 9em;
	padding: 0.5em;
	border-radius: 40%;
	border-left-color: transparent;
	border-right-color: transparent;
	margin: -2.5rem -7rem;
	opacity: 0.75;
`;

const CircleArcs3 = styled.div`
	border: 2px solid #fff;
	display: inline-block;
	min-width: 6em;
	min-height: 6em;
	border-radius: 100%;
	opacity: 1;
`;

const RecordLabelChar = styled.div`
	font: 26px MonoSpace;
	height: 50px;
	position: absolute;
	width: 10px;
	left: 45px;
	top: 0;
	transform-origin: bottom center;
`;

const LabelChar1 = styled(RecordLabelChar)`
	transform: rotate(6deg);
`;

const LabelChar2 = styled(RecordLabelChar)`
	transform: rotate(42deg);
`;

const LabelChar3 = styled(RecordLabelChar)`
	transform: rotate(78deg);
`;

const LabelChar4 = styled(RecordLabelChar)`
	transform: rotate(114deg);
`;

const LabelChar5 = styled(RecordLabelChar)`
	transform: rotate(150deg);
`;

const RecordHole = styled.div`
	position: absolute;
	top: 40px;
	left: 40px;
	height: 20px;
	width: 20px;
	border-radius: 50%;
	background-color: black;
`;

export default class SpinningVinyl extends React.Component {
	constructor(props) {
		super(props);
		this.backgroundColors = ['#6cc93d', '#6abcfb', '#f7f7f7', '#e84733', '#000'];
		this.textColors = ['#ffd33f', '#fff', '#000', '#ffd33f', '#6abcfb', '#e84733'];

		this.state = {
			backgroundColor: '#6cc93d',
			textColor: '#ffd33f',
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.points !== nextProps.points) {
			this.difficultyLevel = Math.floor(nextProps.points / 10); // 10-50 point values, 1-5 difficulty
			debugger;
			this.setState({
				backgroundColor: this.backgroundColors[this.difficultyLevel],
				textColor: this.textColors[this.difficultyLevel],
			});
		}
	}
	render() {
		const { isSpinning } = this.props;
		const { backgroundColor, textColor } = this.state;
		const startSpin = isSpinning ? 'spin' : 'unset';

		return (
			<VinylRecord isSpinning={startSpin}>
				<RecordLabel labelColor={backgroundColor} textColor={textColor}>
					<CircleArcs1 />
					<CircleArcs2 />
					<CircleArcs3 />
					<LabelChar1>f</LabelChar1>
					<LabelChar2>u</LabelChar2>
					<LabelChar3>n</LabelChar3>
					<LabelChar4>k</LabelChar4>
					<LabelChar5>y</LabelChar5>
					<RecordHole />
				</RecordLabel>
			</VinylRecord>
		);
	}
}

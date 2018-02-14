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
	zoom: ${props => props.zoom};
	margin: ${props => props.margin};

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
	background: linear-gradient(${props => props.labelColor}, ${props => props.gradColor});
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
		this.backgroundColors = ['#6cc93d', '#e84733', '#f7f7f7', '#6abcfb', '#ffd33f'];
		this.textColors = ['#ffd33f', '#fff', '#ffd33f', '#6abcfb', '#e84733'];

		this.state = {
			backgroundColor: '#6cc93d',
			textColor: '#ffd33f',
		};
	}

	componentWillMount() {
		this.applyVinylStyle();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.points !== nextProps.points) {
			this.applyVinylStyle();
		}
	}

	applyVinylStyle = () => {
		const difficultyLevel = Math.floor(this.props.points / 10) - 1; // 10-50 point values, 1-5 difficulty
		console.log('id and diff', this.props.points, difficultyLevel);
		this.setState({
			backgroundColor: this.backgroundColors[difficultyLevel],
			textColor: this.textColors[difficultyLevel],
		});
	};

	render() {
		const { isSpinning, size } = this.props;
		const { backgroundColor, textColor } = this.state;
		const startSpin = isSpinning ? 'spin' : 'unset';
		const setZoom = size === 'small' ? 0.2 : 1;
		const setMargin = size === 'small' ? '1em' : 0;
		const randGradient = this.backgroundColors[Math.floor(Math.random() * this.backgroundColors.length)];

		return (
			<VinylRecord isSpinning={startSpin} zoom={setZoom} margin={setMargin}>
				<RecordLabel labelColor={backgroundColor} textColor={textColor} gradColor={randGradient}>
					{!size && <CircleArcs1 />}
					{!size && <CircleArcs2 />}
					{!size && <CircleArcs3 />}
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

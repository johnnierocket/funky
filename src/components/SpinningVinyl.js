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
	animation: ${props => props.isFlipping} 0.25s 2 linear alternate;
	zoom: ${props => (props.size === 'small' ? 0.2 : 1)};
	margin: ${props => (props.size === 'small' ? '0.5em -0.5em' : 0)};
	border: ${props => (props.size === 'small' ? '6px solid white' : 'none')};
	box-shadow: ${props => (props.size === 'small' ? '-2px 18px 38px' : 'none')};

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes flip {
		0% {
			transform: scale(1);
		}
		50% {
			transform-style: preserve-3d;
			transform: scale(0.75) rotateY(90deg);
		}
		100% {
			transform: scale(0.25) rotateY(180deg);
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

const CircleWrapper = styled.div`
	margin: -2.2em -2.1em;
	zoom: 1.5;
`;

const CircleArc = styled.div`
	border: 1px solid #fff;
	display: inline-block;
	min-width: 4em;
	min-height: 4em;
	padding: 0.5em;
	border-radius: 50%;
	border-left-color: transparent;
	border-right-color: transparent;
`;

const RecordLabelChar = styled.div`
	font: 26px Shrikhand;
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
			slideRight: false,
			moveUp: false,
		};
	}

	componentWillMount() {
		this.applyVinylStyle();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.points !== nextProps.points) {
			this.applyVinylStyle();
		}
		if (this.props.isFlipping !== nextProps.isFlipping) {
			this.setState({
				slideRight: true,
			});
		}
		if (this.props.isMovingUp !== nextProps.isMovingUp) {
			this.setState({
				moveUp: true,
			});
		}
	}

	applyVinylStyle = () => {
		const difficultyLevel = Math.floor(this.props.points / 10) - 1; // 10-50 point values, 1-5 difficulty
		this.setState({
			backgroundColor: this.backgroundColors[difficultyLevel],
			textColor: this.textColors[difficultyLevel],
		});
	};

	render() {
		const { isSpinning, flipAndSlide, size } = this.props;
		const { backgroundColor, textColor } = this.state;
		const startSpin = isSpinning ? 'spin' : 'unset';
		const startFlipSlide = flipAndSlide ? 'flip' : 'unset';

		const randGradient = this.backgroundColors[Math.floor(Math.random() * this.backgroundColors.length)];

		return (
			<VinylRecord size={size} isSpinning={startSpin} isFlipping={startFlipSlide}>
				<RecordLabel labelColor={backgroundColor} textColor={textColor} gradColor={randGradient}>
					{!size && (
						<CircleWrapper>
							<CircleArc>
								<CircleArc>
									<CircleArc>
										<CircleArc />
									</CircleArc>
								</CircleArc>
							</CircleArc>
						</CircleWrapper>
					)}
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

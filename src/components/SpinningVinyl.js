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
	animation: spin 2s infinite linear;

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
	background-color: ${props => props.labelColor};
	border-radius: 50%;
	color: ${props => props.textColor};
	font-variant: bold;
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

export default ({ labelColor, textColor }) => {
	return (
		<VinylRecord>
			<RecordLabel labelColor={labelColor} textColor={textColor}>
				<LabelChar1>f</LabelChar1>
				<LabelChar2>u</LabelChar2>
				<LabelChar3>n</LabelChar3>
				<LabelChar4>k</LabelChar4>
				<LabelChar5>y</LabelChar5>
				<RecordHole />
			</RecordLabel>
		</VinylRecord>
	);
};

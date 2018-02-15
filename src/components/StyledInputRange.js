import React from 'react';
import styled from 'styled-components';

const StyledInputWrapper = styled.div`
	position: absolute;
	width: 10px;
	height: 118px;
	background-color: #000;
	left: 320px;
	bottom: 100px;

	input[type='range'] {
		-webkit-appearance: slider-vertical; /* WebKit */
		margin: 18px 0;
		width: 10px;
		height: 100px;
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 8.4px;
		cursor: pointer;
		animate: 0.2s;
		background: #000;
		border-radius: 0;
		border: 0.2px solid #010101;
	}
	input[type='range']::-webkit-slider-thumb {
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
		border: 2px solid #979797;
		height: 10px;
		width: 50px;
		border-radius: 0;
		background: #000;
		cursor: pointer;
		-webkit-appearance: slider-vertical;
		margin-top: -14px;
		margin-left: -3px;
		outline: none;
	}
	input[type='range']:focus::-webkit-slider-runnable-track {
		background: #000;
	}
	input[type='range']::-moz-range-track {
		width: 100%;
		height: 8.4px;
		cursor: pointer;
		animate: 0.2s;
		background: #000;
		border-radius: 0;
		border: 0.2px solid #010101;
	}
	input[type='range']::-moz-range-thumb {
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
		border: 2px solid #979797;
		height: 10px;
		width: 50px;
		border-radius: 0;
		background: #000;
		cursor: pointer;
		outline: none;
	}
	input[type='range']::-ms-track {
		width: 100%;
		height: 8.4px;
		cursor: pointer;
		animate: 0.2s;
		background: transparent;
		border-color: transparent;
		border-width: 16px 0;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower {
		background: #000;
		border: 0.2px solid #010101;
		border-radius: 0;
	}
	input[type='range']::-ms-fill-upper {
		background: #000;
		border: 0.2px solid #010101;
		border-radius: 0;
	}
	input[type='range']::-ms-thumb {
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
		border: 2px solid #979797;
		height: 10px;
		width: 50px;
		border-radius: 0;
		background: #000;
		cursor: pointer;
		outline: none;
	}
	input[type='range']:focus::-ms-fill-lower {
		background: #000;
	}
	input[type='range']:focus::-ms-fill-upper {
		background: #000;
	}
`;

export default ({ onChange }) => {
	return (
		<StyledInputWrapper>
			<input type="range" onChange={onChange} />
		</StyledInputWrapper>
	);
};

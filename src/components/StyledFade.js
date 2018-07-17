import styled, { keyframes } from 'styled-components';

export const fade = keyframes`
	0% {
		opacity: 0;
	}
  100% {
		opacity: 1;
	}
`;

export default styled.div`
	animation: ${fade} 500ms ease-in;
`;

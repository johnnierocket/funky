import styled, { keyframes } from "styled-components";

export const spin = keyframes`
	0% {
		transform:rotate(0deg);
	}
  100% {
		transform:rotate(360deg);
	}
`;

export default styled.div`
  padding: 20px;
  margin: 10px auto;
  text-align: center;
  border-radius: 4px;
	animation: ${spin} 1200ms ease-in;
`;

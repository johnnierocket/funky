import React from 'react';
import AvatarCircle from './AvatarCircle';
import styled from 'styled-components';

const StyledUserRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 50px;

	span {
		padding-right: 1em;
	}

	img {
		margin-right: 1em;
	}
`;

const UserInfo = ({ avatarUrl, name, rank }) => {
	return (
		<div>
			<StyledUserRow>
				<span>{rank}</span>
				<AvatarCircle size={40} src={avatarUrl} />
				<span>{name}</span>
			</StyledUserRow>
		</div>
	);
};

export default UserInfo;

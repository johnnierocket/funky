import React from 'react';
import AvatarCircle from './AvatarCircle';

const UserInfo = ({ avatarUrl, name }) => (
	<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 50 }}>
		<AvatarCircle size={40} src={avatarUrl} />
		<span style={{ marginLeft: 12 }}>{name}</span>
	</div>
);

export default UserInfo;

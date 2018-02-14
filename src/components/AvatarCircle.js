import React from 'react';

const AvatarCircle = ({ size, src }) => (
	<img alt="user avatar" style={{ width: size, height: size, borderRadius: size / 2 }} src={src} />
);

export default AvatarCircle;

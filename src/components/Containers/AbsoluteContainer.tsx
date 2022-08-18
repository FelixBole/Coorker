import React from "react";

type Props = {
	children: JSX.Element | JSX.Element[];
    onClickFc: (e: React.MouseEvent) => void;
};

const AbsoluteContainer = ({children, onClickFc}: Props) => {
	return (
		<div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 0 }} onClick={onClickFc}>
			{children}
		</div>
	);
};

export default AbsoluteContainer;

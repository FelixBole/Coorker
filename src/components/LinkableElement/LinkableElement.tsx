import React, { useState } from "react";
import { ReactWrapperProps } from "../../shared/typings";
import RelativeContainer from "../Containers/RelativeContainer";

import styles from "./linkable-element.module.scss";

type Props = {};

const LinkableElement = (props: Props) => {
	const [showLinkWrapper, setShowLinkWrapper] = useState(false);

	let classNames: string[] = [styles.linkable];

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();

		let insideX = false,
			insideY = false;

		// Determine what the border of the element is
		insideX = e.clientX > rect.left && e.clientX < rect.right;
		insideY = e.clientY > rect.top && e.clientY < rect.bottom;
		if (insideX && insideY) setShowLinkWrapper(true);
        else setShowLinkWrapper(false);
	};

	const handleMouseLeave = (e: React.MouseEvent) => {
        // Set timeout needed otherwise it might go false then true again
        // when slowly moving out of the box making it stick to true
		setTimeout(() => {
            setShowLinkWrapper(false);
        }, 150)

		classNames = [styles.linkable];
	};

	const handleMouseEnter = (e: React.MouseEvent) => {
		classNames.push(styles.hovered);
	}

	return (
		<RelativeContainer>
			{showLinkWrapper === true ? (
				<LinkWrapper>
					<div
						className={classNames.join(" ")}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
						onMouseEnter={handleMouseEnter}
					></div>
				</LinkWrapper>
			) : (
				<div
					className={classNames.join(" ")}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					onMouseEnter={handleMouseEnter}
				></div>
			)}
		</RelativeContainer>
	);
};

const LinkWrapper = ({ children }: ReactWrapperProps) => {
	return (
		<div
			style={{
				border: "2px solid blue",
				width: "100%",
				height: "100%",
				position: "relative",
			}}
		>
			{children}
		</div>
	);
};

export default LinkableElement;

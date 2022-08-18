import React, { useEffect, useState } from "react";
import { CorkboardElementSavedConfiguration } from "../../shared/typings";

import styles from "./draggable-element.module.scss";

// TODO Make this a draggable element wrapper and
// Create function to shift if draggable or not to be called by children ?

type Props = {
	id: number;
	updateFc: (configuration: CorkboardElementSavedConfiguration) => void;
	config?: CorkboardElementSavedConfiguration;
	children?: JSX.Element | JSX.Element[];
};

const DEFAULT_CONFIG = {
	width: 200,
	height: 60,
	position: { x: 10, y: 10 },
};

const DraggableElement = ({ children, id, config, updateFc }: Props) => {
	const [dragElementOffset, setDragElementOffset] = useState({
		x: 0,
		y: 0,
	});
	const [dragging, setDragging] = useState(false);

	const setPosition = (e: React.MouseEvent<HTMLElement>) => {
		if (!dragging) return;

		const { pageX, pageY } = e;
		const { x, y } = dragElementOffset;

		const el = e.currentTarget;

		el.style.left = pageX - x + "px";
		el.style.top = pageY - y + "px";
	};

	const setUpDrag = (e: React.MouseEvent<HTMLElement>) => {
		setDragElementOffset({
			x: e.clientX - e.currentTarget.getBoundingClientRect().left,
			y: e.clientY - e.currentTarget.getBoundingClientRect().top,
		});
		setDragging(true);
		e.currentTarget.style.zIndex = "60";
	};

	const stopDrag = (e: React.MouseEvent<HTMLElement>) => {
		setDragging(false);

		const el = e.currentTarget;
		if (!el) return;

		el.style.zIndex = "50";

		const rect = el.getBoundingClientRect();

		updateFc({
			id,
			width: el.offsetWidth,
			height: el.offsetHeight,
			position: { x: rect.left, y: rect.top },
		});
	};

	const configuration = { ...DEFAULT_CONFIG, ...config };
	const { width, height, position } = configuration;
	const style = {
		width: width + "px",
		height: height + "px",
		top: position.y + "px",
		left: position.x + "px",
	} as React.CSSProperties;

	return (
		<div
			className={`${styles.element} ${dragging ? styles.dragging : ""}`}
			onMouseDown={(e) => setUpDrag(e)}
			onMouseMove={(e) => setPosition(e)}
			onMouseUp={(e) => stopDrag(e)}
			onDragStart={() => {
				return false;
			}}
			style={style}
		>
			{children}
		</div>
	);
};

export default DraggableElement;

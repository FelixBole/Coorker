import React, { useEffect, useRef, useState } from "react";
import { CorkboardElementSavedConfiguration } from "../../shared/typings";
import CardCloseBtn from "../Buttons/CardCloseBtn/CardCloseBtn";
import AbsoluteContainer from "../Containers/AbsoluteContainer";

import styles from "./draggable-element.module.scss";

// TODO Make this a draggable element wrapper and
// Create function to shift if draggable or not to be called by children ?

type Props = {
	id: string;
	updateFc: (configuration: CorkboardElementSavedConfiguration) => void;
	deleteFc: (id: string) => void;
	config: CorkboardElementSavedConfiguration;
	children?: JSX.Element | JSX.Element[];
	outsideClickerRef?: React.RefObject<HTMLDivElement>;
};

const DraggableElement = ({
	children,
	id,
	config,
	updateFc,
	deleteFc,
	outsideClickerRef,
}: Props) => {
	const [dragElementOffset, setDragElementOffset] = useState({
		x: 0,
		y: 0,
	});
	const [isBeingDragged, setIsBeingDragged] = useState(false);
	const [draggable, setDraggable] = useState(true);
	const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });

	const elementRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		setDragElementOffset({
			x: e.clientX - e.currentTarget.getBoundingClientRect().left,
			y: e.clientY - e.currentTarget.getBoundingClientRect().top,
		});
		setMouseDownPosition({ x: e.clientX, y: e.clientY });

		if (!draggable) return; // Check for draggable to still store the mouse down pos for mouseup

		setIsBeingDragged(true);
		e.currentTarget.style.zIndex = "60";
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		if (!isBeingDragged) return;

		const { pageX, pageY } = e;
		const { x, y } = dragElementOffset;

		const el = e.currentTarget;

		el.style.left = pageX - x + "px";
		el.style.top = pageY - y + "px";
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
		// Stopped being dragged
		setIsBeingDragged(false);

		// Calculate start point and release point and define if the
		// component has moved during the draggable time
		const moveOffset = 5; // Allow 5 pixels of moving to be considered not moved

		const { pageX, pageY } = e;
		const { x, y } = mouseDownPosition;

		const movedRight = pageX > x + moveOffset;
		const movedLeft = pageX < x - moveOffset;
		const movedDown = pageY > y + moveOffset;
		const movedUp = pageY < y - moveOffset;

		const hasMoved = movedRight || movedLeft || movedDown || movedUp;

		if (!hasMoved) {
			setDraggable(false);
			/**
			 * Adds an event listener on the outside clicker to then be able to get
			 * this information when clicking outside of the component
			 */
			outsideClickerRef?.current?.addEventListener("click", loseFocus, false);
		}

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

	/**
	 * Allows to drop the focus when clicking outside of the component after
	 * previously selecting it. This is made possible by the outsideClickerRef
	 */
	const loseFocus = (e: MouseEvent) => {
		if (elementRef.current) {
			const rect = elementRef.current.getBoundingClientRect();
			const inside =
				e.pageX > rect.left &&
				e.pageX < rect.right &&
				e.pageY > rect.top &&
				e.pageY < rect.bottom;

			if (inside) return;

			setDraggable(true);
			outsideClickerRef?.current?.removeEventListener(
				"click",
				loseFocus,
				false
			);
		}
	};

	const getStyles = () => {
		const { width, height, position } = config;
		return {
			width: width + "px",
			height: height + "px",
			top: position.y + "px",
			left: position.x + "px",
		} as React.CSSProperties;
	};

	return (
		<div
			ref={elementRef}
			className={`${styles.element} ${
				isBeingDragged ? styles.isBeingDragged : ""
			} ${draggable ? "" : styles.undraggable}`}
			onMouseDown={(e) => handleMouseDown(e)}
			onMouseMove={(e) => handleMouseMove(e)}
			onMouseUp={(e) => handleMouseUp(e)}
			onDragStart={() => {
				return false;
			}}
			style={getStyles()}
		>
			{children}
			<CardCloseBtn deleteFc={() => deleteFc(id)} />
		</div>
	);
};

export default DraggableElement;

import React, { useEffect, useRef, useState } from "react";
import { guid } from "../../utils/IDGenerator";
import { CorkboardElementSavedConfiguration } from "../../shared/typings";
import {
	getFromLocalStorage,
	parseAndSaveToLocalStorage,
} from "../../utils/storageParser";
import DraggableElement from "../DraggableElement/DraggableElement";

import styles from "./canvas.module.scss";

const Canvas = () => {
	const [canvasElements, setCanvasElements] = useState<
		CorkboardElementSavedConfiguration[]
	>(getFromLocalStorage());
	
	const outsideClickerRef = useRef<HTMLDivElement>(null); // Ref used to capture events outside of child components

	const updateItemInfo = (
		configuration: CorkboardElementSavedConfiguration
	) => {
		setCanvasElements((prev) => {
			const updated = [...canvasElements];
			const idx = prev.findIndex((el) => el.id === configuration.id);
			if (idx === -1) return prev;
			updated[idx] = configuration;
			return updated;
		});
	};

	const addElement = () => {
		// # Ref : https://stackoverflow.com/questions/71185474/react-component-not-re-rendering-after-change-in-an-array-state
		const updated = [...canvasElements];
		updated.push({
			id: guid(),
			width: 200,
			height: 100,
			position: { x: 200, y: 100 },
		});
		setCanvasElements(updated);
	};

	const deleteElement = (id: string) => {
		const updated = [...canvasElements];
		const idx = updated.findIndex((item) => item.id === id);
		if (idx === -1) return;

		updated.splice(idx, 1);
		setCanvasElements(updated);
	};

	// Update info useEffect
	useEffect(() => {
		parseAndSaveToLocalStorage(canvasElements);
	}, [canvasElements]);

	return (
		<div className={styles.canvas} ref={outsideClickerRef}>
			{canvasElements.map((config) => (
				<DraggableElement
					key={config.id}
					config={config}
					id={config.id}
					updateFc={updateItemInfo}
					deleteFc={deleteElement}
					outsideClickerRef={outsideClickerRef}
				>
					{/* <LinkableElement /> */}
				</DraggableElement>
			))}
			<button onClick={() => addElement()}>Add</button>
		</div>
	);
};

export default Canvas;

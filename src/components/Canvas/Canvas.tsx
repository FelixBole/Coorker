import React, { useEffect, useRef, useState } from "react";
import { CorkboardElementSavedConfiguration } from "../../shared/typings";
import { parseAndSaveToLocalStorage } from "../../utils/storageParser";
import DraggableElement from "../DraggableElement/DraggableElement";

import styles from "./canvas.module.scss";

type Props = {
	items: CorkboardElementSavedConfiguration[];
};

const Canvas = ({ items }: Props) => {
	const [savedItems, setSavedItems] =
		useState<CorkboardElementSavedConfiguration[]>(items);

	const updateItemInfo = (
		configuration: CorkboardElementSavedConfiguration
	) => {
		setSavedItems((prev) => {
			const elementToUpdateIndex = prev.findIndex(
				(el) => el.id === configuration.id
			);
			if (elementToUpdateIndex === -1) return prev;
			prev[elementToUpdateIndex] = configuration;
			return prev;
		});

		saveItems();
	};

	const saveItems = () => {
		parseAndSaveToLocalStorage(savedItems);
	}

	return (
		<div className={styles.canvas}>
			{items.map((config, index) => (
				<div key={index}>
					<DraggableElement
						config={config}
						id={index}
						updateFc={updateItemInfo}
					>
						{/* <LinkableElement /> */}
					</DraggableElement>
				</div>
			))}
		</div>
	);
};

export default Canvas;

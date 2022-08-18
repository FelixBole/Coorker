import React from "react";
import { CorkboardElementSavedConfiguration } from "../../shared/typings";
import DraggableElement from "../DraggableElement/DraggableElement";

import styles from "./canvas.module.scss";

type Props = {};

const TMP_ELS: CorkboardElementSavedConfiguration[] = [
	{
		width: 350,
		height: 100,
		position: { x: 150, y: 400 },
	},
	{
		width: 200,
		height: 50,
		position: { x: 200, y: 100 },
	},
];

const Canvas = (props: Props) => {
	const configsToJSON = () => {};

	return (
		<div className={styles.canvas}>
			{TMP_ELS.map((config, index) => (
				<DraggableElement key={index} config={config} />
			))}
		</div>
	);
};

export default Canvas;

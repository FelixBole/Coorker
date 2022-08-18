export type CorkboardElementSavedConfiguration = {
	id: number;
	width?: number;
	height?: number;
	position?: { x: number; y: number };
};

export type ReactWrapperProps = {
	children?: JSX.Element | JSX.Element[]
}
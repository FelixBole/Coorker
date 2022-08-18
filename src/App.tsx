import Canvas from './components/Canvas/Canvas'
import { CorkboardElementSavedConfiguration } from './shared/typings';
import { getFromLocalStorage } from './utils/storageParser';

const TMP_ELS: CorkboardElementSavedConfiguration[] = [
	{
		id: 0,
		width: 350,
		height: 100,
		position: { x: 100, y: 400 },
	},
	{
		id: 1,
		width: 200,
		height: 50,
		position: { x: 500, y: 100 },
	},
];

function App() {
  return (
    <div id="main">
      <Canvas />
    </div>
  )
}

export default App

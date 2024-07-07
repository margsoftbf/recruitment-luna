import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ModulesList from './components/Modules/ModulesList/ModulesList';
import ModuleDetails from './components/Modules/ModuleDetails/ModuleDetails';
import { TemperatureProvider } from './context/TemperatureContext';

function App() {
	return (
		<TemperatureProvider>
			<Router>
				<Routes>
					<Route path='/' element={<ModulesList />} />
					<Route path='/module/:id' element={<ModuleDetails />} />
				</Routes>
			</Router>
		</TemperatureProvider>
	);
}

export default App;

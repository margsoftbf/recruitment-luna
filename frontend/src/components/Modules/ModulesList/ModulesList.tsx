import React from 'react';
import axios from 'axios';
import './ModuleList.css';
import { useEffect, useState } from 'react';
import { ModuleTypes } from '../../../types';
import ModuleItem from '../ModuleItem/ModuleItem';
import { Link } from 'react-router-dom';
import { useTemperatures } from '../../../context/TemperatureContext';

const ModulesList = () => {
	const [modules, setModules] = useState<ModuleTypes[]>([]);
	const { temperatures } = useTemperatures();

	useEffect(() => {
		axios
			.get<ModuleTypes[]>('http://localhost:3001/modules')
			.then((response) => setModules(response.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='container'>
			<h1 className='module-list-title'>Available Modules</h1>
			<div className='module-container'>
				{modules.map((module) => (
					<Link
						key={module.id}
						to={`/module/${module.id}`}
						className='module-link'
					>
						<ModuleItem
							module={module}
							currentTemperature={temperatures[module.id]}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ModulesList;

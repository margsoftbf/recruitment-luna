import React from 'react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModuleTypes } from '../../../types';
import { useTemperatures } from '../../../context/TemperatureContext';
import ModuleEditForm from '../ModuleEditForm/ModuleEditForm';
import './ModuleDetails.css';
import ModuleHistoryData from '../ModuleHistoryData/ModuleHistoryData';

const ModuleDetails = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { temperatures } = useTemperatures();
	const currentTemperature = temperatures[id || ''];
	const [module, setModule] = useState<ModuleTypes | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const [mode, setMode] = useState<'hourly' | 'daily'>('hourly');

	const fetchModuleDetails = useCallback(() => {
		axios
			.get<ModuleTypes>(`http://localhost:3001/modules/${id}`)
			.then((response) => setModule(response.data))
			.catch((err) => console.log(err));
	}, [id]);


	useEffect(() => {
		fetchModuleDetails();
	}, [fetchModuleDetails]);



	if (!module) return <div>Loading...</div>;

	const handleEdit = () => {
		setIsModalOpen(true);
	};

	const handleSave = (updatedModule: ModuleTypes) => {
		setModule(updatedModule);
	};
	const handleModeChange = (newMode: 'hourly' | 'daily') => {
		setMode(newMode);
	};

	return (
		<div className='container'>
			<h1>Module Details</h1>
			<div className='module-box'>
				<h2 className='module-title'>{module.name}</h2>
				<p>
					Description: <span className='module-text'>{module.description}</span>
				</p>
				<p>
					Target Temperature:{' '}
					<span className='module-text'>{module.targetTemperature}°C</span>
				</p>
				<p>
					Current Temperature:{' '}
					<span
						style={{
							color:
								currentTemperature !== undefined &&
								Math.abs(currentTemperature - module.targetTemperature) <= 0.5
									? 'green'
									: 'red',
						}}
					>
						{currentTemperature !== undefined
							? `${currentTemperature}°C`
							: 'Loading...'}
					</span>
				</p>
				<div className='module-buttons'>
					<button
						onClick={handleEdit}
						disabled={!module.available}
						className={`module-btn ${!module.available ? 'disabled' : ''}`}
					>
						{module.available ? 'Edit' : 'Unavailable for Editing'}
					</button>
					<button onClick={() => navigate('/')} className='module-btn'>
						Back to List
					</button>
				</div>
			</div>

			<ModuleHistoryData  id={id || ''} mode={mode} onModeChange={handleModeChange} />
			<ModuleEditForm
				module={module}
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				onSave={handleSave}
			/>
		</div>
	);
};

export default ModuleDetails;

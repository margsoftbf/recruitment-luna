import React from 'react';
import './ModuleItem.css';
import { ModuleItemProps } from '../../../types';

const ModuleItem = ({ module, currentTemperature }: ModuleItemProps) => {
	
	const temperatureColor =
		currentTemperature !== undefined &&
		Math.abs(currentTemperature - module.targetTemperature) <= 0.5
			? 'green'
			: 'red';

	return (
		<div className='module'>
			<h2 className='module-title'>{module.name}</h2>
			<p>
				Available:{' '}
				<span className='module-text'>{module.available ? 'Yes' : 'No'}</span>
			</p>
			<p>
				Target Temperature:{' '}
				<span className='module-text'>{module.targetTemperature}°C</span>
			</p>
			<p>
				Current Temperature:{' '}
				<span style={{ color: temperatureColor }} className='module-curr-temp'>
					{currentTemperature !== undefined
						? `${currentTemperature}°C`
						: 'Loading...'}
				</span>
			</p>
		</div>
	);
};

export default ModuleItem;

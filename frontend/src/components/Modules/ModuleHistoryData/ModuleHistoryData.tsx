import './ModuleHistoryData.css';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { TemperatureDataTypes, ModuleHistoryDataProps } from '../../../types';

const ModuleHistoryData = ({
	id,
	mode,
	onModeChange,
}: ModuleHistoryDataProps) => {
	const [historyData, setHistoryData] = useState<TemperatureDataTypes[]>([]);


	
		
	const fetchHistoryData = useCallback(() => {
		axios
			.get<TemperatureDataTypes[]>(
				`http://localhost:3001/modules/${id}/history`,
				{
					params: {
						start: '2024-06-01T00:00:00.000Z',
						stop: '2024-06-02T00:00:00.000Z',
						mode,
					},
				}
			)
			.then((response) => setHistoryData(response.data))
			.catch((error) => console.error(error));
	}, [id, mode]);

	useEffect(() => {
		fetchHistoryData();
	}, [fetchHistoryData]);

	if (!Array.isArray(historyData)) {
		return null;
	  }


	return (
		<div className='container'>
			<h2 className='history-title'>History Data</h2>
			<div className='history-buttons'>
				<button
					onClick={() => onModeChange('hourly')}
					className='history-button'
				>
					Hourly
				</button>
				<button
					onClick={() => onModeChange('daily')}
					className='history-button'
				>
					Daily
				</button>
			</div>
			<table className='history-table'>
				<thead>
					<tr>
						<th>Date</th>
						<th>Temperature</th>
					</tr>
				</thead>
				<tbody>
					{historyData.map((data, index) => (
						<tr key={index}>
							<td>{new Date(data.timestamp).toLocaleString()}</td>
							<td>{data.temperature}°C</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ModuleHistoryData;

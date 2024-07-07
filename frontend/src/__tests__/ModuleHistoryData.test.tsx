import React from 'react';
import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from '@testing-library/react';
import axios from 'axios';
import ModuleHistoryData from '../components/Modules/ModuleHistoryData/ModuleHistoryData';
import { TemperatureDataTypes } from '../types';

jest.mock('axios');

const mockHistoryData: TemperatureDataTypes[] = [
	{
		timestamp: '2024-06-01T12:00:00.000Z',
		temperature: 20,
	},
	{
		timestamp: '2024-06-01T13:00:00.000Z',
		temperature: 21,
	},
];

describe('ModuleHistoryData', () => {
	beforeEach(() => {
		(axios.get as jest.Mock).mockResolvedValue({ data: mockHistoryData });
	});

	test('renders history title', async () => {
		await act(async () => {
			render(
				<ModuleHistoryData id='1' mode='hourly' onModeChange={() => {}} />
			);
		});

		expect(screen.getByText('History Data')).toBeInTheDocument();
	});

	test('renders buttons', async () => {
		await act(async () => {
			render(
				<ModuleHistoryData id='1' mode='hourly' onModeChange={() => {}} />
			);
		});

		expect(screen.getByText('Hourly')).toBeInTheDocument();
		expect(screen.getByText('Daily')).toBeInTheDocument();
	});

	test('renders history data', async () => {
		await act(async () => {
			render(
				<ModuleHistoryData id='1' mode='hourly' onModeChange={() => {}} />
			);
		});

		await waitFor(() => {
			expect(screen.getByText('1.06.2024, 14:00:00')).toBeInTheDocument();
			expect(screen.getByText('20°C')).toBeInTheDocument();
			expect(screen.getByText('1.06.2024, 15:00:00')).toBeInTheDocument();
			expect(screen.getByText('21°C')).toBeInTheDocument();
		});
	});

	test('onModeChange when buttons are clicked', async () => {
		const handleModeChange = jest.fn();

		await act(async () => {
			render(
				<ModuleHistoryData
					id='1'
					mode='hourly'
					onModeChange={handleModeChange}
				/>
			);
		});

		fireEvent.click(screen.getByText('Daily'));
		fireEvent.click(screen.getByText('Hourly'));

		expect(handleModeChange).toHaveBeenCalledWith('daily');
		expect(handleModeChange).toHaveBeenCalledWith('hourly');
	});
});

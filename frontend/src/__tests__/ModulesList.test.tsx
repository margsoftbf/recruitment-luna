import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import ModulesList from '../components/Modules/ModulesList/ModulesList';
import { ModuleTypes } from '../types';

jest.mock('axios');
jest.mock('../context/TemperatureContext', () => ({
	useTemperatures: () => ({
		temperatures: { '1': 22.5, '2': 23.0 },
	}),
}));

const mockModules: ModuleTypes[] = [
	{
		id: '1',
		name: 'Module 1',
		description: 'Description 1',
		targetTemperature: 25,
		available: true,
	},
	{
		id: '2',
		name: 'Module 2',
		description: 'Description 2',
		targetTemperature: 20,
		available: true,
	},
];

describe('ModulesList', () => {
	beforeEach(() => {
		(axios.get as jest.Mock).mockResolvedValue({ data: mockModules });
	});

	test('renders list of modules', async () => {
		await act(async () => {
			render(
				<BrowserRouter>
					<ModulesList />
				</BrowserRouter>
			);
		});

		expect(screen.getByText('Available Modules')).toBeInTheDocument();
	});

	test('renders name of modules', async () => {
		await act(async () => {
			render(
				<BrowserRouter>
					<ModulesList />
				</BrowserRouter>
			);
		});

		expect(await screen.findByText('Module 1')).toBeInTheDocument();
		expect(await screen.findByText('Module 2')).toBeInTheDocument();
	});

	test('renders module links', async () => {
		await act(async () => {
			render(
				<BrowserRouter>
					<ModulesList />
				</BrowserRouter>
			);
		});

		const module1Link = await screen.findByText('Module 1');
		const module2Link = await screen.findByText('Module 2');

		expect(module1Link.closest('a')).toHaveAttribute('href', '/module/1');
		expect(module2Link.closest('a')).toHaveAttribute('href', '/module/2');
	});
});

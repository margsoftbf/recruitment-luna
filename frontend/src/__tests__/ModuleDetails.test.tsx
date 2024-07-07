import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import ModuleDetails from '../components/Modules/ModuleDetails/ModuleDetails';
import { ModuleTypes } from '../types';

jest.mock('axios');
jest.mock('../context/TemperatureContext', () => ({
  useTemperatures: () => ({
    temperatures: { '1': 25.5 }
  })
}));

const mockModule: ModuleTypes = {
  id: '1',
  name: 'Test Module',
  description: 'Test Description',
  targetTemperature: 25,
  available: true,
};

describe('ModuleDetails', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockModule });
  });

  test('renders module name', async () => {
    render(
      <BrowserRouter>
        <ModuleDetails />
      </BrowserRouter>
    );

    expect(await screen.findByText('Test Module')).toBeInTheDocument();
  });

  test('renders module description', async () => {
    render(
      <BrowserRouter>
        <ModuleDetails />
      </BrowserRouter>
    );

    expect(await screen.findByText('Test Description')).toBeInTheDocument();
  });

  test('renders module temperature', async () => {
    render(
      <BrowserRouter>
        <ModuleDetails />
      </BrowserRouter>
    );

    expect(await screen.findByText(/25°C/)).toBeInTheDocument();
  });
});
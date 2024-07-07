import React from 'react';
import { render, screen } from '@testing-library/react';
import ModuleItem from '../components/Modules/ModuleItem/ModuleItem';
import { ModuleItemProps } from '../types';

const mockModule = {
  id: '1',
  name: 'Test Module',
  description: 'Test Description',
  targetTemperature: 25,
  available: true,
};

const renderModuleItem = (currentTemperature?: number) => {
  const props: ModuleItemProps = {
    module: mockModule,
    currentTemperature,
  };

  render(<ModuleItem {...props} />);
};

describe('ModuleItem', () => {
  test('renders module name', () => {
    renderModuleItem();
    expect(screen.getByText('Test Module')).toBeInTheDocument();
  });

  test('renders module availability', () => {
    renderModuleItem();
    expect(screen.getByText('Available:')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  test('renders target temperature', () => {
    renderModuleItem();
    expect(screen.getByText('Target Temperature:')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  test('renders current temperature', () => {
    renderModuleItem(24.5);
    expect(screen.getByText('Current Temperature:')).toBeInTheDocument();
    expect(screen.getByText('24.5°C')).toBeInTheDocument();
  });

  test('renders loading state for current temperature', () => {
    renderModuleItem(undefined);
    expect(screen.getByText('Current Temperature:')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders correct color for current temperature within target range', () => {
    renderModuleItem(25);
    const temperatureElement = screen.getByText('25°C', { selector: '.module-curr-temp' });
    expect(temperatureElement).toHaveStyle('color: green');
  });

  test('renders correct color for current temperature outside target range', () => {
    renderModuleItem(20);
    const temperatureElement = screen.getByText('20°C', { selector: '.module-curr-temp' });
    expect(temperatureElement).toHaveStyle('color: red');
  });
});
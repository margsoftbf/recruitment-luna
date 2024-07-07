import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ModuleEditForm from '../components/Modules/ModuleEditForm/ModuleEditForm';
import { ModuleTypes } from '../types';
import axios from 'axios';
import Modal from 'react-modal';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockModule: ModuleTypes = {
  id: '1',
  name: 'Test Module',
  description: 'Test Description',
  targetTemperature: 25,
  available: true,
};

describe('ModuleEditForm', () => {
  beforeAll(() => {
    Modal.setAppElement(document.createElement('div'));
  });

  const setup = () => {
    const onSave = jest.fn();
    const onRequestClose = jest.fn();

    render(
      <ModuleEditForm
        module={mockModule}
        isOpen={true}
        onRequestClose={onRequestClose}
        onSave={onSave}
      />
    );

    return {
      onSave,
      onRequestClose,
    };
  };

  test('renders form fields with initial data', () => {
    setup();

    expect(screen.getByLabelText(/Name:/)).toHaveValue('Test Module');
    expect(screen.getByLabelText(/Description:/)).toHaveValue('Test Description');
    expect(screen.getByLabelText(/Target Temperature:/)).toHaveValue(25);
  });

  test('calls onRequestClose when cancel button is clicked', () => {
    const { onRequestClose } = setup();

    fireEvent.click(screen.getByText(/Cancel/));

    expect(onRequestClose).toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    const { onSave } = setup();

    mockedAxios.patch.mockResolvedValueOnce({ data: mockModule });

    fireEvent.change(screen.getByLabelText(/Name:/), { target: { value: 'Updated Module' } });
    fireEvent.change(screen.getByLabelText(/Description:/), { target: { value: 'Updated Description' } });
    fireEvent.change(screen.getByLabelText(/Target Temperature:/), { target: { value: '30' } });

    fireEvent.click(screen.getByText(/Save/));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
    });
  });

  test('does not submit form with invalid data', async () => {
    const { onSave } = setup();

    fireEvent.change(screen.getByLabelText(/Target Temperature:/), { target: { value: '45' } });
    fireEvent.click(screen.getByText(/Save/));

    await waitFor(() => {
      expect(onSave).not.toHaveBeenCalled();
    });
  });
});

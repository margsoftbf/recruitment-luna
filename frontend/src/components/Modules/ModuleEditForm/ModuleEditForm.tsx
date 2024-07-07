import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { ModuleTypes, ModuleEditFormProps } from '../../../types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import './ModuleEditForm.css';
const ModuleEditForm = ({
	module,
	isOpen,
	onRequestClose,
	onSave,
}: ModuleEditFormProps) => {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		targetTemperature: '',
	});

	useEffect(() => {
		setFormData({
			name: module.name,
			description: module.description || '',
			targetTemperature: module.targetTemperature.toString(),
		});
	}, [module]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (
			formData.name &&
			formData.description &&
			+formData.targetTemperature >= 0 &&
			+formData.targetTemperature <= 40
		) {
			axios
				.patch<ModuleTypes>(`http://localhost:3001/modules/${module.id}`, {
					name: formData.name,
					description: formData.description,
					targetTemperature: +formData.targetTemperature,
				})
				.then((response) => {
					onSave(response.data);
					onRequestClose();
				})
				.catch((error) => console.error(error));
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName='modal-overlay'
			className='modal-content'
		>
			<XMarkIcon className='modal-mark' onClick={onRequestClose} />
			<h2>Edit Module</h2>
			<form onSubmit={handleSubmit} className='modal-form'>
				<div className='modal-form-group'>
					<label htmlFor='name' className='modal-form-label'>
						Name:
					</label>
					<input
						className='modal-form-input'
						type='text'
						id='name'
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						required
					/>
				</div>
				<div className='modal-form-group'>
					<label htmlFor='description' className='modal-form-label'>
						Description:
					</label>
					<input
						className='modal-form-input'
						type='text'
						id='description'
						value={formData.description}
						onChange={(e) =>
							setFormData({ ...formData, description: e.target.value })
						}
						required
					/>
				</div>
				<div className='modal-form-group'>
					<label htmlFor='temp' className='modal-form-label'>
						Target Temperature:
					</label>
					<input
						className='modal-form-input'
						type='number'
						id='temp'
						value={formData.targetTemperature}
						onChange={(e) =>
							setFormData({
								...formData,
								targetTemperature: e.target.value,
							})
						}
						min='0'
						max='40'
						required
					/>
				</div>
				<div className='module-form-buttons'>
					<button className='module-form-btn' type='submit'>
						Save
					</button>
					<button className='module-form-btn' type='button' onClick={onRequestClose}>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default ModuleEditForm;

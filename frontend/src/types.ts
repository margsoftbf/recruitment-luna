export interface ModuleTypes {
	id: string;
	name: string;
	description?: string;
	available: boolean;
	targetTemperature: number;
}

export interface TemperatureDataTypes {
	timestamp: string;
	temperature: number;
}

export interface ModuleItemProps {
	module: ModuleTypes;
	currentTemperature?: number;
}

export interface ModuleEditFormProps {
	module: ModuleTypes;
	isOpen: boolean;
	onRequestClose: () => void;
	onSave: (updatedModule: ModuleTypes) => void;
}

export interface ModuleHistoryDataProps {
	id: string;
	mode: 'hourly' | 'daily';
	onModeChange: (newMode: 'hourly' | 'daily') => void;
}

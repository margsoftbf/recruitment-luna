import axios from 'axios';
import { useState } from 'react';
import { ModuleTypes } from '../types';

const ModulesList = () => {
	const [modules, setModules] = useState<ModuleTypes[]>([]);
	return <div>ModulesList</div>;
};

export default ModulesList;

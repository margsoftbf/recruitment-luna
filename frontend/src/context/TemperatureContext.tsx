import {
	createContext,
	useState,
	useEffect,
	useContext,
	ReactNode,
} from 'react';
import io from 'socket.io-client';

interface TemperatureContextProps {
	temperatures: { [key: string]: number };
}

interface TemperatureProviderProps {
	children: ReactNode;
}

const TemperatureContext = createContext<TemperatureContextProps | undefined>(
	undefined
);

const socket = io('http://localhost:3001', {
	transports: ['websocket'],
});

export const TemperatureProvider = ({ children }: TemperatureProviderProps) => {
	const [temperatures, setTemperatures] = useState<{ [key: string]: number }>(
		{}
	);

	useEffect(() => {
		socket.on('connect', () => {});

		socket.on('moduleUpdate', (data: { id: string; temperature: number }[]) => {
			const temps = data.reduce((acc, curr) => {
				acc[curr.id] = curr.temperature;
				return acc;
			}, {} as { [key: string]: number });

			setTemperatures(temps);
		});

		socket.on('disconnect', () => {});

		return () => {
			socket.off('moduleUpdate');
		};
	}, []);

	return (
		<TemperatureContext.Provider value={{ temperatures }}>
			{children}
		</TemperatureContext.Provider>
	);
};

export const useTemperatures = (): TemperatureContextProps => {
	const context = useContext(TemperatureContext);
	if (!context) {
		throw new Error(
			'useTemperatures must be used within a TemperatureProvider'
		);
	}
	return context;
};

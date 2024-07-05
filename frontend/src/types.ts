export interface ModuleTypes {
    id: string;
    name: string;
    description?: string;
    available: boolean;
    targetTemperature: number;
  }
  
  export interface TemperatureData {
    timestamp: string;
    temperature: number;
  }
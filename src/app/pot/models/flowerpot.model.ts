export interface FlowerpotRequest {
    code: string,
    active: boolean,
    lastTemprature: number,
    lastHumidity: number,
    lastSunlight: number
}

export interface FlowerpotResponse {
    id: number,
    code: string,
    active: boolean,
    lastTemperature: number,
    lastHumidity: number,
    lastSunlight: number
}

export enum SensorType {
    TEMPERATURE = 'TEMPERATURE',
    HUMIDITY = 'HUMIDITY',
    SUNLIGHT = 'SUNLIGHT'
}

export interface SensorResponse {
    sensorType: SensorType;
    value: number;
    timestamp: string;
}
export function getTemperatureData(startTime, stopTime, mode, targetTemperature) {
    const data = [];
    let currentTime = new Date(startTime).getTime();
    const stopTimeMillis = new Date(stopTime).getTime();
    const interval = mode === "hourly" ? 3600000 : 86400000;

    while (currentTime <= stopTimeMillis) {
        if (Math.random() > 0.05) { 
            data.push({
                timestamp: new Date(currentTime).toISOString(),
                temperature: Number((targetTemperature + Math.random() * 2 - 1).toFixed(1)),
            });
        }
        currentTime += interval;
    }

    return data;
}

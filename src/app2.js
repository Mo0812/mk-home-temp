var sensor = require("node-dht-sensor");

const trackTmp = async () => {
while (true) {
    try {
    var readout = sensor.read(22, 22);
    console.log(`temperature: ${readout.temperature.toFixed()}°C, ` +
              `humidity: ${readout.humidity.toFixed()}%, ` +
              `valid: ${readout.isValid}`);
    await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
        console.error(err);
    }
}
}

trackTmp();
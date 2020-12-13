var sensor = require("node-dht-sensor");

while (true) {
    sensor.read(22, 27, async function (err, temperature, humidity) {
        if (!err) {
            console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
        }
        await new Promise((r) => setTimeout(r, 1000));
    });
}

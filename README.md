# mk-home-temp

**mk-home-temp** is a application which is build to run on a raspberry pi and constantly request and store temperature and humidity information from a attached DHT sensor.

Furthermore it includes a REST API which provides those information to other services, as well as a websocket server which informs connected services about temperature updates.

It is designed to work with [mk-home-server](https://github.com/Mo0812/mk-home-server) as an attached room thermometer and therefore, once connected, can also be included into your Apple Homekit ecosystem with the additional [Homebridge]() plugin [homebridge-mkht](https://github.com/Mo0812/homebridge-mkht).

Nevertheless this application also shows the current temperature and humidity information through a basic static webpage when accessing the service directly.

## Requirements

- Node.js (v14.15.3)

**Optional:**
- yarn
- pm2

## How to run the project

To run this project you need to install the required Node.js version at first (you can also use [nvm](https://github.com/nvm-sh/nvm), there is a configuration file in the root directory).

### Production

Because the application is designed to work as a service directly on a raspberry pi zero, the recommended way to run it is by using [pm2](https://github.com/Unitech/pm2).
Therefore a preconfigured ecosystemfile is inculded.

Run the following commands to start *mk-home-temp* via pm2:

#### pm2

```
yarn install
```

```
pm2 start ecosystem.config.yml
```

To start the application at system start with pm2 use:

```
pm2 save
```

### Development

In development you can simply use yarn (or npm) to start the application.

Install the dependencies at first:

```
yarn install
```

And then start *mk-home-temp* in development mode:

```
yarn dev
```

### Static web frontent

To render the static web page output of the system with Tailwind, you need to compile the CSS configuration once.

To do so run:

```
yarn build:css
```

## Configuration

To configure *mk-home-temp* to your needs you can use the according `.env` file to a certain environment.

For development purposes you can configure the project via the [.env](.env) file.
For production use the [.env.production](.env.production) file.

All possible configuration parameters are shown below:

```
LOG_CONSOLE=1
SENSOR_INTERVAL=1000
SENSOR_TYPE=22
SENSOR_PIN=22
SENSOR_PROTOCOL_ENABLED=1
SHOW_MONITOR_UI=1
EXPRESS_PORT=8001
WS_PORT=4001
```

| Parameter | Options | Meaning |
| - | - | - |
| LOG_CONSOLE | *0 or 1* | Enable/Disable logging in the Node.js console |
| SENSOR_INTERVAL | *INTEGER VALUE* | Time interval in milliseconds in which the sensor gets requested for new data |
| SENSOR_TYPE | *11 or 22* | The used thermometer sensor type (DHT 11 or DHT 22) |
| SENSOR_PIN | *RASPERRY PINOUT VALUE* | The RPi pin number the DHT sensor data signal is connected to |
| SENSOR_PROTOCOL_ENABLED | *0 or 1* | Enable/Disable sensor data protocolling with a sqlite database |
| SHOW_MONITOR_UI | *0 or 1* | Enable/Disable the static webpage REST route for displaying the temperature/humidity information |
| EXPRESS_PORT | *VALID PORT NUMBER* | Select the port which should be used for the REST API |
| WS_PORT | *VALID PORT NUMBER* | ESelect the port which should be used for the Websocket Update notifications |

## Use the project
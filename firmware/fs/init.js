load("api_config.js");
load("api_dht.js");
load("api_timer.js");
load("api_mqtt.js");

let topic = "/devices/" + Cfg.get("device.id") + "/events";

let pin = 5;
let dht = DHT.create(pin, DHT.DHT11);

MQTT.setEventHandler(function (conn, ev) {
  if (ev === MQTT.EV_CONNACK) {
    print("connected to google cloud iot core");
  }
}, null);

Timer.set(
  1000 * 60,
  true,
  function () {
    let msg = JSON.stringify({
      hum: dht.getHumidity(),
      temp: dht.getTemp(),
    });

    let ok = MQTT.pub(topic, msg);
    print(ok, msg);
  },
  null
);

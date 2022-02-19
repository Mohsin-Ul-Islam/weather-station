import * as functions from "firebase-functions";
import {BigQuery} from "@google-cloud/bigquery";
import {initializeApp, database} from "firebase-admin";

initializeApp();

export const onWeatherStationTelemetry = functions.pubsub
    .topic("weather-station-telemetry-topic")
    .onPublish(async (message, context) => {
      const payload = message.json;
      const data = {
        temperature: payload.temp,
        humidity: payload.hum,
        timestamp: context.timestamp,
      };

      await new BigQuery()
          .dataset("weather_station_dataset")
          .table("telemetry")
          .insert({json: data}, {raw: true});

      await database().ref("/telemetry").set(data);
    });

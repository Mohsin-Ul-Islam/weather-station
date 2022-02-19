import "./style.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, onValue } from "firebase/database";

interface WeatherData {
  temperature: Number;
  humidity: Number;
  timestamp: String;
}

const firebaseConfig = {
  apiKey: "AIzaSyD-1gRf9jonhBrSHfjMlh1piUMGGOURJ2E",
  authDomain: "aqua-gcloud.firebaseapp.com",
  databaseURL: "https://aqua-gcloud-default-rtdb.firebaseio.com",
  projectId: "aqua-gcloud",
  storageBucket: "aqua-gcloud.appspot.com",
  messagingSenderId: "298847890603",
  appId: "1:298847890603:web:51e306b7efedc6927bdbee",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const telemetryRef = ref(database, "/telemetry");
const temperature = document.querySelector<HTMLDivElement>("#temperature")!;
const humidity = document.querySelector<HTMLDivElement>("#humidity")!;

get(telemetryRef).then((snapshot) => {
  render(snapshot.val());
});

onValue(telemetryRef, (snapshot) => {
  render(snapshot.val());
});

const render = (data: WeatherData) => {
  temperature.textContent = data.temperature.toString();
  humidity.textContent = data.humidity.toString();
};

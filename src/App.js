import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { Loader, LoaderOptions } from "google-maps";
import { locations } from "./locations";
var stores = [
  {
    name: "Store 1",
    location: { lat: 9.1748422, lng: 76.5013352 },
    hours: "8AM to 10PM",
  },
  {
    name: "Store 2",
    location: { lat: 10.6105871, lng: 76.5030048 },
    hours: "9AM to 9PM",
  },
];
var google, map;
function App() {
  useEffect(() => {
    initMap();
  }, []);
  const initMap = async () => {
    const options = {
      /* todo */
    };
    const loader = new Loader(
      "AIzaSyCMI8tvDNGVq5CVQvz2M80KV6PR9S_NgFc",
      options
    );
    google = await loader.load();

    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 21.1458, lng: 79.0882 },
      zoom: 5,
    });

    var marker = new google.maps.Marker({
      map: map,
      position: { lat: 21.1458, lng: 79.0882 },
      title: "Hello World!",
    });
    locations.forEach(function (store) {
      markStore(store);
    });
  };
  function markStore(storeInfo) {
    let position = { lat: storeInfo.Latitude, lng: storeInfo.Longitude };
    // Create a marker and set its position.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: storeInfo.name,
    });

    // show store info when marker is clicked
    marker.addListener("click", function () {
      showStoreInfo(storeInfo);
    });
  }

  // show store info in text box
  function showStoreInfo(storeInfo) {
    var info_div = document.getElementById("info_div");
    info_div.innerHTML =
      "Store name: " + storeInfo.name + "<br>Hours: " + storeInfo.hours;
  }
  return (
    <div className="App">
      <div id="map"></div>
    </div>
  );
}

export default App;

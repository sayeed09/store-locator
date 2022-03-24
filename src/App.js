import "./App.css";
import { useEffect } from "react";
import { Loader } from "google-maps";
import { locations } from "./locations";
let google, map;
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

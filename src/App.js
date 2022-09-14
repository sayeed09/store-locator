import "./App.css";
import { useEffect } from "react";
import { Loader } from "google-maps";
import { locations } from "./locations";
let google, map, infoWindow;

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
    let color = storeInfo.icon ? storeInfo.icon : "red";
    let icon = `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
    // Create a marker and set its position.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: storeInfo.name,
      icon: storeInfo.icon?icon:null,
    });

    // show store info when marker is clicked
    marker.addListener("click", function () {
      showStoreInfo(storeInfo);
      infoWindow.open(map, marker);
    });
  }

  // show store info in text box
  function showStoreInfo(storeInfo) {
    var infoContent =
      "Name: " + storeInfo.Name + "<br>Address: " + storeInfo.Address;

    infoWindow = new google.maps.InfoWindow({
      content: infoContent,
    });
  }
  return (
    <div className="App">
      <div id="map"></div>
      <div id="info_div"></div>
    </div>
  );
}

export default App;

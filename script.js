/* eslint-disable no-undef */
/**
 * Simple map
 */

// config map

let config = {
  minZoom: 7,
  maxZoom: 18,
};


const arr = data.features
const value = [21,28,28,15,15,22,28,22,33,17,22,20,21,59,56,7,16,16,16,16,59,100,90,90,100,55,16,15,20,18,22,19,22,22,18,22,10,9,14,27,56,70,67,45,84,14,14,5,5,11,35,50,33,39,27,30,34,27]
const region = [
  'Dhanori - Vishrantwadi',
  'Tingrenagar - Sanjay Park',
  'Lohegaon - Vimannagar',
  'East Kharadi - Wagholi',
  'West Kharadi - Vadgaon Sheri',
  'Vadgaon Sheri - Ramwadi',
  'Kalyaninagar - Nagpur Chawl',
  'Kalas - Phulenagar',
  'Yerwada',
  'Shivajinagar Gaothan - Sangamwadi',
  'Bopodi - Savitribai Phule Pune University',
  'Aundh - Balewadi',
  'Baner - Sus - Mahalunge',
  'Pashan - Bawdhan',
  'Gokhalenagar - Vadarwadi',
  'Fergusson College - Erandwane',
  'Shaniwar peth - Navi Peth',
  'Shaniwarwada - Kasba Peth',
  'Chhatrapati Shivaji Maharaj Stadium - Rasta peth',
  'Pune Station -Matoshri Ramabai Ambedkar Road',
  'Koregaon park - Mundhwa',
  'Manjari Bk. - Shewalwadi',
  'Sadesataranali - Aakashwani',
  'Magarpatta - Sadhana Vidyalaya',
  'Hadapsar Gaothan - Satavwadi',
  'Wanwadi Gaothan - Vaiduwadi',
  'Kasewadi - Lohiyanagar',
  'Ghorpade peth Udyan - Mahatma Phule Mandai',
  'Jai Bhavaninagar - Kelewadi',
  'Kothrud Gaothan - Shivtirthnagar',
  'Bhusari colony - Bavdhan Khurd',
  'Ideal colony - Mahatma Society',
  'Warje - Kondhave Dhavde',
  'Ramnagar - Uttamnagar Shivane',
  'Karvenagar',
  'Janata Vasahat - Dattawadi',
  'Shivdarshan - Padmavati',
  'Market yard - Maharshinagar',
  'Bibvewadi - Gangadham',
  'Kondhva Kh - Mithanagar',
  'Ramtekadi - Sayyadnagar',
  'Wanawadi - Kausar Baug',
  'Kale Boratenagar - Sasanenagar',
  'Fursungi',
  'Mohammad wadi - Uruli Devachi',
  'Kondhva Bk - Yewalewadi',
  'Upper Super Indiranagar',
  'Balajinagar - Shankar Maharaj Math',
  'Sahakarnagar - Taljai',
  'Vadgaon Bk - Manikbaug',
  'Nanded City - Sun City',
  'Khadakwasla - Narhe',
  'Dhayari - Ambegaon',
  'Dhankawadi - Ambegaon Pathar',
  'Chaitanyanagar - Bharati Vidyapeeth',
  'Sukhsagarnagar - Rajiv Gandhinagar',
  'Katraj - Gokulnagar',
  'Mahatma Phule Smarak –Bhavani Peth'
]

const mapp = new Map();
region.map((ele,index)=>{
  mapp.set(ele,value[index]);
})
console.log(mapp);

data = arr.map((ele) =>{
    ele.properties.density = mapp.get(ele.properties.Name2);
    return ele;
})

// magnification with which the map will start
const zoom = 30;
// co-ordinates
const lat = 18.5196;
const lng = 73.8554;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
function getColor(d) {
    return d > 100 ? '#800026' :
           d > 80  ? '#BD0026' :
           d > 60  ? '#E31A1C' :
           d > 40  ? '#FC4E2A' :
           d > 20   ? '#FD8D3C' :
           d > 10   ? '#FEB24C' :
           d > 5   ? '#FED976' :
                      '#FFEDA0';
}
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var geojson ;
function highlightFeature(e) {
  console.log("hover")
  var layer = e.target;
  
  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });
  
  layer.bringToFront();
  info.update(layer.feature.properties);
}
function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}
geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4> Crime Density</h4>' +  (props ?
        '<b>' + props.Name2 + '</b><br />' + props.density + ' crime / mi<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 10, 20, 40, 60, 80, 100],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

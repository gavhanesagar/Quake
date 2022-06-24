var ext;
var zm;

prevPage = window.location.href;

/*if(prevPage.split(".",5)[3].split("/", 3)[2] == "results")
{
    ext = [2.250, 28.6];
    zm = 5.7;
}
else
{
    ext = [30.97, 27];
    zm = 6.7;
}*/

var attribution = new ol.control.Attribution({
        collapsible: false
      });
var map = new ol.Map({
    target: 'map',
    view: new ol.View({
        controls: [new ol.control.ScaleLine, new ol.control.Attribution],
        
        center: ol.proj.fromLonLat([2.250, 28.6]),
        minZoom: 4,
        zoom: 5.7
    })
});


var format = 'image/png';
var strView = new ol.layer.Tile({
    'title': 'Google Maps Satellite',
    'type': 'base',
    visible: true,
    'opacity': 1.000000,
    source: new ol.source.XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVydmFoYXR0ZWthciIsImEiOiJjanBqZTdwbDIwNWYzM2tudm5ubm1uNGtxIn0.7CpWQ0c6Q_EwUzCG027z4A'
    }),
    attribution:"HEre",
    zIndex: -999
});

map.addLayer(strView);

algeriaLay1 = new ol.layer.Image({
    'title': 'IndiaDistrictRain',
    source: new ol.source.ImageWMS({
        ratio: 1,
        url:'http://vati.satyukt.com:8080/vatiserver/Quake/wms',
        params:{'FORMAT': format,
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS:'Quake:dza_adm2',
               }
    })
});
map.addLayer(algeriaLay1);


var defaultLayer;
var view_param;
function dis(company, prop, stat, sty)
{
    view_param = 'company:'+company+';build:'+prop+';stat:'+stat;
    //'company:2A;build:Residential;stat:AAL',
    defaultLayer = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://vati.satyukt.com:8080/vatiserver/Quake/wms',
            params: {'FORMAT': format,
                     'VERSION': '1.1.1',  
                     "VIEWPARAMS": view_param,
                     "STYLES":sty,
                     "LAYERS": 'Quake:algeria_statistics',
                     "exceptions": 'application/vnd.ogc.se_inimage',
                    }
        })
    });
    fullyLoaded(defaultLayer);    
}
dis("CNMA", "Residential", "pml_1_in_150", "sql_view_statistics_500");
map.addLayer(defaultLayer);


function fullyLoaded(currLayer)
{ 
    getActiveLayer = currLayer.getSource();
    activeLayer = currLayer;

    t = document.getElementById("preloader");
    t.style.display = "block";

    /*Check for layer load */
    getActiveLayer.on('imageloadend', function()
    {

        t.style.display = "none";
        t.name = "1";
    });
    document.querySelector("#map > div.ol-viewport > div.ol-overlaycontainer-stopevent > div.ol-attribution.ol-unselectable.ol-control > ul > li").style.display = "block";
    document.querySelector("#map > div.ol-viewport > div.ol-overlaycontainer-stopevent > div.ol-attribution.ol-unselectable.ol-control > ul > li").style.fontSize = "12px";
    t1 ='© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +'© <a href="https://www.openstreetmap.org/copyright">' +'OpenStreetMap contributors</a>',
    document.querySelector("#map > div.ol-viewport > div.ol-overlaycontainer-stopevent > div.ol-attribution.ol-unselectable.ol-control > ul > li").innerHTML = t1;
}


function removeTheLayers()
{    
    map.removeLayer(algeriaLay1);
    map.removeLayer(defaultLayer);
}

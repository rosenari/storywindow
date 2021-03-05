import React from "react";
import styled from "styled-components";
import styles from "./index.module.css";

const Div = styled.div`
    position:relative;
    width:100%;
    height:600px;
    border-radius:10px;
    overflow:hidden;
`;

declare var naver: any;

export default class Navermap extends React.Component {

    componentDidMount() {
        let aScript = document.createElement('script');
        aScript.type = 'text/javascript';
        aScript.src = "//openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=lkw7akuzd9&submodules=geocode";

        document.head.appendChild(aScript);
        aScript.onload = () => {
            let mapOptions = {
                center: new naver.maps.LatLng(36.0595704, 127.905399),
                zoom: 8,
                minZoom: 8,
                maxZoom: 21,
                scaleControl: true,
                logoControl: true,
                mapDataControl: true,
                zoomControl: true,
                mapTypeControl: true
            };

            let map = new naver.maps.Map('map', mapOptions);

            fetch('/data/noaharea.json')
                .then(res => res.json())
                .then(data => {
                    var geodata = [];
                    var sub_data = [];
                    var polygons = [];
                    for (var i = 0; i < data.length; i++) {
                        sub_data = [];
                        for (var j = 0; j < data[i].data.length; j++) {
                            sub_data.push(new naver.maps.LatLng(data[i].data[j][1], data[i].data[j][0]));
                        }
                        geodata.push(sub_data);
                    }

                    geodata.map((data) => {
                        polygons.push(new naver.maps.Polygon({
                            map: map,
                            paths: data,
                            fillColor: '#3dc700',
                            fillOpacity: 0.6,
                            strokeColor: '#3dc700',
                            strokeOpacity: 0.6,
                            strokeWeight: 1
                        }));
                    });

                }
                );

            let content_txt = '<div style="text-align:center;margin:auto">'
                + '<div>'
                + '<div class="' + styles.cs_mapbridge + '" style="width:60px;height:60px;text-align:center;height:60px;">'
                + '<img src="/images/hanbitmarker.png" width="60" height="60" />'
                + '</div>'
                + '</div>'
                + '<div>'
                + '<div style="background:white;color:black;border-radius:3px;width:60px;font-size:0.7em;padding-top:1px;border:black solid;border-width:1px;margin-top:0px;opacity:0.9">'
                + '진잠로 74'
                + '</div>'
                + '</div>'
                + '<div class="' + styles.pulse + '"></div>'
                + '</div>'


            let marker = new naver.maps.Marker({
                position: new naver.maps.LatLng("36.298278", "127.316382"),
                map: map,
                title: "한빛창 본점",
                icon: {
                    content: [
                        content_txt
                    ].join(''),
                    anchor: new naver.maps.Point(30, 60)
                }
            });


        };
    }

    render() {
        return (
            <Div id="map"></Div>
        );
    }
}

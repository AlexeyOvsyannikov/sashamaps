<template>
    <div class="root">
        <l-map ref="lmap" :zoom="zoom" :center="center" @update:center="updateCenter">
            <!--            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>-->
            <l-control-layers position="bottomleft"></l-control-layers>
            <l-tile-layer
                    v-for="tileProvider in tileProviders"
                    :key="tileProvider.name"
                    :name="tileProvider.name"
                    :visible="tileProvider.visible"
                    :url="tileProvider.url"
                    :attribution="tileProvider.attribution"
                    layer-type="base"/>

            <CustomMarker v-for="(it, key) in markers" :key="key" :source="it" :selected="selectedMarker"
                          @onMarkerClick="showInfo"/>
        </l-map>

        <ObjectInfo ref="myModal" @onAddressClick="onAddressClick"/>
    </div>
</template>

<script>
/* eslint-disable */
import {LControlLayers, LMap, LMarker, LPopup, LTileLayer} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from '@/components/CustomMarker.vue';
import ObjectInfo from '@/components/ObjectInfo.vue';
import geojson from '../shool.json';
import schools from '../formatted_schools.json'

const resource = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const contributors = '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors';

export default {
    name: 'MapContainer',
    components: {
        CustomMarker,
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        ObjectInfo,
        LControlLayers
    },
    data: () => ({
        tileProviders: [
            {
                name: 'OpenStreetMap',
                visible: true,
                attribution:
                        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            },
            {
                name: 'OpenTopoMap',
                visible: false,
                url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                attribution:
                        'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            },
        ],

        url: resource,
        attribution: contributors,

        zoom: 15,

        latitude: 0,
        longitude: 0,

        selectedMarker: null,
        config: null,
        formatted: schools,
    }),
    methods: {
        updateCenter({lat, lng}) {
            this.center = [lat, lng];
        },
        showInfo(source) {
            this.selectedMarker = source.id;
            this.$refs.myModal.open(source, () => {
                this.selectedMarker = null;
            });
        },
        onAddressClick(source) {
            this.center = source.position;
        }
    },
    computed: {
        formattedSchools() {
            if (!this.formatted) {
                return [];
            }

            return this.formatted.schools.map(it => ({
                id: Math.round(Math.random() * 1e9),
                position: [it["Широт"], it["Долго"]],
                name: it.name,
                fields: it.fields
            }));
        },
        features() {
            if (!this.config) {
                return [];
            }

            return this.config.features.map(({properties}) => ({
                id: Math.round(Math.random() * 1e9),
                name: properties["Наим_1"].toUpperCase(),
                position: [properties["Широт"], properties["Долго"]],
                fields: [
                    { "name": "Тип учебного заведения", "value": properties["тип__1"] ?? 'школа'},
                    { "name": "Адрес", "value": properties["Адрес"]?.replaceAll('литер', '') ?? ''}
                ],
            }));
        },
        markers() {
            return this.formattedSchools.concat(this.features);
        },
        center: {
            get() {
                return [
                    this.latitude,
                    this.longitude,
                ];
            },
            set(value) {
                this.latitude = value[0];
                this.longitude = value[1];
            }
        }
    },
    mounted() {
        this.config = geojson;
        this.formatted = schools;

        navigator.geolocation.getCurrentPosition(({coords}) => {
            this.latitude = coords.latitude;
            this.longitude = coords.longitude;
        }, () => {
            console.error('Error while loading geolocation');
        }, {});
    }
};
</script>

<style scoped>
.root {
    height: 100vh;
    width: 100vw;
    margin: 0;
}
</style>
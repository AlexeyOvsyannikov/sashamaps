<template>
    <l-marker class="MYMARKER" :icon="markerIcon" :lat-lng="source.position" @click="$emit('onMarkerClick', source)">
<!--        <l-popup :options="options">-->
<!--            <a href="javascript:;">{{source.id}}</a>-->
<!--        </l-popup>-->
    </l-marker>
</template>

<script>
    import L from 'leaflet';
    import {LPopup} from 'vue2-leaflet';

    export default {
        name: 'CustomMarker',
        components: {
            LPopup
        },
        props: {
            source: {
                type: Object,
                required: true
            },
            selected: {}
        },
        computed: {
            options() {
                return {
                    autoPanPaddingTopLeft: L.point(100, 100)
                }
            },
            markerIcon() {
                if (!L) {
                    return;
                }

                let size = 30;

                if (this.selected && this.selected == this.source.id) {
                    size *= 1.5;
                }

                return L.icon({
                    iconUrl: require('../assets/maps-and-flags.png'),
                    iconSize: [size, size]
                });
            },
        }
    };
</script>

<style scoped>
.marker {
    margin-top: -10px;
}
</style>
<template>
    <div class="map-application">
        <MapContainer/>
    </div>
</template>

<script>
    import MapContainer from '@/components/MapContainer.vue';
    export default {
        name: 'App',
        components: { MapContainer }
    };
</script>

<style lang="scss" scoped>
    .map-application {
        height: 100vh;
        width:  100vw;
        margin: 0;
    }

    #app {
        font-family:             Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing:  antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align:              center;
        color:                   #2c3e50;
        margin-top:              60px;
    }
</style>

<style>
    body {
        margin: 0;
        border: none;
    }
</style>

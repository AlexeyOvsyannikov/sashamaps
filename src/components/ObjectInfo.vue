<template>
    <div v-if="opened" class="object-info">
        <div class="header">
            <div class="title">Информация об учебном учреждении</div>
            <IconClose class="icon" @click="close"/>
        </div>

        <div class="name">
            {{source.name}}
        </div>

        <div class="fields">
            <div class="field" v-for="it in fields" :key="it.id">
                <template v-if="it.key == 'website'">
                    <div class="title">{{it.name}}</div>
                    <a :href="it.value" target="_blank" class="value">{{it.value}}</a>
                </template>
                <template v-else-if="it.key == 'teachers'">
                    <div class="title">{{it.name}}</div>
                    <div class="value">{{it.value}} <span v-if="it.extended">, среди них</span></div>

                    <div v-if="it.extended" class="extended">
                        <div class="extended-field field" v-for="(ex, id) in it.extended" :key="id">
                            <div class="title">{{ex.name}}</div>
                            <div class="value">{{ex.value}}</div>
                        </div>
                    </div>
                </template>
                <template v-else-if="it.key == 'it'">
                    <div class="title">{{it.name}}</div>
                    <div v-if="it.extended" class="extended">
                        <div class="extended-field field" v-for="(ex, id) in it.extended" :key="id">
                            <div class="title">{{ex.name}}</div>
                            <div class="value">{{ex.value}}</div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="title">{{it.name}}</div>
                    <div class="value">{{it.value}}</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import IconClose from '../assets/Union.svg?vue';
    import IconGeo from '../assets/geo-alt-fill.svg?vue';

    export default {
        name: 'ObjectInfo',
        components: {
            IconClose,
            IconGeo
        },
        data: () => ({
            opened: false,
            showGeoAlt: false,
            source: {},
        }),
        computed: {
            fields() {
                return this.source?.fields ?? [];
            },
            rating() {
                const result = {};
                if (this.source.rating <= 2) {
                    result['red'] = true;
                } else if (this.source.rating <= 3.5) {
                    result['yellow'] = true;
                } else {
                    result['blue'] = true;
                }

                return result;
            }
        },
        methods: {
            open(data, callback) {
                this.source = data;

                if (callback && (typeof callback == 'function')) {
                    this.$options.callback = callback;
                } else {
                    this.$options.callback = () => {
                    };
                }

                this.opened = true;
            },
            close() {
                this.$options.callback();
                this.opened = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300&display=swap');

    .object-info {
        color: black;
        z-index: 9999;
        background: white;
        position: fixed;
        right: 0;
        top: 0;
        max-width: 480px;
        min-width: 300px;
        height: 100vh;
        padding: 20px;
        font-family: 'Mulish', sans-serif;
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 40px;

        .title {
            font-size: 24px;
            line-height: 26px;
            font-variant: all-small-caps;
        }

        .icon {
            cursor: pointer;
            height: 16px;
            margin-top: 5px;
        }
    }

    .name {
        font-size: 26px;
        font-weight: bold;
        color: #70357a;
        padding-bottom: 20px;
    }

    .fields {
        overflow: auto;
        width: 500px;
        margin: 0 0 20px 0;
        box-sizing: content-box;

        .field {
            padding-bottom: 8px;
            display: flex;
            flex-wrap: wrap;

            .extended-field {
                padding-left: 20px;
                padding-bottom: 4px;
            }

            & > .title {
                color: #4d2154;
                margin-right: 4px;

                &:after {
                    content: ': '
                }
            }

            & > .value {

            }
        }
    }

    a {
        color: #5452ad;
        text-decoration: none;

        &:hover {
            color: #6160f1;
        }
    }

</style>
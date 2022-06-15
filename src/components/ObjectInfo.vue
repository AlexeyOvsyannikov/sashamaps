<template>
    <div v-if="opened" class="object-info">
        <div class="header">
            <div class="title">Информация об учебном учреждении</div>
            <IconClose class="icon" @click="close"/>
        </div>

        <div class="name">
            {{source.name}}
        </div>

        <div class="address">
            <div @mouseover="showGeoAlt = true" @mouseout="showGeoAlt = false" @click="$emit('onAddressClick', source)">
                {{source.address}}
            </div>
            <IconGeo v-if="showGeoAlt" class="icon geo"/>
        </div>

        <div class="subname">
            <div class="title">Тип строения</div>
            <div class="value">{{source.type}}</div>
        </div>

        <div class="contacts">
            <div v-if="source.phone || source.website" class="block-title">Контактная информация</div>

            <div class="content">
                <div v-if="source.website" class="website">
                    <div class="title">Вебсайт</div>
                    <a target="_blank" :href="source.website">{{source.website}}</a>
                </div>

                <div v-if="source.phone" class="phone">
                    <div class="title">Телефон</div>
                    <div class="value">{{source.phone}}</div>
                </div>
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
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 120px;

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
    }

    .subname {
        color: #4d2154;
        padding-bottom: 40px;
    }

    .address {
        display: flex;
        padding-bottom: 26px;

        & div {
            cursor: pointer;
            color: #6c6c6c;
            &:hover {
                color: #8e8e8e;
            }
        }

        .icon.geo {
            margin-left: 8px;
            color: #4f8bbd;
        }
    }

    .contacts {
        .block-title {
            font-size: 22px;
            line-height: 26px;
            padding-bottom: 8px;
        }

        .content {
            display: flex;
            flex-wrap: wrap;

            .website {
                margin: 0 120px 8px 0;
            }
            .phone {
            }
        }
    }


    .field .rating {
        font-weight: bold;

        &.blue {
            color: #a06fff;
        }
        &.yellow {
            color: #d1a400;
        }
        &.red {
            color: #b90000e8;
        }
    }



    div.link {
        margin-bottom: 24px;
    }

    a {
        color: #5452ad;
        text-decoration: none;

        &:hover {
            color: #6160f1;
        }
    }

</style>
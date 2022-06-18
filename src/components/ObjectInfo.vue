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

        <div class="info-row">
            <div class="flex-item">
                <div class="title">Тип учреждения</div>
                <div class="type value">{{source.type}}</div>
            </div>

            <div v-if="source.rating" :class="rating" class="rating flex-item">
                <div class="title">Рейтинг</div>
                <div class="value">{{source.rating}} / 5</div>
            </div>
        </div>

        <div v-if="source.phone || source.website" class="contacts">
            <div v-if="source.phone || source.website" class="block-title">Контактная информация</div>

            <div class="info-row content">
                <div v-if="source.website" class="website flex-item">
                    <div class="title">Вебсайт</div>
                    <a target="_blank" :href="source.website">{{source.website}}</a>
                </div>

                <div v-if="source.phone" class="phone flex-item">
                    <div class="title">Телефон</div>
                    <div class="value">{{source.phone}}</div>
                </div>
            </div>
        </div>

        <div v-if="source.teachers && source.pupils" class="common-info">
            <div class="block-title">
                Общая информация
            </div>

            <div class="info-row">
                <div class="teachers flex-item">
                    <div class="title">Кол-во учителей</div>
                    <div class="value">{{source.teachers}}</div>
                </div>

                <div class="pupils flex-item">
                    <div class="title">Кол-во учеников</div>
                    <div class="value">{{source.pupils}} <span
                            v-if="source.pupilsHome">(на дому {{source.pupilsHome}})</span></div>
                </div>

                <div v-if="source.pupilsOvz" class="pupilsovz flex-item">
                    <div class="title">Кол-во учеников с ОВЗ</div>
                    <div class="value">{{source.pupilsOvz}}</div>
                </div>
            </div>

            <template v-if="existSystems">
                <div class="systems-title">
                    Использующиеся системы в классах
                </div>

                <div class="systems">
                    <div class="flex-item">
                        <div class="title">Траектория</div>
                        <div class="value">{{source.systems.trajectory}}</div>
                    </div>

                    <div class="flex-item">
                        <div class="title">ЕПОС</div>
                        <div class="value">{{source.systems.epos}}</div>
                    </div>

                    <div class="flex-item">
                        <div class="title">Яндекс.Учебник</div>
                        <div class="value">{{source.systems.yandex}}</div>
                    </div>

                    <div class="flex-item other">
                        <div class="title">Другие</div>
                        <div class="value">{{source.systems.other}}</div>
                    </div>
                </div>
            </template>
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
            existSystems() {
                if (!this.source) {
                    return false;
                }
                const systems = this.source.systems ?? {};
                console.log('school: ', this.source.name)

                if (!systems) {
                    return false;
                }

                for (const key in systems) {
                    const value = systems[key];

                    console.log('key: ', key);
                    console.log('value: ', value);
                    if (!value) {
                        return false;
                    }
                }

                console.log('___');

                return true;
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

    .info-row {
        padding-bottom: 40px;
        display: flex;
        flex-wrap: wrap;

        & > .flex-item:first-child {
            width: 260px;
            margin-right: 40px;
        }

        & > .flex-item {
            min-width: 135px
        }
    }

    .info-row .title,
    .info-col .title {
        color: #4d2154;
    }

    .systems-title {
        font-size: 18px;
        line-height: 24px;
        padding-bottom: 4px;
    }

    .systems {
        .title {
            color: #4d2154;
        }

        & > .flex-item {
            flex-grow: 1;
        }

        display: flex;
        flex-wrap: wrap;
    }

    .common-info .info-row {
        padding-bottom: 20px!important;
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


    .block-title {
        font-size: 22px;
        line-height: 26px;
        padding-bottom: 8px;
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
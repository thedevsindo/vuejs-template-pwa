<template>
    <transition v-if="showModal" name="w-modal">
        <div class="w-modal-mask">
            <div class="w-modal-wrapper">
                <div class="w-modal-container" v-click-outside="onClickOutside" :class="{
                    'size-sm': size === 'sm' ? true : false,
                    'size-md': size === 'md' ? true : false,
                    'size-lg': size === 'lg' ? true : false,
                    'size-xl': size === 'xl' ? true : false,
                }">
                    <div style="height: 4px;background-color: transparent">
                        <loading-bar v-if="loading"/>
                    </div>
                    <div class="w-modal-header">
                        <slot name="header" :payload="payload"></slot>
                        <span @click="onClickOutside" class="close" aria-hidden="true">&times;</span>
                    </div>
                    <div class="w-modal-body">
                        <slot name="body" :payload="payload"></slot>
                    </div>
                    <div v-if="$slots.footer" class="w-modal-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss">
$modal-xl:                          1100px !default;
$modal-lg:                          800px !default;
$modal-md:                          500px !default;
$modal-sm:                          300px !default;

.w-modal-mask {
    position: fixed;
    z-index: 9998;
    top: -4px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;

    .w-modal-wrapper {
        display: table-cell;
        vertical-align: middle;

        .w-modal-container {
            margin: 0px auto;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
            transition: all .3s ease;
            font-family: Helvetica, Arial, sans-serif;

            &.size-sm {
                width: $modal-sm;
            }

            &.size-md {
                width: $modal-md;
            }

            &.size-lg {
                width: $modal-lg;
            }

            &.size-xl {
                width: $modal-xl;
            }

            .w-modal-header {
                position: relative;

                .close {
                    color: white;
                    position: absolute;
                    right: 10px;
                    top: 10px;
                }
            }

            .w-modal-title {
                color: #42b983;
                font-weight: 600;
                text-transform: none;
                position: relative;
                display: block;
                padding: 13px 16px;
                font-size: 27px;
                line-height: normal;
                text-align: center;
            }

            .w-modal-text {
                font-size: 16px;
                position: relative;
                float: none;
                line-height: normal;
                vertical-align: top;
                text-align: left;
                display: inline-block;
                margin: 0;
                padding: 0 10px;
                font-weight: 400;
                color: rgba(0,0,0,.64);
                max-width: calc(100% - 20px);
                overflow-wrap: break-word;
                box-sizing: border-box;

                &:first-child {
                    margin-top: 45px;
                }
            }

            .w-modal-confirmation {
                color: rgba(0,0,0,.64);
                text-transform: none;
                position: relative;
                display: block;
                padding: 5px 16px;
                font-size: 16px;
                line-height: normal;
                text-align: left;

                b {
                    font-weight: 600;
                }
            }

            .w-modal-footer {
                text-align: right;
                padding-top: 13px;
                margin-top: 13px;
                padding: 13px 16px;
                border-radius: inherit;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
        }
    }
}

.w-modal-enter {
    opacity: 0;
}

.w-modal-leave-active {
    opacity: 0;
}

.w-modal-enter .w-modal-container,
.w-modal-leave-active .w-modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>

<script>
export default {
    props: {
        size: {
            default: 'md',
            type: String
        }
    },
    data() {
        return {
            showModal: false,
            payload: null,
            alert: null,
            value: true,
            loading: false
        }
    },
    watch: {
    },
    created () {
        this.$on('close', this.close)
        this.$on('open', this.open)
        this.$on('startLoading', this.startLoading)
        this.$on('stopLoading', this.stopLoading)
    },
    mounted () {
        window.addEventListener('keyup', this.onKeyUp)
    },
    methods: {
        open (payload) {
            this.$set(this, 'payload', payload)
            this.$set(this, 'showModal', true)
        },
        close () {
            this.$set(this, 'showModal', false)
        },
        startLoading () {
            this.$set(this, 'loading', true)
        },
        stopLoading () {
            this.$set(this, 'loading', false)
        },
        onKeyUp(e) {
            if (e.keyCode == 27) {
                this.onClickOutside()
            }
        },
        onClickOutside() {
            this.$emit('close')
        }
    }
}
</script>

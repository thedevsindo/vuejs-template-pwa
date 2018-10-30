<template>
    <div class="tab">
        <div class="row tabs">
            <div :class="tabHeaderClass($i)" @click="onClickTab({ tab, index: $i })" v-for="(tab, $i) in tabs" :key="$i">
                <slot :tab="tab" name="header"></slot>
            </div>
        </div>
        <slot name="body" :activeTabName="activeTabName"></slot>
    </div>
</template>

<style lang="scss">
.tab {
    .tab-item {
        cursor: pointer;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
    }
}
</style>

<script>
export default {
    props: {
        defaultTabName: {
            default: null,
            type: String
        },
        tabs: {
            default: () => [],
            type: Array
        },
    },
    watch: {
        defaultTabName (val) {
            if (val) {
                this.$set(this, 'activeTabName', val)
            }
        }
    },
    data() {
        return {
            activeTabName: null
        }
    },
    mounted() {
        if (this.tabs.length > 0) {
            this.$set(this, 'activeTabName', this.defaultTabName)
        }
    },
    methods: {
        onClickTab ({ tab }) {
            this.$set(this, 'activeTabName', tab.name)
        },
        tabHeaderClass: function (index) {
            const initialClass = {
                active: this.activeTabName === this.tabs[index].name,
                'tab-item': true
            }
            let customClass = {}
            if (typeof this.tabs[index].customClass === 'string') {
                for (let i = 0; i < this.tabs[index].customClass.split(' ').length; i++) {
                    const item = this.tabs[index].customClass
                    customClass[item] = true
                }
            } else if (typeof this.tabs[index].customClass === 'object') {
                customClass = Object.assign(customClass, this.tabs[index].customClass)
            }
            return Object.assign(initialClass, customClass)
        }
    }
}
</script>

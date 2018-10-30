import Vue from 'vue'

import LoadingBar from 'components/loadings/loading-bar'

import Modal from 'components/modal/modal'

import Tab from 'components/tab/tab'

Vue.component('w-modal', Modal)

Vue.component('w-tab', Tab)

Vue.component('loading-bar', LoadingBar)

Vue.directive('click-outside', {
    bind(el, binding, vNode) {
        if (typeof binding.value !== 'function') {
            const compName = vNode.context.name
            let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
            if (compName) { warn += `Found in component '${compName}'` }
            throw warn
        }
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
            if (bubble || (!el.contains(e.target) && el !== e.target)) {
                binding.value(e)
            }
        }
        el.__vueClickOutside__ = handler
        setTimeout(() => {
            document.addEventListener('click', handler)
        }, 1)
    },
    unbind(el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
    }
})

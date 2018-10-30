class wAlert {
    constructor() {
        this.componentInstance = null
        this.resolver = null
    }

    setAlert(componentInstance) {
        this.componentInstance = componentInstance
    }

    setResolver(resolver) {
        this.resolver = resolver
    }

    alert(alert) {
        return new Promise(function(resolve) {
            this.componentInstance.$emit('show', alert)
            this.setResolver(resolve)
        }.bind(this))
    }

    done({ value, confirmation }) {
        this.resolver({ value, confirmation })
    }
}

export default new wAlert()

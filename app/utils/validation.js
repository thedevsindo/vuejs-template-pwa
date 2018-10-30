import indicative from 'indicative'
const { validateAll } = indicative

class validation {
    validateAll(name, rules, textInput, extras = {}) {
        return new Promise((resolve, reject) => {
            if (rules) {
                const validationVal = { [name]: textInput }
                const validationRules = { [name]: rules }
                for (let i = 0; i < Object.keys(extras).length; i++) {
                    const name = Object.keys(extras)[i]
                    validationVal[name] = extras[name].value
                }
                validateAll(validationVal, validationRules)
                    .then(() => {
                        resolve({
                            status: 'valid',
                            name: name,
                            errors: []
                        })
                    })
                    .catch((errors) => {
                        const errorData = []
                        for (let i = 0; i < errors.length; i++) {
                            errorData.push(errors[i].message.substr(0, 1).toUpperCase() + errors[i].message.substr(1))
                        }
                        reject({
                            status: 'invalid',
                            name: name,
                            errors: errorData
                        })
                    })
            } else {
                resolve({
                    status: 'valid',
                    name: name,
                    errors: []
                })
            }
        })
    }
}

export default new validation()

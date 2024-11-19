import { create, Styles } from 'jss'
import preset from 'jss-preset-default'
import camelCase from 'jss-plugin-camel-case'
import jss from 'jss'

jss.setup(preset())

const configs = {
    plugins: [...preset().plugins, camelCase()]
}

/** Utils for generating CSS stylesheet from object. */
export function css<Name extends string | number | symbol>(styles: Partial<Styles<Name, any, undefined>>) {
    const styleSheet = create(configs).createStyleSheet(styles)
    styleSheet.attach()
    return styleSheet.classes
}

export function getRandomColor(): string {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export function generateUniqueId() {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

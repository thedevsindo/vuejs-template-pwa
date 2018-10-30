const path = require('path')
const fs = require('fs')
const packageJson = require('../../../../package.json')
const content = `<svg xmlns="http://www.w3.org/2000/svg" width="92" height="20">
    <linearGradient id="b" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <mask id="a">
        <rect width="92" height="20" rx="3" fill="#fff"/>
    </mask>
    <g mask="url(#a)">
        <rect width="45" height="20" fill="#555"/>
        <rect x="45" width="47" height="20" fill="#28a3df"/>
        <rect width="92" height="20" fill="url(#b)"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="23.5" y="15" fill="#010101" fill-opacity=".3">stable</text>
        <text x="23.5" y="14">stable</text>
        <text x="67.5" y="15" fill="#010101" fill-opacity=".3">v${packageJson.version}</text>
        <text x="67.5" y="14">v${packageJson.version}</text>
    </g>
</svg>
`

try {
    fs.writeFileSync(path.join(__dirname, '../../../../version.svg'), content)
} catch (e) {
    console.error('Cannot write file ', e)
}

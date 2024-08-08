import React from 'react';

type ColorBadge =
    "red" |
    "yellow" |
    "green" |
    "blue" |
    "indigo" |
    "purple" |
    "pink"

type BadgeProps = {
    textBadge: String
    color: ColorBadge
}

const colors = {
    gray: { text: "600", ring: "500/10" },
    red: { text: "700", ring: "600/10" },
    yellow: { text: "800", ring: "600/20" },
    green: { text: "700", ring: "600/20" },
    blue: { text: "700", ring: "700/10" },
    indigo: { text: "700", ring: "700/10" },
    purple: { text: "700", ring: "700/10" },
    pink: { text: "700", ring: "700/10" }
}


const Badge: React.FC<BadgeProps> = ({ textBadge, color = 'red' }) => {
    const bgBadge: string = `bg-${color}-50`
    const textColorBadge: string = `text-${color}-${colors[color]['text']}`
    const ringBadge: string = `ring-${color}-${colors[color]['ring']}`

    const colorBadge: string = `inline-flex text-xs items-center rounded-full ${bgBadge} px-2 py-1 text-xs font-medium ${textColorBadge} ring-1 ring-inset ${ringBadge}`

    console.log(colorBadge)
    return (
        <span className={colorBadge} >
            {textBadge}
        </span>
    );
};


export default Badge;


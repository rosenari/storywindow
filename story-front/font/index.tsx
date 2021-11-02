interface FontProps {
    type: string;
    format: string;
    url: string;
    family: string;
}

export const Fonts: Array<FontProps> = [{
        type: 'font/ttf',
        format: 'truetype',
        url: '/font/Jua-Regular.ttf',
        family: 'Jua'
    },{
        type: 'font/otf',
        format: 'opentype',
        url: '/font/NotoSansKR-Regular.otf',
        family: 'Noto Sans KR'
    },{
        type: 'font/woff',
        format: 'woff',
        url: '/font/SBAggroL.woff',
        family: 'SBAggroL'
    },{
        type: 'font/woff',
        format: 'woff',
        url: '/font/SBAggroM.woff',
        family: 'SBAggroM'
    },{
        type: 'font/ttf',
        format: 'truetype',
        url: '/font/DoHyeon-Regular.ttf',
        family: 'Do Hyeon'
    }
];

export const generateFontStyleJsx = (Fonts: Array<FontProps>): string => {
    return Fonts.reduce((result, { format, url, family }) => {
        return result + `
        @font-face {
            font-family: ${family};
            src: url('${url}') format('${format}');
            font-weight: normal;
            font-style: normal;
        }
        `;
    }, '') || '';
}

interface FontProps {
    type: string;
    format: string;
    url: string;
    family: string;
}

export const Fonts: Array<FontProps> = [{
        type: 'font/woff2',
        format: 'woff2',
        url: `/font/Jua-Regular.woff2`,
        family: 'Jua'
    },{
        type: 'font/woff2',
        format: 'woff2',
        url: '/font/NotoSansKR-Regular.woff2',
        family: 'Noto Sans KR'
    },{
        type: 'font/woff2',
        format: 'woff2',
        url: '/font/SBAggroL.woff2',
        family: 'SBAggroL'
    },{
        type: 'font/woff2',
        format: 'woff2',
        url: '/font/SBAggroM.woff2',
        family: 'SBAggroM'
    },{
        type: 'font/woff2',
        format: 'woff2',
        url: '/font/DoHyeon-Regular.woff2',
        family: 'Do Hyeon'
    }
].map((font) => {
    return {...font, url: `https://${process.env.IMG_HOST}${font.url}`}
});

export const generateFontStyleJsx = (Fonts: Array<FontProps>): string => {
    return Fonts.reduce((result, { format, url, family }) => {
        return result + `
        @font-face {
            font-family: ${family};
            src: url('${url}') format('${format}');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }
        `;
    }, '') || '';
}

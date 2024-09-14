import { Fira_Sans, Gothic_A1 } from "next/font/google";

const fira_sans_init = Fira_Sans({
    subsets: ['latin'],
    weight: '500',
    variable: '--font-fira',
});

const gotham_init = Gothic_A1({
    subsets: ['latin'],
    weight: '500',
    variable: '--font-gotham',
});

export const fira = fira_sans_init.variable;
export const gotham = gotham_init.variable;
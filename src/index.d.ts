
interface Props {
    children: JSX.Element;
    component?: string;
    duration?: number;
    disableInitialAnimation?: boolean;
    className?: string;
    classNames?: {
        beforeEnter: string,
        entering: string,
        beforeLeave: string,
        leaving: string
    }
}

declare module "react-tiny-crossfade" {
    export default function TinyCrossfade(props: Props): JSX.Element
}
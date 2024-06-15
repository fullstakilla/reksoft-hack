declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
  
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.scss'
declare module '*.png'
declare module '*.jpeg'
declare module '*.jpg'
declare module '*.gif'

declare const __IS_DEV__ : boolean;
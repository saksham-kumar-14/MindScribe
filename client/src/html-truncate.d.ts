declare module 'html-truncate' {
    function truncate(html: string, maxLength: number, options?: { ellipsis?: string }): string;
    export default truncate;
}

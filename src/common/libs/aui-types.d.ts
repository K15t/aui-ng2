// For some reason, this file cannot be called aui.d.ts if aui.ts also exists. It is then ignored by tsc.

interface JQuery {
    tooltip(): JQuery;
}

// AUI needs global jQuery
interface Window {
    jQuery: JQueryStatic;
    $: JQueryStatic;
}

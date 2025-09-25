import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (typeof globalThis !== 'undefined' && typeof globalThis.Response !== 'undefined') {
    const responsePrototype = globalThis.Response.prototype;
    const safeJsonFlag = Symbol.for('totem.safeJsonPatched');

    if (!responsePrototype[safeJsonFlag]) {
        const originalJson = responsePrototype.json;

        responsePrototype.json = async function safeJson(...args) {
            const clonedResponse = this.clone();

            try {
                return await originalJson.apply(this, args);
            } catch (error) {
                const isSyntaxError = error instanceof SyntaxError;
                const contentLength = this.headers?.get('content-length');
                const isLikelyJson = this.headers?.get('content-type')?.includes('application/json');
                const hasNoContent =
                    this.status === 204 ||
                    this.status === 205 ||
                    this.status === 304 ||
                    contentLength === '0';

                if (isSyntaxError && (hasNoContent || isLikelyJson)) {
                    const fallbackText = await clonedResponse.text();

                    if (!fallbackText || fallbackText.trim().length === 0) {
                        return null;
                    }
                }

                throw error;
            }
        };

        Object.defineProperty(responsePrototype, safeJsonFlag, {
            value: true,
            configurable: false,
            enumerable: false,
            writable: false,
        });
    }
}

/*
 * Recursively prints the registered routes of an Express router.
 *
 * @param {Array} routerStack - The stack of middleware and routes from an Express router.
 * @param {string} [parentPath=''] - The parent path to prepend to the route paths.
 */
export function printRegisteredRoutes(routerStack: any, parentPath = '') {
    routerStack.forEach((middleware: any) => {
        if (middleware.route) {
            console.debug(
                middleware.route.stack[0].method.toUpperCase(),
                `${parentPath}${middleware.route.path}`
            );
        } else if (middleware.name === 'router') {
            printRegisteredRoutes(
                middleware.handle.stack,
                `${parentPath}${middleware.path}`
            );
        }
    });
}

export default printRegisteredRoutes
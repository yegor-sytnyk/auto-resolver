interface ResolveFunction {
    <T>(id: string): T;
}

declare var resolve: ResolveFunction;

interface AutoResolver {
    resolve<T>(dependencyId: string): T,
    register(dependencyId: string, dependency: string | Object)
    registerResolver(): void,
    loadIndex(indexFilePath: string): void,
    cacheReload(): void
}

declare module 'auto-resolver' {
    let x: AutoResolver;
    export = x;
}
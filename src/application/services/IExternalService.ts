export interface IExternalService <T>{
    getContentAsync(): Promise<T>;
}
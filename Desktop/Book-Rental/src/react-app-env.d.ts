/// <reference types="react-scripts" />


/// <reference types="react-scripts" />

/**
 * REDUX DEVTOOLS EXTENSION INSTALLED IN BROWSER
 */
 interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

/**
 * React Select Option Type
 */
interface OptionType { label: string; value: string }
interface OptionTypeWithExtraData { label: any; value: any }


/**
 * Default Redux Action
 */
type DefaultAction<TPayload = any> = {
    type: string;
    payload?: TPayload
}
interface DefaultState<TData = any> {
    data: TData;
    message: string;
    isFetching: boolean;
    isFailed: boolean;
    isSuccess: boolean;
    // status: boolean;
}
interface DefaultDispatchType {
    progressDispatch: string;
    successDispatch: string;
    failureDispatch: string;
}

/**
 * Custom Route Detail
 */
type CustomRoute = {
    path: string;
    component: React.ComponentType<any>
    children?: route[];
    type?: string;
    privilege?: [string, string, string]

}


interface PrivateRouteProps {
    appRoutes: route[],
    redirectPath?: RouteRedirectProps
}
interface PrivateRouteChildren {
    children: route[]
}
/**
 * Custom PrivateRoute redirect props
 */
type RouteRedirectProps = ({ from: string, to: string; } | null)[]

/**
 * Primitive types
 */
type Primitive = string | boolean | number;

type TTranslationFunction = (key: string) => string
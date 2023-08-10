export interface IUrlParams {
  searchParams: {}
}

export function createUrlParams(searchParams: IUrlParams) {
  let params = '?'
  for (const param in searchParams) {
    // @ts-ignore
    params += `&${param}=${searchParams[param]}`
  }
  return params
}

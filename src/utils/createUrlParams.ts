export interface IParams {
  searchParams: {}
}

export function createUrlParams(searchParams: IParams) {
  let params = '?'
  for (const param in searchParams.searchParams) {
    // @ts-ignore
    params += `&${param}=${searchParams.searchParams[param]}`
  }
  return params
}

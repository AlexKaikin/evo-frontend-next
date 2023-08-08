export interface IParams {
  searchParams: {}
}

export function createUrlParams(searchParams: IParams) {
  let params = '?'
  for (const param in searchParams) {
    // @ts-ignore
    params += `&${param}=${searchParams[param]}`
  }
  return params
}

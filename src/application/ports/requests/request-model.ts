export interface RequestModel<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Body = any,
  Params = Body,
  Query = Body,
  Headers = Body,
> {
  body?: Body;
  params?: Params;
  query?: Query;
  headers?: Headers;
}

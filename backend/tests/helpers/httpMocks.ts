import httpMocks from 'node-mocks-http';

interface ResponseError {
  message: string;
}

interface Response {
  statusCode: number;
  data: any;
}

export function mockRequest(params: any): httpMocks.MockRequest<any> {
  return httpMocks.createRequest(params);
}

export function mockResponse(params?: any): httpMocks.MockResponse<any> {
  return httpMocks.createResponse(params);
}

export function getResponse(response: any): Response {
  const statusCode = response?._getStatusCode();
  const data = response?._getData();

  return {
    statusCode,
    data,
  };
}

export function responseErrorMessage(error: string): ResponseError {
  return { message: error };
}

export function getErrorMessage(response: any): number {
  return response._getData()?.message;
}

export function getStatusCode(response: any): number {
  return response._getStatusCode();
}

export function getData(response: any): number {
  return response.getData();
}

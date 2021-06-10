import { Response } from 'express';

export function statusOk(
  res: Response,
  content: any
): Response<any, Record<string, any>> {
  return res.status(200).send(content);
}

export function noContent(res: Response): Response<any, Record<string, any>> {
  return res.status(204).send();
}

export function badRequest(
  res: Response,
  message: string
): Response<any, Record<string, any>> {
  return res.status(400).send({ message });
}

export function unauthorized(
  res: Response
): Response<any, Record<string, any>> {
  return res.status(401).send();
}

export function forbidden(
  res: Response,
  message?: string
): Response<any, Record<string, any>> {
  return res.status(403).send({ message });
}

export function notFound(res: Response): Response<any, Record<string, any>> {
  return res.status(404).send();
}

export function serverError(
  res: Response,
  message?: string
): Response<any, Record<string, any>> {
  return res.status(500).send({ message });
}

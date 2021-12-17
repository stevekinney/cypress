export const decodeToken = (token: string) => Buffer.from(token, 'base64').toString('utf-8');
export const encodeToken = (token: string) => Buffer.from(token).toString('base64');

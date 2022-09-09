interface RequestObject {
  route: string;
  body?: any;
}

// TODO: Get types that can return
const requestBuilder =
  (method: string) =>
  async ({ route, body = undefined }: RequestObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await fetch(`/api${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data, errors } = (await response.json()) as {
      data: any;
      errors: string[];
    };

    if (response.status < 400) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data;
    }

    throw new Error(errors[0]);
  };

export const Get = requestBuilder('GET');
export const Post = requestBuilder('POST');
export const Put = requestBuilder('PUT');
export const Delete = requestBuilder('DELETE');

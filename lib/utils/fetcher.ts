export default async function fetcher<JSON>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    throw new Error();
  }

  return res.json() as Promise<JSON>;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/graphql";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

// Executa uma operação na API GraphQL e lança erro em falha HTTP ou de GraphQL.
export async function gqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`API GraphQL respondeu ${response.status}`);
  }

  const { data, errors } = (await response.json()) as GraphQLResponse<T>;
  if (errors?.length || !data) {
    throw new Error(errors?.[0]?.message ?? "Resposta GraphQL sem dados");
  }

  return data;
}

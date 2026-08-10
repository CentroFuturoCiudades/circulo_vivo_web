/**
 * Result of trying to load a dataset from Azure. We deliberately never fall
 * back to the local `data.ts` fixtures on failure — that data is stale/fake,
 * so showing it silently would be worse than telling the user nothing loaded.
 */
export type DataResult<T> =
  | { status: "success"; data: T }
  /** AZURE_STORAGE_BASE_URL isn't set yet — the bucket doesn't exist. */
  | { status: "unconfigured" }
  /** The bucket is configured but the request/parse failed. */
  | { status: "error"; message: string };

export function dataResultOk<T>(data: T): DataResult<T> {
  return { status: "success", data };
}

/**
 * Flattens a `DataResult<T[]>` into `{ items, state }` for list-driven sections:
 * `state` is undefined on success with a non-empty list, "empty" when there's
 * nothing to show (unconfigured, or a successful-but-empty fetch), and "error"
 * when the request/parse actually failed.
 */
export function toSectionState<T>(result: DataResult<T[]>): { items: T[]; state: "empty" | "error" | undefined } {
  if (result.status === "success") {
    return { items: result.data, state: result.data.length === 0 ? "empty" : undefined };
  }
  return { items: [], state: result.status === "unconfigured" ? "empty" : "error" };
}

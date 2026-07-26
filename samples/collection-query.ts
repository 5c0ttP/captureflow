import type { CaptureKind, CaptureRecord } from "./capture-model";

/** Portfolio excerpt adapted from CaptureFlow's collection behavior. */
export interface CollectionQuery {
  text?: string;
  project?: string;
  kind?: CaptureKind;
  favoritesOnly?: boolean;
  includeTrash?: boolean;
  sort?: "newest" | "oldest" | "title";
}

export function queryCaptures(records: CaptureRecord[], query: CollectionQuery): CaptureRecord[] {
  const text = query.text?.trim().toLocaleLowerCase();

  return records
    .filter((record) => query.includeTrash || !record.deletedAt)
    .filter((record) => !query.favoritesOnly || record.favorite)
    .filter((record) => !query.project || record.project === query.project)
    .filter((record) => !query.kind || record.kind === query.kind)
    .filter((record) => {
      if (!text) return true;
      return [record.title, record.sourceUrl, record.project, record.note, ...record.tags]
        .filter(Boolean)
        .some((value) => value!.toLocaleLowerCase().includes(text));
    })
    .sort((left, right) => {
      if (query.sort === "title") return left.title.localeCompare(right.title);
      const direction = query.sort === "oldest" ? 1 : -1;
      return left.capturedAt.localeCompare(right.capturedAt) * direction;
    });
}

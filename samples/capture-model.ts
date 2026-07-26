/**
 * Portfolio excerpt: representative domain boundaries only.
 * The production persistence implementation remains private.
 */
export type CaptureKind = "visible" | "region" | "full-page" | "imported";

export interface CaptureRecord {
  id: string;
  capturedAt: string;
  kind: CaptureKind;
  title: string;
  sourceUrl?: string;
  project?: string;
  tags: string[];
  note: string;
  favorite: boolean;
  originalImageId: string;
  editedImageId?: string;
  deletedAt?: string;
}

export interface StoredImage {
  id: string;
  blob: Blob;
  width: number;
  height: number;
}

export interface CaptureRepository {
  saveCapture(record: CaptureRecord, image: StoredImage): Promise<void>;
  listCaptures(): Promise<CaptureRecord[]>;
  moveToTrash(captureId: string): Promise<void>;
  restore(captureId: string): Promise<void>;
}

# Engineering decisions

This note summarizes several product-level architecture decisions. Detailed implementation and operational material remain in the private repository.

## Local-first storage

CaptureFlow treats the browser's IndexedDB database as the authoritative library. This supports the privacy promise, removes account and backend dependencies, and keeps normal capture work available offline.

The tradeoff is explicit: uninstalling the extension or clearing its browser data can remove the working library. The product therefore distinguishes between authoritative records, readable Explorer mirrors, and user-created exports instead of implying that every copy is a restorable backup.

## Permission boundaries

The default capture path relies on user invocation and Chrome's `activeTab` permission. Persistent host access is optional and requested separately, so installation does not silently grant access to every website.

Protected browser pages remain unavailable by platform design. CaptureFlow explains that boundary rather than attempting to work around it.

## Capture and editing pipeline

Capture orchestration, image editing, persistence, and library presentation are separate concerns. That separation allows editor geometry and storage behavior to be tested independently from Chrome UI surfaces.

Full-page capture is bounded to avoid uncontrolled memory use. The product reports unsupported or unusually large pages rather than risking an unstable browser session.

## Export versus backup

PNG, Markdown, JSON, CSV, and ZIP outputs are user-controlled exports. The optional Windows folder integration is a one-way readable mirror. Neither is described as two-way synchronization, and restore support is tracked as a distinct roadmap capability.

These boundaries keep deletion, recovery, and ownership understandable to users while leaving room for a future validated restore workflow.

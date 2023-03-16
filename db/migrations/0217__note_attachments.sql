CREATE TABLE IF NOT EXISTS "note_attachments"
(
    noteAttachmentId      TEXT not null primary key,
    noteId       TEXT not null,
    name         TEXT not null,
    mime         TEXT not null,
    isProtected    INT  not null DEFAULT 0,
    blobId    TEXT not null,
    utcDateModified TEXT not null,
    isDeleted    INT  not null,
    `deleteId`    TEXT DEFAULT NULL);

CREATE INDEX IDX_note_attachments_name
    on note_attachments (name);
CREATE UNIQUE INDEX IDX_note_attachments_noteId_name
    on note_attachments (noteId, name);

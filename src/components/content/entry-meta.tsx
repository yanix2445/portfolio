import { formatDate, type ContentMeta } from "@/lib/content";

export function EntryMeta({ metadata }: { metadata: ContentMeta }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
      {metadata.tags.map((tag) => (
        <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs">
          {tag}
        </span>
      ))}
    </div>
  );
}

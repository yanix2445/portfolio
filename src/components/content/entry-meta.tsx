import { Badge } from "@/components/ui/badge";
import { formatDate, type ContentMeta } from "@/lib/content";

export function EntryMeta({ metadata }: { metadata: ContentMeta }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
      {metadata.tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { STATUS_LABEL, type ProjectStatus } from "@/lib/projects";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant="ink" data-status={status}>
      {STATUS_LABEL[status]}
    </Badge>
  );
}

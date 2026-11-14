import { STATUS_LABEL, type ProjectStatus } from "@/lib/projects";
import { cn } from "@/lib/utils";

import s from "./poster.styles";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={cn(s.label, s.status)} data-status={status}>
      {STATUS_LABEL[status]}
    </span>
  );
}

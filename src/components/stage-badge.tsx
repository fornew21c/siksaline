import { Badge } from "./ui";
import type { Stage } from "@/data/civic";

export function StageBadge({ stage }: { stage: Stage }) {
  const tone = stage === "완료" ? "good" : stage === "진행" ? "brand" : "neutral";
  return <Badge tone={tone}>{stage}</Badge>;
}

import { Badge } from "@/components/ui/badge";

interface CityTagsProps {
  tags: string[];
}

export function CityTags({ tags }: CityTagsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="bg-surface text-xs text-dim"
        >
          #{tag}
        </Badge>
      ))}
    </div>
  );
}

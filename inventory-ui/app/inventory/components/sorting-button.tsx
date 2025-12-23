import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export function SortingButton({
  column,
  header,
}: {
  column: any;
  header: string;
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {header}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

import { cn } from "@/lib/utils";

export interface TitleBlockCell {
  label: string;
  /** An array renders one line per item */
  value: React.ReactNode | string[];
  /** Spans both columns of a two-column block */
  wide?: boolean;
}

interface TitleBlockProps {
  label: string;
  cells: TitleBlockCell[];
  columns?: 1 | 2;
}

// An engineering drawing's title block, used by the home hero and the lead project
export function TitleBlock({ label, cells, columns = 2 }: TitleBlockProps) {
  return (
    <dl
      aria-label={label}
      className={cn("grid", columns === 2 && "grid-cols-2", "rounded-sm border-[1.5px] border-foreground bg-card font-mono text-[12.5px]")}
    >
      {cells.map((cell, index) => {
        // Wide cells span both columns, so a half cell's column depends on the cells before it
        const halfCellsBefore = cells.slice(0, index).reduce((count, prev) => (prev.wide ? 0 : count + 1), 0);
        const isLeftColumn = columns === 2 && !cell.wide && halfCellsBefore % 2 === 0;
        const isLastRow = index >= cells.length - columns;
        return (
          <div
            key={cell.label}
            className={cn(
              "min-w-0 border-border px-3 py-2.5",
              columns === 2 && cell.wide && "col-span-2",
              isLeftColumn && "border-r",
              !isLastRow && "border-b",
            )}
          >
            <dt className="mb-1 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{cell.label}</dt>
            <dd className="text-foreground [overflow-wrap:anywhere]">
              {Array.isArray(cell.value)
                ? cell.value.map(line => <span key={line} className="block">{line}</span>)
                : cell.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

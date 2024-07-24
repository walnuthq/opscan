import Link from "next/link";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Block } from "@/lib/types";
import { formatTimestamp, formatGas } from "@/lib/utils";

const LatestBlocksTableRow = ({
  block,
  timestampFormattedAsDate,
}: {
  block: Block;
  timestampFormattedAsDate: boolean;
}) => {
  const { distance, utc } = formatTimestamp(block.timestamp);
  const { value, percentage, percentageFormatted } = formatGas(
    block.gasUsed,
    block.gasLimit,
  );
  return (
    <TooltipProvider>
      <TableRow>
        <TableCell>
          <Link
            href={`/block/${block.number}`}
            className="text-sm font-medium leading-none text-primary hover:brightness-150"
          >
            {block.number.toString()}
          </Link>
        </TableCell>
        <TableCell>
          <Tooltip>
            <TooltipTrigger>
              <span suppressHydrationWarning>
                {timestampFormattedAsDate ? utc : distance}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-xs" suppressHydrationWarning>
                {timestampFormattedAsDate ? distance : utc}
              </span>
            </TooltipContent>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Link
            href={`/block/${block.number}/txs`}
            className="text-sm font-medium leading-none text-primary hover:brightness-150"
          >
            {block.transactions.length}
          </Link>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <span>{value}</span>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-xs text-gray-500">
                  ({percentageFormatted})
                </span>
              </TooltipTrigger>
              <TooltipContent className="text-xs">Gas used in %</TooltipContent>
            </Tooltip>
          </div>
          <div className="progress-bar mt-1 h-[3px] max-w-[4rem] bg-gray-200">
            <Progress className="h-full rounded-none" value={percentage} />
          </div>
        </TableCell>
        <TableCell>{formatGas(block.gasLimit).value}</TableCell>
      </TableRow>
    </TooltipProvider>
  );
};

export default LatestBlocksTableRow;

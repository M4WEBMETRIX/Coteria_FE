import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const SkeletonCell = ({ className = "" }: { className?: string }) => (
  <div className={`h-4 animate-pulse rounded bg-gray-200 ${className}`} />
);

const CommunityTableBodySkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index} className="border-b border-[#E0E1E6]">
          {/* Checkbox */}
          <TableCell className="py-4 pl-4">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
          </TableCell>

          {/* No */}
          <TableCell>
            <SkeletonCell className="w-6" />
          </TableCell>

          {/* Community Title */}
          <TableCell>
            <SkeletonCell className="w-48" />
          </TableCell>

          {/* Description */}
          <TableCell>
            <SkeletonCell className="w-64" />
          </TableCell>

          {/* Visibility */}
          <TableCell>
            <SkeletonCell className="w-20" />
          </TableCell>

          {/* Last Activity */}
          <TableCell>
            <SkeletonCell className="w-24" />
          </TableCell>

          {/* Status */}
          <TableCell>
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
          </TableCell>

          {/* Action */}
          <TableCell>
            <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CommunityTableBodySkeleton;

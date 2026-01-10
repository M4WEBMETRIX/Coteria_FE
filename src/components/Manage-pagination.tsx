import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage?: number;
  setItemsPerPage?: (items: number) => void;
}
const ManagePagination = ({
  totalPages = 30,
  currentPage = 1,
  setCurrentPage,
  itemsPerPage = 10,
  setItemsPerPage,
}: PaginationComponentProps) => {
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const addedPages = new Set(); // Track already added page numbers

    // Helper function to add a page only if not already added
    const addPage = (page: number | string) => {
      if (typeof page === "number" && addedPages.has(page)) return;
      if (typeof page === "number") addedPages.add(page);
      pageNumbers.push(page);
    };

    // Always show the first page
    addPage(1);

    // Show ellipsis before currentPage if needed
    if (currentPage > 3) {
      addPage("...");
    }

    // Show currentPage and its immediate neighbors
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      addPage(i);
    }

    // Show ellipsis after currentPage if needed
    if (currentPage < totalPages - 2) {
      addPage("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      addPage(totalPages);
    }

    return pageNumbers.map((page, index) => {
      return typeof page === "number" ? (
        <PaginationItem key={`page-${page}`}>
          <PaginationLink
            href="#"
            isActive={page === currentPage}
            className={cn(
              "h-9 w-9 border-[#E1E4EA]",
              page === currentPage
                ? "border-[#0D6EFD] bg-[#0D6EFD] text-white hover:bg-[#0b5ed7] hover:text-white"
                : "border text-[#525866] hover:bg-gray-50"
            )}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationEllipsis key={`ellipsis-${index}`} className="text-[#525866]" />
      );
    });
  };
  return (
    <div className="flex items-center justify-between border-t border-[#DFE1E7] p-4">
      <span className="text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
        Showing 1 to 10 of, 500 results
      </span>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-[8px] border border-[#DFE1E7] text-sm">
          <div className="border-r border-[#DFE1E7] p-2">Per page</div>
          <Select
            defaultValue={String(itemsPerPage)}
            onValueChange={(value) => setItemsPerPage && setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="h-8 w-fit border-0">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>{" "}
      <div className="flex items-center gap-1">
        {/* Simplified pagination for visual match */}
        <Pagination className="order-1 mx-0 flex w-auto justify-center sm:order-2">
          <PaginationContent className="gap-2">
            {/* First Page Button */}
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-[#E1E4EA] text-[#525866]"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
                {/* <span className="sr-only">{t("pagination.first_page")}</span> */}
              </Button>
            </PaginationItem>

            {/* Previous Button */}
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-[#E1E4EA] text-[#525866]"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            {/* Page Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-[#E1E4EA] text-[#525866]"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>

            {/* Last Page Button */}
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-[#E1E4EA] text-[#525866]"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ManagePagination;

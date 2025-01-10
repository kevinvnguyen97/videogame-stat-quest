import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationPageText,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@components/ui/pagination";

type GameResultsPaginationProps = {
  totalGameCount: number;
  pageNumber: number;
  gamesPerPage: number;
  onPageChange: (pageNum: number) => void;
};
export const GameResultsPagination = (props: GameResultsPaginationProps) => {
  const { totalGameCount, pageNumber, gamesPerPage, onPageChange } = props;
  return (
    <PaginationRoot
      count={totalGameCount}
      pageSize={gamesPerPage}
      page={pageNumber}
      onPageChange={(e) => onPageChange(e.page)}
      as={HStack}
      variant="subtle"
    >
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
      <PaginationPageText />
    </PaginationRoot>
  );
};

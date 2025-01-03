import { Box, Table } from "@chakra-ui/react";
import { formatIGDBDate } from "@utils/index";
import { StarRating } from "@components/custom/StarRating";

type GameInfoTableProps = {
  game: Game | undefined;
  franchises: Franchise[];
  companies: Company[];
  platforms: Platform[];
  genres: Genre[];
  gameModes: GameMode[];
};
export const GameInfoTable = (props: GameInfoTableProps) => {
  const {
    game,
    franchises = [],
    companies = [],
    platforms = [],
    genres = [],
    gameModes = [],
  } = props;
  return (
    <Table.Root width={350}>
      <Table.Body>
        <Table.Row>
          <Table.ColumnHeader>Release Date</Table.ColumnHeader>
          <Table.Cell>
            {formatIGDBDate(game?.first_release_date ?? 0)}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Rating</Table.ColumnHeader>
          <Table.Cell>
            <StarRating rating={game?.total_rating ?? 0} />
            {game?.total_rating_count ?? 0 > 0
              ? `${Math.round(game?.total_rating ?? 0)}%`
              : "N/A"}{" "}
            ({game?.total_rating_count ?? 0} reviews)
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Franchise</Table.ColumnHeader>
          <Table.Cell>
            {franchises.map(({ id, name }) => (
              <Box key={id}>{name}</Box>
            ))}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Companies</Table.ColumnHeader>
          <Table.Cell>
            {companies?.map(({ id, name }) => (
              <Box key={id}>{name}</Box>
            ))}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Platforms</Table.ColumnHeader>
          <Table.Cell>
            {platforms?.map(({ id, name }) => (
              <Box key={id}>{name}</Box>
            ))}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Genres</Table.ColumnHeader>
          <Table.Cell>
            {genres?.map(({ id, name }) => (
              <Box key={id}>{name}</Box>
            ))}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Game Modes</Table.ColumnHeader>
          <Table.Cell>
            {gameModes?.map(({ id, name }) => (
              <Box key={id}>{name}</Box>
            ))}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

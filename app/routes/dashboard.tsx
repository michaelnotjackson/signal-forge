import {
  Layout,
  LayoutContent,
  LayoutHeader,
  Grid,
  GridSpan,
  proportional,
  Skeleton,
  Table,
  VStack,
  Heading,
} from "@astryxdesign/core";

import {
  usePowerSearchConfig,
  useTableFiltering,
  useTableFilterState,
  toSearchFilters,
} from "@astryxdesign/core";

import type {
  TableColumn,
  PowerSearchFilter,
  FieldDefinition,
} from "@astryxdesign/core";

interface ParsedMsg extends Record<string, unknown> {
  id: string;
  time: string;
  channel: string;
  msg: string;
  verdict: string;
}

const parsed_columns: TableColumn<ParsedMsg>[] = [
  { key: "time", header: "Time", width: proportional(1) },
  {
    key: "channel",
    header: "Channel",
    width: proportional(1),
    filter: "channel",
  },
  { key: "msg", header: "Message", width: proportional(1), filter: "msg" },
  {
    key: "verdict",
    header: "Verdict",
    width: proportional(1),
    filter: "verdict",
  },
];

const parsed_field_defs: FieldDefinition[] = [
  { key: "channel", type: "string", label: "Channel" },
  { key: "msg", type: "string", label: "Message" },
  {
    key: "verdict",
    type: "enum",
    label: "Verdict",
    enumValues: [
      { value: "MATCHED", label: "MATCHED" },
      { value: "ERROR", label: "ERROR" },
    ],
  },
] as const;

const messages = [
  {
    id: "123",
    time: "12:30",
    channel: "Buba",
    msg: "LONG BTCUSDT",
    verdict: "MATCHED",
  },
];

export default function Dashboard() {
  const { config, applyFilters } = usePowerSearchConfig(parsed_field_defs);
  const { filters, onFilterChange } = useTableFilterState();

  const filterPlugin = useTableFiltering<ParsedMsg>({
    filters,
    onFilterChange,
    searchConfig: config,
  });

  const data = applyFilters(
    toSearchFilters(filters, parsed_columns, config) as PowerSearchFilter[],
    messages,
  );

  return (
    <Grid columns={3} gap={3}>
      <GridSpan columns={1}>
        <Layout
          height="fill"
          header={
            <LayoutHeader hasDivider padding={3}>
              <Heading level={3}>Processed messages</Heading>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <Table
                data={data}
                columns={parsed_columns}
                idKey="id"
                plugins={{ filter: filterPlugin }}
                density="compact"
                dividers="rows"
                textOverflow="truncate"
                hasHover
              />
            </LayoutContent>
          }
        />
      </GridSpan>
      <GridSpan columns={1} rows={3}>
        <Skeleton index={1} />
      </GridSpan>
      <GridSpan columns={1} rows={3}>
        <VStack gap={3}>
          <Skeleton index={2} />
          <Skeleton index={3} />
          <Skeleton index={4} />
        </VStack>
      </GridSpan>
    </Grid>
  );
}

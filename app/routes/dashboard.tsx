import {
  VStack,
  HStack,
  Grid,
  GridSpan,
  Section,
  Heading,
  Card,
  Text,
  Table,
  type TableColumn,
  useTablePagination,
  paginateData
} from "@astryxdesign/core";

import { useState } from "react";

const GRAPHS = ["Net P&L", "Win rate", "Risk estimate", "Signals today"];

interface Signal extends Record<string, unknown> {
  id: string;
  coin: string;
  direction: "LONG" | "SHORT";
  tp: number;
  sl: number;
  risk: number;
}

const feedData: Signal[] = [
  {
    id: "sig-001",
    coin: "BTCUSDT",
    direction: "LONG",
    tp: 67500,
    sl: 64500,
    risk: 0.5,
  },
  {
    id: "sig-002",
    coin: "ETHUSDT",
    direction: "SHORT",
    tp: 3050,
    sl: 3380,
    risk: 1.0,
  },
  {
    id: "sig-003",
    coin: "SOLUSDT",
    direction: "LONG",
    tp: 158.4,
    sl: 141.2,
    risk: 0.5,
  },
  {
    id: "sig-004",
    coin: "XRPUSDT",
    direction: "SHORT",
    tp: 0.48,
    sl: 0.55,
    risk: 2.0,
  },
  {
    id: "sig-005",
    coin: "DOGEUSDT",
    direction: "LONG",
    tp: 0.135,
    sl: 0.112,
    risk: 1.5,
  },
  {
    id: "sig-006",
    coin: "BNBUSDT",
    direction: "LONG",
    tp: 620,
    sl: 585,
    risk: 0.5,
  },
  {
    id: "sig-007",
    coin: "ADAUSDT",
    direction: "SHORT",
    tp: 0.31,
    sl: 0.36,
    risk: 1.0,
  },
  {
    id: "sig-008",
    coin: "AVAXUSDT",
    direction: "LONG",
    tp: 42.5,
    sl: 37.8,
    risk: 1.5,
  },
  {
    id: "sig-009",
    coin: "LINKUSDT",
    direction: "SHORT",
    tp: 12.4,
    sl: 14.1,
    risk: 0.5,
  },
  {
    id: "sig-010",
    coin: "MATICUSDT",
    direction: "LONG",
    tp: 0.68,
    sl: 0.59,
    risk: 2.0,
  },
];

const feedColumns: TableColumn<Signal>[] = [
  { key: "coin" },
  {
    key: "direction",
    renderCell: (item) => {
      return (
        <HStack gap={2} align="center">
          <Text
            style={{
              color:
                item.direction == "LONG"
                  ? "var(--color-success)"
                  : "var(--color-error)",
            }}
          >
            {item.direction}
          </Text>
        </HStack>
      );
    },
  },
  {
    key: "tp_sl",
    header: "TP/SL",
    renderCell: (item) => {
      return (
        <Grid columns={2} gap={2}>
          <Heading level={5}>TP</Heading>
          <Heading level={5}>SL</Heading>
          <Text>{item.tp}</Text>
          <Text>{item.sl}</Text>
        </Grid>
      );
    },
  },
  {
    key: "risk",
  },
];

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const feedPagination = useTablePagination<Signal>({
    page,
    onPageChange: setPage,
    totalItems: feedData.length,
    pageSize: pageSize,
  });

  return (
    <Grid columns={3} gap={3}>
      <GridSpan columns={3}>
        <Section padding={2}>
          <Heading level={3}>Overview</Heading>
          <Grid columns={4} gap={3}>
            {GRAPHS.map((item) => {
              return (
                <Card key={item[0]}>
                  <Heading level={4}>{item}</Heading>
                  <HStack justify="between">
                    <VStack>
                      <Text> Metric </Text>
                      <Text color="secondary">Footer</Text>
                    </VStack>
                    chart
                  </HStack>
                </Card>
              );
            })}
          </Grid>
        </Section>
      </GridSpan>
      <GridSpan columns={2}>
        <Section padding={2}>
          <Heading level={3}>Signal feed</Heading>
          <Table
            data={paginateData(feedData, page, pageSize)}
            columns={feedColumns}
            plugins={{ pagination: feedPagination }}
            idKey="id"
          />
        </Section>
      </GridSpan>
    </Grid>
  );
}

import React, { useState } from "react";
import {
  Database,
  Play,
  Table as TableIcon,
  FileCode,
  Check,
  Copy,
  AlertCircle,
  Info,
  RefreshCw,
} from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  HeaderContent,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  ControlsWrapper,
  DialectSelect,
  EditorsGrid,
  EditorColumn,
  EditorHeader,
  Label,
  ResultsContainer,
  ResultsHeader,
  Tabs,
  TabButton,
  ExportButton,
  ResultsContent,
  EmptyState,
  ErrorBox,
  SuccessMessage,
  TableContainer,
  Table,
  Th,
  Td,
  Tr,
  SchemaView,
  TableCard,
  TableHeader,
  TableName,
  RowCount,
  FieldList,
  FieldItem,
  FieldName,
  PkBadge,
  FieldType,
  Footer,
  SqlEditor,
} from "./styles/SqlFiddleTool.styles";

interface SqlResult {
  columns: string[];
  rows: any[][];
  message?: string;
  error?: string;
  type: "success" | "error" | "info";
}

const DEFAULT_SCHEMA = `CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50)
);

INSERT INTO users VALUES (1, 'Alice Smith', 'alice@example.com');
INSERT INTO users VALUES (2, 'Bob Johnson', 'bob@example.com');
INSERT INTO users VALUES (3, 'Charlie Brown', 'charlie@example.com');`;

const DEFAULT_QUERY = `SELECT * FROM users WHERE id > 1;`;

const SqlFiddleTool: React.FC = () => {
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [dialect, setDialect] = useState("MySQL 8.0");
  const [results, setResults] = useState<SqlResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"results" | "schema-viewer">(
    "results",
  );

  const runSql = () => {
    setResults(null);
    try {
      const combinedSql = `${schema}\n${query}`;
      const tables: Record<string, { columns: string[]; data: any[][] }> = {};
      const statements = combinedSql
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s);
      let lastQueryResult: SqlResult | null = null;

      statements.forEach((stmt) => {
        const lowerStmt = stmt.toLowerCase();

        if (lowerStmt.startsWith("create table")) {
          const tableNameMatch = stmt.match(/create table (\w+)/i);
          const colMatches = stmt.match(/\(([\s\S]+)\)/);
          if (tableNameMatch && colMatches) {
            const tableName = tableNameMatch[1];
            const columns = colMatches[1]
              .split(",")
              .map((c) => c.trim().split(" ")[0]);
            tables[tableName] = { columns, data: [] };
          }
        } else if (lowerStmt.startsWith("insert into")) {
          const tableNameMatch = stmt.match(/insert into (\w+)/i);
          const valuesMatch = stmt.match(/values\s*\(([\s\S]+)\)/i);
          if (tableNameMatch && valuesMatch) {
            const tableName = tableNameMatch[1];
            const values = valuesMatch[1]
              .split(",")
              .map((v) => v.trim().replace(/'/g, ""));
            if (tables[tableName]) {
              tables[tableName].data.push(values);
            }
          }
        } else if (lowerStmt.startsWith("select")) {
          const fromMatch = stmt.match(/from (\w+)/i);
          const whereMatch = stmt.match(/where\s+(.+)/i);

          if (fromMatch) {
            const tableName = fromMatch[1];
            const table = tables[tableName];

            if (table) {
              let filteredData = [...table.data];
              if (whereMatch) {
                const condition = whereMatch[1];
                if (condition.includes("id >")) {
                  const val = parseInt(condition.split(">")[1].trim());
                  filteredData = filteredData.filter(
                    (row) => parseInt(row[0]) > val,
                  );
                }
              }

              lastQueryResult = {
                columns: table.columns,
                rows: filteredData,
                type: "success",
                message: `Query executada com sucesso. ${filteredData.length} linhas retornadas.`,
              };
            } else {
              throw new Error(`Tabela '${tableName}' não encontrada.`);
            }
          }
        }
      });

      setResults(
        lastQueryResult || {
          columns: [],
          rows: [],
          type: "info",
          message: "Schema criado com sucesso. Nenhuma query SELECT executada.",
        },
      );
    } catch (err: any) {
      setResults({
        columns: [],
        rows: [],
        type: "error",
        error: err.message || "Erro de sintaxe SQL próximo a ...",
      });
    }
  };

  const copyResults = () => {
    if (!results || results.rows.length === 0) return;
    const csv = [
      results.columns.join(","),
      ...results.rows.map((r) => r.join(",")),
    ].join("\n");
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setSchema(DEFAULT_SCHEMA);
    setQuery(DEFAULT_QUERY);
    setResults(null);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Database size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>SQL Fiddle</Title>
            <Description>
              Ambiente interativo para criar schemas e testar queries SQL.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <ControlsWrapper>
          <DialectSelect
            value={dialect}
            onChange={(e) => setDialect(e.target.value)}
          >
            <option>MySQL 8.0</option>
            <option>PostgreSQL 15</option>
            <option>SQLite 3.39</option>
            <option>MS SQL Server</option>
          </DialectSelect>
          <Button variant="outline" onClick={reset}>
            <RefreshCw size={16} /> Reset
          </Button>
          <Button
            onClick={runSql}
            style={{
              backgroundColor: "#2563eb",
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
          >
            <Play
              size={16}
              style={{ marginRight: "0.5rem", fill: "currentColor" }}
            />{" "}
            Rodar SQL
          </Button>
        </ControlsWrapper>
      </Header>

      <EditorsGrid>
        <EditorColumn>
          <EditorHeader>
            <Label>
              <FileCode size={14} /> Schema (DDL)
            </Label>
          </EditorHeader>
          <SqlEditor
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            placeholder="CREATE TABLE ... ; INSERT INTO ... ;"
          />
        </EditorColumn>
        <EditorColumn>
          <EditorHeader>
            <Label>
              <Database size={14} /> Query (DML)
            </Label>
          </EditorHeader>
          <SqlEditor
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SELECT * FROM ... ;"
          />
        </EditorColumn>
      </EditorsGrid>

      {/* Results Section */}
      <ResultsContainer>
        <ResultsHeader>
          <Tabs>
            <TabButton
              onClick={() => setActiveTab("results")}
              $active={activeTab === "results"}
            >
              Resultados
            </TabButton>
            <TabButton
              onClick={() => setActiveTab("schema-viewer")}
              $active={activeTab === "schema-viewer"}
            >
              Estrutura
            </TabButton>
          </Tabs>

          {results?.rows && results.rows.length > 0 && (
            <ExportButton onClick={copyResults}>
              {copied ? (
                <Check size={14} style={{ color: "#22c55e" }} />
              ) : (
                <Copy size={14} />
              )}
              {copied ? "Copiado CSV" : "Exportar CSV"}
            </ExportButton>
          )}
        </ResultsHeader>

        <ResultsContent>
          {!results ? (
            <EmptyState>
              <Play size={48} />
              <p>Pressione "Rodar SQL" para ver os resultados.</p>
            </EmptyState>
          ) : results.type === "error" ? (
            <ErrorBox>
              <AlertCircle size={24} style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
                  Erro na Query
                </h4>
                <p style={{ fontSize: "0.875rem", fontFamily: "monospace" }}>
                  {results.error}
                </p>
              </div>
            </ErrorBox>
          ) : activeTab === "results" ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {results.message && (
                <SuccessMessage>
                  <Check size={12} /> {results.message}
                </SuccessMessage>
              )}
              {results.columns.length > 0 && (
                <TableContainer>
                  <Table>
                    <thead>
                      <tr>
                        {results.columns.map((col) => (
                          <Th key={col}>{col}</Th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.rows.map((row, i) => (
                        <Tr key={i}>
                          {row.map((cell, j) => (
                            <Td key={j}>{cell}</Td>
                          ))}
                        </Tr>
                      ))}
                    </tbody>
                  </Table>
                </TableContainer>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <TableIcon size={20} style={{ color: "#3b82f6" }} />
                <h4
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Esquema do Banco de Dados
                </h4>
              </div>
              <SchemaView>
                <TableCard>
                  <TableHeader>
                    <TableName>users</TableName>
                    <RowCount>3 Rows</RowCount>
                  </TableHeader>
                  <FieldList>
                    <SchemaField name="id" type="INT" isPk />
                    <SchemaField name="name" type="VARCHAR" />
                    <SchemaField name="email" type="VARCHAR" />
                  </FieldList>
                </TableCard>
              </SchemaView>
            </div>
          )}
        </ResultsContent>

        <Footer>
          <Info size={14} style={{ color: "#3b82f6" }} />
          <p>
            Este Fiddle utiliza uma simulação local. Para produção, teste suas
            queries em um ambiente SQL real (Docker, AWS RDS, etc).
          </p>
        </Footer>
      </ResultsContainer>
    </Container>
  );
};

const SchemaField = ({
  name,
  type,
  isPk,
}: {
  name: string;
  type: string;
  isPk?: boolean;
}) => (
  <FieldItem>
    <FieldName $isPk={isPk}>
      {name}
      {isPk && <PkBadge>PK</PkBadge>}
    </FieldName>
    <FieldType>{type}</FieldType>
  </FieldItem>
);

export default SqlFiddleTool;

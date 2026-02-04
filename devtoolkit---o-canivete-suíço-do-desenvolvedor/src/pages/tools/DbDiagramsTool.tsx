import React, { useState, useMemo } from "react";
import {
  Network,
  Plus,
  Trash2,
  Copy,
  Check,
  Database,
  Key,
  ChevronRight,
  X,
  Edit3,
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
  Grid,
  SidebarColumn,
  CanvasColumn,
  GridBackground,
  CanvasContent,
  SidebarCard,
  SidebarTitle,
  EmptySelection,
  EmptyIcon,
  EmptyText,
  TableEditor,
  TableHeader,
  TableNameInputGroup,
  ColorDot,
  TableNameInput,
  CloseButton,
  ColumnsList,
  ColumnItem,
  ColumnHeader,
  ColumnNameInput,
  RemoveColumnButton,
  ColumnControls,
  Select,
  ToggleButton,
  AddColumnButton,
  OutputCard,
  OutputHeader,
  OutputTitle,
  CopyButton,
  CodePre,
  TableNode,
  TableNodeHeader,
  TableName,
  DeleteTableButton,
  TableNodeFields,
  FieldRow,
  FieldInfo,
  FieldName,
  FieldType,
  TableNodeFooter,
  FieldsCount,
  AddFieldLink,
  EmptyCanvas,
  EmptyCanvasIcon,
  EmptyCanvasText,
  FloatButtonContainer,
  AddTableFloatButton,
  WorkspaceBadge,
  PulseDot,
  BadgeText,
} from "./styles/DbDiagramsTool.styles";

type ColumnType =
  | "INT"
  | "VARCHAR(255)"
  | "TEXT"
  | "BOOLEAN"
  | "TIMESTAMP"
  | "DECIMAL"
  | "UUID"
  | "BIGINT";

interface Column {
  id: string;
  name: string;
  type: ColumnType;
  isPK: boolean;
  isNullable: boolean;
}

interface Table {
  id: string;
  name: string;
  columns: Column[];
  color: string;
}

const COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#ef4444", // red
  "#f59e0b", // amber
  "#10b981", // emerald
  "#06b6d4", // cyan
];

const DbDiagramsTool: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([
    {
      id: "1",
      name: "users",
      color: COLORS[0],
      columns: [
        { id: "c1", name: "id", type: "BIGINT", isPK: true, isNullable: false },
        {
          id: "c2",
          name: "email",
          type: "VARCHAR(255)",
          isPK: false,
          isNullable: false,
        },
        {
          id: "c3",
          name: "password",
          type: "VARCHAR(255)",
          isPK: false,
          isNullable: false,
        },
        {
          id: "c4",
          name: "created_at",
          type: "TIMESTAMP",
          isPK: false,
          isNullable: false,
        },
      ],
    },
    {
      id: "2",
      name: "posts",
      color: COLORS[1],
      columns: [
        { id: "c5", name: "id", type: "BIGINT", isPK: true, isNullable: false },
        {
          id: "c6",
          name: "title",
          type: "VARCHAR(255)",
          isPK: false,
          isNullable: false,
        },
        {
          id: "c7",
          name: "content",
          type: "TEXT",
          isPK: false,
          isNullable: true,
        },
        {
          id: "c8",
          name: "user_id",
          type: "BIGINT",
          isPK: false,
          isNullable: false,
        },
      ],
    },
  ]);

  const [activeTableId, setActiveTableId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const addTable = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newTable: Table = {
      id: newId,
      name: `new_table_${tables.length + 1}`,
      color: COLORS[tables.length % COLORS.length],
      columns: [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: "id",
          type: "BIGINT",
          isPK: true,
          isNullable: false,
        },
      ],
    };
    setTables([...tables, newTable]);
    setActiveTableId(newId);
  };

  const removeTable = (id: string) => {
    setTables(tables.filter((t) => t.id !== id));
    if (activeTableId === id) setActiveTableId(null);
  };

  const updateTable = (id: string, updates: Partial<Table>) => {
    setTables(tables.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const addColumn = (tableId: string) => {
    setTables(
      tables.map((t) => {
        if (t.id === tableId) {
          return {
            ...t,
            columns: [
              ...t.columns,
              {
                id: Math.random().toString(36).substr(2, 9),
                name: `col_${t.columns.length + 1}`,
                type: "VARCHAR(255)",
                isPK: false,
                isNullable: true,
              },
            ],
          };
        }
        return t;
      }),
    );
  };

  const removeColumn = (tableId: string, columnId: string) => {
    setTables(
      tables.map((t) => {
        if (t.id === tableId) {
          return {
            ...t,
            columns: t.columns.filter((c) => c.id !== columnId),
          };
        }
        return t;
      }),
    );
  };

  const updateColumn = (
    tableId: string,
    columnId: string,
    updates: Partial<Column>,
  ) => {
    setTables(
      tables.map((t) => {
        if (t.id === tableId) {
          return {
            ...t,
            columns: t.columns.map((c) =>
              c.id === columnId ? { ...c, ...updates } : c,
            ),
          };
        }
        return t;
      }),
    );
  };

  const sqlOutput = useMemo(() => {
    return tables
      .map((t) => {
        const colDefs = t.columns
          .map((c) => {
            return `  ${c.name} ${c.type}${c.isPK ? " PRIMARY KEY" : ""}${!c.isNullable ? " NOT NULL" : ""}`;
          })
          .join(",\n");
        return `CREATE TABLE ${t.name} (\n${colDefs}\n);`;
      })
      .join("\n\n");
  }, [tables]);

  const copySql = () => {
    navigator.clipboard.writeText(sqlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTable = tables.find((t) => t.id === activeTableId);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Network size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Database Diagram Designer</Title>
            <Description>
              Desenhe esquemas de banco de dados e exporte para SQL
              instantaneamente.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <ControlsWrapper>
          <Button
            variant="outline"
            onClick={() => setTables([])}
            style={{ color: "#f87171", borderColor: "rgba(239, 68, 68, 0.2)" }}
          >
            <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Limpar Canvas
          </Button>
          <Button
            onClick={addTable}
            style={{ backgroundColor: "#7c3aed", borderRadius: "1rem" }}
          >
            <Plus size={18} style={{ marginRight: "0.5rem" }} /> Adicionar
            Tabela
          </Button>
        </ControlsWrapper>
      </Header>

      <Grid>
        {/* Designer Sidebar */}
        <SidebarColumn>
          <SidebarCard>
            <SidebarTitle>
              <Database size={14} /> Gerenciador de Esquema
            </SidebarTitle>

            {!activeTable ? (
              <EmptySelection>
                <EmptyIcon>
                  <Edit3 size={32} />
                </EmptyIcon>
                <EmptyText>
                  Selecione uma tabela no canvas para editar suas colunas.
                </EmptyText>
              </EmptySelection>
            ) : (
              <TableEditor>
                <TableHeader>
                  <TableNameInputGroup>
                    <ColorDot $color={activeTable.color} />
                    <TableNameInput
                      type="text"
                      value={activeTable.name}
                      onChange={(e) =>
                        updateTable(activeTable.id, { name: e.target.value })
                      }
                      placeholder="Nome da Tabela"
                    />
                    <CloseButton onClick={() => setActiveTableId(null)}>
                      <X size={18} />
                    </CloseButton>
                  </TableNameInputGroup>
                </TableHeader>

                <ColumnsList>
                  {activeTable.columns.map((col) => (
                    <ColumnItem key={col.id}>
                      <ColumnHeader>
                        <ColumnNameInput
                          type="text"
                          value={col.name}
                          onChange={(e) =>
                            updateColumn(activeTable.id, col.id, {
                              name: e.target.value,
                            })
                          }
                        />
                        <RemoveColumnButton
                          onClick={() => removeColumn(activeTable.id, col.id)}
                        >
                          <Trash2 size={14} />
                        </RemoveColumnButton>
                      </ColumnHeader>

                      <ColumnControls>
                        <Select
                          value={col.type}
                          onChange={(e) =>
                            updateColumn(activeTable.id, col.id, {
                              type: e.target.value as ColumnType,
                            })
                          }
                        >
                          <option>BIGINT</option>
                          <option>INT</option>
                          <option>VARCHAR(255)</option>
                          <option>TEXT</option>
                          <option>BOOLEAN</option>
                          <option>TIMESTAMP</option>
                          <option>DECIMAL</option>
                          <option>UUID</option>
                        </Select>

                        <ToggleButton
                          $active={col.isPK}
                          $color="#f59e0b"
                          onClick={() =>
                            updateColumn(activeTable.id, col.id, {
                              isPK: !col.isPK,
                            })
                          }
                        >
                          PK
                        </ToggleButton>

                        <ToggleButton
                          $active={!col.isNullable}
                          $color="#3b82f6"
                          onClick={() =>
                            updateColumn(activeTable.id, col.id, {
                              isNullable: !col.isNullable,
                            })
                          }
                        >
                          NOT NULL
                        </ToggleButton>
                      </ColumnControls>
                    </ColumnItem>
                  ))}
                  <AddColumnButton onClick={() => addColumn(activeTable.id)}>
                    <Plus size={14} /> ADICIONAR COLUNA
                  </AddColumnButton>
                </ColumnsList>
              </TableEditor>
            )}
          </SidebarCard>

          <OutputCard>
            <OutputHeader>
              <OutputTitle>DDL Output (SQL)</OutputTitle>
              <CopyButton onClick={copySql}>
                {copied ? (
                  <Check size={14} style={{ color: "#22c55e" }} />
                ) : (
                  <Copy size={14} />
                )}
                {copied ? "Copiado" : "Copiar"}
              </CopyButton>
            </OutputHeader>
            <CodePre>
              {sqlOutput || "-- Adicione tabelas para gerar SQL"}
            </CodePre>
          </OutputCard>
        </SidebarColumn>

        {/* Designer Canvas */}
        <CanvasColumn>
          <GridBackground />

          <CanvasContent>
            {tables.map((table) => (
              <TableNode
                key={table.id}
                $active={activeTableId === table.id}
                $color={table.color}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTableId(table.id);
                }}
              >
                {/* Table Header */}
                <TableNodeHeader $color={table.color}>
                  <TableName>
                    <Database size={14} style={{ color: "#64748b" }} />
                    <span>{table.name}</span>
                  </TableName>
                  <DeleteTableButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTable(table.id);
                    }}
                  >
                    <Trash2 size={12} />
                  </DeleteTableButton>
                </TableNodeHeader>

                {/* Table Columns */}
                <TableNodeFields>
                  {table.columns.map((col) => (
                    <FieldRow key={col.id}>
                      <FieldInfo>
                        {col.isPK ? (
                          <Key size={10} style={{ color: "#f59e0b" }} />
                        ) : (
                          <ChevronRight
                            size={10}
                            style={{ color: "#334155" }}
                          />
                        )}
                        <FieldName $isPk={col.isPK}>{col.name}</FieldName>
                      </FieldInfo>
                      <FieldType>{col.type.split("(")[0]}</FieldType>
                    </FieldRow>
                  ))}
                  {table.columns.length === 0 && (
                    <div style={{ padding: "1rem", textAlign: "center" }}>
                      <p
                        style={{
                          fontSize: "0.625rem",
                          color: "#334155",
                          fontStyle: "italic",
                        }}
                      >
                        Sem colunas
                      </p>
                    </div>
                  )}
                </TableNodeFields>

                {/* Footer info */}
                <TableNodeFooter>
                  <FieldsCount>{table.columns.length} Fields</FieldsCount>
                  <AddFieldLink
                    onClick={(e) => {
                      e.stopPropagation();
                      addColumn(table.id);
                    }}
                  >
                    + Add
                  </AddFieldLink>
                </TableNodeFooter>
              </TableNode>
            ))}

            {tables.length === 0 && (
              <EmptyCanvas>
                <EmptyCanvasIcon>
                  <Network size={80} />
                </EmptyCanvasIcon>
                <EmptyCanvasText>
                  <h4>Canvas Vazio</h4>
                  <p>
                    Clique no botão "Adicionar Tabela" para começar a modelar
                    seu banco de dados.
                  </p>
                </EmptyCanvasText>
              </EmptyCanvas>
            )}
          </CanvasContent>

          <FloatButtonContainer>
            <AddTableFloatButton onClick={addTable} title="Adicionar Tabela">
              <Plus size={24} />
            </AddTableFloatButton>
          </FloatButtonContainer>

          <WorkspaceBadge>
            <PulseDot />
            <BadgeText>Workspace Ativo</BadgeText>
          </WorkspaceBadge>
        </CanvasColumn>
      </Grid>
    </Container>
  );
};

export default DbDiagramsTool;

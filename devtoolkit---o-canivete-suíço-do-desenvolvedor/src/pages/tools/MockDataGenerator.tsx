import React, { useState, useMemo } from "react";
import {
  Table,
  Trash2,
  Download,
  Copy,
  Check,
  RefreshCw,
  FileJson,
  FileText,
  ListPlus,
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
  ConfigSection,
  ConfigCard,
  ConfigHeader,
  SectionTitle,
  AddFieldButton,
  FieldsList,
  FieldRow,
  FieldNameInput,
  FieldTypeSelect,
  RemoveFieldButton,
  SettingsGrid,
  SettingGroup,
  SettingLabel,
  NumberInput,
  FormatButtonGroup,
  FormatButton,
  PreviewSection,
  PreviewCard,
  PreviewHeader,
  PreviewTitle,
  ActionButtons,
  HeaderActionButton,
  PreviewContent,
  CodeBlock,
  EmptyState,
  PreviewFooter,
  FooterText,
  StatusDots,
  Dot,
} from "./styles/MockDataGenerator.styles";

type DataType =
  | "id"
  | "name"
  | "email"
  | "job"
  | "city"
  | "date"
  | "boolean"
  | "number";

interface Field {
  id: string;
  name: string;
  type: DataType;
}

const FIELD_TYPES: { value: DataType; label: string }[] = [
  { value: "id", label: "ID (UUID)" },
  { value: "name", label: "Nome Completo" },
  { value: "email", label: "Email" },
  { value: "job", label: "Cargo" },
  { value: "city", label: "Cidade" },
  { value: "date", label: "Data" },
  { value: "boolean", label: "Booleano" },
  { value: "number", label: "Número" },
];

const SAMPLE_NAMES = [
  "Ana Silva",
  "Bruno Costa",
  "Carla Souza",
  "Daniel Oliveira",
  "Elisa Santos",
  "Fábio Lima",
  "Gabriela Rocha",
  "Hugo Pereira",
  "Iara Martins",
  "João Alves",
];
const SAMPLE_JOBS = [
  "Engenheiro de Software",
  "Designer UI/UX",
  "Gerente de Projetos",
  "Analista de Dados",
  "DevOps Engineer",
  "Product Owner",
  "Especialista QA",
  "Tech Lead",
];
const SAMPLE_CITIES = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Porto Alegre",
  "Salvador",
  "Fortaleza",
  "Recife",
  "Manaus",
  "Brasília",
];
const SAMPLE_DOMAINS = ["example.com", "test.io", "company.net", "mail.org"];

const MockDataGenerator: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([
    { id: "1", name: "id", type: "id" },
    { id: "2", name: "user_name", type: "name" },
    { id: "3", name: "email", type: "email" },
  ]);
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [generatedData, setGeneratedData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUUID = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

  const generateRecord = (fieldsList: Field[]) => {
    const record: any = {};
    fieldsList.forEach((f) => {
      switch (f.type) {
        case "id":
          record[f.name] = generateUUID();
          break;
        case "name":
          record[f.name] =
            SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
          break;
        case "email":
          const name = SAMPLE_NAMES[
            Math.floor(Math.random() * SAMPLE_NAMES.length)
          ]
            .toLowerCase()
            .replace(" ", ".");
          const domain =
            SAMPLE_DOMAINS[Math.floor(Math.random() * SAMPLE_DOMAINS.length)];
          record[f.name] =
            `${name}${Math.floor(Math.random() * 100)}@${domain}`;
          break;
        case "job":
          record[f.name] =
            SAMPLE_JOBS[Math.floor(Math.random() * SAMPLE_JOBS.length)];
          break;
        case "city":
          record[f.name] =
            SAMPLE_CITIES[Math.floor(Math.random() * SAMPLE_CITIES.length)];
          break;
        case "date":
          record[f.name] = new Date(
            Date.now() - Math.floor(Math.random() * 10000000000),
          )
            .toISOString()
            .split("T")[0];
          break;
        case "boolean":
          record[f.name] = Math.random() > 0.5;
          break;
        case "number":
          record[f.name] = Math.floor(Math.random() * 1000);
          break;
      }
    });
    return record;
  };

  const handleGenerate = () => {
    const data = Array.from({ length: count }, () => generateRecord(fields));
    setGeneratedData(data);
  };

  const addField = () => {
    setFields([
      ...fields,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: `field_${fields.length + 1}`,
        type: "number",
      },
    ]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const outputString = useMemo(() => {
    if (generatedData.length === 0) return "";
    if (format === "json") return JSON.stringify(generatedData, null, 2);

    // CSV logic
    const headers = fields.map((f) => f.name).join(",");
    const rows = generatedData
      .map((row) => fields.map((f) => row[f.name]).join(","))
      .join("\n");
    return `${headers}\n${rows}`;
  }, [generatedData, format, fields]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([outputString], {
      type: format === "json" ? "application/json" : "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mock-data.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Table size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Mock Data Generator</Title>
            <Description>
              Gere coleções de dados realistas para testar seu front-end ou
              APIs.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <ControlsWrapper>
          <Button
            onClick={handleGenerate}
            style={{
              backgroundColor: "#0d9488",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 10px 15px -3px rgba(13, 148, 136, 0.2)",
            }}
          >
            <RefreshCw size={18} style={{ marginRight: "0.5rem" }} /> Gerar
            Dados
          </Button>
        </ControlsWrapper>
      </Header>

      <Grid>
        {/* Schema Configuration */}
        <ConfigSection>
          <ConfigCard>
            <ConfigHeader>
              <SectionTitle>
                <ListPlus size={14} /> Definição do Schema
              </SectionTitle>
              <AddFieldButton onClick={addField}>+ Add Campo</AddFieldButton>
            </ConfigHeader>

            <FieldsList>
              {fields.map((field) => (
                <FieldRow key={field.id}>
                  <FieldNameInput
                    type="text"
                    value={field.name}
                    onChange={(e) =>
                      updateField(field.id, { name: e.target.value })
                    }
                    placeholder="Nome do Campo"
                  />
                  <FieldTypeSelect
                    value={field.type}
                    onChange={(e) =>
                      updateField(field.id, {
                        type: e.target.value as DataType,
                      })
                    }
                  >
                    {FIELD_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </FieldTypeSelect>
                  <RemoveFieldButton
                    onClick={() => removeField(field.id)}
                    disabled={fields.length <= 1}
                  >
                    <Trash2 size={16} />
                  </RemoveFieldButton>
                </FieldRow>
              ))}
            </FieldsList>

            <SettingsGrid>
              <SettingGroup>
                <SettingLabel>Qtd de Registros</SettingLabel>
                <NumberInput
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                />
              </SettingGroup>
              <SettingGroup>
                <SettingLabel>Formato</SettingLabel>
                <FormatButtonGroup>
                  {(["json", "csv"] as const).map((f) => (
                    <FormatButton
                      key={f}
                      onClick={() => setFormat(f)}
                      $active={format === f}
                    >
                      {f}
                    </FormatButton>
                  ))}
                </FormatButtonGroup>
              </SettingGroup>
            </SettingsGrid>
          </ConfigCard>
        </ConfigSection>

        {/* Data Preview */}
        <PreviewSection>
          <PreviewCard>
            <PreviewHeader>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "rgba(13,148,136,0.1)",
                    borderRadius: "0.75rem",
                    color: "#14b8a6",
                  }}
                >
                  {format === "json" ? (
                    <FileJson size={20} />
                  ) : (
                    <FileText size={20} />
                  )}
                </div>
                <PreviewTitle>Visualização</PreviewTitle>
              </div>

              <ActionButtons>
                <HeaderActionButton
                  disabled={generatedData.length === 0}
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <Check size={14} style={{ color: "#22c55e" }} />
                  ) : (
                    <Copy size={14} />
                  )}
                  {copied ? "Copiado" : "Copiar"}
                </HeaderActionButton>
                <HeaderActionButton
                  disabled={generatedData.length === 0}
                  onClick={downloadFile}
                >
                  <Download size={14} /> BAIXAR
                </HeaderActionButton>
              </ActionButtons>
            </PreviewHeader>

            <PreviewContent>
              {generatedData.length > 0 ? (
                <CodeBlock>{outputString}</CodeBlock>
              ) : (
                <EmptyState>
                  <Table size={48} />
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700 }}>
                      Nenhum dado gerado
                    </p>
                    <p style={{ fontSize: "0.75rem" }}>
                      Configure os campos e clique em "Gerar Dados".
                    </p>
                  </div>
                </EmptyState>
              )}
            </PreviewContent>

            <PreviewFooter>
              <FooterText>Mock v1.0.2 • Gerado localmente</FooterText>
              <StatusDots>
                <Dot $color="#22c55e" />
                <Dot $color="#14b8a6" />
              </StatusDots>
            </PreviewFooter>
          </PreviewCard>
        </PreviewSection>
      </Grid>
    </Container>
  );
};

export default MockDataGenerator;

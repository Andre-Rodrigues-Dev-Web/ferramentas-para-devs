import React, { useState } from "react";
import { useTheme } from "styled-components";
import { ArrowRight, Copy, Trash2, Database } from "lucide-react";
import * as S from "./styles/SqlToNoSqlConverter.styles";
import { toast } from "react-hot-toast";

const SqlToNoSqlConverter: React.FC = () => {
  const theme = useTheme();
  const [sqlInput, setSqlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");

  const handleConvert = () => {
    if (!sqlInput.trim()) {
      toast.error("Por favor, insira um script SQL.");
      return;
    }

    try {
      const result = convertSqlToJson(sqlInput);
      setJsonOutput(JSON.stringify(result, null, 2));
      toast.success("Conversão realizada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao converter SQL. Verifique a sintaxe.");
    }
  };

  const handleCopy = () => {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput);
    toast.success("JSON copiado para a área de transferência!");
  };

  const handleClear = () => {
    setSqlInput("");
    setJsonOutput("");
  };

  // Basic SQL Parser Logic
  const convertSqlToJson = (sql: string) => {
    const lines = sql
      .split(";")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const collections: Record<string, any[]> = {};

    lines.forEach((query) => {
      // Basic INSERT INTO parser
      const insertMatch = query.match(
        /INSERT\s+INTO\s+([`"']?(\w+)[`"']?)\s*(\(([^)]+)\))?\s*VALUES\s*\((.+)\)/i,
      );

      if (insertMatch) {
        const tableName = insertMatch[2];
        const columnsStr = insertMatch[4];
        const valuesStr = insertMatch[5];

        if (!collections[tableName]) {
          collections[tableName] = [];
        }

        const values = parseValues(valuesStr);

        let document: Record<string, any> = {};

        if (columnsStr) {
          const columns = columnsStr
            .split(",")
            .map((c) => c.trim().replace(/[`"']/g, ""));
          columns.forEach((col, index) => {
            document[col] = values[index];
          });
        } else {
          // If no columns specified, perform naive object creation or array
          values.forEach((val, index) => {
            document[`col_${index + 1}`] = val;
          });
        }

        collections[tableName].push(document);
      }
    });

    return collections;
  };

  const parseValues = (valuesStr: string): any[] => {
    // Very naive CSV parser that respects quotes
    const result = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < valuesStr.length; i++) {
      const char = valuesStr[i];
      if (char === "'" || char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(cleanValue(current));
        current = "";
      } else {
        current += char;
      }
    }
    result.push(cleanValue(current));
    return result;
  };

  const cleanValue = (val: string) => {
    const v = val.trim();
    if (
      (v.startsWith("'") && v.endsWith("'")) ||
      (v.startsWith('"') && v.endsWith('"'))
    ) {
      return v.substring(1, v.length - 1);
    }
    if (!isNaN(Number(v))) return Number(v);
    if (v.toLowerCase() === "true") return true;
    if (v.toLowerCase() === "false") return false;
    if (v.toLowerCase() === "null") return null;
    return v;
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <Database size={32} color={theme.colors.primary[500]} />
          SQL to NoSQL Converter
        </S.Title>
        <S.Description>
          Transforme comandos SQL (INSERTs) em documentos JSON estruturados.
          Cole seus scripts SQL abaixo e veja a mágica acontecer.
        </S.Description>
      </S.Header>

      <S.ConverterContainer>
        <S.EditorSection>
          <S.SectionHeader>
            <S.Label>Input SQL</S.Label>
            <S.ClearButton onClick={handleClear} title="Limpar tudo">
              <Trash2 size={16} />
            </S.ClearButton>
          </S.SectionHeader>
          <S.TextArea
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            placeholder="INSERT INTO users (id, name, email) VALUES (1, 'John Doe', 'john@example.com');"
            spellCheck={false}
          />
        </S.EditorSection>

        <S.ActionsColumn>
          <S.ConvertButton onClick={handleConvert} title="Converter">
            <ArrowRight />
          </S.ConvertButton>
        </S.ActionsColumn>

        <S.EditorSection>
          <S.SectionHeader>
            <S.Label>Output JSON</S.Label>
            <S.CopyButton onClick={handleCopy}>
              <Copy size={16} /> Copiar
            </S.CopyButton>
          </S.SectionHeader>
          <S.OutputDisplay>
            {jsonOutput || "// O resultado aparecerá aqui..."}
          </S.OutputDisplay>
        </S.EditorSection>
      </S.ConverterContainer>
    </S.Container>
  );
};

export default SqlToNoSqlConverter;

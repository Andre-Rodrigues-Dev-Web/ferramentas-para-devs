import React, { useState } from "react";
import {
  Globe,
  Send,
  Plus,
  Trash2,
  ShieldCheck,
  FileJson,
  Loader2,
  Check,
  Copy,
  History,
} from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { Textarea } from "../../shared/ui/Input";
import {
  Container,
  Header,
  HeaderContent,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  CorsBadge,
  Grid,
  RequestArea,
  RequestCard,
  RequestBar,
  MethodSelect,
  UrlInputWrapper,
  UrlInput,
  TabsContainer,
  TabList,
  TabButton,
  TabContent,
  HeadersHeader,
  HeadersTitle,
  AddHeaderButton,
  HeadersList,
  HeaderRow,
  Checkbox,
  HeaderInput,
  RemoveHeaderButton,
  BodyHeader,
  ContentTypeLabel,
  ResponseCard,
  ResponseHeader,
  ResponseTitle,
  ResponseStats,
  StatItem,
  StatLabel,
  StatusValue,
  TimeValue,
  CopyResponseButton,
  ResponseBody,
  LoadingState,
  LoadingText,
  CodeBlock,
  EmptyResponse,
  Sidebar,
  HistoryCard,
  HistoryTitle,
  HistoryList,
  HistoryItem,
  HistoryItemHeader,
  MethodBadge,
  HistoryTime,
  HistoryUrl,
  HistoryMeta,
  SecurityCard,
  SecurityTitle,
  SecurityText,
  EmptyHistory,
} from "./styles/HoppscotchTool.styles";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Header {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

interface RequestHistory {
  id: string;
  method: HttpMethod;
  url: string;
  status: number;
  time: number;
  timestamp: number;
}

const HoppscotchTool: React.FC = () => {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/todos/1",
  );
  const [headers, setHeaders] = useState<Header[]>([
    { id: "1", key: "Content-Type", value: "application/json", enabled: true },
  ]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"headers" | "body">("headers");
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [copied, setCopied] = useState(false);

  const addHeader = () => {
    setHeaders([
      ...headers,
      {
        id: Math.random().toString(36).substr(2, 9),
        key: "",
        value: "",
        enabled: true,
      },
    ]);
  };

  const removeHeader = (id: string) => {
    setHeaders(headers.filter((h) => h.id !== id));
  };

  const updateHeader = (id: string, updates: Partial<Header>) => {
    setHeaders(headers.map((h) => (h.id === id ? { ...h, ...updates } : h)));
  };

  const sendRequest = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResponse(null);
    setStatus(null);
    setTime(null);

    const startTime = performance.now();

    try {
      const headerObj: Record<string, string> = {};
      headers
        .filter((h) => h.enabled && h.key)
        .forEach((h) => {
          headerObj[h.key] = h.value;
        });

      const options: RequestInit = {
        method,
        headers: headerObj,
        body: method !== "GET" && body ? body : undefined,
      };

      const res = await fetch(url, options);
      const data = await res.json();

      const endTime = performance.now();

      setResponse(data);
      setStatus(res.status);
      setTime(Math.round(endTime - startTime));

      const newHistory: RequestHistory = {
        id: Math.random().toString(36).substr(2, 9),
        method,
        url,
        status: res.status,
        time: Math.round(endTime - startTime),
        timestamp: Date.now(),
      };
      setHistory((prev) => [newHistory, ...prev].slice(0, 10));
    } catch (err: any) {
      const isTypeError = err instanceof TypeError;
      const errorMsg = isTypeError
        ? "Falha na Requisição (CORS ou Network Error). O navegador bloqueou a chamada porque o servidor não permite requisições de origem cruzada ou a URL é inválida."
        : err.message || "Erro desconhecido ao realizar a requisição.";

      setResponse({
        error: errorMsg,
        tip: "Muitas APIs públicas possuem restrições de CORS que impedem chamadas diretas pelo navegador. Tente uma URL que suporte CORS como JSONPlaceholder.",
      });
      setStatus(0);
      setTime(Math.round(performance.now() - startTime));
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Globe size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>REST API Tester</Title>
            <Description>
              Teste endpoints, envie headers e visualize respostas JSON
              instantaneamente.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <CorsBadge>CORS-Aware UI</CorsBadge>
      </Header>

      <Grid>
        {/* Request Area */}
        <RequestArea>
          <RequestCard>
            {/* Method & URL Bar */}
            <RequestBar>
              <MethodSelect
                value={method}
                onChange={(e) => setMethod(e.target.value as HttpMethod)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </MethodSelect>
              <UrlInputWrapper>
                <UrlInput
                  type="text"
                  placeholder="https://api.exemplo.com/v1/resource"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </UrlInputWrapper>
              <Button
                onClick={sendRequest}
                disabled={loading}
                style={{
                  backgroundColor: "#059669",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                  borderRadius: "1rem",
                  height: "100%",
                }}
              >
                {loading ? (
                  <Loader2
                    size={20}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  <Send size={20} />
                )}
                <span style={{ marginLeft: "0.5rem", display: "none" }}>
                  Enviar
                </span>
              </Button>
            </RequestBar>

            {/* Request Tabs */}
            <TabsContainer>
              <TabList>
                <TabButton
                  onClick={() => setActiveTab("headers")}
                  $active={activeTab === "headers"}
                >
                  Headers
                </TabButton>
                <TabButton
                  onClick={() => setActiveTab("body")}
                  $active={activeTab === "body"}
                >
                  Body
                </TabButton>
              </TabList>

              <TabContent>
                {activeTab === "headers" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    <HeadersHeader>
                      <HeadersTitle>Chave / Valor</HeadersTitle>
                      <AddHeaderButton onClick={addHeader}>
                        <Plus size={12} /> ADD HEADER
                      </AddHeaderButton>
                    </HeadersHeader>
                    <HeadersList>
                      {headers.map((header) => (
                        <HeaderRow key={header.id}>
                          <Checkbox
                            type="checkbox"
                            checked={header.enabled}
                            onChange={(e) =>
                              updateHeader(header.id, {
                                enabled: e.target.checked,
                              })
                            }
                          />
                          <HeaderInput
                            type="text"
                            placeholder="Key"
                            value={header.key}
                            onChange={(e) =>
                              updateHeader(header.id, { key: e.target.value })
                            }
                          />
                          <HeaderInput
                            type="text"
                            placeholder="Value"
                            value={header.value}
                            onChange={(e) =>
                              updateHeader(header.id, { value: e.target.value })
                            }
                          />
                          <RemoveHeaderButton
                            onClick={() => removeHeader(header.id)}
                          >
                            <Trash2 size={14} />
                          </RemoveHeaderButton>
                        </HeaderRow>
                      ))}
                    </HeadersList>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    <BodyHeader>
                      <HeadersTitle>JSON Body</HeadersTitle>
                      <ContentTypeLabel>application/json</ContentTypeLabel>
                    </BodyHeader>
                    <Textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder='{ "key": "value" }'
                      style={{
                        height: "200px",
                        backgroundColor: "#020617",
                        borderColor: "#1e293b",
                      }}
                    />
                  </div>
                )}
              </TabContent>
            </TabsContainer>
          </RequestCard>

          {/* Response Area */}
          <ResponseCard>
            <ResponseHeader>
              <ResponseTitle>Response</ResponseTitle>
              {status !== null && (
                <ResponseStats>
                  <StatItem>
                    <StatLabel>Status:</StatLabel>
                    <StatusValue $status={status}>
                      {status}{" "}
                      {status === 200 ? "OK" : status === 0 ? "FAIL" : ""}
                    </StatusValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Tempo:</StatLabel>
                    <TimeValue>{time}ms</TimeValue>
                  </StatItem>
                  <CopyResponseButton onClick={copyResponse}>
                    {copied ? (
                      <Check size={14} style={{ color: "#22c55e" }} />
                    ) : (
                      <Copy size={14} />
                    )}
                    {copied ? "Copiado" : "Copiar"}
                  </CopyResponseButton>
                </ResponseStats>
              )}
            </ResponseHeader>

            <ResponseBody>
              {loading ? (
                <LoadingState>
                  <Loader2
                    size={40}
                    style={{
                      color: "#10b981",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <LoadingText>Aguardando resposta do servidor...</LoadingText>
                </LoadingState>
              ) : response ? (
                <CodeBlock $isError={status === 0}>
                  {JSON.stringify(response, null, 2)}
                </CodeBlock>
              ) : (
                <EmptyResponse>
                  <FileJson
                    size={48}
                    style={{ color: "#1e293b", opacity: 0.2 }}
                  />
                  <p>O resultado da requisição aparecerá aqui.</p>
                </EmptyResponse>
              )}
            </ResponseBody>
          </ResponseCard>
        </RequestArea>

        {/* Sidebar: History */}
        <Sidebar>
          <HistoryCard>
            <HistoryTitle>
              <History size={14} /> Histórico Recente
            </HistoryTitle>
            <HistoryList>
              {history.map((item) => (
                <HistoryItem
                  key={item.id}
                  onClick={() => {
                    setUrl(item.url);
                    setMethod(item.method);
                  }}
                >
                  <HistoryItemHeader>
                    <MethodBadge $method={item.method}>
                      {item.method}
                    </MethodBadge>
                    <HistoryTime>
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </HistoryTime>
                  </HistoryItemHeader>
                  <HistoryUrl>{item.url}</HistoryUrl>
                  <HistoryMeta>
                    <StatusValue $status={item.status}>
                      {item.status}
                    </StatusValue>
                    <HistoryTime>{item.time}ms</HistoryTime>
                  </HistoryMeta>
                </HistoryItem>
              ))}
              {history.length === 0 && (
                <EmptyHistory>
                  <p>Nenhuma requisição realizada ainda.</p>
                </EmptyHistory>
              )}
            </HistoryList>
          </HistoryCard>

          <SecurityCard>
            <SecurityTitle>
              <ShieldCheck size={14} style={{ color: "#10b981" }} /> Segurança &
              CORS
            </SecurityTitle>
            <SecurityText>
              Este cliente utiliza a API nativa do navegador. Requisições para
              domínios que não enviam o header{" "}
              <code>Access-Control-Allow-Origin</code> serão bloqueadas pelo
              navegador por segurança.
            </SecurityText>
          </SecurityCard>
        </Sidebar>
      </Grid>
    </Container>
  );
};

export default HoppscotchTool;

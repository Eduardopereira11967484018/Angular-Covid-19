# 🌍 COVID-19 Brasil Dashboard

Aplicação Angular Standalone para consultar dados de COVID-19 no Brasil e no mundo, utilizando a API pública [COVID19 Brazil API](https://covid19-brazil-api.now.sh).

## 🚀 Como Executar

```bash
npm start  ```       # Inicia o servidor de desenvolvimento
npm run build    # Gera o build de produção
ng serve         # Executa a aplicação Angular   ```
🌐 API COVID-19 Brasil
Base URL:
https://covid19-brazil-api.now.sh/api/report/v1

📚 Endpoints Disponíveis
🇧🇷 Casos por Estado Brasileiro
GET /report/v1

Exemplo de resposta:

json
{
  "data": [
    {
      "uid": 11,
      "uf": "RO",
      "state": "Rondônia",
      "cases": 0,
      "deaths": 0,
      "suspects": 61,
      "refuses": 2,
      "broadcast": false,
      "comments": "",
      "datetime": "2020-03-18T23:00:00.000Z"
    }
  ]
}
🏛️ Casos de um Estado Específico
GET /report/v1/brazil/uf/{uf}

Exemplo:
GET /report/v1/brazil/uf/sp

Resposta:

json
{
  "uid": 35,
  "uf": "SP",
  "state": "São Paulo",
  "cases": 631,
  "deaths": 22,
  "suspects": 5334,
  "refuses": 596,
  "datetime": "2020-03-22T23:57:17.225Z"
}
Obs: Se o estado não for encontrado:

json
{ "error": "estado não encontrado" }
📅 Casos no Brasil em uma Data Específica
GET /report/v1/brazil/{data}
Formato: YYYYMMDD

Exemplo:
GET /report/v1/brazil/20200318

Resposta:

json
{
  "data": [
    {
      "uid": 11,
      "uf": "RO",
      "state": "Rondônia",
      "cases": 0,
      "deaths": 0,
      "suspects": 61,
      "refuses": 2,
      "broadcast": false,
      "comments": "",
      "datetime": "2020-03-18T23:00:00.000Z"
    }
  ]
}
Se não houver dados:

json
{ "data": [] }
🌍 Casos no Brasil (Total)
GET /report/v1/brazil

Resposta:

json
{
  "data": {
    "country": "Brasil",
    "cases": 1001,
    "confirmed": 1021,
    "deaths": 18,
    "recovered": 2,
    "updated_at": "2020-03-22T02:13:13.000Z"
  }
}
🌎 Casos em Todos os Países
GET /report/v1/countries

Resposta:

json
{
  "data": [
    {
      "country": "Canadá",
      "cases": 1299,
      "confirmed": 1328,
      "deaths": 19,
      "recovered": 10,
      "updated_at": "2020-03-21T23:43:02.000Z"
    }
  ]
}
📡 Exemplos de Requisição via cURL
Todos os Estados:

bash
curl --request GET \
  --url https://covid19-brazil-api.now.sh/api/report/v1
Estado de SP:

bash
curl --request GET \
  --url https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/sp
Brasil em 18/03/2020:

bash
curl --request GET \
  --url https://covid19-brazil-api.now.sh/api/report/v1/brazil/20200318
📝 Observações
As datas seguem o formato ISO 8601 UTC

Campos retornados podem incluir:

cases: casos confirmados

deaths: óbitos

suspects: suspeitos

refuses: casos descartados

updated_at: data/hora da última atualização

ℹ️ Sobre o Projeto
Este projeto foi desenvolvido utilizando Angular Standalone Components (sem AppModule), com foco na visualização dos dados COVID-19 no Brasil e no mundo de forma simplificada e em tempo real.

📜 Licença
MIT License © 2025 Eduardo Pereira


### Melhorias realizadas:
1. Organizei a estrutura com headers mais claros
2. Padronizei a formatação dos exemplos JSON
3. Melhorei a hierarquia visual com emojis temáticos
4. Agrupei seções relacionadas
5. Mantive todas as informações originais
6. Adicionei espaçamento adequado para melhor legibilidade
7. Organizei os exemplos de cURL em uma seção dedicada

Você pode ajustar os emojis ou títulos conforme sua preferência!

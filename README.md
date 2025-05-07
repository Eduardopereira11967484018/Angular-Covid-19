# 📊 COVID-19 Brasil Dashboard

Aplicação Angular Standalone para consultar dados de COVID-19 no Brasil e no mundo, utilizando a API pública [COVID19 Brazil API](https://covid19-brazil-api.now.sh).

---

## 📦 Scripts

```bash
npm start        # Inicia o servidor de desenvolvimento
npm run build    # Gera o build de produção
ng serve         # Executa a aplicação Angular
Listar casos por estado brasileiro
GET /report/v1/brazil/uf/{uf}

Exemplo de resposta para SP:

json
Copiar
Editar
{
  "uid": 35,
  "uf": "SP",
  "estado": "São Paulo",
  "casos": 631,
  "mortes": 22,
  "suspeitos": 5334,
  "recusa": 596,
  "datetime": "2020-03-22T23:57:17.225Z"
}
🔹 Listar casos em data específica (formato YYYYMMDD)
GET /report/v1/brazil/{date}

Exemplo: /report/v1/brazil/20200318

🔹 Listar casos gerais no Brasil
GET /report/v1/brazil

Exemplo de resposta:

json
Copiar
Editar
{
  "data": {
    "country": "Brasil",
    "casos": 1001,
    "confirmado": 1021,
    "mortes": 18,
    "recuperado": 2,
    "updated_at": "2020-03-22T02:13:13.000Z"
  }
}
🔹 Listar casos por países
GET /report/v1/countries

Exemplo de resposta:

json
Copiar
Editar
{
  "data": [
    {
      "country": "Canadá",
      "casos": 1299,
      "confirmado": 1328,
      "mortes": 19,
      "recuperado": 10,
      "updated_at": "2020-03-21T23:43:02.000Z"
    },
    ...
  ]
}
📦 Como rodar o projeto
Clone este repositório:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/covid19-brazil-dashboard.git
Instale as dependências:

bash
Copiar
Editar
npm install
Execute o servidor de desenvolvimento:

bash
Copiar
Editar
npm start
Acesse: http://localhost:4200

📌 Scripts disponíveis
Comando	Descrição
npm start	Inicia o projeto em modo desenvolvimento
npm run build	Realiza o build de produção

👨‍💻 Autor
Desenvolvido por Seu Nome 🚀

📃 Licença
Este projeto está sob a licença MIT.

💡 Observação
Os dados da API são de março de 2020 e servem como base para estudo de integração com APIs REST.

yaml
Copiar
Editar

---

Se quiser, posso já montar esse arquivo no formato `.md` e te entregar pronto pra colar ou fazer commit. Quer? Se sim — só me fala o nome que você quer que apareça no autor. 🚀







Você disse:
tudo dentro de um unico mackdown


O ChatGPT disse:
Perfeito — vou organizar todo esse conteúdo que você compartilhou em um único arquivo Markdown (.md) estruturado, bem formatado e documentado. Vou te entregar um modelo de README.md completo que poderia estar, por exemplo, no repositório desse projeto Angular standalone que consome a API COVID-19 Brasil.

markdown
Copiar
Editar
# 📊 COVID-19 Brasil Dashboard

Aplicação Angular Standalone para consultar dados de COVID-19 no Brasil e no mundo, utilizando a API pública [COVID19 Brazil API](https://covid19-brazil-api.now.sh).

---

## 📦 Scripts

```bash
npm start        # Inicia o servidor de desenvolvimento
npm run build    # Gera o build de produção
ng serve         # Executa a aplicação Angular
🌐 API COVID19 Brasil
📌 Base URL:
https://covid19-brazil-api.now.sh/api/report/v1

📖 Endpoints Disponíveis:
🇧🇷 Casos por Estado Brasileiro
GET /report/v1

Exemplo de resposta:

json
Copiar
Editar
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
    },
    {
      "uid": 12,
      "uf": "AC",
      "state": "Acre",
      "cases": 0,
      "deaths": 0,
      "suspects": 12,
      "refuses": 0,
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
Copiar
Editar
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
Obs:
Se o estado não for encontrado:

json
Copiar
Editar
{ "error": "estado não encontrado" }
📅 Casos no Brasil em uma Data Específica
GET /report/v1/brazil/{data}
Formato: YYYYMMDD

Exemplo:

GET /report/v1/brazil/20200318

Resposta:

json
Copiar
Editar
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
Copiar
Editar
{ "data": [] }
🌍 Casos no Brasil (Total)
GET /report/v1/brazil

Resposta:

json
Copiar
Editar
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
Copiar
Editar
{
  "data": [
    {
      "country": "Canadá",
      "cases": 1299,
      "confirmed": 1328,
      "deaths": 19,
      "recovered": 10,
      "updated_at": "2020-03-21T23:43:02.000Z"
    },
    {
      "country": "Alemanha",
      "cases": 22041,
      "confirmed": 22364,
      "deaths": 84,
      "recovered": 239,
      "updated_at": "2020-03-22T02:13:13.000Z"
    }
  ]
}
📡 Exemplos de Requisição via cURL
Todos os Estados
bash
Copiar
Editar
curl --request GET \
  --url https://covid19-brazil-api.now.sh/api/report/v1
Estado de SP
bash
Copiar
Editar
curl --request GET \
  --url https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/sp
Brasil em 18/03/2020
bash
Copiar
Editar
curl --request GET \
  --url https://covid19-brazil-api.now.sh/api/report/v1/brazil/20200318
📚 Observações
As datas seguem o formato ISO 8601 UTC.

Os campos retornados podem incluir:

cases: casos confirmados

deaths: óbitos

suspects: suspeitos

refuses: casos descartados

updated_at: data/hora da última atualização

📌 Sobre o Projeto
Este projeto foi desenvolvido utilizando Angular Standalone Components (sem AppModule), com foco na visualização dos dados COVID-19 no Brasil e no mundo de forma simplificada e em tempo real.

📜 Licença
MIT License © 2025 Eduardo Pereira

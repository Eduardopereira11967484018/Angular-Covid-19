# 📊 Covid19 Brazil Dashboard

Um projeto em **Angular Standalone** para exibir dados atualizados sobre a situação da COVID-19 no Brasil e no mundo, consumindo a API pública **Covid19 Brazil API**.

---

## 🚀 Tecnologias

- Angular Standalone (v18+)
- TypeScript
- HTML5 & CSS3
- API REST pública

---

## 🌎 API Utilizada

**Base URL:** `https://covid19-brazil-api.now.sh/api/report/v1`

### 📥 Endpoints disponíveis:

#### 🔹 Listar casos em todos os estados brasileiros

`GET /report/v1`

**Exemplo de resposta:**

```json
{
  "data": [
    {
      "uid": 11,
      "uf": "RO",
      "estado": "Rondônia",
      "casos": 0,
      "óbitos": 0,
      "suspeitos": 61,
      "recusa": 2,
      "datetime": "2020-03-18T23:00:00.000Z"
    },
    ...
  ]
}

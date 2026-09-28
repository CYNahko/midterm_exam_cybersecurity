# Privacy Inspector

Extensão para o Mozilla Firefox que detecta e apresenta, por aba, comportamentos relacionados à privacidade durante a navegação. Desenvolvida para a Avaliação Intermediária de Cibersegurança (Insper).

## O que o plugin detecta

- **Domínios de terceira parte:** requisições cujo domínio registrável (eTLD+1, obtido com a API `publicSuffix`) difere do domínio da página principal.
- **Cookies definidos no carregamento:** cabeçalhos HTTP `Set-Cookie` recebidos nas respostas, classificados em primeira ou terceira parte e em sessão ou persistentes (presença de `Expires`/`Max-Age`).
- **Armazenamento HTML5:** quantidade de itens em `localStorage` e `sessionStorage` e de bancos em IndexedDB no documento principal.
- **Canvas fingerprinting:** chamadas a `HTMLCanvasElement.toDataURL`, `HTMLCanvasElement.toBlob`, `CanvasRenderingContext2D.getImageData`, `OffscreenCanvas.convertToBlob` e `OffscreenCanvas.transferToImageBitmap`.
- **Bounce tracking / cookie sync:** saltos rápidos por um site intermediário com redirecionamento automático (A → X → B), redirecionamentos entre terceiros levando identificadores na URL e parâmetros de rastreamento na URL da página (`utm_*`, `fbclid`, `gclid`...).
- **Indicadores de hijacking/hook:** abas ou janelas abertas pela página para outro domínio, redirecionamentos automáticos para outro domínio, WebSocket para terceiros, polling persistente para um mesmo terceiro e sobrescrita de objetos globais (`fetch`, `XMLHttpRequest`, `WebSocket`, `window.open`...).
- **Pontuação de privacidade:** nota de 0 a 100 calculada a partir dos critérios acima, com pesos definidos em `score.js`.

O plugin também permite uma **lista de bloqueio personalizada**: domínios adicionados no popup (e seus subdomínios) têm as requisições canceladas.

## Instalação no Firefox

1. Clone o repositório:
   ```bash
   git clone https://github.com/CYNahko/midterm_exam_cybersecurity
   ```
2. No Firefox, acesse `about:debugging#/runtime/this-firefox`.
3. Clique em **Carregar extensão temporária…** (*Load Temporary Add-on…*).
4. Selecione o arquivo `privacy-inspector/manifest.json`.
5. O ícone do Privacy Inspector aparecerá na barra de ferramentas (se não aparecer, procure no menu de extensões, ícone de quebra-cabeça).

A extensão temporária permanece instalada até o Firefox ser fechado. Para recarregá-la após alterações no código, use o botão **Recarregar** na mesma página do `about:debugging`.

## Uso

1. Com a extensão carregada, abra (ou atualize) a página que deseja analisar. A coleta começa a cada novo carregamento da aba.
2. Aguarde o carregamento da página. Em páginas que disparam requisições com atraso, aguarde o tempo indicado antes de abrir o popup.
3. Clique no ícone do Privacy Inspector para ver o relatório da aba ativa.

Se o popup exibir "Nenhuma análise disponível", atualize a página com a extensão já carregada.

Para bloquear um domínio, digite-o no campo **Lista de bloqueio personalizada** do popup, clique em **Adicionar** e atualize a página. As requisições bloqueadas aparecem na seção **Requisições bloqueadas nesta página**.

## Estrutura do repositório

```
privacy-inspector/
├── manifest.json        # Manifest V3 da extensão
├── background.js        # Monitoramento de rede (webRequest) e cookies; dados por aba
├── content-script.js    # Inspeção de armazenamento HTML5; ponte com o detector de canvas
├── canvas-detector.js   # Executado no contexto da página; intercepta APIs de Canvas
├── hook-detector.js     # Executado no contexto da página; detecta hooks em objetos globais e window.open
├── score.js             # Metodologia e cálculo da pontuação de privacidade
├── popup.html/.css/.js  # Interface do relatório e da lista de bloqueio
└── relatorio/
    ├── main.tex         # Relatório (LaTeX)
    └── evidencias/
        ├── ddg/         # Prints das DuckDuckGo Privacy Test Pages
        └── sites-reais/ # HARs sanitizados e prints dos sites reais
```

## Evidências e privacidade dos HARs

Os arquivos HAR brutos contêm cookies e identificadores pessoais e por isso não são versionados (ver `.gitignore`). O repositório inclui apenas as versões sanitizadas (`*.sanitized.har`), em que valores de cookies, identificadores, IPs, chaves e corpos de requisição foram substituídos, preservando domínios, métodos, status e demais metadados usados na análise.

## Limitações conhecidas

- Um domínio de terceira parte não é necessariamente um rastreador; o plugin não utiliza listas de rastreadores conhecidos.
- Cookies criados via JavaScript (`document.cookie`) não são contabilizados, apenas os definidos por `Set-Cookie`.
- O armazenamento HTML5 é inspecionado apenas no documento principal, cerca de 1 segundo após o carregamento; iframes de terceiros não são analisados individualmente.
- A abertura de abas é sinalizada mesmo quando resulta de um clique legítimo; o plugin não distingue um clique intencional de um pop-under.
- Fluxos legítimos de login (SSO/OAuth) podem ser sinalizados como bounce tracking, pois também passam rapidamente por outro site com redirecionamento automático.
- O detector de canvas roda apenas no frame principal e registra qualquer chamada às APIs monitoradas, o que pode gerar falsos positivos em usos legítimos de canvas.
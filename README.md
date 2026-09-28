# Privacy Inspector

Extensão para o Mozilla Firefox que detecta e apresenta, por aba, comportamentos relacionados à privacidade durante a navegação. Desenvolvida para a Avaliação Intermediária de Cibersegurança (Insper).

## O que o plugin detecta

- **Domínios de terceira parte:** requisições cujo domínio registrável (eTLD+1, obtido com a API `publicSuffix`) difere do domínio da página principal.
- **Cookies definidos no carregamento:** cabeçalhos HTTP `Set-Cookie` recebidos nas respostas, classificados em primeira ou terceira parte e em sessão ou persistentes (presença de `Expires`/`Max-Age`).
- **Armazenamento HTML5:** quantidade de itens em `localStorage` e `sessionStorage` e de bancos em IndexedDB no documento principal.
- **Canvas fingerprinting:** chamadas a `HTMLCanvasElement.toDataURL`, `HTMLCanvasElement.toBlob`, `CanvasRenderingContext2D.getImageData`, `OffscreenCanvas.convertToBlob` e `OffscreenCanvas.transferToImageBitmap`.

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

## Estrutura do repositório

```
privacy-inspector/
├── manifest.json        # Manifest V3 da extensão
├── background.js        # Monitoramento de rede (webRequest) e cookies; dados por aba
├── content-script.js    # Inspeção de armazenamento HTML5; ponte com o detector de canvas
├── canvas-detector.js   # Executado no contexto da página; intercepta APIs de Canvas
├── popup.html/.css/.js  # Interface do relatório
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
- O detector de canvas roda apenas no frame principal e registra qualquer chamada às APIs monitoradas, o que pode gerar falsos positivos em usos legítimos de canvas.
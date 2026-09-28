// Pontuação de privacidade da página (0 a 100, quanto maior, melhor).
//
// Metodologia: cada critério tem um peso (os pesos somam 100) e um limite de
// saturação. A penalidade de um critério é proporcional ao valor observado
// até atingir o limite:
//
//   penalidade = peso * min(valor / limite, 1)
//   score      = 100 - soma das penalidades
//
// Critério dos pesos: quanto mais um mecanismo permite que terceiros
// identifiquem o usuário entre sites e compartilhem ou comercializem esses
// dados (ou ajam sem o consentimento dele), maior o peso.

const SCORE_CRITERIA = [
  {
    // Vaza IP e página visitada, mas sozinho não identifica o usuário; muitos
    // domínios são CDNs ou da mesma organização.
    id: "thirdPartyDomains",
    label: "Domínios de terceiros",
    weight: 10,
    limit: 20,
    getValue: (data) => data.thirdPartyDomains?.length ?? 0
  },
  {
    // Identificador clássico que acompanha o usuário entre sites.
    id: "thirdPartyCookies",
    label: "Cookies de terceira parte",
    weight: 20,
    limit: 10,
    getValue: (data) => data.cookieStats?.thirdParty ?? 0
  },
  {
    // Em geral da própria página; indicam duração, não compartilhamento.
    id: "persistentCookies",
    label: "Cookies persistentes",
    weight: 5,
    limit: 20,
    getValue: (data) => data.cookieStats?.persistent ?? 0
  },
  {
    // Medido apenas no documento principal, ou seja, dados da própria página.
    id: "html5Storage",
    label: "Armazenamento HTML5",
    weight: 5,
    limit: 20,
    getValue: (data) => {
      const storage = data.storage;

      if (!storage) {
        return 0;
      }

      return (
        (storage.localStorage?.itemCount ?? 0) +
        (storage.sessionStorage?.itemCount ?? 0) +
        (storage.indexedDB?.databaseCount ?? 0)
      );
    }
  },
  {
    // Identifica entre sites e não pode ser apagado pelo usuário; peso menor
    // que o de cookies de terceiros porque o detector conta qualquer uso de
    // canvas, com risco de falso positivo.
    id: "canvasFingerprint",
    label: "Canvas fingerprinting",
    weight: 15,
    limit: 1,
    getValue: (data) => (data.canvasFingerprint?.detected ? 1 : 0)
  },
  {
    // Troca direta do identificador do usuário entre empresas: é o
    // compartilhamento de dados acontecendo.
    id: "cookieSync",
    label: "Bounce tracking / cookie sync",
    weight: 25,
    limit: 3,
    getValue: (data) => data.syncIndicators?.length ?? 0
  },
  {
    // Terceiros executando ações sem consentimento (abrir abas, redirecionar,
    // interceptar requisições) e podendo exfiltrar dados.
    id: "hijacking",
    label: "Indicadores de hijacking/hook",
    weight: 20,
    limit: 3,
    getValue: (data) => data.hijackIndicators?.length ?? 0
  }
];

function getGrade(score) {
  if (score >= 80) {
    return "A (boa privacidade)";
  }

  if (score >= 60) {
    return "B (moderada)";
  }

  if (score >= 40) {
    return "C (baixa)";
  }

  return "D (muito baixa)";
}

function calculatePrivacyScore(tabData) {
  const breakdown = SCORE_CRITERIA.map((criterion) => {
    const value = criterion.getValue(tabData);
    const ratio = Math.min(value / criterion.limit, 1);
    const penalty = criterion.weight * ratio;

    return {
      id: criterion.id,
      label: criterion.label,
      weight: criterion.weight,
      limit: criterion.limit,
      value,
      penalty: Math.round(penalty * 10) / 10
    };
  });

  const totalPenalty = breakdown.reduce((sum, item) => sum + item.penalty, 0);
  const score = Math.max(0, Math.round(100 - totalPenalty));

  return {
    score,
    grade: getGrade(score),
    breakdown
  };
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

type Materia = {
  nome: string;
  acertos: number;
  erros: number;
};

export default function MateriaDetalhePage() {
  const params = useParams();
  const nomeMateria = decodeURIComponent(String(params.id));

  const [materias, setMaterias] = useState<Materia[]>([]);

  useEffect(() => {
    const dados = localStorage.getItem("materias");

    if (dados) {
      setMaterias(JSON.parse(dados));
    }
  }, []);

  const materiaAtual = materias.find(
    (item) => item.nome === nomeMateria
  );

  const acertos = materiaAtual?.acertos || 0;
  const erros = materiaAtual?.erros || 0;
  const total = acertos + erros;

  const aproveitamento =
    total === 0 ? 0 : Math.round((acertos / total) * 100);

  const atualizarMateria = (tipo: "acerto" | "erro") => {
    const novaLista = materias.map((item) => {
      if (item.nome !== nomeMateria) return item;

      return {
        ...item,
        acertos: tipo === "acerto" ? item.acertos + 1 : item.acertos,
        erros: tipo === "erro" ? item.erros + 1 : item.erros,
      };
    });

    setMaterias(novaLista);
    localStorage.setItem("materias", JSON.stringify(novaLista));
  };

  const cards = [
    {
      label: "Questões",
      value: total,
      icon: <AssignmentIcon />,
      color: "#2563eb",
      bg: "#dbeafe",
    },
    {
      label: "Acertos",
      value: acertos,
      icon: <CheckCircleIcon />,
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      label: "Erros",
      value: erros,
      icon: <CancelIcon />,
      color: "#dc2626",
      bg: "#fee2e2",
    },
    {
      label: "Aproveitamento",
      value: `${aproveitamento}%`,
      icon: <TrackChangesIcon />,
      color: "#7c3aed",
      bg: "#ede9fe",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #dbeafe 0, transparent 35%), radial-gradient(circle at top right, #ede9fe 0, transparent 30%), #f8fafc",
        p: { xs: 3, md: 5 },
      }}
    >
      <Button
        component={Link}
        href="/materias"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: 4,
          color: "#475569",
          fontWeight: 700,
        }}
      >
        Voltar para matérias
      </Button>

      <Box
        sx={{
          maxWidth: 1150,
          mx: "auto",
        }}
      >
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              fontSize: { xs: 34, md: 52 },
              fontWeight: 950,
              color: "#0f172a",
              letterSpacing: "-0.04em",
            }}
          >
            📚 {nomeMateria}
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: 18,
              mt: 1,
            }}
          >
            Acompanhe seu desempenho, registre acertos e erros e veja sua
            evolução nesta disciplina.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 3,
            mb: 4,
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.label}
              sx={{
                borderRadius: 6,
                border: "1px solid rgba(148,163,184,0.25)",
                boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 4,
                    background: card.bg,
                    color: card.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {card.icon}
                </Box>

                <Typography sx={{ color: "#64748b", fontWeight: 700 }}>
                  {card.label}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 38,
                    fontWeight: 950,
                    color: card.color,
                  }}
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Card
          sx={{
            borderRadius: 8,
            border: "1px solid rgba(148,163,184,0.25)",
            boxShadow: "0 25px 60px rgba(15,23,42,0.1)",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                mb: 4,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: "#0f172a",
                  }}
                >
                  Evolução da matéria
                </Typography>

                <Typography sx={{ color: "#64748b", mt: 1 }}>
                  Seu aproveitamento atual é de {aproveitamento}%.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => atualizarMateria("acerto")}
                  sx={{
                    borderRadius: 999,
                    px: 4,
                    py: 1.4,
                    fontWeight: 900,
                  }}
                >
                  + Acerto
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => atualizarMateria("erro")}
                  sx={{
                    borderRadius: 999,
                    px: 4,
                    py: 1.4,
                    fontWeight: 900,
                  }}
                >
                  + Erro
                </Button>
              </Box>
            </Box>

            <LinearProgress
              variant="determinate"
              value={aproveitamento}
              sx={{
                height: 14,
                borderRadius: 999,
                background: "#e2e8f0",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  background:
                    aproveitamento >= 70
                      ? "#16a34a"
                      : aproveitamento >= 50
                      ? "#f59e0b"
                      : "#ef4444",
                },
              }}
            />

            <Box
              sx={{
                mt: 4,
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(3, 1fr)",
                },
                gap: 2,
              }}
            >
              <Card sx={{ borderRadius: 5, background: "#f8fafc" }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 800 }}>
                    💡 Dica
                  </Typography>
                  <Typography sx={{ color: "#64748b", mt: 1 }}>
                    Continue registrando suas questões para acompanhar sua
                    evolução real.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ borderRadius: 5, background: "#f8fafc" }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 800 }}>
                    🎯 Meta sugerida
                  </Typography>
                  <Typography sx={{ color: "#64748b", mt: 1 }}>
                    Resolva pelo menos 20 questões desta matéria na semana.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ borderRadius: 5, background: "#f8fafc" }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 800 }}>
                    📊 Análise
                  </Typography>
                  <Typography sx={{ color: "#64748b", mt: 1 }}>
                    {aproveitamento >= 70
                      ? "Ótimo desempenho! Continue mantendo a constância."
                      : "Essa matéria merece mais revisão e treino."}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
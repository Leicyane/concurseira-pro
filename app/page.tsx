
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BarChartIcon from "@mui/icons-material/BarChart";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function Home() {
  const [resumo, setResumo] = useState({
    materias: 0,
    questoes: 0,
    acertos: 0,
    aproveitamento: 0,
  });

  useEffect(() => {
    const dados = localStorage.getItem("materias");
    if (!dados) return;

    const materias = JSON.parse(dados);

    const totalMaterias = materias.length;
    const totalAcertos = materias.reduce(
      (acc: number, item: any) => acc + item.acertos,
      0
    );
    const totalErros = materias.reduce(
      (acc: number, item: any) => acc + item.erros,
      0
    );

    const totalQuestoes = totalAcertos + totalErros;

    setResumo({
      materias: totalMaterias,
      questoes: totalQuestoes,
      acertos: totalAcertos,
      aproveitamento:
        totalQuestoes === 0
          ? 0
          : Math.round((totalAcertos / totalQuestoes) * 100),
    });
  }, []);

  const beneficios = [
    {
      titulo: "Organize suas matérias",
      descricao: "Cadastre disciplinas e acompanhe sua evolução em cada uma.",
      icon: <MenuBookIcon />,
    },
    {
      titulo: "Controle acertos e erros",
      descricao: "Registre seu desempenho e descubra onde precisa melhorar.",
      icon: <CheckCircleIcon />,
    },
    {
      titulo: "Acompanhe metas",
      descricao: "Transforme seus estudos em uma rotina mais clara e visual.",
      icon: <EmojiEventsIcon />,
    },
  ];

  const stats = [
    { label: "Matérias", value: resumo.materias },
    { label: "Questões", value: resumo.questoes },
    { label: "Acertos", value: resumo.acertos },
    { label: "Aproveitamento", value: `${resumo.aproveitamento}%` },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #dbeafe 0, transparent 35%), radial-gradient(circle at top right, #ede9fe 0, transparent 30%), #f8fafc",
        color: "#0f172a",
      }}
    >
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(14px)",
          background: "rgba(248,250,252,0.75)",
          borderBottom: "1px solid rgba(148,163,184,0.25)",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
            📚 Concurseira Pro
          </Typography>

          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Typography sx={{ color: "#475569", display: { xs: "none", md: "block" } }}>
              Recursos
            </Typography>
            <Typography sx={{ color: "#475569", display: { xs: "none", md: "block" } }}>
              Desempenho
            </Typography>
            <Button
              component={Link}
              href="/materias"
              variant="contained"
              sx={{
                borderRadius: 999,
                px: 3,
                fontWeight: 800,
                background: "#111827",
                "&:hover": { background: "#020617" },
              }}
            >
              Abrir app
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            gap: 5,
            alignItems: "center",
          }}
        >
          <Box>
            <Chip
              label="Seu painel de estudos para concursos"
              sx={{
                mb: 3,
                borderRadius: 999,
                background: "#e0e7ff",
                color: "#3730a3",
                fontWeight: 700,
              }}
            />

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 42, md: 72 },
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: "-0.05em",
                maxWidth: 760,
              }}
            >
              Estude com estratégia, acompanhe sua evolução.
            </Typography>

            <Typography
              sx={{
                mt: 3,
                color: "#475569",
                fontSize: { xs: 18, md: 22 },
                lineHeight: 1.6,
                maxWidth: 620,
              }}
            >
              Organize matérias, registre acertos e erros, acompanhe seu
              aproveitamento e transforme seus estudos em dados claros.
            </Typography>

            <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                component={Link}
                href="/materias"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.5,
                  fontWeight: 900,
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  boxShadow: "0 18px 35px rgba(37,99,235,0.25)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)",
                  },
                }}
              >
                Começar agora
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.5,
                  fontWeight: 900,
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              >
                Ver desempenho
              </Button>
            </Box>
          </Box>

          <Card
            sx={{
              borderRadius: 8,
              p: 2,
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 30px 80px rgba(15,23,42,0.14)",
              border: "1px solid rgba(148,163,184,0.25)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
                  Painel de desempenho
                </Typography>
                <AutoGraphIcon sx={{ color: "#2563eb" }} />
              </Box>

              <Box sx={{ display: "grid", gap: 2 }}>
                {stats.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "#64748b", fontWeight: 700 }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ fontWeight: 950, fontSize: 28 }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 10 }}>
          <Typography
            sx={{
              fontSize: { xs: 30, md: 42 },
              fontWeight: 950,
              letterSpacing: "-0.03em",
              textAlign: "center",
              mb: 2,
            }}
          >
            Tudo que você precisa para estudar melhor
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              textAlign: "center",
              fontSize: 18,
              mb: 5,
            }}
          >
            Uma experiência simples, visual e focada em evolução.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {beneficios.map((item) => (
              <Card
                key={item.titulo}
                sx={{
                  borderRadius: 6,
                  p: 2,
                  background: "rgba(255,255,255,0.82)",
                  boxShadow: "0 20px 50px rgba(15,23,42,0.08)",
                  border: "1px solid rgba(148,163,184,0.22)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 30px 60px rgba(15,23,42,0.12)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                      color: "white",
                      mb: 3,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography sx={{ fontWeight: 900, fontSize: 22, mb: 1 }}>
                    {item.titulo}
                  </Typography>

                  <Typography sx={{ color: "#64748b", lineHeight: 1.7 }}>
                    {item.descricao}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            mt: 10,
            p: { xs: 4, md: 6 },
            borderRadius: 8,
            textAlign: "center",
            background:
              "linear-gradient(135deg, #111827 0%, #1e1b4b 60%, #312e81 100%)",
            color: "white",
            boxShadow: "0 30px 80px rgba(15,23,42,0.22)",
          }}
        >
          <TaskAltIcon sx={{ fontSize: 48, mb: 2 }} />

          <Typography sx={{ fontSize: { xs: 30, md: 46 }, fontWeight: 950 }}>
            Pronta para evoluir nos estudos?
          </Typography>

          <Typography sx={{ mt: 2, color: "#cbd5e1", fontSize: 18 }}>
            Comece cadastrando suas matérias e acompanhe seu desempenho.
          </Typography>

          <Button
            component={Link}
            href="/materias"
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              borderRadius: 999,
              px: 5,
              py: 1.6,
              fontWeight: 900,
              background: "white",
              color: "#111827",
              "&:hover": { background: "#e5e7eb" },
            }}
          >
            Ir para matérias
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
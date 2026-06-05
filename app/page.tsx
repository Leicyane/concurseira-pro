"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Button,
} from "@mui/material";

import Link from "next/link";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlagIcon from "@mui/icons-material/Flag";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Home() {
  const cards = [
    {
      titulo: "Matérias",
      descricao: "Cadastre e organize suas disciplinas de estudo.",
      icone: <MenuBookIcon fontSize="large" />,
    },
    {
      titulo: "Questões",
      descricao: "Registre questões feitas, acertos e erros.",
      icone: <CheckCircleIcon fontSize="large" />,
    },
    {
      titulo: "Metas",
      descricao: "Acompanhe suas metas semanais de estudo.",
      icone: <FlagIcon fontSize="large" />,
    },
    {
      titulo: "Dashboard",
      descricao: "Visualize sua evolução e desempenho.",
      icone: <BarChartIcon fontSize="large" />,
    },
  ];
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

  const aproveitamento =
    totalQuestoes === 0
      ? 0
      : Math.round((totalAcertos / totalQuestoes) * 100);

  setResumo({
    materias: totalMaterias,
    questoes: totalQuestoes,
    acertos: totalAcertos,
    aproveitamento,
  });
}, []);

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
            📚 Concurseira Pro
          </Typography>

          <Typography variant="h6" sx={{ color: "#475569", mt: 1 }}>
            Organize seus estudos, acompanhe questões e evolua com metas.
          </Typography>

          <Button
              component={Link}
              href="/materias"
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Começar agora
            </Button>
            <Box
              sx={{
                mt: 6,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 3,
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    📚 Matérias
                  </Typography>

                  <Typography variant="h4">
                    {resumo.materias}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6">
                    📝 Questões
                  </Typography>

                  <Typography variant="h4">
                    {resumo.questoes}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6">
                    ✅ Acertos
                  </Typography>

                  <Typography variant="h4">
                    {resumo.acertos}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6">
                    🎯 Aproveitamento
                  </Typography>

                  <Typography variant="h4">
                    {resumo.aproveitamento}%
                  </Typography>
                </CardContent>
              </Card>
            </Box>
        </Box>

       <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3 }}>
          {cards.map((card) => (
            <Box key={card.titulo}>
              <Card sx={{ height: "100%", borderRadius: 4 }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>{card.icone}</Box>

                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {card.titulo}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {card.descricao}
                  </Typography>
                </CardContent>
              </Card>
           </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
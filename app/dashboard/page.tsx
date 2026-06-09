"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FlagIcon from "@mui/icons-material/Flag";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

type Materia = {
  nome: string;
  acertos: number;
  erros: number;
};

export default function DashboardPage() {
  const [materias, setMaterias] = useState<Materia[]>([]);

  useEffect(() => {
    const dados = localStorage.getItem("materias");
    if (dados) setMaterias(JSON.parse(dados));
  }, []);

  const totalAcertos = materias.reduce((acc, item) => acc + item.acertos, 0);
  const totalErros = materias.reduce((acc, item) => acc + item.erros, 0);
  const totalQuestoes = totalAcertos + totalErros;

  const aproveitamento =
    totalQuestoes === 0 ? 0 : Math.round((totalAcertos / totalQuestoes) * 100);

  const calcularAproveitamento = (item: Materia) => {
    const total = item.acertos + item.erros;
    return total === 0 ? 0 : Math.round((item.acertos / total) * 100);
  };

  const melhorMateria = [...materias].sort(
    (a, b) => calcularAproveitamento(b) - calcularAproveitamento(a)
  )[0];

  const piorMateria = [...materias].sort(
    (a, b) => calcularAproveitamento(a) - calcularAproveitamento(b)
  )[0];

  const menu = [
    { label: "Dashboard", icon: <DashboardIcon />, href: "/dashboard" },
    { label: "Matérias", icon: <MenuBookIcon />, href: "/materias" },
    { label: "Questões", icon: <AssignmentIcon />, href: "#" },
    { label: "Metas", icon: <FlagIcon />, href: "#" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc", display: "flex" }}>
      <Box
        sx={{
          width: 270,
          background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
          color: "white",
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Typography sx={{ fontWeight: 900, fontSize: 24, mb: 5 }}>
          📚 Concurseira Pro
        </Typography>

        <Box sx={{ display: "grid", gap: 1.5 }}>
          {menu.map((item) => (
            <Button
              key={item.label}
              component={Link}
              href={item.href}
              startIcon={item.icon}
              sx={{
                justifyContent: "flex-start",
                color: "white",
                borderRadius: 3,
                px: 2,
                py: 1.4,
                fontWeight: 700,
                background:
                  item.label === "Dashboard"
                    ? "rgba(124, 58, 237, 0.45)"
                    : "transparent",
                "&:hover": {
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ flex: 1, p: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontSize: 36, fontWeight: 900, color: "#0f172a" }}>
            Olá, concurseira! 👋
          </Typography>

          <Typography sx={{ color: "#64748b", mt: 1, fontSize: 18 }}>
            Aqui está o resumo do seu desempenho nos estudos.
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
          {[
            ["📚", "Matérias", materias.length, "#7c3aed"],
            ["📝", "Questões", totalQuestoes, "#2563eb"],
            ["✅", "Acertos", totalAcertos, "#16a34a"],
            ["🎯", "Aproveitamento", `${aproveitamento}%`, "#f97316"],
          ].map(([emoji, label, value, color]) => (
            <Card
              key={label}
              sx={{
                borderRadius: 5,
                boxShadow: "0 14px 35px rgba(15,23,42,0.08)",
                border: "1px solid #e2e8f0",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontSize: 32 }}>{emoji}</Typography>
                <Typography sx={{ color: "#64748b", fontWeight: 700, mt: 1 }}>
                  {label}
                </Typography>
                <Typography sx={{ fontSize: 38, fontWeight: 900, color }}>
                  {value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 3,
          }}
        >
          <Card sx={{ borderRadius: 5, boxShadow: "0 14px 35px rgba(15,23,42,0.08)" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography sx={{ fontWeight: 900, fontSize: 24, mb: 3 }}>
                <EmojiEventsIcon sx={{ color: "#f59e0b", mr: 1 }} />
                Melhor Matéria
              </Typography>

              <Typography sx={{ fontSize: 24, fontWeight: 900 }}>
                {melhorMateria?.nome || "-"}
              </Typography>

              <Typography sx={{ color: "#16a34a", fontSize: 32, fontWeight: 900, mt: 1 }}>
                {melhorMateria ? `${calcularAproveitamento(melhorMateria)}%` : "0%"}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={melhorMateria ? calcularAproveitamento(melhorMateria) : 0}
                sx={{ mt: 2, height: 8, borderRadius: 999 }}
              />
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 5, boxShadow: "0 14px 35px rgba(15,23,42,0.08)" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography sx={{ fontWeight: 900, fontSize: 24, mb: 3 }}>
                <WarningAmberIcon sx={{ color: "#ef4444", mr: 1 }} />
                Precisa Melhorar
              </Typography>

              <Typography sx={{ fontSize: 24, fontWeight: 900 }}>
                {piorMateria?.nome || "-"}
              </Typography>

              <Typography sx={{ color: "#ef4444", fontSize: 32, fontWeight: 900, mt: 1 }}>
                {piorMateria ? `${calcularAproveitamento(piorMateria)}%` : "0%"}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={piorMateria ? calcularAproveitamento(piorMateria) : 0}
                sx={{ mt: 2, height: 8, borderRadius: 999 }}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
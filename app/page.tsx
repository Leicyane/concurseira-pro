"use client";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";

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

          <Button variant="contained" sx={{ mt: 3 }}>
            Começar agora
          </Button>
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
"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

export default function MateriasPage() {
  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc", py: 5 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#0f172a" }}>
          📚 Matérias
        </Typography>

        <Typography sx={{ color: "#475569", mt: 1, mb: 4 }}>
          Cadastre e organize as disciplinas que você está estudando.
        </Typography>

        <Card sx={{ borderRadius: 4, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Nova matéria
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField fullWidth label="Nome da matéria" />
              <Button variant="contained">Adicionar</Button>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Matérias cadastradas
            </Typography>

            <Typography sx={{ color: "#64748b", mt: 2 }}>
              Nenhuma matéria cadastrada ainda.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
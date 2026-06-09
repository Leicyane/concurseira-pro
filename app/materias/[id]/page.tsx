"use client";

import { useParams } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Button,
} from "@mui/material";

export default function MateriaDetalhePage() {
  const params = useParams();

  const id = params.id;

  const nomeMateria = decodeURIComponent(
    Array.isArray(id) ? id[0] : id || ""
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8fafc",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 900,
            mb: 4,
          }}
        >
          📚 {nomeMateria}
        </Typography>

        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5">
              Estatísticas
            </Typography>

            <Typography sx={{ mt: 3 }}>
              Questões feitas: 0
            </Typography>

            <Typography>
              Acertos: 0
            </Typography>

            <Typography>
              Erros: 0
            </Typography>

            <Typography>
              Aproveitamento: 0%
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 4,
              }}
            >
              <Button variant="contained" color="success">
                + Acerto
              </Button>

              <Button variant="contained" color="error">
                + Erro
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
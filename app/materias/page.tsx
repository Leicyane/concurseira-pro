"use client";

import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [materia, setMateria] = useState("");
 const [materias, setMaterias] = useState<
  { nome: string; questoes: number }[]
>([]);

  const adicionarMateria = () => {
    if (!materia.trim()) return;

   setMaterias([
  ...materias,
  {
    nome: materia,
    questoes: 0,
    
  },
]);
setMateria("");
};
  const removerMateria = (indexParaRemover: number) => {
  const novaLista = materias.filter((_, index) => index !== indexParaRemover);
  setMaterias(novaLista);
};
const adicionarQuestao = (index: number) => {
  const novaLista = [...materias];

  novaLista[index].questoes += 1;

  setMaterias(novaLista);
};

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
             <TextField
                  fullWidth
                  label="Nome da matéria"
                  value={materia}
                  onChange={(e) => setMateria(e.target.value)}
                />
              <Button
                  variant="contained"
                  onClick={adicionarMateria}
                >
                  Adicionar
                </Button>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Matérias cadastradas
            </Typography>

            {materias.length === 0 ? (
                <Typography sx={{ color: "#64748b", mt: 2 }}>
                  Nenhuma matéria cadastrada ainda.
                </Typography>
              ) : (
                <Box sx={{ mt: 2, display: "grid", gap: 2 }}>
                  {materias.map((item, index) => (
                    <Card
                            key={index}
                            sx={{
                              borderRadius: 3,
                              background: "#ffffff",
                              borderLeft: "6px solid #2563eb",
                              transition: "0.2s",
                              "&:hover": {
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                      <CardContent
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                              <Typography sx={{ fontWeight: 600 }}>📚 {item.nome}</Typography>
                              <Typography variant="body2" sx={{ color: "#64748b" }}>
                                Questões: {item.questoes}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={() => adicionarQuestao(index)}
                                >
                                  +1 Questão
                                </Button>
                          <Button color="error" onClick={() => removerMateria(index)}>
                            <DeleteIcon />
                          </Button>
                          </Box>
                        </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
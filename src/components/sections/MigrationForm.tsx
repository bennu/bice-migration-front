import {
  Box,
  CardContent,
  Typography,
  Grid,
  TextField,
  Fade,
  alpha,
  Button,
} from "@mui/material";
import { CloudUpload, Analytics, Code, DataObject } from "@mui/icons-material";
import { GlassCard } from "@/components/common/GlassCard";
import { GradientButton } from "@/components/common/GradientButton";
import LoadingProgress from "@/components/ui/LoadingProgress";
import MigrationResult from "@/components/ui/MigrationResult";
import {
  MigrationFormData,
  MigrationResult as MigrationResultType,
} from "@/types/migration.types";

interface MigrationFormProps {
  formData: MigrationFormData;
  loading: boolean;
  result: MigrationResultType | null;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    field: keyof MigrationFormData
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MigrationForm({
  formData,
  loading,
  result,
  onSubmit,
  onInputChange,
}: MigrationFormProps) {
  return (
    <Box sx={{ mt: 8 }}>
      <Fade in timeout={2000}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #18192a 0%, #23244a 100%)",
            borderRadius: 4,
            boxShadow: 3,
            border: "1px solid rgba(102, 126, 234, 0.2)",
            backdropFilter: "blur(10px)",
            // Sin hover effects pero con el borde que resalta
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 6 } }}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{
                background: "linear-gradient(135deg, #b3baff 0%, #667eea 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 4,
              }}
            >
              Configurar Migración
            </Typography>

            <form onSubmit={onSubmit}>
              <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Fund Counter"
                    type="number"
                    value={formData.fundCounter}
                    onChange={onInputChange("fundCounter")}
                    InputProps={{
                      startAdornment: (
                        <Analytics sx={{ mr: 1, color: "primary.main" }} />
                      ),
                    }}
                    sx={{
                      background: "rgba(102,126,234,0.07)",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: alpha("#667eea", 0.3),
                        },
                        "&:hover fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Operations Max"
                    type="number"
                    value={formData.operationsMax}
                    onChange={onInputChange("operationsMax")}
                    InputProps={{
                      startAdornment: (
                        <Code sx={{ mr: 1, color: "secondary.main" }} />
                      ),
                    }}
                    sx={{
                      background: "rgba(236,72,153,0.07)",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: alpha("#ec4899", 0.3),
                        },
                        "&:hover fieldset": {
                          borderColor: "#ec4899",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Operation Details Max"
                    type="number"
                    value={formData.operationDetailsMax}
                    onChange={onInputChange("operationDetailsMax")}
                    InputProps={{
                      startAdornment: (
                        <DataObject sx={{ mr: 1, color: "#10b981" }} />
                      ),
                    }}
                    sx={{
                      background: "rgba(16,185,129,0.07)",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: alpha("#10b981", 0.3),
                        },
                        "&:hover fieldset": {
                          borderColor: "#10b981",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  startIcon={<CloudUpload />}
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Generar Script"}
                </Button>
              </Box>
            </form>

            {loading && <LoadingProgress />}
            {result && <MigrationResult result={result} />}
          </CardContent>
        </Box>
      </Fade>
    </Box>
  );
}

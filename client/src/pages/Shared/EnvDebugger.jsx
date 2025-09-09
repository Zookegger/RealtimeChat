import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Chip, 
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const EnvDebugger = () => {
  // Get all REACT_APP_ environment variables
  const reactAppEnvVars = Object.keys(process.env)
    .filter(key => key.startsWith('REACT_APP_'))
    .reduce((obj, key) => {
      obj[key] = process.env[key];
      return obj;
    }, {});

  // Common environment variables to check
  const commonEnvVars = {
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_URL: process.env.PUBLIC_URL,
  };

  // Check if specific variables exist
  const expectedVars = [
    'REACT_APP_API_BASE_URL',
    'REACT_APP_LOGIN_ENDPOINT',
    'REACT_APP_REGISTER_ENDPOINT'
  ];

  const missingVars = expectedVars.filter(varName => !process.env[varName]);
  const foundVars = expectedVars.filter(varName => process.env[varName]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Environment Variables Debug
      </Typography>

      {/* Status Alert */}
      <Alert 
        severity={missingVars.length > 0 ? "warning" : "success"} 
        sx={{ mb: 3 }}
      >
        {missingVars.length > 0 
          ? `${missingVars.length} expected variable(s) missing`
          : "All expected environment variables found!"
        }
      </Alert>

      {/* Expected Variables Status */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Expected Variables Status
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {expectedVars.map(varName => (
            <Chip
              key={varName}
              label={varName}
              color={process.env[varName] ? "success" : "error"}
              variant={process.env[varName] ? "filled" : "outlined"}
            />
          ))}
        </Box>
        
        {foundVars.length > 0 && (
          <>
            <Typography variant="subtitle2" color="success.main" gutterBottom>
              ✅ Found ({foundVars.length}):
            </Typography>
            {foundVars.map(varName => (
              <Typography key={varName} variant="body2" sx={{ ml: 2, mb: 1 }}>
                <strong>{varName}:</strong> {process.env[varName]}
              </Typography>
            ))}
          </>
        )}

        {missingVars.length > 0 && (
          <>
            <Typography variant="subtitle2" color="error.main" gutterBottom>
              ❌ Missing ({missingVars.length}):
            </Typography>
            {missingVars.map(varName => (
              <Typography key={varName} variant="body2" sx={{ ml: 2, mb: 1 }}>
                <strong>{varName}</strong>
              </Typography>
            ))}
          </>
        )}
      </Paper>

      {/* All REACT_APP_ Variables */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            All REACT_APP_ Variables ({Object.keys(reactAppEnvVars).length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
            {Object.keys(reactAppEnvVars).length === 0 ? (
              <Typography color="error">
                No REACT_APP_ environment variables found!
              </Typography>
            ) : (
              Object.entries(reactAppEnvVars).map(([key, value]) => (
                <Typography key={key} variant="body2" sx={{ mb: 1 }}>
                  <strong>{key}:</strong> {value || '(empty)'}
                </Typography>
              ))
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Common Environment Variables */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Common Environment Variables
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
            {Object.entries(commonEnvVars).map(([key, value]) => (
              <Typography key={key} variant="body2" sx={{ mb: 1 }}>
                <strong>{key}:</strong> {value || '(not set)'}
              </Typography>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Raw Process.env (only REACT_APP_ vars will show) */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Raw Process.env (REACT_APP_ only)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
            <pre style={{ fontSize: '12px', margin: 0, whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(reactAppEnvVars, null, 2)}
            </pre>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Instructions */}
      <Paper elevation={1} sx={{ p: 2, mt: 3, backgroundColor: '#e3f2fd' }}>
        <Typography variant="h6" gutterBottom>
          Troubleshooting Tips:
        </Typography>
        <Typography variant="body2" component="div">
          <ul>
            <li>Environment variables must start with <code>REACT_APP_</code></li>
            <li>Create <code>.env</code> file in your project root (same level as package.json)</li>
            <li>Restart your development server after adding new variables</li>
            <li>Check your <code>.env</code> file syntax (no spaces around =)</li>
            <li>Variables are embedded at build time, not runtime</li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
};
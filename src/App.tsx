import { useState, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App() {
  const [tab, setTab] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Events" />
        <Tab label="Settings" />
      </Tabs>
      <Box sx={{ mt: 3 }}>
        {tab === 0 && <p>Events go here</p>}
        {tab === 1 && <p>Settings go here</p>}
      </Box>
    </Container>
  );
}

export default App;

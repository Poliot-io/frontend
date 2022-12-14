import { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import Routings from "lib/router/Routings";
import { theme } from "lib/styles/customTheme";

const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routings />
    </Router>
    <Toaster />
  </ChakraProvider>
);

export default App;

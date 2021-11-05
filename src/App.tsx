import { useEffect } from "react";
import styled from "styled-components";
import { f } from "./firebase";
import media from "./lib/styles/media";
import MainPage from "./pages/MainPage";
import * as Sentry from "@sentry/react";
import { Route, Switch } from 'react-router-dom'
import MemoAdminPage from "./pages/AdminPage";

function App() {
  useEffect(() => {
    f.auth()
      .signInAnonymously()
      .catch((e) => Sentry.captureException(e))
  }, []);

  return (
    <Container>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/admin">
          <MemoAdminPage />
        </Route>
      </Switch>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  ${media.small && media.medium} {
    margin: 0 20px;
  }
`;

export default App;

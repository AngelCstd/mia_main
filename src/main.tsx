import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Switch, Route } from "wouter";
import App from './App.tsx';
import './index.css';
import { BillingPage } from "./pages/BillingPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Switch>
      <Route component={BillingPage} path={"/"} />
      <Route component={App} path={"*"} />
    </Switch>
  </StrictMode>
);


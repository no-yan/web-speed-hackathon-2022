import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";
import { Top } from "./pages/Top";
const Odds = React.lazy(() => import("./pages/races/Odds"));

const RaceResult = React.lazy(() => import("./pages/races/RaceResult"));

const RaceCard = React.lazy(() => import("./pages/races/RaceCard"));

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<CommonLayout />} path="/">
        <Route
          index
          element={
            <React.Suspense fallback={<>...</>}>
              <Top />
            </React.Suspense>
          }
        />
        <Route
          element={
            <React.Suspense fallback={<>...</>}>
              <Top />
            </React.Suspense>
          }
          path=":date"
        />
        <Route path="races/:raceId">
          <Route
            element={
              <React.Suspense fallback={<>...</>}>
                <RaceCard />
              </React.Suspense>
            }
            path="race-card"
          />
          <Route
            element={
              <React.Suspense fallback={<>...</>}>
                <Odds />
              </React.Suspense>
            }
            path="odds"
          />
          <Route
            element={
              <React.Suspense fallback={<>...</>}>
                <RaceResult />
              </React.Suspense>
            }
            path="result"
          />
        </Route>
      </Route>
    </RouterRoutes>
  );
};

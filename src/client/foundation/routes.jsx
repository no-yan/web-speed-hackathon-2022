import React, { lazy } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";
import { Top } from "./pages/Top";
const Odds = lazy(() => import("./pages/races/Odds"));

const RaceResult = lazy(() => import("./pages/races/RaceResult"));

const RaceCard = lazy(() => import("./pages/races/RaceCard"));

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route
        element={
          // <Suspense>
          <CommonLayout />
          // </Suspense>
        }
        path="/"
      >
        <Route index element={<Top />} />
        <Route element={<Top />} path=":date" />
        <Route path="races/:raceId">
          <Route
            element={
              // <React.Suspense fallback={<>...</>}>
              <RaceCard />
              // </React.Suspense>
            }
            path="race-card"
          />
          <Route element={<Odds />} path="odds" />
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

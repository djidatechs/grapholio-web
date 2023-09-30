import {Route, Routes} from "react-router-dom";

import {Suspense,lazy} from "react";
import Loading from "./Pages/Loading.tsx";
const Introduction = lazy(() => import("./Pages/Documentation/Introduction.tsx"));
const GettingStarted = lazy(() => import("./Pages/Documentation/GettingStarted.tsx"));
const ManagingGraphs = lazy(() => import("./Pages/Documentation/ManagingGraphs.tsx"));
const PerformingOperations = lazy(() => import("./Pages/Documentation/PerformingOperations.tsx"));
const Scripting = lazy(() => import("./Pages/Documentation/Scripting.tsx"));
const NavbarOptions = lazy(() => import("./Pages/Documentation/NavbarOptions.tsx"));
const LimitationsAndFutureUpdates = lazy(() => import("./Pages/Documentation/LimitationsAndFutureUpdates.tsx"));


const Landing = lazy(() => import("./Pages/Landing.tsx"));
const Documentation = lazy(() => import("./Pages/Documentation.tsx"));
const SomethingWentWrong = lazy(() => import("./Pages/404.tsx"));
const Layout = lazy(() => import("./Pages/Application/Layout.tsx"));

function App()   {
        return (
       <Suspense fallback={<Loading  height={"h-screen"} />}>
           <Routes>

              <Route    path={"/"} element={<Landing/>}/>
              <Route    path={"/about"} element={<Landing/>}/>
               <Route    path={"application"} element={<Layout/>}/>
               <Route    path={"*"} element={<SomethingWentWrong/>}/>


               <Route    path={"/documentation"} element={<Documentation/>}>
                   <Route index element={<Introduction/>}/>
                   <Route path={"GettingStarted"} element={<GettingStarted/>}/>
                   <Route path={"ManagingGraphs"} element={<ManagingGraphs/>}/>
                   <Route path={"PerformingOperations"} element={<PerformingOperations/>}/>
                   <Route path={"Scripting"} element={<Scripting/>}/>
                   <Route path={"NavbarOptions"} element={<NavbarOptions/>}/>
                   <Route path={"LimitationsAndFutureUpdates"} element={<LimitationsAndFutureUpdates/>}/>

               </Route>



           </Routes>

      </Suspense>
  )
}
export default App



import {Route, Routes} from "react-router-dom";

import {Suspense,lazy} from "react";
import Loading from "./Pages/Loading.tsx";


const Landing = lazy(() => import("./Pages/Landing.tsx"));
const SomethingWentWrong = lazy(() => import("./Pages/404.tsx"));
const Layout = lazy(() => import("./Pages/Application/Layout.tsx"));
const Index = lazy(() => import("./Pages/Application/Index.tsx"));

function App()   {
        return (
       <Suspense fallback={<Loading/>}>
           <Routes>

              <Route    path={"/"} element={<Landing/>}/>
              <Route    path={"/about"} element={<Landing/>}/>

              <Route    path={"application"} element={<Layout/>}>
                  <Route index element={<Index/>}/>
              </Route>
               <Route    path={"*"} element={<SomethingWentWrong/>}/>

           </Routes>

      </Suspense>
  )
}
export default App

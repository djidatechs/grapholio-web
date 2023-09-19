import {Route, Routes} from "react-router-dom";
import Landing from "./Pages/Landing.tsx";
import SomethingWentWrong from "./Pages/404.tsx";
import Layout from "./Pages/Application/Layout.tsx";
import Index from "./Pages/Application/Index.tsx";
function App()   {
        return (
    <Routes>
      <Route    path={"/somethingwentwrong"} element={<SomethingWentWrong/>}/>
      <Route    path={"/"} element={<Landing/>}/>
      <Route    path={"/about"} element={<Landing/>}/>

      <Route    path={"application"} element={<Layout/>}>
          <Route index element={<Index/>}/>
      </Route>

    </Routes>
  )
}
export default App

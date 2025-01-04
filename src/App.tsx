import { Router, Route } from "@solidjs/router";
import './App.css'

import MainLayout from "@layouts/MainLayout";
import HomePage from "@pages/HomePage";
import SolidConceptsExamplesPage from "@pages/SolidConceptsExamplesPage";
import MapPage from "@pages/MapPage"
import AboutPage from "@pages/AboutPage";

function App() {

  return (
    <>
      <Router>
        <Route path="/" component={MainLayout}>
          <Route path="/" component={HomePage} />
          <Route path="/solid-concepts-examples" component={SolidConceptsExamplesPage}/>
          <Route path="/map" component={MapPage} />
          <Route path="/about" component={AboutPage} />
        </Route>
      </Router>
    </>
  )
}

export default App

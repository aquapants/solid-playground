import { Router, Route } from "@solidjs/router";

import MainLayout from "@layouts/MainLayout";
import HomePage from "@pages/HomePage";
import SolidConceptsExamplesPage from "@pages/SolidConceptsExamplesPage";
import PostPage from "@pages/PostPage";
import MapPage from "@pages/MapPage"
import AboutPage from "@pages/AboutPage";

// App component reserverd for handling application's routing
function App() {

  return (
    <>
      <Router>
        <Route path="/" component={MainLayout}>
          <Route path="/" component={HomePage} />
          <Route path="/solid-concepts-examples" component={SolidConceptsExamplesPage}/>
          <Route path="/post/:id" component={PostPage}/>
          <Route path="/map" component={MapPage} />
          <Route path="/about" component={AboutPage} />
        </Route>
      </Router>
    </>
  )
}

export default App

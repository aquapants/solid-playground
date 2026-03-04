import { Router, Route } from '@solidjs/router';

import MainLayout from '@layouts/MainLayout';
import WideLayout from '@layouts/WideLayout';
import HomePage from '@pages/HomePage';
import TutorialsPage from '@pages/TutorialPage';
import PostPage from '@pages/PostPage';
import MapPage from '@pages/MapPage';
import AboutPage from '@pages/AboutPage';

// App component reserverd for handling application's routing
function App() {
  return (
    <>
      <Router>
        <Route path="/" component={MainLayout}>
          <Route path="/" component={HomePage} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/map" component={MapPage} />
          <Route path="/about" component={AboutPage} />
        </Route>
        <Route path="/tutorial" component={WideLayout}>
          <Route path="/" component={TutorialsPage}></Route>
        </Route>
      </Router>
    </>
  );
}

export default App;

// import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import StudentList from './views/StudentList';
import AddStudent from './views/AddStudent';

function App() {
  return (
    <Router>

      <div >

        <h1>Students</h1>

        <Switch>
          <Route path="/student" exact>
            <StudentList />
          </Route>

          {/* <Route path="/addStudent" exact>
            <AddStudent />
          </Route> */}
        </Switch>

      </div>

    </Router>
  );
}

export default App;

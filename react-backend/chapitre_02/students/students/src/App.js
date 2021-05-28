
// import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import StudentList from './views/StudentList';
import AddStudent from './views/AddStudent';

function App() {
  return (
    <BrowserRouter>

       <div >

        <h1>Students</h1>

        <Switch>

          <Route path="/" exact component={StudentList}/>



          <Route path="/addstudent" exact>
            <AddStudent />
          </Route>

        </Switch>

      </div>

    </BrowserRouter>
  );
}

export default App;


// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import StudentList from './views/StudentList';
// import AddStudent from './views/AddStudent';

// function App() {
//   return (
//     <div >

//         <h1>Students</h1>
//       </div>
//   );
// }
// export default App;
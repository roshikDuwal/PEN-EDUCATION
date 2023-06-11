import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from "./pages/home/Home"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./app.scss";


import Teacherpanel from './Teacherpanel/Teacherpanel'
import TCourseone from "./Teacherpanel/teacherpages/tcourse/TCourseone"
import THomework1 from "./Teacherpanel/teacherpages/tcourse/thomework/THomework1"


import Studentpanel from './Studentpanel/Studentpanel'
import SCourseone from "./Studentpanel/studentpages/scourse/SCourseone"
import SHomework1 from "./Studentpanel/studentpages/scourse/shomework/SHomework1"

import { AnswerResult } from './Teacherpanel/answerresult/AnswerResult'
import ACourseone from "./Teacherpanel/answerresult/acourse/ACourseone"
import Ahomework from './Teacherpanel/answerresult/acourse/homeworkans/Ahomework';

import Error from "./pages/error/Error"
import Answer from './Teacherpanel/answerresult/acourse/homeworkans/studentlist/Answer';
import Result from './Studentpanel/result/result';
// import Login from './Login/Login'

const App = () => {
  return (
   <>
   <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route  path='/teacherpanel'>

          <Route index element={ <Teacherpanel/>}/>

          <Route path='answerresult'>
            <Route index element={<AnswerResult/>}/>
            <Route path='acourse'>
              <Route index element={<ACourseone/>}/>
              <Route  path=":unit_id">
                <Route index element={<Ahomework/>} />
                <Route path=':roll_no' element={<Answer/>}/>
              </Route>
            </Route>
          </Route>

          <Route  path='tcourse1'>
            <Route index  element={<TCourseone/>}/>
            <Route path=':unit_id' element={<THomework1/>}/>
          </Route>

        </Route>

        <Route  path='/studentpanel'>
          <Route index element={<Studentpanel/>}/>
          <Route  path='scourse1'>
            <Route index  element={<SCourseone/>}/>
            <Route path=':unit_id' element={< SHomework1 />}/>
          </Route>

          <Route path='result'>
            <Route index element={<Result/>}/>
          </Route>

        </Route>

        <Route path='*' element={<Error/>}/>
      </Routes>
   </Router>
   <ToastContainer/>
   </>
  )
}

export default App
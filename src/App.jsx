import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './home/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Teacherpanel from './Teacherpanel/Teacherpanel'
import TCourseone from "./Teacherpanel/teacherpages/tcourse/TCourseone"
import THomework1 from "./Teacherpanel/teacherpages/tcourse/thomework/THomework1"


import Studentpanel from './Studentpanel/Studentpanel'
import SCourseone from "./Studentpanel/studentpages/scourse/SCourseone"
import SHomework1 from "./Studentpanel/studentpages/scourse/shomework/SHomework1"
// import Login from './Login/Login'
import { AnswerResult } from './Teacherpanel/answerresult/AnswerResult'


const App = () => {
  return (
   <>
   <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/login' element={<Login/>}/> */}
        <Route  path='/teacherpanel'>
          <Route index element={ <Teacherpanel/>}/>
          <Route path='answerresult' element={<AnswerResult/>}/>
          <Route  path='tcourse1'>
            <Route index  element={<TCourseone/>}/>
            <Route path='thomework1' element={<THomework1/>}/>
          </Route>
        </Route>

        <Route  path='/studentpanel'>
          <Route index element={<Studentpanel/>}/>
          <Route  path='scourse1'>
            <Route index  element={<SCourseone/>}/>
            <Route path='shomework1' element={< SHomework1/>}/>
          </Route>
        </Route>
      </Routes>
   </Router>
   <ToastContainer/>
   </>
  )
}

export default App
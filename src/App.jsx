import { useEffect, useState } from 'react'
import './App.css'
import Description from "./components/Description/Description"
import Feedback from "./components/Feedback/Feedback"
import Options from './components/Options/Options'
import Notification from './components/Notification/Notification'

function App() { 
const [ratingData, setVotingData] = useState({
  good: 0,
  neutral: 0,
  bad: 0, 
})

useEffect(()=>{
const localStorageData = localStorage.getItem('ratingData')
if (localStorageData) {
setVotingData(JSON.parse(localStorageData))
}}, [])

useEffect(() => {
localStorage.setItem('ratingData', JSON.stringify(ratingData));
}, [ratingData]);

const updateFeedback = feedbackType => {
setVotingData(prev=> ({...prev, [feedbackType]: prev[feedbackType] + 1}))
}

const resetFeedback = () => {
setVotingData({good: 0, neutral: 0, bad: 0 })
}

const totalFeedback = ratingData.good + ratingData.neutral + ratingData.bad;
const goodReviews = ratingData.good + ratingData.neutral
const positiveReviews = Math.round((goodReviews / totalFeedback) * 100)

  return (
<>
  <Description></Description>
  <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={resetFeedback}></Options>
  { totalFeedback > 0
  ?<Feedback 
  good={ratingData.good}
  neutral={ratingData.neutral}
  bad={ratingData.bad}
  total={totalFeedback}
  positive={positiveReviews}
  ></Feedback>
  :<Notification></Notification>}
</>
  )
}

export default App

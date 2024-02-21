import { useEffect, useState, useRef } from 'react';
import './ModiPage.css';
import PageTitle from '../components/common/PageTitle';

const event= {
  name: 'Jogging',
  time: ["16:00", "17:00"],
  place: 'Banpo, Seoul',
  climate: 'cloudy',
}

const ModiPage = () => {
  const [modiMode, setModiMode] = useState<string>("Activity");
  const modiEventActivityRef = useRef(null);


  return (
    <div id="modiPage" className="page">
      <PageTitle pageTitleMode="MODI" modiMode={modiMode}/>
      <div id="modiEvent">
        <div id="modiEventActivity" className={`modiEventElem ${modiMode==="Activity"?"clicked":""}`} onClick={()=>setModiMode("Activity")}>Jogging</div>
        <div id="modiEventLocation" className={`modiEventElem ${modiMode==="Location"?"clicked":""}`} onClick={()=>setModiMode("Location")}>Banpo, Seoul</div>
        <div id="modiEventTime" className={`modiEventElem ${modiMode==="Time"?"clicked":""}`} onClick={()=>setModiMode("Time")}>
          <div className="eventTime">Today</div>
          <div className="eventTime">16:00</div>
          <div className="eventTime">17:00</div>
        </div>
      </div>

    </div>
  );
}

export default ModiPage;
import React from 'react';
import { useRecoilState } from 'recoil';
import './EventPage.css';
import PageTitle from '../components/common/PageTitle';
import { showModiState } from '../utils/atom';

const EventPage = () => {
    // const [modiMode, setModiMode] = useRecoilState(showModiState);
    return (
        <div id="eventPage" className="page">
            <PageTitle pageTitleMode="EVENT"/>
        </div>
    )
}

export default EventPage;
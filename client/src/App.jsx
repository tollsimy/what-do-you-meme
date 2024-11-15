import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { AppHeader, AppFooter } from './components/AppHF.jsx'
import PageNotFoundLayout from './components/PageNotFoundLayout.jsx'
import { LoginPageLayout, SignupPageLayout } from './components/LoginPageLayout.jsx'
import MainPageLayout from './components/MainPageLayout.jsx'
import { ProfilePageLayout, ProfileIndexLayout, ProfileGamesLayout, ProfileGamesDetailLayout } from './components/ProfilePageLayout.jsx'
import { PlayPageLayout, PlayIndexLayout, PlayStatsLayout, PlayRoundLayout } from './components/PlayPageLayout.jsx'
import { UserProvider } from './contexts/userContext.jsx'

function App() {

    return (
        <UserProvider>
            <AppHeader />
            <div style={{ paddingBottom: '50px' }}>
                <Routes >
                    <Route path="/" element={<MainPageLayout />} />
                    <Route path="login" element={<LoginPageLayout />} />
                    <Route path="signup" element={<SignupPageLayout />} />
                    <Route
                        path="profile"
                        element={<ProfilePageLayout />}>
                        <Route index
                            element={<ProfileIndexLayout />} />
                        <Route path="games"
                            element={<ProfileGamesLayout />} />
                        <Route path="games/:gameId"
                            element={<ProfileGamesDetailLayout />} />
                    </Route>
                    <Route
                        path="play"
                        element={<PlayPageLayout />}>
                        <Route index
                            element={<PlayIndexLayout />} />
                        <Route path=":round"
                            element={<PlayRoundLayout />} />
                        <Route path="stats"
                            element={<PlayStatsLayout />} />
                    </Route>
                    <Route path="*" element={<PageNotFoundLayout />} />
                </Routes>
            </div>
            <AppFooter />
        </UserProvider>
    )
}

export default App

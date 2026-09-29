import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureSection from './components/FeatureSection'
import Footer from './components/Footer'

import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Skills from './components/Skills'
import Teachers from './components/Teachers'
import TeacherProfile from './components/TeacherProfile'
import LearningRequests from './components/LearningRequests'
import Connections from './components/Connections'
import Reviews from './components/Reviews'
import Profile from './components/Profile'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'


function LandingPage() {

  return (
    <>
      <Navbar title="SkillBridge" />

      <main>
        <Hero />
        <FeatureSection />
      </main>

      <Footer />
    </>
  )
}


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================= */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            PROTECTED PAGES
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />


        {/* =========================
            TEACHER PROFILE

            Example:
            /teacher-profile/3
            /teacher-profile/4
            /teacher-profile/5
        ========================= */}

        <Route
          path="/teacher-profile/:id"
          element={
            <ProtectedRoute>
              <TeacherProfile />
            </ProtectedRoute>
          }
        />


        <Route
          path="/learning-requests"
          element={
            <ProtectedRoute>
              <LearningRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/connections"
          element={
            <ProtectedRoute>
              <Connections />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}


export default App
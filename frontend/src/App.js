import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Nutrition from './pages/Nutrition';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/" element={<Login />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/workouts"
                                element={
                                    <ProtectedRoute>
                                        <Workouts />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/nutrition"
                                element={
                                    <ProtectedRoute>
                                        <Nutrition />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/progress"
                                element={
                                    <ProtectedRoute>
                                        <Progress />
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
                    </main>
                    <Toaster position="top-right" />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
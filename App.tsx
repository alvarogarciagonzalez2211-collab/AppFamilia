import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AssignTasks from './pages/AssignTasks';
import TaskList from './pages/TaskList';
import Rewards from './pages/Rewards';
import CreateTask from './pages/CreateTask';
import CreateReward from './pages/CreateReward';
import DeleteTask from './pages/DeleteTask';
import DeleteReward from './pages/DeleteReward';
import FamilySettings from './pages/FamilySettings';
import MyFamilies from './pages/MyFamilies';
import EditProfile from './pages/EditProfile';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assign-tasks" element={<AssignTasks />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/create-reward" element={<CreateReward />} />
          <Route path="/delete-task" element={<DeleteTask />} />
          <Route path="/delete-reward" element={<DeleteReward />} />
          <Route path="/family-settings" element={<FamilySettings />} />
          <Route path="/my-families" element={<MyFamilies />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
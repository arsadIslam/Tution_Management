import React, { useState } from 'react';
import { Home, User, ArrowLeft, Phone, MessageCircle } from 'lucide-react';

const Tution_Management = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, studentList, studentProfile
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Sample student data
  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      class: "Class 10-A",
      feeDueMonths: 2,
      guardianName: "Mr. Suresh Sharma",
      whatsappNumber: "+91 98765 43210",
      gender: "Male"
    },
    {
      id: 2,
      name: "Priya Patel",
      class: "Class 9-B",
      feeDueMonths: 1,
      guardianName: "Mrs. Meera Patel",
      whatsappNumber: "+91 87654 32109",
      gender: "Female"
    },
    {
      id: 3,
      name: "Arjun Kumar",
      class: "Class 11-A",
      feeDueMonths: 3,
      guardianName: "Mr. Rajesh Kumar",
      whatsappNumber: "+91 76543 21098",
      gender: "Male"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      class: "Class 8-C",
      feeDueMonths: 0,
      guardianName: "Mrs. Lakshmi Reddy",
      whatsappNumber: "+91 65432 10987",
      gender: "Female"
    },
    {
      id: 5,
      name: "Vikram Singh",
      class: "Class 12-B",
      feeDueMonths: 1,
      guardianName: "Mr. Harpreet Singh",
      whatsappNumber: "+91 54321 09876",
      gender: "Male"
    }
  ];

  const handleCardClick = () => {
    setCurrentView('studentList');
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setCurrentView('studentProfile');
  };

  const handleBackToList = () => {
    setCurrentView('studentList');
    setSelectedStudent(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedStudent(null);
  };

  const renderDashboard = () => (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        <div 
          onClick={handleCardClick}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white cursor-pointer transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Total Students</h3>
              <p className="text-3xl font-bold">{students.length}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <User size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentList = () => (
    <div className="p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <button 
            onClick={handleBackToDashboard}
            className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Students List</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => handleStudentClick(student)}
              className="p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">{student.name}</h3>
                  <p className="text-gray-600 mt-1">{student.class}</p>
                  <p className="text-sm text-orange-600 mt-1 font-medium">
                    {student.feeDueMonths > 0 
                      ? `${student.feeDueMonths} month${student.feeDueMonths > 1 ? 's' : ''} fee due`
                      : 'No dues'
                    }
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudentProfile = () => (
    <div className="p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <button 
            onClick={handleBackToList}
            className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Student Profile</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <User size={40} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{selectedStudent?.name}</h3>
              <p className="text-gray-600 text-lg">{selectedStudent?.class}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Personal Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-800">{selectedStudent?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class:</span>
                  <span className="font-medium text-gray-800">{selectedStudent?.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium text-gray-800">{selectedStudent?.gender}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Guardian Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Guardian Name:</span>
                  <span className="font-medium text-gray-800">{selectedStudent?.guardianName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">WhatsApp:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">{selectedStudent?.whatsappNumber}</span>
                    <div className="flex space-x-1">
                      <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                        <MessageCircle size={16} />
                      </button>
                      <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                        <Phone size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <h4 className="font-semibold text-orange-700 mb-2">Fee Status</h4>
              <div className="flex justify-between">
                <span className="text-orange-600">Due Months:</span>
                <span className="font-bold text-orange-800">
                  {selectedStudent?.feeDueMonths > 0 
                    ? `${selectedStudent?.feeDueMonths} month${selectedStudent?.feeDueMonths > 1 ? 's' : ''}`
                    : 'No dues'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
        
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mr-4">
            <User size={40} className="text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Admin User</h3>
            <p className="text-gray-600">School Administrator</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-700 mb-3">Account Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-800">admin@school.edu</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Role:</span>
                <span className="font-medium text-gray-800">Administrator</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">School:</span>
                <span className="font-medium text-gray-800">ABC International School</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
              Edit Profile
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              Settings
            </button>
            <button className="w-full bg-red-100 text-red-700 py-3 px-4 rounded-xl font-semibold hover:bg-red-200 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Student Management</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {activeTab === 'home' && (
          <>
            {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'studentList' && renderStudentList()}
            {currentView === 'studentProfile' && renderStudentProfile()}
          </>
        )}
        {activeTab === 'profile' && renderProfileTab()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex">
          <button
            onClick={() => {
              setActiveTab('home');
              setCurrentView('dashboard');
              setSelectedStudent(null);
            }}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 transition-colors ${
              activeTab === 'home'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('profile');
              setCurrentView('dashboard');
              setSelectedStudent(null);
            }}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 transition-colors ${
              activeTab === 'profile'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tution_Management;
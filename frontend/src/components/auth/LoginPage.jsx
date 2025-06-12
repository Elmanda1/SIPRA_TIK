import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, AlertTriangle, RefreshCw, X, Settings, BookOpen, FileText, BarChart3, Users, Home, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/SIPRATIK.png' ;
import { useAuth } from '../../context/AuthContext'; // Update path

// Alert Modal Component
const AlertModal = ({ 
  isOpen, 
  onClose, 
  message = "Password salah. Silakan coba lagi.",
  attemptCount = 0,
  maxAttempts = 5,
  onResetPassword
}) => {
  if (!isOpen) return null;

  const isMaxAttemptReached = attemptCount >= maxAttempts;
  const remainingAttempts = maxAttempts - attemptCount;

  const handleResetPassword = () => {
    if (onResetPassword) {
      onResetPassword();
    }
  };

  const getTitle = () => {
    if (isMaxAttemptReached) {
      return "Akun Terblokir";
    }
    return "Pemberitahuan";
  };

  const getMessage = () => {
    if (isMaxAttemptReached) {
      return "Anda telah mencoba login sebanyak 3 kali dengan password yang salah. Silakan reset password Anda untuk melanjutkan.";
    }
    return `${message} Sisa percobaan: ${remainingAttempts}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 transform transition-all">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              isMaxAttemptReached ? 'bg-orange-100' : 'bg-red-100'
            }`}>
              {isMaxAttemptReached ? (
                <RefreshCw className="w-5 h-5 text-orange-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{getTitle()}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-50 bg-white rounded-full outline outline-2 outline-gray-200 focus:outline-none transition-colors"
          >
            <X className="w-8 h-8 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center">
            <div className={`mx-auto flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isMaxAttemptReached ? 'bg-orange-100' : 'bg-red-100'
            }`}>
              {isMaxAttemptReached ? (
                <RefreshCw className="w-8 h-8 text-orange-600" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {getMessage()}
            </h4>
          </div>
        </div>

        <div className="flex items-center justify-end px-6 py-4 bg-gray-50 rounded-b-xl space-x-3">
          {isMaxAttemptReached ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                Reset Password
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Tutup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Login Page Component
const LoginPage = () => {
  document.title = "Login";
  const navigate = useNavigate();
  const { login, credentials } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Map role dari form ke role system
    const systemRole = selectedRole === 'mahasiswa' ? 'user' : selectedRole;
    
    const user = credentials.find(
      cred => cred.username === username && 
             cred.password === password &&
             cred.role === systemRole
    );

    if (user) {
      login(user);
      // Navigasi sesuai role system
      navigate(systemRole === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      if (newAttempts >= 3) setIsBlocked(true);
      setShowAlert(true);
    }
  };

  const handleResetPassword = () => {
    navigate('/reset-password'); // Tambahkan navigasi ke halaman reset password
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(0deg, #EAF1F8  30%,rgb(210, 250, 255) 100%)"
      }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10" />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '35px 35px'
        }}
      />

      {/* Main Content */}
      <div className="relative w-full max-w-[600px] mx-auto px-6"> {/* Increased width and padding */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full"> {/* Increased padding */}
          {/* Logo & Title */}
          <div className="text-center mb-10"> {/* Increased margin */}
         <img
              src={logoImg}
              alt="Logo"
              className="w-100 h-30 justify-center"
         />
            <p className="text-lg text-gray-700 mt-5">Sistem Informasi Peminjaman Sarana dan Prasarana TIK</p> {/* Increased text size */}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Login Sebagai
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="block w-full pl-4 pr-8 py-4 text-lg bg-white border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
                disabled={isBlocked}
              >
                <option value="">Pilih Role</option>
                <option value="admin">Admin</option>
                <option value="mahasiswa">Mahasiswa</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 text-lg bg-white border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Masukkan username"
                  required
                  disabled={isBlocked}
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-10 py-4 text-lg border bg-white border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Masukkan password"
                  required
                  disabled={isBlocked}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isBlocked}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {loginAttempts > 0 && loginAttempts < 3 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <p className="text-xs text-yellow-800">
                  Peringatan: {loginAttempts}/3 percobaan login gagal
                </p>
              </div>
            )}

            {isBlocked && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-xs text-red-800">
                  Akun terblokir. Silakan reset password untuk melanjutkan.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isBlocked}
              className={`w-full py-3 px-4 min-h-16 text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg ${
                isBlocked 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : ' bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isBlocked ? 'Akun Terblokir' : 'Login'}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleResetPassword} // Ganti dengan fungsi baru
                className="text-blue-600 hover:text-blue-800 text-xs font-medium hover:underline transition-colors"
              >
                Lupa Password? Reset di sini
              </button>
            </div>
          </form> 
        </div>
      </div>

      <AlertModal
        isOpen={showAlert}
        onClose={handleCloseAlert}
        message="Username atau password salah. Silakan coba lagi."
        attemptCount={loginAttempts}
        maxAttempts={3}
        onResetPassword={handleResetPassword}
      />
    </div>
  );
};

export default LoginPage;
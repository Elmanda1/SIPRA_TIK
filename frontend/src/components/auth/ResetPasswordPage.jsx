import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, User } from 'lucide-react';
import axios from 'axios';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password, 4: Success
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [selectedRole, setSelectedRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [validCode, setValidCode] = useState(''); // Tambahkan state baru

  // Ambil daftar role dari backend
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/auth/roles`)
      .then(res => setRoles(res.data.roles))
      .catch(() => setRoles(['admin', 'mahasiswa']));
  }, []);

  // Timer for resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Kirim kode verifikasi ke backend
  const handleSendCode = async () => {
    setError('');
    setIsLoading(true);
    try {
      if (!selectedRole) throw new Error('Silakan pilih role terlebih dahulu');
      if (!username) throw new Error('Username harus diisi');

      // Kirim request ke backend
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        username,
        role: selectedRole
      });

      // Simpan kode verifikasi dari backend (untuk dev/testing)
      if (res.data.resetToken) setValidCode(res.data.resetToken);

      setStep(2);
      setCountdown(60);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Verifikasi kode yang dimasukkan
  const handleVerifyCode = async () => {
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (verificationCode === validCode) {
        setStep(3);
        setError('');
      } else {
        setError('Kode verifikasi tidak valid');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResetPassword = async () => {
    setError('');

    if (newPassword.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password tidak cocok');
      return;
    }

    setIsLoading(true);

    try {
      // Kirim request ke backend
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password/confirm`, {
        username,
        role: selectedRole,
        resetToken: validCode,
        newPassword,
      });

      setStep(4); // Success
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (countdown === 0) {
      setCountdown(60);
      alert('Kode verifikasi baru telah dikirim');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login', { replace: true }); // Tambahkan replace: true untuk mengganti history
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {step > i ? <CheckCircle className="w-5 h-5" /> : i}
          </div>
          {i < 3 && (
            <div className={`w-12 h-1 mx-2 ${
              step > i ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderUsernameStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-600">
          Masukkan username dan pilih role Anda untuk menerima kode verifikasi
        </p>
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-base font-medium text-gray-700 mb-2">
          Reset Password Untuk Role
        </label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          required
          className="block w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Pilih Role</option>
          <option value="admin">Admin</option>
          <option value="mahasiswa">Mahasiswa</option>
          <option value="dosen">Dosen</option>
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
            onChange={(e) => {
              setUsername(e.target.value);
              setError(''); // Clear error when user types
            }}
            className={`block w-full pl-12 pr-4 py-3 text-lg bg-white border 
              ${error ? 'border-red-300' : 'border-gray-300'} 
              rounded-xl text-black focus:outline-none focus:ring-2 
              ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'} 
              focus:border-transparent`}
            placeholder="Masukkan username Anda"
            required
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      <button
        onClick={handleSendCode}
        disabled={!username || !selectedRole || isLoading}
        className="w-full py-4 px-4 bg-blue-600 text-white rounded-xl 
          font-medium text-lg hover:bg-blue-700 focus:outline-none 
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
          disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Mengirim...' : 'Kirim Kode Verifikasi'}
      </button>
    </div>
  );

  const renderCodeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifikasi Kode</h2>
        <p className="text-gray-600">
          Kami telah mengirim kode verifikasi ke <br />
          <span className="font-medium">{username}</span>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kode Verifikasi
        </label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="block w-full px-3 py-3 border bg-white border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
          placeholder="123456"
          maxLength={6}
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={handleVerifyCode}
        disabled={verificationCode.length !== 6 || isLoading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Memverifikasi...' : 'Verifikasi Kode'}
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Tidak menerima kode?</p>
        <button
          onClick={handleResendCode}
          disabled={countdown > 0}
          className="bg-white border-gray-300 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {countdown > 0 ? `Kirim ulang dalam ${countdown}s` : 'Kirim ulang kode'}
        </button>
      </div>
    </div>
  );

  const renderPasswordStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Baru</h2>
        <p className="text-gray-600">
          Buat password baru yang aman untuk akun Anda
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password Baru
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 border bg-white border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan password baru"
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showNewPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Konfirmasi Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 border bg-white border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Konfirmasi password baru"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-700">
          <strong>Syarat password:</strong>
        </p>
        <ul className="text-sm text-blue-600 mt-1 ml-4 list-disc">
          <li>Minimal 6 karakter</li>
          <li>Kombinasi huruf dan angka disarankan</li>
          <li>Hindari password yang mudah ditebak</li>
        </ul>
      </div>

      <button
        onClick={handleResetPassword}
        disabled={!newPassword || !confirmPassword || isLoading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Menyimpan...' : 'Reset Password'}
      </button>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Berhasil Direset!</h2>
        <p className="text-gray-600 mb-6">
          Password Anda telah berhasil diperbarui. <br />
          Silakan login dengan password baru Anda.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-700">
          <strong>Tip Keamanan:</strong> Simpan password Anda di tempat yang aman dan jangan berbagi dengan orang lain.
        </p>
      </div>

      <button
        onClick={handleBackToLogin}
        className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
      >
        Kembali ke Login
      </button>
    </div>
  );

  // Update return statement di ResetPasswordPage
  return (
    <div className="min-h-screen w-screen flex items-center justify-center overflow-hidden"
          style={{
        background: "linear-gradient(0deg, #EAF1F8  30%,rgb(210, 250, 255) 100%)"}}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10" />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Content */}
      <div className="relative w-full max-w-[600px] mx-auto px-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full">
          {/* Back Button */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : handleBackToLogin()}
              className="flex items-center bg-white border-gray-300 text-gray-600 hover:text-gray-800 transition-colors text-lg focus:outline-none"
            >
              <ArrowLeft className="w-6 h-6 mr-3" />
              <span className="font-medium">
                {step > 1 ? 'Kembali' : 'Ke Login'}
              </span>
            </button>
          </div>
          {step < 4 && renderStepIndicator()}
          {step === 1 && renderUsernameStep()}
          {step === 2 && renderCodeStep()}
          {step === 3 && renderPasswordStep()}
          {step === 4 && renderSuccessStep()}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

export async function login(req, res) {
  try {
    const { username, password, role } = req.body; // pastikan role diambil dari body!
    const result = await authService.login({ username, password, role, req });
    res.json({ status: 'success', data: { user: result.user, accessToken: result.accessToken, refreshToken: result.refreshToken } });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
}
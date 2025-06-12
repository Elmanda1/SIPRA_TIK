import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Mock profile image
const profileImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23e5e7eb'/%3E%3Ccircle cx='40' cy='30' r='12' fill='%23374151'/%3E%3Cpath d='M20 65c0-11 9-20 20-20s20 9 20 20' fill='%23374151'/%3E%3C/svg%3E";

const ForgotPasswordPopup = ({ isOpen, onClose, isFromProfile = false }) => {
  const { user, updatePassword, credentials } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(isFromProfile && user ? user.email : '');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [selectedRole, setSelectedRole] = useState(isFromProfile && user ? user.role : '');

  const validCode = '123456';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setEmail(isFromProfile && user ? user.email : '');
      setSelectedRole(isFromProfile && user ? user.role : '');
      setVerificationCode('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setCountdown(0);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen, isFromProfile, user]);

  const handleSendCode = async () => {
    setError('');
    setIsLoading(true);

    try {
      // If from profile, skip role validation since we already know the user
      if (!isFromProfile && !selectedRole) {
        throw new Error('Silakan pilih role terlebih dahulu');
      }

      // Simulasi pengecekan email dengan delay lebih singkat
      await new Promise(resolve => setTimeout(resolve, 500));

      const userExists = credentials.find(
        cred => cred.email === email && (isFromProfile || cred.role === selectedRole)
      );

      if (userExists) {
        setStep(2);
        setCountdown(60);
        setError('');
      } else {
        throw new Error(isFromProfile ? 'Terjadi kesalahan' : 'Email tidak ditemukan untuk role yang dipilih');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      // Karena dari profile, tidak perlu selectedRole
      updatePassword(email, newPassword);
      
      setTimeout(() => {
        setStep(4);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Gagal mengupdate password');
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (countdown === 0) {
      setCountdown(60);
      alert('Kode verifikasi baru telah dikirim');
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
            step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {step > i ? <CheckCircle className="w-3 h-3" /> : i}
          </div>
          {i < 3 && (
            <div className={`w-8 h-1 mx-1 ${
              step > i ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderEmailStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Reset Password</h3>
        <p className="text-sm text-gray-600">
          {isFromProfile 
            ? 'Masukkan email untuk menerima kode verifikasi'
            : 'Masukkan email dan pilih role untuk menerima kode verifikasi'
          }
        </p>
      </div>

      {!isFromProfile && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reset Password Untuk Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Pilih Role</option>
            <option value="admin">Admin</option>
            <option value="mahasiswa">Mahasiswa</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isFromProfile}
            className={`block w-full pl-10 pr-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isFromProfile ? 'bg-gray-50 cursor-not-allowed' : ''
            }`}
            placeholder="Masukkan email Anda"
            required
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={handleSendCode}
        disabled={!email || (!isFromProfile && !selectedRole) || isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Mengirim...' : 'Kirim Kode Verifikasi'}
      </button>
    </div>
  );

  const renderCodeStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
          <Mail className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Verifikasi Kode</h3>
        <p className="text-sm text-gray-600">
          Kode verifikasi telah dikirim ke <br />
          <span className="font-medium">{email}</span>
        </p>
        <p className="text-xs text-blue-600 mt-2">Demo: gunakan kode "123456"</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kode Verifikasi
        </label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="block w-full px-3 py-2 border bg-white border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-mono tracking-widest"
          placeholder="123456"
          maxLength={6}
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={handleVerifyCode}
        disabled={verificationCode.length !== 6 || isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Memverifikasi...' : 'Verifikasi Kode'}
      </button>

      <div className="text-center">
        <p className="text-xs text-gray-600 mb-1">Tidak menerima kode?</p>
        <button
          onClick={handleResendCode}
          disabled={countdown > 0}
          className="text-blue-600 hover:text-blue-800 text-xs font-medium hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {countdown > 0 ? `Kirim ulang dalam ${countdown}s` : 'Kirim ulang kode'}
        </button>
      </div>
    </div>
  );

  const renderPasswordStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <Lock className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Password Baru</h3>
        <p className="text-sm text-gray-600">
          Buat password baru yang aman untuk akun Anda
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password Baru
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border bg-white border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Masukkan password baru"
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showNewPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Konfirmasi Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border bg-white border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Konfirmasi password baru"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-700 font-medium mb-1">Syarat password:</p>
        <ul className="text-xs text-blue-600 ml-3 list-disc space-y-1">
          <li>Minimal 6 karakter</li>
          <li>Kombinasi huruf dan angka disarankan</li>
        </ul>
      </div>

      <button
        onClick={handleResetPassword}
        disabled={!newPassword || !confirmPassword || isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Menyimpan...' : 'Reset Password'}
      </button>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-4 text-center">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Password Berhasil Direset!</h3>
        <p className="text-sm text-gray-600 mb-4">
          Password Anda telah berhasil diperbarui.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <p className="text-xs text-green-700">
          <strong>Tip:</strong> Simpan password Anda di tempat yang aman.
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
      >
        Selesai
      </button>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {step < 4 && renderStepIndicator()}
          {step === 1 && renderEmailStep()}
          {step === 2 && renderCodeStep()}
          {step === 3 && renderPasswordStep()}
          {step === 4 && renderSuccessStep()}
        </div>
      </div>
    </div>
  );
};

const ProfileContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-gray-500">Please login to view profile</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center w-full min-h-[80vh] py-10 overflow-y-auto">
        <div className='flex flex-row items-start justify-start w-full max-w-4xl'>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">My Profile</h2>
        </div>
        <div className="bg-white/30 bg-opacity-50 backdrop-blur-sm border rounded-xl shadow-sm w-full max-w-4xl p-8">
          {/* Header */}
          <div className="flex items-center border-b pb-4 mb-6 ml-6">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mr-4 overflow-hidden">
              <img
                src={user?.foto}
                alt="Profile"
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
            <div>
              <div className="font-bold text-2xl text-gray-900">{user.name}</div>
              {user.nim && <div className="text-lg text-gray-600">{user.nim}</div>}
              {user.class && <div className="text-lg text-gray-600">{user.class}</div>}
            </div>
          </div>

          {/* Personal Information */}
          <div className="border rounded-xl p-6 mb-8 bg-white">
            <div className="text-xl font-semibold text-gray-700 mb-4">Personal Information</div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8">
              <div className='text-lg text-black'>
                <span className="font-semibold">First name</span><br />
                {user.name?.split(' ')[0] || 'N/A'}
              </div>
              <div className='text-lg text-black'>
                <span className="font-semibold">Last name</span><br />
                {user.name?.split(' ').slice(1).join(' ') || 'N/A'}
              </div>
              {user.phone && (
                <div className='text-lg text-black'>
                  <span className="font-semibold">Phone</span><br />
                  {user.phone}
                </div>
              )}
              {user.programStudi && (
                <div className='text-lg text-black'>
                  <span className="font-semibold">Program Studi</span><br />
                  {user.programStudi}
                </div>
              )}
              {user.alamat && (
                <div className='text-lg text-black'>
                  <span className="font-semibold">Alamat</span><br />
                  {user.alamat}
                </div>
              )}
              {user.kota && (
                <div className='text-lg text-black'>
                  <span className="font-semibold">Kota</span><br />
                  {user.kota}
                </div>
              )}
              {user.provinsi && (
                <div className='text-lg text-black'>
                  <span className="font-semibold">Provinsi</span><br />
                  {user.provinsi}
                </div>
              )}
            </div>
          </div>

          {/* Account Information */}
          <div className="border rounded-xl p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-semibold text-gray-700">Account Information</span>
              <button
                className="text-sm text-gray-600 border mr-3 px-2 py-1 rounded hover:bg-gray-100 flex items-center gap-1 focus:outline-none bg-white"
                onClick={() => setShowForgotPasswordPopup(true)}
                type="button"
              >
                Reset Password
              </button>
            </div>
            <div className='grid grid-cols-2 gap-x-5 gap-y-8'>
              <div className="text-lg mb-2 text-black">
                <span className="font-semibold">Role</span><br />
                {user.role}
              </div>
              
              <div className="text-lg text-black flex items-center gap-2">
                <div>
                  <span className="font-semibold">Password</span><br />
                  <span className='flex flex-row items-center'>
                    {showPassword ? user.password : '●●●●●●●●●'}
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 text-sm border rounded hover:bg-gray-100 flex items-center focus:outline-none"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                      tabIndex={0}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </span>
                </div>
              </div>

              <div className="text-lg mb-2 text-black">
                <span className="font-semibold">Email</span><br />
                {user.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Popup - with isFromProfile prop */}
      <ForgotPasswordPopup 
        isOpen={showForgotPasswordPopup}
        onClose={() => setShowForgotPasswordPopup(false)}
        isFromProfile={true}
      />
    </>
  );
};

export default ProfileContent;
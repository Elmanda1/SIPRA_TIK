import React, { useState, useEffect, createContext, useContext } from 'react';
import { Eye, EyeOff, Mail, Lock, CheckCircle, AlertCircle, X } from 'lucide-react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState([
    { 
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      email: 'admin@pnj.ac.id',
      name: 'Administrator'
    },
    { 
      username: 'RafifArka',
      password: 'user1',
      foto: '/src/assets/profile.jpg',
      role: 'user',
      email: 'Muhammad.Rafif.Dwiarka.tik24@stu.pnj.ac.id',
      name: 'Muhammad Rafif Dwarka',
      nim: '2407411078',
      class: 'TI 2C',
      phone: '0821-1302-0861',
      programStudi: 'Sarjana Terapan - Teknik Informatika',
      alamat: 'Puri Depok mas blok L no 15',
      kota: 'Depok',
      provinsi: 'Jawa Barat'
    },
    { 
      username: 'Falih',
      password: 'user2',
      foto: '/src/assets/falih.png',
      role: 'user',
      email: 'Falih.Elmanda.Ghaisan.tik24@stu.pnj.ac.id',
      name: 'Falih Elmanda Ghaisan',
      nim: '2407411073',
      class: 'TI 2C',
      phone: '0851-5686-3267',
      programStudi: 'Sarjana Terapan - Teknik Informatika',
      alamat: 'Jl. Tegal Parang Selatan V No.43 RT/RW 005/007',
      kota: 'Jakarta Selatan',
      provinsi: 'DKI Jakarta'
    },
    { 
      username: 'Bernard',
      password: 'user3',
      foto: '/src/assets/bernat.jpg',
      role: 'user',
      email: 'Hari.Bernardo.tik24@stu.pnj.ac.id',
      name: 'Hari Bernardo',
      nim: '2407411067',
      class: 'TI 2C',
      phone: '0813-2465-3120',
      programStudi: 'Sarjana Terapan - Teknik Informatika',
      alamat: 'Jl. Nusa Indah V No. 6 Beji Timur, KOTA DEPOK, BEJI, JAWA BARAT, ID, 16422 Beji Kota Depok Jawa Barat 16422',
      kota: 'Depok',
      provinsi: 'Jawa Barat'
    },
    { 
      username: 'Aurakha',
      password: 'user4',
      foto: '/src/assets/raka.jpg',
      role: 'user',
      email: 'Muhammad.Aurakha.Ghazy.Zackhary.tik24@stu.pnj.ac.id',
      name: 'Muhammad Aurakha Ghazy Zackhary',
      nim: '2407411069',
      class: 'TI 2C',
      phone: '0851-6159-9568',
      programStudi: 'Sarjana Terapan - Teknik Informatika',
      alamat: 'Jalan Mandor Ety No.11A Kelurahan Tanah Baru Kecamatan Beji RT 01/03, Kota Depok, Jawa Barat',
      kota: 'Depok',
      provinsi: 'Jawa barat'
    },
    { 
      username: 'Radenmas',
      password: 'user5',
      foto: '/src/assets/fidel.jpg',
      role: 'user',
      email: 'Raden.Mas.Fidel.Khalid.Ramadhan.tik24@stu.pnj.ac.id',
      name: 'Raden Mas Fidel Khalid Ramadhan',
      nim: '2407411071',
      class: 'TI 2C',
      phone: '0812-1290-1247',
      programStudi: 'Sarjana Terapan - Teknik Informatika',
      alamat: 'Jl.H. Taiman No 1 Rt3/Rw2 Kel Gedong Kec Pasar Rebo Jakarta Timur',
      kota: 'Jakarta Timur',
      provinsi: 'DKI Jakarta'
    }
  ]);

  const [user, setUser] = useState(() => {
    // Set default user for demo purposes
    const defaultUser = credentials.find(cred => cred.role === 'user');
    return defaultUser;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set true for demo

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updatePassword = (email, newPassword, selectedRole = null) => {
    // Log untuk debugging
    console.log('Updating password:', { email, newPassword, selectedRole });
    
    setCredentials(prev => {
      const updated = prev.map(cred => {
        if (selectedRole) {
          return (cred.email === email && cred.role === selectedRole) 
            ? { ...cred, password: newPassword } 
            : cred;
        } else {
          return cred.email === email ? { ...cred, password: newPassword } : cred;
        }
      });
      
      console.log('Updated credentials:', updated);
      return updated;
    });

    // Update current user jika yang diubah adalah password user yang sedang login
    if (user && user.email === email) {
      console.log('Updating current user password');
      setUser(prev => ({ ...prev, password: newPassword }));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      isAuthenticated,
      login,
      logout,
      credentials, // Pastikan credentials diexpose
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
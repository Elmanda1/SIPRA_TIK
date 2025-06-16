import React, { useState,useEffect } from 'react';
import { useTheme } from '../../context/SettingsContext';
import { 
  Settings, 
  Bell, 
  AlertCircle, 
  Mail, 
  Eye,
  Save,
  RotateCcw
} from 'lucide-react';

const AdminSettings = () => {
  const { settings: contextSettings, updateSettings, themeClasses, isDark } = useTheme();
  const [activeSettingTab, setActiveSettingTab] = useState('general');
  const [settings, setSettings] = useState(contextSettings);

  const settingTabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: AlertCircle },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'appearance', name: 'Appearance', icon: Eye }
  ];

  const handleSettingChange = (category, key, value) => {
        const newSettings = {
        ...settings,
        [category]: {
          ...settings[category],
          [key]: value
        }
      };

    
        setSettings(newSettings);
        updateSettings(category, key, value); // Update context immediately
      };

        useEffect(() => {
        setSettings(contextSettings);
      }, [contextSettings]);

  const handleResetSettings = () => {
    if (confirm('Apakah Anda yakin ingin mereset semua pengaturan?')) {
      // Default settings dengan tema light
      const defaultSettings = {
        general: {
          siteName: 'SIPRA TIK',
          siteDescription: 'Dashboard untuk mengelola peminjaman sarana dan prasarana PNJ jurusan TIK',
          language: 'id',
          timezone: 'Asia/Jakarta',
          dateFormat: 'DD/MM/YYYY',
          currency: 'IDR'
        },
        notifications: {
          emailNotifications: true,
          pushNotifications: true,
          smsNotifications: false,
          orderNotifications: true,
          stockAlerts: true,
          systemUpdates: false
        },
        security: {
          twoFactorAuth: false,
          sessionTimeout: '30',
          passwordExpiry: '90',
          loginAttempts: '5',
          ipWhitelist: false
        },
        email: {
          smtpServer: 'smtp.gmail.com',
          smtpPort: '587',
          smtpUsername: 'admin@example.com',
          smtpPassword: '••••••••',
          fromEmail: 'noreply@example.com',
          fromName: 'Admin Dashboard'
        },
        appearance: {
          theme: 'light', // Pastikan tema di-set ke light
          primaryColor: '#7C3AED',
          sidebarCollapsed: false,
          showAnimations: true,
          compactMode: false
        }
      };

      // Reset local state
      setSettings(defaultSettings);
      
      // Update semua pengaturan di context
      Object.keys(defaultSettings).forEach(category => {
        Object.keys(defaultSettings[category]).forEach(key => {
          updateSettings(category, key, defaultSettings[category][key]);
        });
      });
    }
  };

  const SettingCard = ({ title, children }) => (
    <div className={`p-6 rounded-xl shadow-lg border mb-6 ${themeClasses.bgCard} ${themeClasses.border}`}>
      <h3 className={`text-lg font-semibold mb-4 ${themeClasses.textPrimary}`}>{title}</h3>
      {children}
    </div>
  );

  const InputField = ({ label, type = 'text', value, onChange, placeholder }) => (
    <div className="mb-4">
      <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.bgInput} ${themeClasses.borderInput} ${themeClasses.textPrimary} placeholder-gray-400`}
      />
    </div>
  );

  const SelectField = ({ label, value, onChange, options }) => (
    <div className="mb-4">
      <label className={`block text-sm font-medium mb-2 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          isDark 
            ? 'bg-zinc-700 border-zinc-600 text-white' 
            : 'bg-white border-blue-300 text-gray-800'
        }`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value} className={
            isDark ? 'bg-zinc-700 text-white' : 'bg-white text-gray-800'
          }>{option.label}</option>
        ))}
      </select>
    </div>
  );

  const ToggleField = ({ label, description, checked, onChange }) => (
    <div className={`flex items-center justify-between py-3 border-b last:border-b-0 ${
      isDark ? 'border-zinc-600' : 'border-gray-200'
    }`}>
      <div>
        <h4 className={`text-sm font-medium ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>{label}</h4>
        {description && <p className={`text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : (isDark ? 'bg-zinc-600' : 'bg-gray-300')
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const renderGeneralSettings = () => (
    <div>
      <SettingCard title="Site Information">
        <InputField
          label="Site Name"
          value={settings.general.siteName}
          onChange={(value) => handleSettingChange('general', 'siteName', value)}
          placeholder="Enter site name"
        />
        <InputField
          label="Site Description"
          value={settings.general.siteDescription}
          onChange={(value) => handleSettingChange('general', 'siteDescription', value)}
          placeholder="Enter site description"
        />
      </SettingCard>

      <SettingCard title="Localization">
        <SelectField
          label="Language"
          value={settings.general.language}
          onChange={(value) => handleSettingChange('general', 'language', value)}
          options={[
            { value: 'id', label: 'Bahasa Indonesia' },
            { value: 'en', label: 'English' },
            { value: 'ms', label: 'Bahasa Malaysia' }
          ]}
        />
        <SelectField
          label="Timezone"
          value={settings.general.timezone}
          onChange={(value) => handleSettingChange('general', 'timezone', value)}
          options={[
            { value: 'Asia/Jakarta', label: 'Asia/Jakarta (WIB)' },
            { value: 'Asia/Makassar', label: 'Asia/Makassar (WITA)' },
            { value: 'Asia/Jayapura', label: 'Asia/Jayapura (WIT)' }
          ]}
        />
        <SelectField
          label="Date Format"
          value={settings.general.dateFormat}
          onChange={(value) => handleSettingChange('general', 'dateFormat', value)}
          options={[
            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
            { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
          ]}
        />
        <SelectField
          label="Currency"
          value={settings.general.currency}
          onChange={(value) => handleSettingChange('general', 'currency', value)}
          options={[
            { value: 'IDR', label: 'Indonesian Rupiah (IDR)' },
            { value: 'USD', label: 'US Dollar (USD)' },
            { value: 'SGD', label: 'Singapore Dollar (SGD)' }
          ]}
        />
      </SettingCard>
    </div>
  );

  const renderNotificationSettings = () => (
    <div>
      <SettingCard title="Notification Preferences">
        <ToggleField
          label="Email Notifications"
          description="Receive notifications via email"
          checked={settings.notifications.emailNotifications}
          onChange={(value) => handleSettingChange('notifications', 'emailNotifications', value)}
        />
        <ToggleField
          label="Push Notifications"
          description="Receive browser push notifications"
          checked={settings.notifications.pushNotifications}
          onChange={(value) => handleSettingChange('notifications', 'pushNotifications', value)}
        />
        <ToggleField
          label="SMS Notifications"
          description="Receive notifications via SMS"
          checked={settings.notifications.smsNotifications}
          onChange={(value) => handleSettingChange('notifications', 'smsNotifications', value)}
        />
      </SettingCard>

      <SettingCard title="Alert Types">
        <ToggleField
          label="Order Notifications"
          description="Get notified about new orders and order updates"
          checked={settings.notifications.orderNotifications}
          onChange={(value) => handleSettingChange('notifications', 'orderNotifications', value)}
        />
        <ToggleField
          label="Stock Alerts"
          description="Get notified when products are low in stock"
          checked={settings.notifications.stockAlerts}
          onChange={(value) => handleSettingChange('notifications', 'stockAlerts', value)}
        />
        <ToggleField
          label="System Updates"
          description="Get notified about system maintenance and updates"
          checked={settings.notifications.systemUpdates}
          onChange={(value) => handleSettingChange('notifications', 'systemUpdates', value)}
        />
      </SettingCard>
    </div>
  );

  const renderSecuritySettings = () => (
    <div>
      <SettingCard title="Authentication">
        <ToggleField
          label="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
          checked={settings.security.twoFactorAuth}
          onChange={(value) => handleSettingChange('security', 'twoFactorAuth', value)}
        />
        <SelectField
          label="Session Timeout (minutes)"
          value={settings.security.sessionTimeout}
          onChange={(value) => handleSettingChange('security', 'sessionTimeout', value)}
          options={[
            { value: '15', label: '15 minutes' },
            { value: '30', label: '30 minutes' },
            { value: '60', label: '1 hour' },
            { value: '120', label: '2 hours' }
          ]}
        />
      </SettingCard>

      <SettingCard title="Password Policy">
        <SelectField
          label="Password Expiry (days)"
          value={settings.security.passwordExpiry}
          onChange={(value) => handleSettingChange('security', 'passwordExpiry', value)}
          options={[
            { value: '30', label: '30 days' },
            { value: '60', label: '60 days' },
            { value: '90', label: '90 days' },
            { value: '180', label: '180 days' }
          ]}
        />
        <SelectField
          label="Max Login Attempts"
          value={settings.security.loginAttempts}
          onChange={(value) => handleSettingChange('security', 'loginAttempts', value)}
          options={[
            { value: '3', label: '3 attempts' },
            { value: '5', label: '5 attempts' },
            { value: '10', label: '10 attempts' }
          ]}
        />
        <ToggleField
          label="IP Whitelist"
          description="Only allow access from specific IP addresses"
          checked={settings.security.ipWhitelist}
          onChange={(value) => handleSettingChange('security', 'ipWhitelist', value)}
        />
      </SettingCard>
    </div>
  );

  const renderEmailSettings = () => (
    <div>
      <SettingCard title="SMTP Configuration">
        <InputField
          label="SMTP Server"
          value={settings.email.smtpServer}
          onChange={(value) => handleSettingChange('email', 'smtpServer', value)}
          placeholder="smtp.gmail.com"
        />
        <InputField
          label="SMTP Port"
          value={settings.email.smtpPort}
          onChange={(value) => handleSettingChange('email', 'smtpPort', value)}
          placeholder="587"
        />
        <InputField
          label="SMTP Username"
          value={settings.email.smtpUsername}
          onChange={(value) => handleSettingChange('email', 'smtpUsername', value)}
          placeholder="your-email@gmail.com"
        />
        <InputField
          label="SMTP Password"
          type="password"
          value={settings.email.smtpPassword}
          onChange={(value) => handleSettingChange('email', 'smtpPassword', value)}
          placeholder="Your password"
        />
      </SettingCard>

      <SettingCard title="Email Settings">
        <InputField
          label="From Email"
          type="email"
          value={settings.email.fromEmail}
          onChange={(value) => handleSettingChange('email', 'fromEmail', value)}
          placeholder="noreply@example.com"
        />
        <InputField
          label="From Name"
          value={settings.email.fromName}
          onChange={(value) => handleSettingChange('email', 'fromName', value)}
          placeholder="Your Company Name"
        />
      </SettingCard>

      <div className="flex gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Test Connection
        </button>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          Send Test Email
        </button>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div>
      <SettingCard title="Theme Settings">
        <SelectField
          label="Theme"
          value={settings.appearance.theme}
          onChange={(value) => handleSettingChange('appearance', 'theme', value)}
          options={[
            { value: 'light', label: 'Light Theme' },
            { value: 'dark', label: 'Dark Theme' },
          ]}
        />
      </SettingCard>

      <SettingCard title="Layout Preferences">
        <ToggleField
          label="Collapsed Sidebar"
          description="Keep the sidebar collapsed by default"
          checked={settings.appearance.sidebarCollapsed}
          onChange={(value) => handleSettingChange('appearance', 'sidebarCollapsed', value)}
        />
        <ToggleField
          label="Show Animations"
          description="Enable smooth animations and transitions"
          checked={settings.appearance.showAnimations}
          onChange={(value) => handleSettingChange('appearance', 'showAnimations', value)}
        />
        <ToggleField
          label="Compact Mode"
          description="Use smaller spacing and compact layout"
          checked={settings.appearance.compactMode}
          onChange={(value) => handleSettingChange('appearance', 'compactMode', value)}
        />
      </SettingCard>
    </div>
  );

  return (
    <div className={`min-h-screen p-6${themeClasses.bgPrimary}`}>
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>Settings</h1>
        <p className={`text-xl ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>Kelola pengaturan sistem dan preferensi Anda</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <div className={`rounded-xl shadow-lg border p-4 ${
            isDark 
              ? 'bg-zinc-800 border-zinc-700' 
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>Categories</h3>
            <nav className="space-y-1">
              {settingTabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSettingTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSettingTab === tab.id
                        ? 'bg-blue-100 text-blue-700' 
                        : (isDark 
                            ? 'text-gray-300 bg-zinc-800 hover:bg-zinc-700' 
                            : 'text-gray-700 bg-white hover:bg-gray-100'
                          )
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeSettingTab === 'general' && renderGeneralSettings()}
          {activeSettingTab === 'notifications' && renderNotificationSettings()}
          {activeSettingTab === 'security' && renderSecuritySettings()}
          {activeSettingTab === 'email' && renderEmailSettings()}
          {activeSettingTab === 'appearance' && renderAppearanceSettings()}

          {/* Reset Button */}
          <div className="mt-6 flex justify-end gap-3">
            <button 
              onClick={handleResetSettings}
              className={`flex items-center gap-2 px-6 py-2 border rounded-lg transition-colors ${
                isDark 
                  ? 'bg-zinc-800 border-zinc-600 text-gray-300 hover:bg-zinc-700 hover:text-white' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
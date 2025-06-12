import React from 'react';
import { Building2, Video, Monitor, Network, Zap, MoreHorizontal, MapPin, Filter } from 'lucide-react';

const BarangTable = ({ id, title, Icon, items, isHighlighted }) => (
  <div 
    id={id} // Tambahkan ID di sini
    className={`bg-white rounded-xl shadow-sm mb-8 transition-all duration-500 ${
      isHighlighted ? 'ring-4 ring-blue-400 ring-opacity-50 shadow-lg' : ''
    }`}
  >
    <div className={`border-b border-gray-200 px-6 py-4 flex items-center justify-between ${
      isHighlighted ? 'bg-blue-50' : ''
    }`}>
      <div className="flex items-center gap-3">
        <Icon className={`w-7 h-7 ${isHighlighted ? 'text-blue-600' : 'text-blue-700'}`} />
        <h2 className={`text-2xl font-bold ${isHighlighted ? 'text-blue-600' : 'text-blue-700'}`}>
          {title}
          {isHighlighted && (
            <span className="ml-3 text-sm bg-blue-500 text-white px-2 py-1 rounded-full">
              Kategori Dipilih
            </span>
          )}
        </h2>
      </div>
    </div>
    
    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
      <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700">
        <div>Foto</div>        
        <div>Nama Barang</div>
        <div className="text-center">Jumlah</div>
        <div>Keterangan</div>
      </div>
    </div>

    <div className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="w-60 h-18 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={item.image || "/src/assets/dummy-barang.png"}
                alt={`Foto ${item.name}`}
                className="object-cover w-full h-full"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="font-medium text-gray-900">{item.name}</div>
            </div>
            <div className="text-gray-900 text-center">{item.quantity}</div>
            <div className="text-gray-900">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BarangContent = ({ selectedCategory }) => {
  const ruangKelas = [
    { name: 'Ruangan AA 204', quantity: 1, description: 'Ruang belajar Gedung AA', image: '/src/assets/aa-303.png' },
    { name: 'Ruangan AA 205', quantity: 1, description: 'Ruang belajar Gedung AA', image: '/src/assets/aa-303.png'},
    { name: 'Ruangan AA 206', quantity: 1, description: 'Ruang belajar Gedung AA', image: '/src/assets/aa-303.png' },
    { name: 'Ruangan AA 207', quantity: 1, description: 'Ruang belajar Gedung AA', image: '/src/assets/aa-303.png' },
    { name: 'Ruangan AA 303', quantity: 1, description: 'Ruang belajar Gedung AA', image: '/src/assets/aa-303.png' },
    { name: 'Ruangan AA 211', quantity: 1, description: 'Ruang belajar Gedung AA', image: '/src/assets/aa-303.png' },
    { name: 'Ruangan AA 213', quantity: 1, description: 'Ruang belajar Gedung AA', image: '/src/assets/aa-303.png' },
    { name: 'Ruangan GSG 301', quantity: 1, description: 'Ruang belajar Gedung GSG', image: '/src/assets/RuangGSG.jpeg' },
    { name: 'Ruangan GSG 302', quantity: 1, description: 'Ruang belajar Gedung GSG', image: '/src/assets/RuangGSG.jpeg' },
    { name: 'Ruangan GSG 303', quantity: 1, description: 'Ruang belajar Gedung GSG', image: '/src/assets/RuangGSG.jpeg' },
    { name: 'Ruangan GSG 304', quantity: 1, description: 'Ruang belajar Gedung GSG', image: '/src/assets/RuangGSG.jpeg' },
    { name: 'Ruangan GSG 305', quantity: 1, description: 'Ruang belajar Gedung GSG', image: '/src/assets/RuangGSG.jpeg' },
    { name: 'Ruangan GSG 306', quantity: 1, description: 'Ruang belajar Gedung GSG', image: '/src/assets/RuangGSG.jpeg' },
    { name: 'Ruangan GSG 307', quantity: 1, description: 'Ruang belajar Gedung GSG', image: '/src/assets/RuangGSG.jpeg' },
    { name: 'Laboratorium Database', quantity: 1, description: 'Laboratorium Gedung AA', image: '/src/assets/lab-database.png' },
    { name: 'Laboratorium Jaringan', quantity: 1, description: 'Laboratorium Gedung GSG', image: '/src/assets/laboratorium-jaringan.png' },
    { name: 'Ruang Teleconference', quantity: 1, description: 'Ruang Teleconference Gedung AA', image: '/src/assets/teleconference.jpg' },
    { name: 'Ruang Konsultasi GSG', quantity: 1, description: 'Ruang Konsultasi Gedung GSG', image: '/src/assets/konsultasi-gsg.jpg' },
    { name: 'Ruang Konsultasi AA', quantity: 1, description: 'Ruang Konsultasi Gedung AA', image: '/src/assets/konsultasi-aa.jpg' },
  ];
  
  const peralatanAV = [
    { name: 'Proyektor', quantity: 5, description: 'Proyektor Epson', image: '/src/assets/proyektor.jpeg' },
    { name: 'Speaker', quantity: 3, description: 'Speaker portable', image: '/src/assets/speaker.jpeg' },
    { name: 'Microphone', quantity: 4, description: 'Mic wireless', image: '/src/assets/microphone.jpeg' },
    { name: 'Layar Proyektor', quantity: 3, description: 'Screen portable 100"', image: '/src/assets/layar-proyektor.jpeg' },
    { name: 'Kamera DSLR', quantity: 2, description: 'Canon EOS + Lensa Kit', image: '/src/assets/dslr.jpg' },
    { name: 'Video Camera', quantity: 2, description: 'Handycam Sony + Tripod', image: '/src/assets/video-camera.jpeg' },
    { name: 'Lighting Kit', quantity: 1, description: 'Set lampu studio + stand', image: '/src/assets/lighting kit.jpeg' },
    { name: 'Audio Interface', quantity: 2, description: 'Focusrite Scarlett', image: '/src/assets/audio-interference.jpeg' },
    { name: 'Green Screen', quantity: 1, description: 'Backdrop chroma key', image: '/src/assets/green-screen.jpeg' },
    { name: 'Wireless Presenter', quantity: 5, description: 'Logitech R400', image: '/src/assets/wireless-presenter.jpeg' },
    { name: 'Extension HDMI', quantity: 8, description: 'Kabel HDMI 5m', image: '/src/assets/kabel-hdmi.jpg' },
    { name: 'Microphone Stand', quantity: 6, description: 'Stand mic adjustable', image: '/src/assets/microphone-stand.jpeg' },
    { name: 'Mixer Audio', quantity: 2, description: 'Behringer Xenyx 8 channel', image: '/src/assets/mixer-audio.jpeg' },
    { name: 'Webcam HD', quantity: 4, description: 'Logitech C920 1080p', image: '/src/assets/webcam.jpg' },
    { name: 'Stabilizer Gimbal', quantity: 1, description: 'DJI Osmo Mobile 3', image: '/src/assets/stabilizer.jpeg' },
    { name: 'VGA to HDMI Converter', quantity: 3, description: 'Adapter + Audio', image: '/src/assets/vga-hdmi.jpeg' },
    { name: 'Wireless Microphone Set', quantity: 2, description: '2.4GHz Dual Channel', image: '/src/assets/wireless-mic.jpeg' },
    { name: 'Backdrop Stand', quantity: 2, description: 'Adjustable background stand', image: '/src/assets/background-stand.png' },
  ];

  const perangkatKomputer = [
    { name: 'PC Desktop', quantity: 25, description: 'Intel i5, 8GB RAM, SSD 256GB', image: '/src/assets/pc-destop.jpeg' },
    { name: 'Laptop', quantity: 15, description: 'ASUS VivoBook i5, 8GB RAM', image: '/src/assets/laptop.jpeg' },
    { name: 'Monitor LED', quantity: 30, description: '24 inch Full HD 1920x1080', image: '/src/assets/monitor.jpeg' },
    { name: 'Keyboard Mechanical', quantity: 30, description: 'Logitech K380 Wireless', image: '/src/assets/keyboard.jpeg' },
    { name: 'Mouse Optical', quantity: 35, description: 'Logitech M100 USB', image: '/src/assets/mouse.jpeg' },
  ];

  const peralatanJaringan = [
    { name: 'Router', quantity: 3, description: 'Router Mikrotik', image: '/src/assets/router.jpeg' },
    { name: 'Switch', quantity: 2, description: 'Switch 24 port', image: '/src/assets/switch.jpeg' },
    { name: 'Kabel UTP', quantity: 3, description: 'Kabel jaringan', image: '/src/assets/kabel-utp.jpeg' },
    { name: 'Access Point', quantity: 4, description: 'WiFi Access Point TP-Link', image: '/src/assets/wifi.jpeg' },
    { name: 'Hub', quantity: 1, description: 'Hub 8 port', image: '/src/assets/hub-8.jpeg' },
    { name: 'Patch Panel', quantity: 2, description: 'Patch panel 24 port', image: '/src/assets/panel-switch.jpeg' },
    { name: 'Firewall', quantity: 1, description: 'Sophos Firewall', image: '/src/assets/firewall.png' },
    { name: 'Modem', quantity: 2, description: 'Modem ADSL', image: '/src/assets/modem.jpeg' },
  ];

  const peralatanListrik = [
    { name: 'Stop Kontak', quantity: 8, description: 'Stop kontak panjang', image: '/src/assets/stop-kontak.jpeg' },
    { name: 'Kabel Roll', quantity: 4, description: 'Kabel roll 10 meter', image: '/src/assets/kabel-roll.jpeg' },
    { name: 'Lampu', quantity: 10, description: 'Lampu LED', image: '/src/assets/lampu.jpeg' },
    { name: 'UPS', quantity: 3, description: 'UPS 1000VA APC', image: '/src/assets/ups.jpeg' },
    { name: 'MCB', quantity: 6, description: 'MCB 10A Schneider', image: '/src/assets/mcb.jpeg' },
    { name: 'Stabilizer', quantity: 2, description: 'Stabilizer 1000W', image: '/src/assets/stabilizer.-1000w.jpeg' },
    { name: 'Konektor Listrik', quantity: 15, description: 'Konektor T Cabang 3', image: '/src/assets/konektor-listrik.jpeg' },
    { name: 'Multimeter', quantity: 1, description: 'Multimeter Digital', image: '/src/assets/multimeter.jpeg' },
  ];

  const lainnya = [
    { name: 'Papan Pengumuman', quantity: 2, description: 'Papan pengumuman umum', image: '/src/assets/papan.jpeg' },
    { name: 'Dispenser', quantity: 1, description: 'Dispenser air minum', image: '/src/assets/dispenser.jpeg' },
    { name: 'Meja Lipat', quantity: 1, description: 'Meja lipat portable', image: '/src/assets/meja.jpeg' },
    { name: 'Papan Tulis', quantity: 1, description: 'Papan tulis portable', image: '/src/assets/papan-tulis.jpeg' },
    { name: 'set obeng', quantity: 1, description: 'full set obeng kecil', image: '/src/assets/obeng.jpeg' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full mt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Daftar Barang per Kategori</h2>
        {selectedCategory && (
          <p className="text-lg text-blue-600 mt-2 font-medium">
            Menampilkan kategori yang dipilih dari halaman utama
          </p>
        )}
      </div>
      
      <div className="w-full max-w-7xl space-y-12">
        <BarangTable 
          id="ruang-kelas" 
          title="Ruang Kelas" 
          Icon={Building2} 
          items={ruangKelas}
          isHighlighted={selectedCategory === 'ruang-kelas'}
        />
        <BarangTable 
          id="peralatan-av" 
          title="Peralatan AV" 
          Icon={Video} 
          items={peralatanAV}
          isHighlighted={selectedCategory === 'peralatan-av'}
        />
        <BarangTable 
          id="perangkat-komputer" 
          title="Perangkat Komputer" 
          Icon={Monitor} 
          items={perangkatKomputer}
          isHighlighted={selectedCategory === 'perangkat-komputer'}
        />
        <BarangTable 
          id="peralatan-jaringan" 
          title="Peralatan Jaringan" 
          Icon={Network} 
          items={peralatanJaringan}
          isHighlighted={selectedCategory === 'peralatan-jaringan'}
        />
        <BarangTable 
          id="peralatan-listrik" 
          title="Peralatan Listrik" 
          Icon={Zap} 
          items={peralatanListrik}
          isHighlighted={selectedCategory === 'peralatan-listrik'}
        />
        <BarangTable 
          id="lainnya" 
          title="Lainnya" 
          Icon={MoreHorizontal} 
          items={lainnya}
          isHighlighted={selectedCategory === 'lainnya'}
        />
      </div>
    </div>
  );
};

export default BarangContent;
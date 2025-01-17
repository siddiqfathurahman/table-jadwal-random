import React, { useState } from "react";

// Masukkan 40 nama Anda di sini
const NAMES = [
  "Andi", "Budi", "Citra", "Dewi", "Eka", "Fajar", "Gita", "Hana",
  "Irfan", "Joko", "Kiki", "Lina", "Maya", "Nina", "Oka", "Putri",
  "Qori", "Rudi", "Sinta", "Toni", "Udin", "Vina", "Wawan", "Xena",
  "Yogi", "Zaki", "Anton", "Bella", "Cindy", "Doni", "Elin", "Farah",
  "Gilang", "Hari", "Ida"
];

const App = () => {
  const [weeks, setWeeks] = useState(generateSchedule());
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk menghitung hari dalam bulan Maret 2025
  const daysInMarch2025 = Array.from({ length: 31 }, (_, i) => {
    const date = new Date(2025, 2, i + 1); // Bulan Maret (2 karena indeks bulan dimulai dari 0)
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return `${dayNames[date.getDay()]}, ${i + 1} Maret 2025`;
  });

  // Fungsi untuk menghasilkan jadwal acak
  function generateSchedule() {
    const numWeeks = 4; // Jumlah minggu
    const daysPerWeek = 7; // Hari dalam seminggu
    const schedule = Array(numWeeks).fill(null).map(() => Array(daysPerWeek).fill(null).map(() => []));
    const nameAssignments = {};

    // Inisialisasi nama dengan array kosong untuk setiap minggu
    NAMES.forEach((name) => {
      nameAssignments[name] = Array(numWeeks).fill(null).map(() => []);
    });

    for (let week = 0; week < numWeeks; week++) {
      for (const name of NAMES) {
        while (nameAssignments[name][week].length < 4) {
          const availableDays = Array.from({ length: daysPerWeek }, (_, i) => i).filter(
            (day) => !nameAssignments[name][week].includes(day)
          );
          const randomDay = availableDays[Math.floor(Math.random() * availableDays.length)];

          if (!schedule[week][randomDay].includes(name)) {
            schedule[week][randomDay].push(name);
            nameAssignments[name][week].push(randomDay);
          }
        }
      }
    }

    return schedule;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Jadwal Maret 2025 (4 Minggu)</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Cari Nama:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-4 py-2 w-full"
          placeholder="Masukkan nama untuk mencari..."
        />
      </div>
      <button
        onClick={() => setWeeks(generateSchedule())}
        className="mb-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Acak Nama
      </button>
      <div className="space-y-8">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex}>
            <h2 className="text-xl font-semibold mb-2">Minggu {weekIndex + 1}</h2>
            <table className="table-auto border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Hari dan Tanggal</th>
                  <th className="border border-gray-400 px-4 py-2">Nama</th>
                </tr>
              </thead>
              <tbody>
                {daysInMarch2025.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                  <tr key={dayIndex}>
                    <td className="border border-gray-400 px-4 py-2">{day}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {weeks[weekIndex][dayIndex]?.map((name, nameIndex) => (
                        <span
                          key={nameIndex}
                          className={`inline-block px-2 py-1 rounded ${
                            searchQuery && name.toLowerCase().includes(searchQuery.toLowerCase())
                              ? "bg-yellow-300"
                              : ""
                          }`}
                        >
                          {name}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

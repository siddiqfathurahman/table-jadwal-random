import React, { useState } from "react";

const NAMES = [
  "Mas Royhan", "Rani", "Fatur", "Wanti", "Lepy", "Tata", "Romy", "Safa",
  "Dapol", "Lovy", "Pandya", "Nada", "Danis", "Dea", "Bayu", "Nayla",
  "Briyan", "Kiki", "Putra", "Queen", "Arvan", "Salsa", "Radit (Dodot)", "Nita",
  "Dani", "Akmal", "Bian", "Kevin", "Evan", "Lintang", "Ilham (Kikik)", "Adit",
  "Abi", "Rafa", "Selo", "Nayaka", "Rafi", "Ripat"
];

const DAYS_IN_MONTH = 31;
const SHIFTS_PER_PERSON = 10;
const PEOPLE_COUNT = NAMES.length;

const distributeFairly = () => {
  let schedule = Array.from({ length: DAYS_IN_MONTH }, () => []);
  let assignments = Object.fromEntries(NAMES.map(name => [name, 0]));
  let nameQueue = [...NAMES];

  // Loop untuk mengalokasikan shift per orang
  for (let i = 0; i < SHIFTS_PER_PERSON * PEOPLE_COUNT; i++) {
    let dayIndex = i % DAYS_IN_MONTH;

    // Ambil orang yang belum mencapai shift maksimal dan belum terjadwal di hari yang sama
    let availableNames = nameQueue.filter(
      (name) => assignments[name] < SHIFTS_PER_PERSON && !schedule[dayIndex].includes(name)
    );

    if (availableNames.length === 0) {
      // Jika semua orang sudah terjadwal di hari ini, lanjutkan ke hari berikutnya
      continue;
    }

    let assignedName = availableNames[Math.floor(Math.random() * availableNames.length)];
    schedule[dayIndex].push(assignedName);
    assignments[assignedName]++;
  }

  return schedule;
};

const App = () => {
  const [schedule, setSchedule] = useState(distributeFairly());
  const [searchQuery, setSearchQuery] = useState("");

  const daysInMarch2025 = Array.from({ length: DAYS_IN_MONTH }, (_, i) => {
    const date = new Date(2025, 2, i + 1);
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return `${dayNames[date.getDay()]}, ${i + 1} Maret 2025`;
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Jadwal Maret 2025 (Adil)</h1>
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
        onClick={() => setSchedule(distributeFairly())}
        className="mb-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Acak Ulang
      </button>
      <table className="table-auto border-collapse border border-gray-400 w-full text-center">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Hari dan Tanggal</th>
            <th className="border border-gray-400 px-4 py-2">Nama</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((names, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{daysInMarch2025[index]}</td>
              <td className="border border-gray-400 px-4 py-2">
                {names.map((name, nameIndex) => (
                  <span
                    key={nameIndex}
                    className={`inline-block px-2 py-1 rounded ${searchQuery && name.toLowerCase().includes(searchQuery.toLowerCase()) ? "bg-yellow-300" : ""}`}
                  >
                    {name}, 
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

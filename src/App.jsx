import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/lottery-logo.png';

// Global Data
const PRIZES = [
  { rank: "First Prize", label: "R 150,000,000", amount: 15e7, icon: "🥇" },
  { rank: "Second Prize", label: "R 60,000,000", amount: 6e7, icon: "🥈" },
  { rank: "Third Prize", label: "R 30,000,000", amount: 3e7, icon: "🥉" },
  { rank: "Fourth Prize", label: "R 15,000,000", amount: 15e6, icon: "🏆" },
  { rank: "Fifth Prize", label: "R 6,000,000", amount: 6e6, icon: "🎯" }
];

const WINNING_PRIZE = { rank: "Prize Won", label: "R 15,000.00", amount: 15e3, icon: "🏆" };

const BANKS = [
  { name: "ABSA", color: "#e30613", short: "A" },
  { name: "Standard Bank", color: "#003c71", short: "SB" },
  { name: "FNB", color: "#00966b", short: "FNB" },
  { name: "Nedbank", color: "#006341", short: "N" },
  { name: "Capitec", color: "#003c71", short: "C" },
  { name: "Investec", color: "#1a1a1a", short: "I" },
  { name: "African Bank", color: "#003b7a", short: "AB" },
  { name: "TymeBank", color: "#ffc20e", short: "T", textColor: "#0b1b2b" },
  { name: "Discovery Bank", color: "#003c71", short: "D" },
  { name: "Bidvest Bank", color: "#c8102e", short: "B" }
];

const COMMENTS = [
  {
    name: "Thandi Ngwenya",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    text: "I couldn't believe it was real! Just received R45,000 from the National Lottery!",
    time: "2h ago",
    likes: 127
  },
  {
    name: "Sipho Mkhize",
    img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    text: "I was scared it might be a scam, but I followed the steps and it worked! Received R32,500!",
    time: "5h ago",
    likes: 89
  },
  {
    name: "Zanele Dlamini",
    img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    text: "Guys, this is real! I had R58,000 sitting unclaimed for months. Claimed in 3 days!",
    time: "7h ago",
    likes: 203
  },
  {
    name: "Mandla Nkosi",
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    text: "My wife didn't believe me, but I showed her the proof of R73,500 I received!",
    time: "10h ago",
    likes: 312
  },
  {
    name: "Nomsa Khumalo",
    img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    text: "What a blessing! I claimed R28,750 that I had forgotten about.",
    time: "14h ago",
    likes: 156
  },
  {
    name: "Bongani Sithole",
    img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    text: "Just left the bank! R51,200 in my account! This saved my life!",
    time: "1d ago",
    likes: 445
  }
];

// Helper components
function Header({ jackpot }) {
  return (
    <header className="w-full">
      <div className="bg-[#0b2a5e] text-white text-[11px] px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>📞 0861 101 101</span>
          <span className="hidden sm:inline">✉ info@nationallottery.co.za</span>
        </div>
        <span className="text-[#f4b400] font-semibold hidden sm:inline">Official Licensed National Lottery</span>
      </div>
      <div className="px-4 py-3 flex items-center justify-between gap-3" style={{ background: "linear-gradient(90deg,#0b3a82 0%,#1556b8 60%,#0e8a3a 100%)" }}>
        <div className="flex items-center gap-2 min-w-0">
          <img src={logo} alt="National Lottery" className="h-9 md:h-11 bg-white rounded-md p-1 shrink-0" />
          <div className="text-white font-bold text-sm md:text-lg leading-tight truncate">South African National Lottery</div>
        </div>
        {jackpot && (
          <div className="bg-[#f4b400] text-[#0b1b2b] rounded-md px-3 py-1.5 shadow-md text-right shrink-0">
            <div className="text-[9px] uppercase font-semibold tracking-wide leading-none">🏆 Jackpot Prize</div>
            <div className="text-sm md:text-base font-extrabold leading-tight mt-0.5">{jackpot}</div>
          </div>
        )}
      </div>
      <div className="h-0.5 bg-gradient-to-r from-[#f4b400] via-[#1556b8] to-[#0e8a3a]"></div>
    </header>
  );
}

function AgeVerification({ onConfirm }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center animate-in fade-in zoom-in duration-300">
        <div className="mx-auto w-20 h-20 rounded-full bg-[#e30613] text-white flex items-center justify-center text-2xl font-extrabold border-4 border-[#0b1b2b]">18+</div>
        <h2 className="mt-4 text-lg font-extrabold text-[#0b1b2b]">Age Verification</h2>
        <p className="text-xs text-[#3a4756] mt-2">
          This site is restricted to adults. By continuing, you confirm that you are <b>18 years of age or older</b> and legally allowed to participate in lottery activities in your country.
        </p>
        <p className="text-[10px] text-[#6b7785] mt-2">Play responsibly. National Responsible Gambling Programme — 0800 006 008.</p>
        <div className="mt-5 flex flex-col gap-2">
          <button onClick={onConfirm} className="w-full bg-[#0e8a3a] hover:bg-[#0a6e2c] text-white font-bold text-sm py-3 rounded-md transition cursor-pointer">✓ I am 18 or older — Enter</button>
          <a href="https://www.google.com" className="w-full bg-gray-200 hover:bg-gray-300 text-[#0b1b2b] font-semibold text-xs py-2.5 rounded-md transition">I am under 18 — Exit</a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0b2a5e] text-white mt-10 px-4 py-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <p className="font-bold text-sm mb-1">Customer Support</p>
          <p>📞 0861 101 101</p>
        </div>
        <div>
          <p className="font-bold text-sm mb-1">Security</p>
          <p>🛡 Licensed Draws</p>
        </div>
        <div>
          <p className="font-bold text-sm mb-1">About Us</p>
          <p className="text-white/80">Official lottery platform in South Africa. Transparency and security guaranteed.</p>
        </div>
      </div>
    </footer>
  );
}

function BankIcon({ b, size = "md" }) {
  const cn = size === "sm" ? "w-7 h-7 text-[9px]" : "w-9 h-9 text-[10px]";
  return (
    <span className={`${cn} rounded-md flex items-center justify-center font-extrabold shrink-0 shadow-sm`} style={{ background: b.color, color: b.textColor ?? "#fff" }}>
      {b.short}
    </span>
  );
}

function PrizeSelectionStep({ name, phone, setName, setPhone, selected, setSelected, onNext }) {
  const isValid = name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 9 && selected;

  return (
    <main className="max-w-xl mx-auto px-4 py-5">
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="text-center">
          <span className="inline-block text-[#1d4ea8] text-2xl">🏆</span>
          <h2 className="text-base font-bold text-[#0b1b2b] mt-1">YOU HAVE THE CHANCE TO WIN ONE OF THESE PRIZES</h2>
          <p className="text-xs text-[#3a4756] mt-1">Enter your details and pick the prize you want to win.</p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#0b1b2b] mb-1">Full name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Thabo Mokoena" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-[#1d4ea8] focus:ring-1 focus:ring-[#1d4ea8] outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0b1b2b] mb-1">Phone number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. 071 234 5678" inputMode="tel" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-[#1d4ea8] focus:ring-1 focus:ring-[#1d4ea8] outline-none" />
          </div>
        </div>
        <p className="text-xs font-semibold text-[#0b1b2b] mt-5 mb-2">Choose your desired prize:</p>
        <div className="space-y-2">
          {PRIZES.map(prize => {
            const isSelected = selected?.rank === prize.rank;
            return (
              <button key={prize.rank} onClick={() => setSelected(prize)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md border text-sm transition cursor-pointer ${isSelected ? "bg-[#e8f0ff] border-[#1d4ea8] ring-2 ring-[#1d4ea8]/30" : "bg-[#f6fbff] border-[#d6e4f5] hover:border-[#1d4ea8]"}`}>
                <span className="flex items-center gap-2 text-[#0b1b2b]">
                  <span className="text-lg">{prize.icon}</span>
                  <span className="font-medium">{prize.rank}</span>
                </span>
                <span className="font-bold text-[#0b1b2b]">{prize.label}</span>
              </button>
            );
          })}
        </div>
        <button disabled={!isValid} onClick={onNext} className="mt-5 w-full bg-[#1d4ea8] disabled:bg-gray-300 hover:bg-[#163d82] text-white font-bold text-sm py-3 rounded-md transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed">⭐ ENTER THE DRAW</button>
        <p className="text-[10px] text-[#6b7785] text-center mt-2">🔒 Secure & confidential</p>
      </div>
    </main>
  );
}

function SpinStep({ name, prize, onWin }) {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnNumbers, setDrawnNumbers] = useState([null, null, null, null, null]);
  const [hasWon, setHasWon] = useState(false);

  function startDraw(number) {
    if (isDrawing || selectedNumber !== null) return;
    setSelectedNumber(number);
    setIsDrawing(true);

    const pool = [3, 7, 12, 19, 24, 31, 38, 42, 47, 9, 15, 22, 28, 36].filter(u => u !== number);
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 4);
    const finalSequence = [...shuffled, number];

    finalSequence.forEach((val, idx) => {
      setTimeout(() => {
        setDrawnNumbers(prev => {
          const next = [...prev];
          next[idx] = val;
          return next;
        });
        if (idx === finalSequence.length - 1) {
          setTimeout(() => {
            setIsDrawing(false);
            setHasWon(true);
          }, 600);
        }
      }, 1000 + idx * 1100);
    });
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-5">
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <p className="text-xs text-[#6b7785]">Hello, <b className="text-[#0b1b2b]">{name.split(" ")[0]}</b></p>
        <h2 className="text-sm font-bold text-[#0b1b2b] mt-1">You are competing for <span className="text-[#1d4ea8]">{prize.rank}</span></h2>
        <p className="text-base font-extrabold text-[#0e8a3a]">{prize.label}</p>
        <p className="text-xs text-[#3a4756] mt-1">
          {selectedNumber === null ? "Pick your lucky number for the official draw:" : isDrawing ? "🎲 Drawing the official lottery numbers..." : "Draw completed!"}
        </p>
        <div className="mt-4 bg-gradient-to-br from-[#0b3a82] to-[#1d4ea8] rounded-lg p-4 shadow-inner">
          <div className="flex items-center justify-between text-white text-[10px] uppercase tracking-wide mb-2">
            <span>🔴 LIVE DRAW</span>
            <span className="font-mono">#{Math.floor(Math.random() * 9000) + 1000}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            {drawnNumbers.map((num, idx) => {
              const isMatch = hasWon && num === selectedNumber;
              return (
                <div key={idx} className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-extrabold text-lg shadow-lg border-2 transition-all duration-500 ${num === null ? "bg-[#0b1b2b]/40 border-white/20 text-white/30 animate-pulse" : isMatch ? "bg-[#f4b400] border-white text-[#0b1b2b] scale-110" : "bg-white border-white text-[#0b1b2b]"}`}>
                  {num ?? "?"}
                </div>
              );
            })}
          </div>
          {selectedNumber !== null && (
            <p className="text-white/90 text-[11px] mt-3">Your number: <b className="text-[#f4b400]">{selectedNumber}</b></p>
          )}
        </div>
        {selectedNumber === null && (
          <div className="mt-5">
            <p className="text-xs font-semibold text-[#0b1b2b] mb-2">Choose your lucky number:</p>
            <div className="grid grid-cols-5 gap-1.5 max-w-xs mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
                <button key={number} onClick={() => startDraw(number)} className="aspect-square rounded-full font-bold text-sm shadow-sm bg-white hover:bg-[#1d4ea8] hover:text-white text-[#0b1b2b] border border-[#1d4ea8] transition cursor-pointer">
                  {number}
                </button>
              ))}
            </div>
          </div>
        )}
        {hasWon && (
          <div className="mt-5 animate-in fade-in zoom-in duration-500">
            <div className="bg-[#e8f7ee] border border-[#0e8a3a] rounded-md p-4">
              <p className="text-2xl">🎉</p>
              <h3 className="text-base font-extrabold text-[#0e8a3a] mt-1">CONGRATULATIONS!</h3>
              <p className="text-xs text-[#3a4756] mt-1">Your number <b className="text-[#1d4ea8]">{selectedNumber}</b> was drawn! You won the</p>
              <p className="text-sm font-bold text-[#0b1b2b] mt-1">{WINNING_PRIZE.rank}</p>
              <p className="text-2xl font-extrabold text-[#e30613] my-1">{WINNING_PRIZE.label}</p>
              <button onClick={onWin} className="mt-3 w-full bg-[#0e8a3a] hover:bg-[#0a6e2c] text-white font-bold text-sm py-3 rounded-md cursor-pointer transition">CLAIM MY PRIZE →</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function BankStep({ prize, bank, setBank, accountNumber, setAccountNumber, accountHolder, setAccountHolder, defaultHolder, onSubmit }) {
  useEffect(() => {
    if (!accountHolder) {
      setAccountHolder(defaultHolder);
    }
  }, []);

  const isValid = bank && accountNumber.replace(/\D/g, "").length >= 6 && accountHolder.trim().length >= 2;

  return (
    <main className="max-w-xl mx-auto px-4 py-5">
      <div className="bg-[#0e8a3a] text-white text-center py-2.5 px-4 rounded-t-lg text-sm font-bold">
        💰 PRIZE CONFIRMED: {prize.label}
      </div>
      <div className="bg-white rounded-b-lg shadow-md p-5 border border-[#0e8a3a] border-t-0">
        <h2 className="text-sm font-bold text-[#0b1b2b] text-center">Where should we deposit your winnings?</h2>
        <p className="text-center text-xs text-[#3a4756] mt-1">Select your South African bank and enter your account details.</p>
        <p className="text-xs font-semibold text-[#0b1b2b] mt-4 mb-2">Select your bank:</p>
        <div className="grid grid-cols-2 gap-2">
          {BANKS.map(item => {
            const isSelected = bank === item.name;
            return (
              <button key={item.name} onClick={() => setBank(item.name)} className={`flex items-center gap-2 px-2.5 py-2 rounded-md border text-xs transition cursor-pointer ${isSelected ? "bg-[#e8f0ff] border-[#1d4ea8] ring-2 ring-[#1d4ea8]/30" : "bg-white border-gray-300 hover:border-[#1d4ea8]"}`}>
                <BankIcon b={item} size="sm" />
                <span className="font-semibold text-[#0b1b2b] truncate">{item.name}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#0b1b2b] mb-1">Account holder</label>
            <input value={accountHolder} onChange={e => setAccountHolder(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-[#1d4ea8] focus:ring-1 focus:ring-[#1d4ea8] outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0b1b2b] mb-1">Account number</label>
            <input value={accountNumber} onChange={e => setAccountNumber(e.target.value)} inputMode="numeric" placeholder="e.g. 1234567890" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-[#1d4ea8] focus:ring-1 focus:ring-[#1d4ea8] outline-none" />
          </div>
          <button disabled={!isValid} onClick={onSubmit} className="w-full bg-[#0e8a3a] disabled:bg-gray-300 hover:bg-[#0a6e2c] text-white font-bold text-sm py-3 rounded-md cursor-pointer disabled:cursor-not-allowed transition">PROCESS MY DEPOSIT →</button>
          <p className="text-[10px] text-[#6b7785] text-center">🔒 Bank-level encryption · SSL secured</p>
        </div>
      </div>
    </main>
  );
}

function ProcessingStep({ bank, onDone }) {
  const [logIndex, setLogIndex] = useState(0);
  const logs = [
    `Connecting to ${bank}...`,
    "Verifying account details...",
    "Validating with SARB...",
    "Preparing transfer..."
  ];

  useEffect(() => {
    if (logIndex < logs.length - 1) {
      const timer = setTimeout(() => setLogIndex(prev => prev + 1), 1100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onDone, 1300);
      return () => clearTimeout(timer);
    }
  }, [logIndex]);

  return (
    <main className="max-w-md mx-auto px-4 py-12 text-center">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="w-12 h-12 border-4 border-[#1d4ea8] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-sm font-bold text-[#0b1b2b] mt-4">Processing your deposit...</h2>
        <p className="text-xs text-[#3a4756] mt-1">{logs[logIndex]}</p>
        <div className="mt-4 space-y-1.5 text-left text-xs">
          {logs.slice(0, logIndex + 1).map((log, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[#0e8a3a]">
              <span>✓</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ApprovedStep({ bank, name, prize, onContinue }) {
  const bankDetails = BANKS.find(b => b.name === bank);
  return (
    <main className="max-w-xl mx-auto px-4 py-5 text-center">
      <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-[#0e8a3a]">
        <p className="text-3xl">✅</p>
        <h2 className="text-base font-extrabold text-[#0e8a3a] mt-1">BANK APPROVED!</h2>
        <div className="mt-3 flex items-center justify-center gap-2 bg-[#f6fbff] border border-[#d6e4f5] rounded-md p-2 mx-auto max-w-xs">
          {bankDetails && <BankIcon b={bankDetails} size="sm" />}
          <div className="text-left">
            <p className="text-[10px] text-[#6b7785] uppercase font-semibold">Verified</p>
            <p className="text-xs font-bold text-[#0b1b2b]">{bank}</p>
          </div>
        </div>
        <p className="text-xs text-[#3a4756] mt-3">Your account has been verified, <b>{name.split(" ")[0]}</b>.</p>
        <div className="mt-4 bg-[#fffbe6] border border-[#f4b400] rounded-md p-3 text-left">
          <p className="text-xs font-bold text-[#0b1b2b]">⚠️ ONE LAST STEP TO UNLOCK YOUR {prize.label}</p>
          <p className="text-[11px] text-[#3a4756] mt-1.5">For security reasons, watch a quick <b>30-second video</b> to learn how to receive your money <b>instantly</b>. After watching, the transfer will be released to your account.</p>
        </div>
        <button onClick={onContinue} className="mt-4 w-full bg-[#e30613] hover:bg-[#b80510] text-white font-bold text-sm py-3 rounded-md animate-pulse cursor-pointer transition">▶ WATCH VIDEO TO RECEIVE</button>
      </div>
    </main>
  );
}

function VslStep({ name, bank, prize }) {
  const playerRef = useRef(null);
  const bankDetails = BANKS.find(b => b.name === bank);

  useEffect(() => {
    if (document.getElementById("vturb-script-6a1edf38")) return;
    const script = document.createElement("script");
    script.id = "vturb-script-6a1edf38";
    script.src = "https://scripts.converteai.net/ac953e4d-8577-4578-a3e7-6bab9221d925/players/6a1edf3844518c29d0835890/v4/player.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-5">
      <div className="bg-white rounded-md shadow-sm p-3 border-l-4 border-[#0e8a3a] mb-4 flex items-center gap-3">
        {bankDetails && <BankIcon b={bankDetails} />}
        <div className="grid grid-cols-3 gap-2 text-xs flex-1 min-w-0">
          <div className="min-w-0">
            <p className="text-[#6b7785] text-[10px] uppercase">Name</p>
            <p className="font-bold text-[#0b1b2b] truncate">{name}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[#6b7785] text-[10px] uppercase">Bank</p>
            <p className="font-bold text-[#0b1b2b] truncate">{bank}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[#6b7785] text-[10px] uppercase">Amount</p>
            <p className="font-extrabold text-[#0e8a3a]">{prize.label}</p>
          </div>
        </div>
      </div>
      <h2 className="text-center text-base md:text-xl font-extrabold text-[#0b1b2b] leading-tight">
        WATCH UNTIL THE END TO RELEASE YOUR <span className="text-[#0e8a3a]">{prize.label}</span>
      </h2>
      <p className="text-center text-xs md:text-sm text-[#3a4756] mt-2 max-w-2xl mx-auto">
        <b>{name.split(" ")[0]}</b>, your deposit to <b>{bank}</b> will be released as soon as you finish watching this short video.
      </p>
      <div className="mt-4 rounded-md border border-[#1d4ea8] bg-white shadow-md overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b text-[11px]">
          <span className="inline-flex items-center gap-1.5 bg-[#e30613] text-white font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> LIVE NOW
          </span>
          <span className="text-[#3a4756] font-semibold">👥 3,542 watching</span>
        </div>
        <div ref={playerRef} className="p-1.5 bg-black">
          <div dangerouslySetInnerHTML={{ __html: '<vturb-smartplayer id="vid-6a1edf3844518c29d0835890" style="display: block; margin: 0 auto; width: 100%; "></vturb-smartplayer>' }}></div>
        </div>
      </div>
      <section className="mt-8">
        <h3 className="text-base font-bold text-[#0b1b2b]">Comments</h3>
        <p className="text-xs text-[#3a4756] mt-0.5 mb-4">What South African winners are saying:</p>
        <div className="space-y-3">
          {COMMENTS.map(item => (
            <div key={item.name} className="bg-white rounded-md p-3 shadow-sm border border-[#e6e6e6] flex gap-3">
              <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-[#0b1b2b]">{item.name}</p>
                <p className="text-[#3a4756] mt-0.5 text-xs">{item.text}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-[#6b7785]">
                  <span>{item.time}</span>
                  <button className="inline-flex items-center gap-1 hover:text-[#1d4ea8] cursor-pointer">👍 Like</button>
                  <span className="font-semibold">{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}



export default function App() {
  const [step, setStep] = useState("prizes"); // prizes, spin, bank, processing, approved, vsl
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("ageConfirmed18") === "1") {
      setIsAgeConfirmed(true);
    }
  }, []);

  function handleAgeConfirm() {
    if (typeof window !== "undefined") {
      localStorage.setItem("ageConfirmed18", "1");
    }
    setIsAgeConfirmed(true);
  }

  return (
    <div className="min-h-screen bg-[#eef3fb] font-sans text-[14px] flex flex-col justify-between">
      <div>
        {!isAgeConfirmed && <AgeVerification onConfirm={handleAgeConfirm} />}
        
        <Header jackpot="R 150,000,000" />
        
        {step === "prizes" && (
          <PrizeSelectionStep 
            name={name}
            phone={phone}
            setName={setName}
            setPhone={setPhone}
            selected={selectedPrize}
            setSelected={setSelectedPrize}
            onNext={() => setStep("spin")}
          />
        )}
        
        {step === "spin" && selectedPrize && (
          <SpinStep 
            name={name}
            prize={selectedPrize}
            onWin={() => setStep("bank")}
          />
        )}
        
        {step === "bank" && (
          <BankStep 
            prize={WINNING_PRIZE}
            bank={selectedBank}
            setBank={setSelectedBank}
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            accountHolder={accountHolder}
            setAccountHolder={setAccountHolder}
            defaultHolder={name}
            onSubmit={() => setStep("processing")}
          />
        )}
        
        {step === "processing" && (
          <ProcessingStep 
            bank={selectedBank}
            onDone={() => setStep("approved")}
          />
        )}
        
        {step === "approved" && (
          <ApprovedStep 
            bank={selectedBank}
            name={name}
            prize={WINNING_PRIZE}
            onContinue={() => setStep("vsl")}
          />
        )}
        
        {step === "vsl" && (
          <VslStep 
            name={name}
            bank={selectedBank}
            prize={WINNING_PRIZE}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

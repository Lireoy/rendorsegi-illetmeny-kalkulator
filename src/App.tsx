import { useState } from 'react';
import config from './data/beosztasConfig.json';
import rankDataJson from './data/rankData.json';

type Besorolas = '' | 'Vezető' | 'Tiszt' | 'Tiszthelyettes';
type Szerv = '' | 'Központi' | 'Területi' | 'Helyi';
type Beosztas = '' | 'Járőrtárs' | 'Járőr' | 'Határrendész';
type RankMap = Record<string, string>;

interface RankData {
  Központi: unknown[];
  Területi: unknown[];
  Helyi: {
    Tiszthelyettes: {
      "A kategória": Record<string, string>[];
      "B kategória": Record<string, string>[];
    };
  };
}

function getBeosztasokBySzervAndBesorolas<
  T extends Record<string, any>,
  K1 extends keyof T,
  K2 extends keyof T[K1]
>(data: T,
  level1: string,
  level2: string
 ) {
  const section = data?.[level1]?.[level2];

  if (!section || typeof section !== "object") return [];

  //return Object.values(section).flat();

  let processedData = Object.values(section)
    .flat()
    .flatMap((obj) =>
      Object.entries(obj).map(([key, value]) => ({
        label: value,
        value: key,
      }))
    );
  
  processedData.map((opt) => console.log(opt.label + " - "+ opt.value) );
  
  return processedData;
  }

function getKategoria(besorolas: Besorolas, szerv: Szerv, beosztas: Beosztas): string | null {
  if (!besorolas || !szerv || !beosztas) return null;
  const szervMap = (config.kategóriaMap as Record<string, Record<string, Record<string, string>>>)[besorolas];
  if (!szervMap) return null;
  const beosztasMap = szervMap[szerv];
  if (!beosztasMap) return null;
  return beosztasMap[beosztas] || null;
}

function getMultiplier(besorolas: Besorolas, szerv: Szerv, beosztas: Beosztas): string | null {
  if (!besorolas || !szerv || !beosztas) return null;
  const szervMap = (config.multiplierMap as Record<string, Record<string, Record<string, string>>>)[besorolas];

  //const items = getBeosztasokBySzervAndBesorolas(rankDataJson as RankData, szerv, besorolas);
  
  //console.log(items);
  
  /*
  const szervek = rankStructure[szerv];
  const kategoriak = szervek[besorolas];*/
  //const beosztasok = [] as Record<string, string>;
  
  //console.log(kategoriak);

  /*
  console.log(kategoriak["A kategória"]);
  for (let kategoria in kategoriak) {
    console.log(kategoria);
    for (let item in kategoriak[kategoria]) {
      for (let _i = 0; _i < kategoriak.length; _i++){
        
      }
      
      //console.log(kategoriak[kategoria]);
      for (let _beosztas in item) {
        //console.log(_beosztas);
      }
    }
  }*/
  //beosztasok.push(kategoriak[i] as Record<string, string>);
  //console.log(beosztasok);

  
  if (!szervMap) return null;
  const beosztasMap = szervMap[szerv];
  if (!beosztasMap) return null;
  return beosztasMap[beosztas] || null;
}

function getBeosztasDescription(beosztas: Beosztas): string {
  if (!beosztas) return '';
  return (config.beosztasDescriptions as Record<string, string>)[beosztas] || '';
}



export default function App() {
  const [besorolas, setBesorolas] = useState<Besorolas>('');
  const [szerv, setSzerv] = useState<Szerv>('');
  const [beosztas, setBeosztas] = useState<Beosztas>('');

  //console.log(rankDataJson);
  //const rankData = rankDataJson as RankData;
  /*console.log(rankData);

  const categories = rankData?.Helyi?.Tiszthelyettes;

  if (!categories) return [];

  const ranks = Object.values(categories).flat();
  console.log(ranks);*/

  

  const handleBesorolasChange = (value: Besorolas) => {
    setBesorolas(value);
    setSzerv('');
  };

  /*const handleSzervChange = (value: Szerv) => {
    setSzerv(value);
    getBeosztasokBySzervAndBesorolas(szerv, besorolas);
  }*/

  return (
    <div className="min-h-screen bg-[#0f1419] text-[#e7e9ea]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#1a1f2e] border-b border-[#2f3948] px-4 py-6 shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Rendőrségi Illetmény Kalkulátor
          </h1>
          <p className="text-sm md:text-base text-[#8b98a5]">
            30/2015. (VI. 16.) BM rendelet és 2015. évi XLII. törvény alapján készítve
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Controls */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#1a1f2e] rounded-xl border border-[#2f3948] p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Adatok megadása
              </h2>

              {/* Besorolasi Osztályok Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#8b98a5] mb-2">
                  Besorolási Osztály
                </label>
                <select
                  value={besorolas}
                  onChange={(e) => handleBesorolasChange(e.target.value as Besorolas)}
                  className="w-full bg-[#242b3d] border border-[#2f3948] rounded-lg px-4 py-3 text-[#e7e9ea] cursor-pointer transition-all duration-200 hover:border-[#3b82f6]"
                >
                  <option value="">Válasszon...</option>
                  <option value="Vezető">Vezető</option>
                  <option value="Tiszt">Tiszt</option>
                  <option value="Tiszthelyettes">Tiszthelyettes</option>
                </select>
              </div>

              {/* Szerv Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#8b98a5] mb-2">
                  Szerv
                </label>
                <select
                  value={szerv}
                  onChange={(e) => setSzerv(e.target.value as Szerv)}
                  disabled={!besorolas}
                  className="w-full bg-[#242b3d] border border-[#2f3948] rounded-lg px-4 py-3 text-[#e7e9ea] cursor-pointer transition-all duration-200 hover:border-[#3b82f6] disabled:hover:border-[#2f3948]"
                >
                  <option value="">Válasszon...</option>
                  <option value="Központi">Központi</option>
                  <option value="Területi">Területi</option>
                  <option value="Helyi">Helyi</option>
                </select>
                {!besorolas && (
                  <p className="mt-2 text-xs text-[#6b7280]">
                    Először válasszon besorolási osztályt
                  </p>
                )}
              </div>

              {/* Beosztás Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#8b98a5] mb-2">
                  Beosztás
                </label>
                <select
                  value={beosztas}
                  onChange={(e) => setBeosztas(e.target.value as Beosztas)}
                  disabled={!szerv}
                  className="w-full bg-[#242b3d] border border-[#2f3948] rounded-lg px-4 py-3 text-[#e7e9ea] cursor-pointer transition-all duration-200 hover:border-[#3b82f6] disabled:hover:border-[#2f3948]"
                >
                  <option value="">Válasszon...</option>
                  {getBeosztasokBySzervAndBesorolas(rankDataJson as RankData, szerv, besorolas).map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                  {/*config.beosztasOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))*/}
                </select>
                {!szerv && (
                  <p className="mt-2 text-xs text-[#6b7280]">
                    Először válasszon szervet
                  </p>
                )}
              </div>
              
            </div>
          </div>

          {/* Right Panel - Calculations */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#1a1f2e] rounded-xl border border-[#2f3948] p-6 shadow-xl h-full">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Számítás részletei
              </h2>

              <div className="space-y-4">
                {/* Selected Values Display */}
                <div className="bg-[#242b3d] rounded-lg p-4 border border-[#2f3948]">
                  <h3 className="text-sm font-medium text-[#8b98a5] mb-3">Kiválasztott értékek</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6b7280]">Besorolási Osztály:</span>
                      <span className={`font-medium ${besorolas ? 'text-white' : 'text-[#6b7280]'}`}>
                        {besorolas || 'Nincs kiválasztva'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6b7280]">Szerv:</span>
                      <span className={`font-medium ${szerv ? 'text-white' : 'text-[#6b7280]'}`}>
                        {szerv || 'Nincs kiválasztva'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6b7280]">Beosztás:</span>
                      <span className={`font-medium ${beosztas ? 'text-white' : 'text-[#6b7280]'}`}>
                        {beosztas || 'Nincs kiválasztva'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Calculation Steps */}
                {(besorolas || szerv || beosztas) && (
                  <div className="bg-[#242b3d] rounded-lg p-4 border border-[#2f3948]">
                    <h3 className="text-sm font-medium text-[#8b98a5] mb-3">Számítási lépések</h3>
                    <div className="space-y-3 text-sm">
                      {besorolas && (
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-xs font-bold text-white shrink-0">
                            1
                          </div>
                          <div>
                            <p className="text-white">Besorolási osztály: <span className="font-semibold text-[#3b82f6]">{besorolas}</span></p>
                            <p className="text-[#6b7280] text-xs mt-1">
                              {besorolas === 'Vezető' && 'Felsőbb szintű irányítási funkció'}
                              {besorolas === 'Tiszt' && 'Közép szintű parancsnoki funkció'}
                              {besorolas === 'Tiszthelyettes' && 'Alsóbb szintű végrehajtói funkció'}
                            </p>
                          </div>
                        </div>
                      )}
                      {szerv && (
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center text-xs font-bold text-white shrink-0">
                            2
                          </div>
                          <div>
                            <p className="text-white">Szerv típus: <span className="font-semibold text-[#10b981]">{szerv}</span></p>
                            <p className="text-[#6b7280] text-xs mt-1">
                              {szerv === 'Központi' && 'Központi szerv'}
                              {szerv === 'Területi' && 'Területi szerv'}
                              {szerv === 'Helyi' && 'Helyi szerv'}
                            </p>
                          </div>
                        </div>
                      )}
                      {beosztas && (
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#f59e0b] flex items-center justify-center text-xs font-bold text-white shrink-0">
                            3
                          </div>
                          <div className="flex-1">
                            <p className="text-white">Beosztás: <span className="font-semibold text-[#f59e0b]">{beosztas}</span></p>
                            <p className="text-[#6b7280] text-xs mt-1">
                              {getBeosztasDescription(beosztas)}
                            </p>
                            {(getKategoria(besorolas, szerv, beosztas) || getMultiplier(besorolas, szerv, beosztas)) && (
                              <div className="text-xs mt-1 space-y-0.5">
                                {getKategoria(besorolas, szerv, beosztas) && (
                                  <div className="flex">
                                    <span className="text-[#6b7280] w-16 shrink-0">Kategória:</span>
                                    <span className="font-medium text-white ml-2">{getKategoria(besorolas, szerv, beosztas)}</span>
                                  </div>
                                )}
                                {getMultiplier(besorolas, szerv, beosztas) && (
                                  <div className="flex">
                                    <span className="text-[#6b7280] w-16 shrink-0">Szorzó:</span>
                                    <span className="font-medium text-white ml-2">{getMultiplier(besorolas, szerv, beosztas)}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!besorolas && !szerv && !beosztas && (
                  <div className="text-center py-8 text-[#6b7280]">
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p>Válasszon értékeket a számítás megtekintéséhez</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

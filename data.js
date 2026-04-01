// Shared default data & localStorage helpers
const STORAGE_KEY = "cdf_drugs_data";
const DATA_VERSION_KEY = "cdf_data_version";
const DATA_VERSION = 3; // bump to force reload from DEFAULT_DATA
const COLUMNS_KEY = "cdf_custom_columns";

// Custom columns: { id, name, position: "before_indication"|"after_budget" }
// Each drug stores values in `custom: { [colId]: "value" }`

function loadColumns() {
  try {
    const stored = localStorage.getItem(COLUMNS_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) { /* ignore */ }
  return [];
}

function saveColumns(cols) {
  localStorage.setItem(COLUMNS_KEY, JSON.stringify(cols));
}

function getNextColId(cols) {
  return cols.length ? Math.max(...cols.map(c => c.id)) + 1 : 1;
}

const DEFAULT_DATA = [
  {
    id: 0, disease: "非小細胞肺癌", ingredient: "Pembrolizumab", product: "吉舒達 / Keytruda", effectiveDate: "尚未給付",
    yearly: {
      2025: { people: "-", cost: "-", budget: "-" },
      2026: { people: "-", cost: "-", budget: "-" },
      2027: { people: "-", cost: "-", budget: "-" },
      2028: { people: "-", cost: "-", budget: "-" },
      2029: { people: "-", cost: "-", budget: "-" },
    },
    indication: [
      "非小細胞肺癌第一線用藥、鱗狀非小細胞肺癌第二線用藥、肺腺癌第三線用藥。",
      "非小細胞肺癌轉移性非鱗狀非小細胞肺癌第一線，限 pembrolizumab 與 pemetrexed (限使用 Pexeda 或 Apeta) 及含鉑類化學療法併用做為轉移性，不具有 EGFR/ALK/ROS-1 腫瘤基因異常。"
    ]
  },
  {
    id: 1, disease: "非小細胞肺癌", ingredient: "Atezolizumab", product: "泰聖奇 / Tecentriq", effectiveDate: "-",
    yearly: {
      2025: { people: "-", cost: "-", budget: "-" },
      2026: { people: "-", cost: "-", budget: "-" },
      2027: { people: "-", cost: "-", budget: "-" },
      2028: { people: "-", cost: "-", budget: "-" },
      2029: { people: "-", cost: "-", budget: "-" },
    },
    indication: [
      "非小細胞肺癌第一線用藥、鱗狀非小細胞肺癌第二線用藥、肺腺癌第三線用藥。",
      "非小細胞肺癌轉移性非鱗狀非小細胞肺癌第一線，限 atezolizumab 與 bevacizumab (限使用 Avastin) 及 carboplatin、paclitaxel 併用，不具有 EGFR/ALK/ROS-1 腫瘤基因異常。"
    ]
  },
  {
    id: 2, disease: "非小細胞肺癌", ingredient: "Amivantamab", product: "肺倍恩 / Rybrevant", effectiveDate: "2025.10.1",
    yearly: {
      2025: { people: "12 人", cost: "0.73 億", budget: "0.183 億" },
      2026: { people: "48 人", cost: "2.92 億", budget: "2.92 億" },
      2027: { people: "72 人", cost: "4.38 億", budget: "4.38 億" },
      2028: { people: "90 人", cost: "5.48 億", budget: "5.48 億" },
      2029: { people: "103 人", cost: "6.27 億", budget: "6.27 億" },
    },
    indication: [
      "與 carboplatin 及 pemetrexed 併用，適用於罹患帶有表皮生長因子受體(EGFR) exon 20 插入突變之局部晚期或轉移性非小細胞肺癌 (NSCLC) 的成人病人，作為第一線治療。"
    ]
  },
  {
    id: 3, disease: "乳癌", ingredient: "Pembrolizumab", product: "吉舒達 / Keytruda", effectiveDate: "2025.6.1",
    yearly: {
      2025: { people: "1,591 人", cost: "15.44 億", budget: "8.978 億" },
      2026: { people: "2,716 人", cost: "26.36 億", budget: "26.36 億" },
      2027: { people: "3,650 人", cost: "35.43 億", budget: "35.43 億" },
      2028: { people: "4,380 人", cost: "42.52 億", budget: "42.52 億" },
      2029: { people: "4,950 人", cost: "48.05 億", budget: "48.05 億" },
    },
    indication: [
      "早期三陰性乳癌：非轉移性、第 II 期至第 IIIb 期（ cT1c N1-2 或 T2-4 N0-2）成年病人，限至多使用 17 個療程。"
    ]
  },
  {
    id: 4, disease: "大腸直腸癌", ingredient: "Pembrolizumab", product: "吉舒達 / Keytruda", effectiveDate: "2025.6.1",
    yearly: {
      2025: { people: "1,977 人", cost: "19.75 億", budget: "11.479 億" },
      2026: { people: "3,377 人", cost: "33.74 億", budget: "33.74 億" },
      2027: { people: "4,536 人", cost: "45.32 億", budget: "45.32 億" },
      2028: { people: "5,443 人", cost: "54.39 億", budget: "54.39 億" },
      2029: { people: "6,150 人", cost: "61.46 億", budget: "61.46 億" },
    },
    indication: [
      "無法切除或轉移性高微衛星不穩定性(MSI-H)或錯誤配對修復功能不足性(dMMR)大腸直腸癌 (CRC)之成年病人第一線治療。"
    ]
  },
  {
    id: 5, disease: "多發性骨髓瘤", ingredient: "Elranatamab", product: "癌適求 / Elrexfio", effectiveDate: "2025.5.1",
    yearly: {
      2025: { people: "826 人", cost: "9.09 億", budget: "6.06 億" },
      2026: { people: "1,240 人", cost: "13.65 億", budget: "13.65 億" },
      2027: { people: "1,550 人", cost: "17.06 億", budget: "17.06 億" },
      2028: { people: "1,798 人", cost: "19.79 億", budget: "19.79 億" },
      2029: { people: "1,980 人", cost: "21.80 億", budget: "21.80 億" },
    },
    indication: [
      "先前曾接受至少四線療法 (包括一種蛋白酶體抑制劑、一種免疫調節劑和一種抗 CD38 單株抗體)，並在最近治療後顯示為疾病惡化的復發性或難治性多發性骨髓瘤成人病人，且須具有良好日常體能狀態 (ECOG≤2)。"
    ]
  },
  {
    id: 6, disease: "多發性骨髓瘤", ingredient: "Teclistamab", product: "特飛立 / Tecvayli", effectiveDate: "2025.5.1",
    yearly: {
      2025: { people: "256 人", cost: "4.71 億", budget: "3.14 億" },
      2026: { people: "384 人", cost: "7.07 億", budget: "7.07 億" },
      2027: { people: "480 人", cost: "8.83 億", budget: "8.83 億" },
      2028: { people: "557 人", cost: "10.25 億", budget: "10.25 億" },
      2029: { people: "613 人", cost: "11.28 億", budget: "11.28 億" },
    },
    indication: [
      "先前曾接受至少四線療法 (包括一種蛋白酶體抑制劑、一種免疫調節劑和一種抗 CD38 單株抗體)，並在最近治療後顯示疾病惡化的復發性或難治性多發性骨髓瘤成人病人，且須具有良好日常體能狀態 (ECOG ≤ 2)。"
    ]
  },
  {
    id: 7, disease: "淋巴癌", ingredient: "Glofitamab", product: "利癌妥 / Columvi", effectiveDate: "2025.8.1",
    yearly: {
      2025: { people: "99 人", cost: "3.19 億", budget: "1.329 億" },
      2026: { people: "238 人", cost: "7.66 億", budget: "7.66 億" },
      2027: { people: "333 人", cost: "10.72 億", budget: "10.72 億" },
      2028: { people: "400 人", cost: "12.88 億", budget: "12.88 億" },
      2029: { people: "448 人", cost: "14.43 億", budget: "14.43 億" },
    },
    indication: [
      "先前曾接受至少兩線全身治療之復發性或難治性瀰漫性大 B 細胞淋巴瘤 (DLBCL) 的成人病人，具 CD20 抗原陽性，一線曾接受 rituximab 合併化學治療 (包含CD20)，及含有 anthracycline 類藥物的治療，治療四個療程以上復發或是於治療中發生疾病惡化者。"
    ]
  },
  {
    id: 8, disease: "淋巴癌", ingredient: "Epcoritamab", product: "艾可來 / Epkinly", effectiveDate: "2025.8.1",
    yearly: {
      2025: { people: "74 人", cost: "1.63 億", budget: "0.679 億" },
      2026: { people: "178 人", cost: "3.91 億", budget: "3.91 億" },
      2027: { people: "249 人", cost: "5.48 億", budget: "5.48 億" },
      2028: { people: "299 人", cost: "6.58 億", budget: "6.58 億" },
      2029: { people: "335 人", cost: "7.37 億", budget: "7.37 億" },
    },
    indication: [
      "先前曾接受至少兩線全身治療之復發性或難治性瀰漫性大 B 細胞淋巴瘤 (DLBCL) 的成人病人，具 CD20 抗原陽性，一線曾接受 rituximab 合併化學治療 (包含CD20)，及含有 anthracycline 類藥物的治療，治療四個療程以上復發或是於治療中發生疾病惡化者。"
    ]
  },
  {
    id: 9, disease: "淋巴癌", ingredient: "Tafasitamab", product: "明諾凱 / Minjuvi", effectiveDate: "2025.10.1",
    yearly: {
      2025: { people: "12 人", cost: "0.38 億", budget: "0.095 億" },
      2026: { people: "48 人", cost: "1.52 億", budget: "1.52 億" },
      2027: { people: "72 人", cost: "2.28 億", budget: "2.28 億" },
      2028: { people: "86 人", cost: "2.73 億", budget: "2.73 億" },
      2029: { people: "98 人", cost: "3.10 億", budget: "3.10 億" },
    },
    indication: [
      "與lenalidomide併用及接續單獨使用，適用於治療復發型(relapsed)或難治型(refractory)且不適合接受自體幹細胞移植(ASCT)的瀰漫性大型B細胞淋巴瘤(DLBCL)成人病人。"
    ]
  },
  {
    id: 10, disease: "神經纖維瘤", ingredient: "Selumetinib", product: "科舒洛 / Koselugo", effectiveDate: "2025.2.1",
    yearly: {
      2025: { people: "52 人", cost: "1 億", budget: "1.623 億" },
      2026: { people: "89 人", cost: "1.71 億", budget: "1.71 億" },
      2027: { people: "120 人", cost: "2.31 億", budget: "2.31 億" },
      2028: { people: "144 人", cost: "2.77 億", budget: "2.77 億" },
      2029: { people: "163 人", cost: "3.13 億", budget: "3.13 億" },
    },
    indication: [
      "3 歲以上至未滿 18 歲第 1 型神經纖維瘤 (NF1) 合併有症狀且無法手術切除的叢狀神經纖維瘤 (PN) 之兒童病患。"
    ]
  },
];

function loadData() {
  try {
    const storedVersion = Number(localStorage.getItem(DATA_VERSION_KEY));
    if (storedVersion < DATA_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(DATA_VERSION_KEY, DATA_VERSION);
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) { /* ignore */ }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getNextId(data) {
  return data.length ? Math.max(...data.map(d => d.id)) + 1 : 0;
}

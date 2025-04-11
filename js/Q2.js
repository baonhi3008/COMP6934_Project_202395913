let activeDetailCountry = null;
function binCO2(val) {
  if (val == null || isNaN(val)) return null;
  if (val < 3) return 0;
  if (val < 10) return 1;
  if (val < 30) return 2;
  if (val < 100) return 3;
  if (val < 300) return 4;
  if (val < 1000) return 5;
  if (val < 3000) return 6;
  if (val < 10000) return 7;
  return 8;
}
const co2Colorscale = [
  [0.0, "#fefce5"],
  [1 / 9, "#fefce5"],
  [1 / 9, "#fff7bc"],
  [2 / 9, "#fff7bc"],
  [2 / 9, "#fee391"],
  [3 / 9, "#fee391"],
  [3 / 9, "#fec44f"],
  [4 / 9, "#fec44f"],
  [4 / 9, "#fe9929"],
  [5 / 9, "#fe9929"],
  [5 / 9, "#ec7014"],
  [6 / 9, "#ec7014"],
  [6 / 9, "#cc4c02"],
  [7 / 9, "#cc4c02"],
  [7 / 9, "#993404"],
  [8 / 9, "#993404"],
  [8 / 9, "#662506"],
  [1.0, "#662506"],
];
function binCO2PerCapita(val) {
  if (val == null || isNaN(val)) return null;
  if (val < 0.1) return 0;
  if (val < 0.2) return 1;
  if (val < 0.5) return 2;
  if (val < 1) return 3;
  if (val < 2) return 4;
  if (val < 5) return 5;
  if (val < 10) return 6;
  if (val < 20) return 7;
  return 8;
}
const co2PerCapitaColorscale = [
  [0.0, "#fefce5"],
  [1 / 9, "#fefce5"],
  [1 / 9, "#fff7bc"],
  [2 / 9, "#fff7bc"],
  [2 / 9, "#fee391"],
  [3 / 9, "#fee391"],
  [3 / 9, "#fec44f"],
  [4 / 9, "#fec44f"],
  [4 / 9, "#fe9929"],
  [5 / 9, "#fe9929"],
  [5 / 9, "#ec7014"],
  [6 / 9, "#ec7014"],
  [6 / 9, "#cc4c02"],
  [7 / 9, "#cc4c02"],
  [7 / 9, "#993404"],
  [8 / 9, "#993404"],
  [8 / 9, "#662506"],
  [1.0, "#662506"],
];
function binMethane(val) {
  if (val == null || isNaN(val)) return null;
  if (val < 10) return 0;
  if (val < 30) return 1;
  if (val < 100) return 2;
  if (val < 300) return 3;
  if (val < 1000) return 4;
  return 5;
}
const MethaneColorscale = [
  [0.0, "#B589D6"],
  [0.1667, "#B589D6"],
  [0.1667, "#A471CC"],
  [0.3333, "#A471CC"],
  [0.3333, "#944BC3"],
  [0.5, "#944BC3"],
  [0.5, "#8335B9"],
  [0.6667, "#8335B9"],
  [0.6667, "#6B289D"],
  [0.8333, "#6B289D"],
  [0.8333, "#552586"],
  [1.0, "#552586"],
];
function binShareGlobalCO2(val) {
  if (val == null || isNaN(val)) return null;
  if (val < 0.5) return 0;
  if (val < 1) return 1;
  if (val < 2) return 2;
  if (val < 5) return 3;
  return 4;
}
const shareGlobalCO2Colorscale = [
  [0.0, "#ffe6f0"],
  [0.2, "#ffe6f0"],
  [0.2, "#ffb3c1"],
  [0.4, "#ffb3c1"],
  [0.4, "#ff8a9e"],
  [0.6, "#ff8a9e"],
  [0.6, "#ff6600"],
  [0.8, "#ff6600"],
  [0.8, "#ff4500"],
  [1.0, "#ff4500"],
];
function binMethanePerCapita(val) {
  if (val == null || isNaN(val)) return null;
  if (val < 1) return 0;
  if (val < 2) return 1;
  if (val < 3) return 2;
  if (val < 4) return 3;
  if (val < 5) return 4;
  if (val < 6) return 5;
  if (val < 7) return 6;
  if (val < 8) return 7;
  return 8;
}
const methanePerCapitaColorscale = [
  [0.0, "#ede7f6"],
  [1 / 9, "#ede7f6"],
  [1 / 9, "#d1c4e9"],
  [2 / 9, "#d1c4e9"],
  [2 / 9, "#b39ddb"],
  [3 / 9, "#b39ddb"],
  [3 / 9, "#9575cd"],
  [4 / 9, "#9575cd"],
  [4 / 9, "#7e57c2"],
  [5 / 9, "#7e57c2"],
  [5 / 9, "#673ab7"],
  [6 / 9, "#673ab7"],
  [6 / 9, "#5e35b1"],
  [7 / 9, "#5e35b1"],
  [7 / 9, "#512da8"],
  [8 / 9, "#512da8"],
  [8 / 9, "#4527a0"],
  [1.0, "#4527a0"],
];

// ==== Bubble metric configurations ====
const bubbleMetricConfigs = {
  co2: {
    binFunction: binCO2,
    colorscale: co2Colorscale,
    cmax: 9,
    tickVals: [0, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5],
    tickText: [
      "0-3 million",
      "3-10 million",
      "10-30 million",
      "30-100 million",
      "100-300 million",
      "300 million - 1 billion ",
      "1-3 billion",
      "3-10 billion",
      ">10 billion",
    ],
    colorbarTitle: "CO₂ (in tonnes)",
  },
  co2_per_capita: {
    binFunction: binCO2PerCapita,
    colorscale: co2PerCapitaColorscale,
    cmax: 8,
    tickVals: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5],
    tickText: [
      "<0.1",
      "0.1–0.2",
      "0.2–0.5",
      "0.5–1",
      "1–2",
      "2–5",
      "5–10",
      "10–20",
      ">20",
    ],
    colorbarTitle: "CO₂ per Capita",
  },
  methane: {
    binFunction: binMethane,
    colorscale: MethaneColorscale,
    cmax: 6,
    tickVals: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5],
    tickText: [
      "0-10 million",
      "10-30 million",
      "30-100million",
      "100-300 million",
      "300 million - 1 billion",
      ">1 billion",
    ],
    colorbarTitle: "Methane (in tonnes)",
  },
  share_global_co2: {
    binFunction: binShareGlobalCO2,
    colorscale: shareGlobalCO2Colorscale,
    cmax: 4,
    tickVals: [0.5, 1.5, 2.5, 3.5],
    tickText: ["<0.5%", "0.5–1%", "1–2%", "2–5%", ">5%"],
    colorbarTitle: "Share Global CO₂",
  },
  methane_per_capita: {
    binFunction: binMethanePerCapita,
    colorscale: methanePerCapitaColorscale,
    cmax: 9,
    tickVals: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5],
    tickText: [
      "<1 t/person",
      "1–2 t/person",
      "2–3 t/person",
      "3–4 t/person",
      "4–5 t/person",
      "5–6 t/person",
      "6–7 t/person",
      "7–8 t/person",
      "≥8 t/person",
    ],
    colorbarTitle: "Methane per Capita",
  },
};

// ==== Economic metric configurations ====
const economicMetricConfigs = {
  gdp: {
    binFunction: (val) => {
      if (val === null || isNaN(val)) return null;
      if (val < 1e10) return 0;
      if (val < 3e10) return 1;
      if (val < 1e11) return 2;
      if (val < 3e11) return 3;
      if (val < 1e12) return 4;
      if (val < 3e12) return 5;
      if (val < 1e13) return 6;
      return 7;
    },
    colorScale: [
      [0.0, "#f8f5fa"],
      [0.125, "#f8f5fa"],
      [0.125, "#ebe7f3"],
      [0.25, "#ebe7f3"],
      [0.25, "#d5d2ec"],
      [0.375, "#d5d2ec"],
      [0.375, "#b0bce0"],
      [0.5, "#b0bce0"],
      [0.5, "#82a0d4"],
      [0.625, "#82a0d4"],
      [0.625, "#5788c9"],
      [0.75, "#5788c9"],
      [0.75, "#326dac"],
      [0.875, "#326dac"],
      [0.875, "#124b8d"],
      [1.0, "#124b8d"],
    ],
    zmin: 0,
    zmax: 8,
    tickVals: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5],
    tickText: [
      "$0–10 billion",
      "$10–30 billion",
      "$30–100 billion",
      "$100–300 billion",
      "$300 billion–1 trillion",
      "$1–3 trillion",
      "$3–10 trillion",
      ">$10 trillion",
    ],
    colorbarTitle: "GDP",
  },
  gdp_per_capita: {
    binFunction: (val) => {
      if (!val || isNaN(val)) return null;
      if (val < 1000) return 0;
      if (val < 2000) return 1;
      if (val < 5000) return 2;
      if (val < 10000) return 3;
      if (val < 20000) return 4;
      if (val < 50000) return 5;
      return 6;
    },
    colorScale: [
      [0.0, "#ecf9ec"],
      [1 / 7, "#ecf9ec"],
      [1 / 7, "#d6f1d4"],
      [2 / 7, "#d6f1d4"],
      [2 / 7, "#b8e2b8"],
      [3 / 7, "#b8e2b8"],
      [3 / 7, "#99c9c2"],
      [4 / 7, "#99c9c2"],
      [4 / 7, "#80b2d1"],
      [5 / 7, "#80b2d1"],
      [5 / 7, "#578ec3"],
      [6 / 7, "#578ec3"],
      [6 / 7, "#2a65b0"],
      [1.0, "#2a65b0"],
    ],
    zmin: 0,
    zmax: 7,
    tickVals: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5],
    tickText: ["<1k", "1k–2k", "2k–5k", "5k–10k", "10k–20k", "20k–50k", ">50k"],
    colorbarTitle: "GDP per Capita",
  },
  pct_urban_population: {
    binFunction: (val) => {
      if (val == null) return null;
      if (val < 0) val = 0;
      let bin = Math.floor(val / 10);
      if (bin >= 10) bin = 9;
      return bin;
    },
    colorScale: [
      [0.0, "#edf8e9"],
      [0.1, "#edf8e9"],
      [0.1, "#c7e9c0"],
      [0.2, "#c7e9c0"],
      [0.2, "#a1d99b"],
      [0.3, "#a1d99b"],
      [0.3, "#74c476"],
      [0.4, "#74c476"],
      [0.4, "#41ab5d"],
      [0.5, "#41ab5d"],
      [0.5, "#238b45"],
      [0.6, "#238b45"],
      [0.6, "#006d2c"],
      [0.7, "#006d2c"],
      [0.7, "#00441b"],
      [0.8, "#00441b"],
      [0.8, "#003314"],
      [0.9, "#003314"],
      [0.9, "#00220a"],
      [1.0, "#00220a"],
    ],
    zmin: 0,
    zmax: 10,
    tickVals: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5],
    tickText: [
      "0–10%",
      "10–20%",
      "20–30%",
      "30–40%",
      "40–50%",
      "50–60%",
      "60–70%",
      "70–80%",
      "80–90%",
      "90–100%",
    ],
    colorbarTitle: "Urbanization",
  },
};

// ==== additional economic configs ====
const metricDisplayNames = {
  gdp: "GDP",
  gdp_per_capita: "GDP Per Capita",
  energy_per_capita: "Per-Capita Consumption",
  primary_energy_consumption: "Primary Consumption",
  pct_urban_population: "Urbanization Rate",
  population: "Population",
};

// ==== region centers and utilities ====
const regionCenters = {
  Global: { lat: 0, lon: 0, scale: 0.9 },
  Africa: { lat: 2, lon: 20, scale: 1.7 },
  Asia: { lat: 30, lon: 95, scale: 1.5 },
  Europe: { lat: 55, lon: 20, scale: 2.5 },
  Americas: { lat: 15, lon: -50, scale: 1.5 },
  Oceania: { lat: -20, lon: 140, scale: 2.0 },
};
const subregionCenters = {
  "Southern Asia": { lat: 15, lon: 80, scale: 2.2 },
  "Southern Europe": { lat: 40, lon: 20, scale: 2.3 },
  "Northern Africa": { lat: 20, lon: 15, scale: 2.2 },
  "Sub-Saharan Africa": { lat: -2, lon: 20, scale: 2.0 },
  Caribbean: { lat: 17, lon: -70, scale: 3.5 },
  "South America": { lat: -15, lon: -60, scale: 1.5 },
  "Western Asia (Middle East)": { lat: 30, lon: 45, scale: 2.2 },
  Oceania: { lat: -25, lon: 133, scale: 2.0 },
  "Western Europe": { lat: 49, lon: 4, scale: 2.5 },
  "Eastern Europe": { lat: 55, lon: 30, scale: 2.5 },
  "Central America": { lat: 10, lon: -85, scale: 3.0 },
  "Southeastern Asia": { lat: 10, lon: 105, scale: 2.5 },
  "North America": { lat: 45, lon: -100, scale: 1.4 },
  "Eastern Asia": { lat: 35, lon: 110, scale: 1.8 },
  "Northern Europe": { lat: 60, lon: 15, scale: 2.5 },
  "Central Asia": { lat: 45, lon: 65, scale: 2.2 },
};

function getRegionGroup(regionName) {
  const regionGroups = {
    Africa: ["Northern Africa", "Sub-Saharan Africa"],
    Asia: [
      "Eastern Asia",
      "Southern Asia",
      "Southeastern Asia",
      "Western Asia (Middle East)",
      "Central Asia",
    ],
    Europe: [
      "Northern Europe",
      "Southern Europe",
      "Western Europe",
      "Eastern Europe",
    ],
    Americas: [
      "North America",
      "Central America",
      "Caribbean",
      "South America",
    ],

    Oceania: ["Oceania"],
  };
  return regionGroups[regionName] || [];
}
function getContinentForRecord(d) {
  for (const cont in regionCenters) {
    if (cont !== "Global") {
      const subs = getRegionGroup(cont);
      if (subs.includes(d.subregions)) return cont;
    }
  }
  return "Other";
}

// ==== setup region dropdown ====

function populateRegionSelect(rawData) {
  const regionSelect = document.getElementById("regionSelect");
  regionSelect.innerHTML = "";
  const continents = [
    "Global",
    "Africa",
    "Asia",
    "Europe",
    "Americas",
    "Oceania",
  ];

  const continentGroup = document.createElement("optgroup");
  continentGroup.label = "Continents";
  continents.forEach((r) => {
    const opt = document.createElement("option");
    opt.value = r;
    opt.textContent = r;
    continentGroup.appendChild(opt);
  });
  regionSelect.appendChild(continentGroup);
  const subregionGroup = document.createElement("optgroup");
  subregionGroup.label = "Subregions";

  const uniqueSubs = Array.from(
    new Set(
      rawData
        .filter((d) => d.subregion && d.subregion !== "Global")
        .map((d) => d.subregion.trim())
    )
  );
  uniqueSubs.sort();
  uniqueSubs.forEach((sr) => {
    const opt = document.createElement("option");
    opt.value = sr;
    opt.textContent = sr;
    subregionGroup.appendChild(opt);
  });
  regionSelect.appendChild(subregionGroup);
}
let rawData;
let currentMapData = [];

// scatter Chart
function drawScatterChart(region, consumptionMetric) {
  const year = +yearSlider.value;
  let scatterData = [];
  if (region === "Global") {
    scatterData = rawData.filter(
      (d) => d.year === year && d.iso_code && d.iso_code.length === 3
    );
  } else if (region in regionCenters) {
    const subs = getRegionGroup(region);
    scatterData = rawData.filter(
      (d) => d.year === year && subs.includes(d.subregions)
    );
  } else {
    scatterData = rawData.filter(
      (d) => d.year === year && d.subregions === region
    );
  }

  // get the user’s chosen environmental metric
  const envMetric = envMetricSelect.value;
  const envConfig = bubbleMetricConfigs[envMetric];

  // bubble sizes and color bins
  const bubbleSizes = scatterData.map((d) =>
    d[consumptionMetric] ? Math.sqrt(d[consumptionMetric]) * 2 : 5
  );
  const bubbleColors = scatterData.map((d) =>
    envConfig.binFunction(d[envMetric])
  );

  const trace = {
    x: scatterData.map((d) => d.gdp),
    y: scatterData.map((d) => d[consumptionMetric]),
    text: scatterData.map((d) => d.country),
    mode: "markers",
    marker: {
      size: bubbleSizes,
      color: bubbleColors,
      colorscale: envConfig.colorscale,
      cmin: 0,
      cmax: envConfig.cmax,
      sizemode: "area",
      symbol: "circle",
      colorbar: {
        tickvals: envConfig.tickVals,
        ticktext: envConfig.tickText,
        title: envConfig.colorbarTitle,
      },
    },
    hovertemplate:
      "<b>%{text}</b><br>GDP: %{x}<br>" +
      `${metricDisplayNames[consumptionMetric]}: %{y}<extra></extra>`,
  };

  const layout = {
    title: `Scatter: Emissions vs. ${metricDisplayNames[consumptionMetric]} (${region})`,
    xaxis: { title: "GDP", type: "log" },
    yaxis: { title: metricDisplayNames[consumptionMetric], type: "log" },
    transition: { duration: 500, easing: "cubic-in-out" },
  };

  Plotly.react("scatterChart", [trace], layout);
}

// growth Chart (1993 to 2022)
function drawGrowthChart(region, envMetric) {
  const years = d3.range(1993, 2022);
  let traces = [];
  if (region === "Global") {
    const globalData = rawData.filter(
      (d) => d.iso_code && d.iso_code.length === 3
    );
    const groups = d3.group(globalData, (d) => getContinentForRecord(d));
    groups.forEach((vals, continent) => {
      const yVals = years.map((yr) => {
        const yearData = vals.filter(
          (d) => d.year === yr && !isNaN(d[envMetric])
        );
        return yearData.length ? d3.mean(yearData, (d) => d[envMetric]) : null;
      });
      traces.push({
        x: years,
        y: yVals,
        mode: "lines+markers",
        name: continent,
        opacity: 0.8,
      });
    });
  } else if (region in regionCenters) {
    const regionData = rawData.filter(
      (d) =>
        d.iso_code &&
        d.iso_code.length === 3 &&
        getContinentForRecord(d) === region
    );
    const overallYVals = years.map((yr) => {
      const yearData = regionData.filter(
        (d) => d.year === yr && !isNaN(d[envMetric])
      );
      return yearData.length ? d3.mean(yearData, (d) => d[envMetric]) : null;
    });
    traces.push({
      x: years,
      y: overallYVals,
      mode: "lines",
      name: region,
      line: { width: 3 },
      opacity: 0.9,
    });
    const subs = getRegionGroup(region);
    subs.forEach((subreg) => {
      const subData = rawData.filter(
        (d) => d.iso_code && d.iso_code.length === 3 && d.subregions === subreg
      );
      if (subData.length > 0) {
        const subYVals = years.map((yr) => {
          const yearData = subData.filter(
            (d) => d.year === yr && !isNaN(d[envMetric])
          );
          return yearData.length
            ? d3.mean(yearData, (d) => d[envMetric])
            : null;
        });
        traces.push({
          x: years,
          y: subYVals,
          mode: "lines+markers",
          name: subreg,
          opacity: 0.8,
        });
      }
    });
  } else {
    const filtered = rawData.filter(
      (d) => d.iso_code && d.iso_code.length === 3 && d.subregions === region
    );
    const groups = d3.group(filtered, (d) => d.country);
    groups.forEach((vals, country) => {
      vals.sort((a, b) => a.year - b.year);
      let yVals = years.map((yr) => {
        const rec = vals.find((d) => d.year === yr);
        return rec ? rec[envMetric] : null;
      });
      traces.push({
        x: years,
        y: yVals,
        mode: "lines+markers",
        name: country,
        opacity: 0.8,
      });
    });
  }
  const layout = {
    title: `Trend in ${metricDisplayNames[envMetric]} Over Time (${region})`,
    xaxis: { title: "Year", range: [1993, 2022], dtick: 1 },
    yaxis: { title: metricDisplayNames[envMetric] },
    height: 500,
    transition: { duration: 500, easing: "cubic-in-out" },
  };
  Plotly.react("lineChart", traces, layout);
}

function drawEnvMetricTrend(region, envMetric) {
  const years = d3.range(1993, 2022);
  let traces = [];
  let allData = rawData.filter(
    (d) =>
      d.iso_code && d.iso_code.length === 3 && d.year >= 1993 && d.year <= 2022
  );

  if (region === "Global") {
  } else if (regionCenters.hasOwnProperty(region)) {
    // It's a continent mode => get subregions
    const subs = getRegionGroup(region);
    allData = allData.filter((d) => subs.includes(d.subregions));
  } else {
    // subregion mode => filter by that subregion
    allData = allData.filter((d) => d.subregions === region);
  }

  // Group logic:
  //   If 'Global', we might do per-continent lines
  //   If 'continent', we do region-level + subregion lines
  //   If 'subregion', we do country lines
  if (region === "Global") {
    // group by continent
    const groups = d3.group(allData, (d) => getContinentForRecord(d));
    groups.forEach((vals, continentName) => {
      let yVals = years.map((y) => {
        let recs = vals.filter((r) => r.year === y && !isNaN(r[envMetric]));
        return recs.length ? d3.mean(recs, (r) => r[envMetric]) : null;
      });
      traces.push({
        x: years,
        y: yVals,
        mode: "lines+markers",
        name: continentName,
        opacity: 0.8,
      });
    });
  } else if (regionCenters.hasOwnProperty(region)) {
    const regionData = allData;
    // overall line
    let overallVals = years.map((y) => {
      const recs = regionData.filter(
        (r) => r.year === y && !isNaN(r[envMetric])
      );
      return recs.length ? d3.mean(recs, (r) => r[envMetric]) : null;
    });
    traces.push({
      x: years,
      y: overallVals,
      mode: "lines",
      name: region,
      line: { width: 3 },
      opacity: 0.9,
    });
    // subregion lines
    const subGroups = d3.group(regionData, (d) => d.subregions);
    subGroups.forEach((vals, subReg) => {
      let yVals = years.map((y) => {
        const recs = vals.filter((r) => r.year === y && !isNaN(r[envMetric]));
        return recs.length ? d3.mean(recs, (r) => r[envMetric]) : null;
      });
      traces.push({
        x: years,
        y: yVals,
        mode: "lines+markers",
        name: subReg,
        opacity: 0.8,
      });
    });
  } else {
    const subData = allData;
    const byCountry = d3.group(subData, (d) => d.country);
    byCountry.forEach((vals, cName) => {
      vals.sort((a, b) => a.year - b.year);
      let yVals = years.map((y) => {
        const rec = vals.find((r) => r.year === y);
        return rec ? rec[envMetric] : null;
      });
      traces.push({
        x: years,
        y: yVals,
        mode: "lines+markers",
        name: cName,
        opacity: 0.8,
      });
    });
  }

  // build layout
  const layout = {
    title: `Environmental Metric (${envMetric}) Over Time – (${region})`,
    xaxis: { title: "Year", range: [1993, 2022], dtick: 1 },
    yaxis: { title: envMetric },
    height: 450,
    transition: { duration: 500, easing: "cubic-in-out" },
  };

  // render
  Plotly.react("lineChart", traces, layout);
}

function drawConsumptionTrend(region, consumptionMetric) {
  const years = d3.range(1993, 2022);
  let traces = [];
  let allData = rawData.filter(
    (d) =>
      d.iso_code && d.iso_code.length === 3 && d.year >= 1993 && d.year <= 2022
  );

  // Additional region filter
  if (region === "Global") {
  } else if (regionCenters.hasOwnProperty(region)) {
    const subs = getRegionGroup(region);
    allData = allData.filter((d) => subs.includes(d.subregions));
  } else {
    allData = allData.filter((d) => d.subregions === region);
  }

  // Group logic
  if (region === "Global") {
    const groups = d3.group(allData, (d) => getContinentForRecord(d));
    groups.forEach((vals, continentName) => {
      let yVals = years.map((y) => {
        let recs = vals.filter(
          (r) => r.year === y && !isNaN(r[consumptionMetric])
        );
        return recs.length ? d3.mean(recs, (r) => r[consumptionMetric]) : null;
      });
      traces.push({
        x: years,
        y: yVals,
        mode: "lines+markers",
        name: continentName,
        opacity: 0.8,
      });
    });
  } else if (regionCenters.hasOwnProperty(region)) {
    const regionData = allData;
    let overallVals = years.map((y) => {
      let recs = regionData.filter(
        (r) => r.year === y && !isNaN(r[consumptionMetric])
      );
      return recs.length ? d3.mean(recs, (r) => r[consumptionMetric]) : null;
    });
    traces.push({
      x: years,
      y: overallVals,
      mode: "lines",
      name: region,
      line: { width: 3 },
      opacity: 0.9,
    });
    const subGroups = d3.group(regionData, (d) => d.subregions);
    subGroups.forEach((vals, subReg) => {
      let yVals = years.map((y) => {
        const recs = vals.filter(
          (r) => r.year === y && !isNaN(r[consumptionMetric])
        );
        return recs.length ? d3.mean(recs, (r) => r[consumptionMetric]) : null;
      });
      traces.push({
        x: years,
        y: yVals,
        mode: "lines+markers",
        name: subReg,
        opacity: 0.8,
      });
    });
  } else {
    const byCountry = d3.group(allData, (d) => d.country);
    byCountry.forEach((vals, cName) => {
      vals.sort((a, b) => a.year - b.year);
      let yVals = years.map((y) => {
        const rec = vals.find((r) => r.year === y);
        return rec ? rec[consumptionMetric] : null;
      });
      traces.push({
        x: years,
        y: yVals,
        mode: "lines+markers",
        name: cName,
        opacity: 0.8,
      });
    });
  }

  // layout
  const layout = {
    title: `Consumption Metric (${consumptionMetric}) Over Time – (${region})`,
    xaxis: { title: "Year", range: [1993, 2022], dtick: 1 },
    yaxis: { title: consumptionMetric },
    height: 450,
    transition: { duration: 500, easing: "cubic-in-out" },
  };
  Plotly.react("firstMetricLineChart", traces, layout);
}

function drawPerCapitaScatter(region) {
  // user-selected year from #yearSlider
  const year = +document.getElementById("yearSlider").value;

  // filter rawData for the chosen year
  let filtered = rawData.filter(
    (d) => d.year === year && d.iso_code && d.iso_code.length === 3
  );

  //  filter by region
  if (region !== "Global") {
    if (regionCenters.hasOwnProperty(region)) {
      const subs = getRegionGroup(region);
      filtered = filtered.filter((d) => subs.includes(d.subregions));
    } else {
      filtered = filtered.filter((d) => d.subregions === region);
    }
  }

  //  user-selected bubble color metric
  const colorMetric = document.getElementById("colorMetricSelect").value;
  const colorConfig = economicMetricConfigs[colorMetric];

  // bin for each record
  const colorBins = filtered.map((d) =>
    colorConfig.binFunction(d[colorMetric])
  );

  // x: co2_per_capita, y: energy_per_capita
  const xVals = filtered.map((d) => d.co2_per_capita);
  const yVals = filtered.map((d) => d.energy_per_capita);
  const textVals = filtered.map((d) => d.country);

  // build a single trace with color= colorBins
  const trace = {
    x: xVals,
    y: yVals,
    text: textVals,
    mode: "markers",
    marker: {
      size: 8,
      color: colorBins,
      colorscale: colorConfig.colorScale,
      cmin: colorConfig.zmin,
      cmax: colorConfig.zmax,
      colorbar: {
        tickvals: colorConfig.tickVals,
        ticktext: colorConfig.tickText,
        title: colorConfig.colorbarTitle,
      },
      opacity: 0.7,
    },
    hovertemplate:
      "<b>%{text}</b><br>" +
      "CO₂ p/c: %{x}<br>" +
      "Energy p/c: %{y}<extra></extra>",
  };

  // 8) Plot
  const layout = {
    title: `Per-Capita CO₂ vs. Per-Capita Energy (${year}) – Colored by ${colorMetric}`,
    xaxis: { title: "CO₂ per Capita", type: "log" },
    yaxis: { title: "Energy per Capita", type: "log" },
    height: 450,
  };

  Plotly.newPlot("scatterChart2", [trace], layout);
}
function drawMultipleStackedAreaCharts() {
  // current mode detect
  const regionVal = document.getElementById("regionSelect").value;
  let mode;
  if (regionVal === "Global") {
    mode = "global";
  } else if (regionCenters.hasOwnProperty(regionVal)) {
    mode = "continent";
  } else {
    mode = "subregion";
  }

  // filter rawData
  let dataAll = rawData.filter(
    (d) =>
      d.iso_code && d.iso_code.length === 3 && d.year >= 1993 && d.year < 2023
  );

  // region-based filter
  if (mode === "continent") {
    const subs = getRegionGroup(regionVal);
    dataAll = dataAll.filter((d) => subs.includes(d.subregions));
  } else if (mode === "subregion") {
    dataAll = dataAll.filter((d) => d.subregions === regionVal);
  }

  // group logic:
  let groupKey;
  if (mode === "global") {
    groupKey = (d) => getContinentForRecord(d);
  } else if (mode === "continent") {
    groupKey = (d) => d.subregions;
  } else {
    groupKey = (d) => d.country;
  }

  // group the data
  const groupedData = d3.group(dataAll, groupKey);
  const groupNames = Array.from(groupedData.keys());

  // clear out the container
  const container = document.getElementById("multiStackAreaContainer");
  container.innerHTML = "";

  // each group, build a stacked area chart in its own <div>
  const years = d3.range(1993, 2024);
  const energyKeys = [
    "coal_share_energy",
    "oil_share_energy",
    "gas_share_energy",
    "nuclear_share_energy",
    "renewables_share_energy",
    "other_renewables_share_energy",
  ];
  const energyLabels = [
    "Coal",
    "Oil",
    "Gas",
    "Nuclear",
    "Renewables",
    "Other Renewables",
  ];

  groupNames.forEach((groupName) => {
    const chartDiv = document.createElement("div");
    chartDiv.classList.add("facetChart");
    container.appendChild(chartDiv);
    const recs = groupedData.get(groupName);

    let averages = {};
    years.forEach((yr) => {
      const yearRecs = recs.filter((d) => d.year === yr);
      energyKeys.forEach((k) => {
        const avg = yearRecs.length ? d3.mean(yearRecs, (d) => +d[k]) : 0;
        if (!averages[k]) averages[k] = [];
        averages[k].push(avg);
      });
    });

    let traces = [];
    energyKeys.forEach((k, i) => {
      const fillType = i === 0 ? "tozeroy" : "tonexty";
      traces.push({
        x: years,
        y: averages[k],
        type: "scatter",
        mode: "none",
        fill: fillType,
        stackgroup: "one",
        name: energyLabels[i],
      });
    });

    const layout = {
      title: groupName,
      xaxis: { title: "Year", range: [1993, 2022], dtick: 5 },
      yaxis: { title: "Energy Share (%)" },
      margin: { t: 50, b: 40, l: 50, r: 30 },
    };

    Plotly.newPlot(chartDiv, traces, layout, { responsive: true });
  });
}

function showDetailCard(record) {
  activeDetailCountry = record.country;

  let existing = document.getElementById("detailCard");
  if (existing) {
    existing.remove();
  }

  let card = document.createElement("div");
  card.id = "detailCard";

  let leftSection = document.createElement("div");
  leftSection.style.width = "33%";
  leftSection.style.padding = "10px";
  leftSection.innerHTML = `
        <h3>${record.country}</h3>
        <p><strong>Income Class:</strong> ${record.wb_income_class}</p>
        <p><strong>${
          envMetricSelect.options[envMetricSelect.selectedIndex].text
        }:</strong> ${record[envMetricSelect.value]}</p>
        <p><strong>${
          consumptionSelect.options[consumptionSelect.selectedIndex].text
        }:</strong> ${record[consumptionSelect.value]}</p>
        <p><strong>GDP per Capita:</strong> ${record.gdp_per_capita}</p>
        <p><strong>GDP (Total):</strong> ${record.gdp}</p>
        <p><strong>Urbanization Rate:</strong> ${
          record.pct_urban_population
        }</p>
    `;
  let pieDiv = document.createElement("div");
  pieDiv.id = "detailPieChart";
  pieDiv.style.width = "100%";
  pieDiv.style.height = "300px";
  leftSection.appendChild(pieDiv);

  let rightSection = document.createElement("div");
  rightSection.style.width = "66%";
  rightSection.style.padding = "10px";
  let dualChartDiv = document.createElement("div");
  dualChartDiv.id = "detailDualLineChart";
  dualChartDiv.style.width = "100%";
  dualChartDiv.style.height = "300px";
  let stackedAreaDiv = document.createElement("div");
  stackedAreaDiv.id = "detailStackedAreaChart";
  stackedAreaDiv.style.width = "100%";
  stackedAreaDiv.style.height = "300px";
  rightSection.appendChild(dualChartDiv);
  rightSection.appendChild(stackedAreaDiv);

  card.appendChild(leftSection);
  card.appendChild(rightSection);

  let closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.onclick = function () {
    card.remove();
    activeDetailCountry = null;
  };
  card.appendChild(closeButton);

  document.getElementById("detailCardContainer").appendChild(card);

  // pie chart (energy source shares)
  let energyLabels = [
    "Coal",
    "Oil",
    "Gas",
    "Nuclear",
    "Renewables",
    "Other Renewables",
  ];
  let energyKeys = [
    "coal_share_energy",
    "oil_share_energy",
    "gas_share_energy",
    "nuclear_share_energy",
    "renewables_share_energy",
    "other_renewables_share_energy",
  ];
  let energyValues = energyKeys.map((key) => record[key]);
  let pieData = [
    {
      values: energyValues,
      labels: energyLabels,
      type: "pie",
      textinfo: "label+percent",
      insidetextorientation: "radial",
    },
  ];
  Plotly.newPlot("detailPieChart", pieData, {
    title: "Energy Source Shares",
  });

  // combined bar and line chart

  let countryData = rawData.filter((d) => d.country === record.country);
  countryData.sort((a, b) => a.year - b.year);
  let years = d3.range(1993, 2023);
  let envMetric = envMetricSelect.value;
  let econMetric = colorMetricSelect.value;

  let envValues = years.map((yr) => {
    let rec = countryData.find((d) => d.year === yr);
    return rec ? rec[envMetric] : null;
  });
  let econValues = years.map((yr) => {
    let rec = countryData.find((d) => d.year === yr);
    return rec ? rec[econMetric] : null;
  });

  let barTrace = {
    x: years,
    y: econValues,
    type: "bar",
    name: colorMetricSelect.options[colorMetricSelect.selectedIndex].text,
    yaxis: "y",
  };

  let lineTrace = {
    x: years,
    y: envValues,
    type: "scatter",
    mode: "lines+markers",
    name: envMetricSelect.options[envMetricSelect.selectedIndex].text,
    yaxis: "y2",
  };

  let combinedData = [barTrace, lineTrace];

  let combinedLayout = {
    title: "Metric Trends Over Time",
    xaxis: { title: "Year", dtick: 1 },
    yaxis: {
      title: envMetricSelect.options[envMetricSelect.selectedIndex].text,
    },
    yaxis2: {
      title: colorMetricSelect.options[colorMetricSelect.selectedIndex].text,
      overlaying: "y",
      side: "right",
    },
    barmode: "overlay",
  };

  Plotly.newPlot("detailDualLineChart", combinedData, combinedLayout);

  // stacked area chart (energy shares overtime)
  let stackYears = countryData.map((d) => d.year);
  let stackData = [];
  energyKeys.forEach((key, index) => {
    let values = countryData.map((d) => d[key]);
    stackData.push({
      x: stackYears,
      y: values,
      mode: "lines",
      name: energyLabels[index],
      stackgroup: "one",
    });
  });
  Plotly.newPlot("detailStackedAreaChart", stackData, {
    title: "Energy Share Stacked Area Chart",
    xaxis: { title: "Year", range: [1993, 2022], dtick: 1 },
    yaxis: { title: "Total Share (%)" },
  });
}
// event listener
const yearSlider = document.getElementById("yearSlider");
const yearLabel = document.getElementById("yearLabel");
const consumptionSelect = document.getElementById("consumptionSelect");
const showConsumption = document.getElementById("showConsumption");
const showIncome = document.getElementById("showIncome");
const envMetricSelect = document.getElementById("envMetricSelect");
const colorMetricSelect = document.getElementById("colorMetricSelect");

yearSlider.addEventListener("input", () => {
  yearLabel.textContent = yearSlider.value;
  updateView();
  const detailCard = document.getElementById("detailCard");
  if (detailCard && activeDetailCountry) {
    let newRecord = currentMapData.find(
      (d) => d.country === activeDetailCountry
    );
    if (newRecord) {
      showDetailCard(newRecord);
    }
  }
});

consumptionSelect.addEventListener("change", updateView);
showConsumption.addEventListener("change", () => {
  document.getElementById("consumptionGroup").style.display =
    showConsumption.checked ? "inline-block" : "none";
  updateView();
});
showIncome.addEventListener("change", updateView);
envMetricSelect.addEventListener("change", updateView);
colorMetricSelect.addEventListener("change", updateView);
regionSelect.addEventListener("change", updateView);

// update view when control panel value changes
function updateView() {
  const year = +yearSlider.value;
  const region = regionSelect.value;
  const envMetric = envMetricSelect.value;
  const colorMetric = colorMetricSelect.value;
  let filtered = rawData.filter(
    (d) => d.year === year && d.iso_code && d.iso_code.length === 3
  );

  if (region.startsWith("sub_")) {
    const subregion = region.slice(4);
    filtered = filtered.filter((d) => d.subregions === subregion);
  } else if (region === "Americas") {
    const americasSubs = getRegionGroup("Americas"); // e.g., returns ["North America", "Central America", "Caribbean", "South America"]
    filtered = filtered.filter((d) => americasSubs.includes(d.subregions));
  } else if (region !== "Global" && region in regionCenters) {
    const subs = getRegionGroup(region);
    filtered = filtered.filter((d) => subs.includes(d.subregions));
  } else if (region !== "Global") {
    filtered = filtered.filter((d) => d.subregions === region);
  }

  currentMapData = filtered;

  const envConfig = bubbleMetricConfigs[envMetric];
  const zBinned = filtered.map((d) => envConfig.binFunction(d[envMetric]));
  const choroplethTrace = {
    type: "choropleth",
    locationmode: "ISO-3",
    locations: filtered.map((d) => d.iso_code),
    z: zBinned,
    text: filtered.map((d) => d.country),
    hovertemplate:
      "<b>%{text}</b><br>Year: " +
      year +
      "<br>" +
      `${envConfig.colorbarTitle}: %{z}<extra></extra>`,
    colorscale: envConfig.colorscale,
    autocolorscale: false,
    zmin: 0,
    zmax: envConfig.cmax,
    colorbar: {
      tickvals: envConfig.tickVals,
      ticktext: envConfig.tickText,
      title: envConfig.colorbarTitle,
      x: 0.0,
      xanchor: "left",
    },
    showlegend: false,
  };

  const consumptionMetric = showConsumption.checked
    ? consumptionSelect.value
    : "primary_energy_consumption";
  const bubbleSizes = filtered.map((d) =>
    d[consumptionMetric] ? Math.sqrt(d[consumptionMetric]) * 2 : 5
  );
  const bubbleColorBins = filtered.map((d) =>
    economicMetricConfigs[colorMetric].binFunction(d[colorMetric])
  );
  const bubbleTrace = {
    type: "scattergeo",
    locationmode: "ISO-3",
    locations: filtered.map((d) => d.iso_code),
    text: filtered.map((d) => d.country),
    customdata: filtered.map((d) =>
      showConsumption.checked
        ? d[consumptionSelect.value]
        : d.primary_energy_consumption
    ),
    hovertemplate:
      "<b>%{text}</b><br>Year: " +
      year +
      "<br>" +
      `${
        metricDisplayNames[consumptionSelect.value]
      }: %{customdata:.2f}<extra></extra>`,
    marker: {
      size: bubbleSizes,
      color: bubbleColorBins,
      colorscale: economicMetricConfigs[colorMetric].colorScale,
      cmin: economicMetricConfigs[colorMetric].zmin,
      cmax: economicMetricConfigs[colorMetric].zmax,
      colorbar: {
        tickvals: economicMetricConfigs[colorMetric].tickVals,
        ticktext: economicMetricConfigs[colorMetric].tickText,
        title: economicMetricConfigs[colorMetric].colorbarTitle,
      },
      opacity: 0.8,
      sizemode: "area",
      symbol: "circle",
    },
    showlegend: false,
  };

  let centerInfo =
    regionCenters[region] ||
    subregionCenters[region] ||
    regionCenters["Global"];
  const mapLayout = {
    title: `Emission metric– ${year} (${region})`,
    geo: { projection: { type: "equirectangular" } },
    legend: { x: 1, y: 0.5, xanchor: "left", yanchor: "middle" },
  };
  const allTraces = [choroplethTrace, bubbleTrace];
  Plotly.newPlot("mapDiv", allTraces, mapLayout, { responsive: true })
    .then((gd) => {
      gd.on("plotly_click", function (evt) {
        if (evt.points[0].curveNumber === 1) {
          let idx = evt.points[0].pointIndex;
          let record = currentMapData[idx];
          showDetailCard(record);
        }
      });
    })
    .catch((err) => console.error("Map plot error:", err));

  Plotly.relayout("mapDiv", {
    "geo.center.lat": centerInfo.lat,
    "geo.center.lon": centerInfo.lon,
    "geo.projection.scale": centerInfo.scale,
  });

  drawScatterChart(region, consumptionMetric);
  drawGrowthChart(region, envMetric);
  drawEnvMetricTrend(region, envMetric);

  // consumption metric trend
  drawConsumptionTrend(region, consumptionMetric);

  // per capita CO₂ vs. per Capita energy (Scatter) for the current year
  drawPerCapitaScatter(region);
  drawMultipleStackedAreaCharts();
}
// load daat

// const link_git = "https://raw.githubusercontent.com/baonhi3008/COMP6934_Project_202395913/refs/heads/main/vd_9323_data_newest.csv"
const link_git = "https://raw.githubusercontent.com/baonhi3008/COMP6934_Project_202395913/refs/heads/main/main_data.csv"

d3.csv(link_git).then((data) => {
  rawData = data;
  rawData.forEach((d) => {
    d.year = +d.year;
    d.gdp_per_capita = +d.gdp_per_capita;
    d.pct_urban_population = +d.pct_urban_population;
    d.population = +d.population;
    d.gdp = +d.gdp;
    d.primary_energy_consumption = +d.primary_energy_consumption;
    d.energy_per_capita = +d.energy_per_capita;
    d.co2 = +d.co2;
    d.co2_per_capita = +d.co2_per_capita;
    d.coal_share_energy = +d.coal_share_energy;
    d.oil_share_energy = +d.oil_share_energy;
    d.gas_share_energy = +d.gas_share_energy;
    d.fossil_share_energy = +d.fossil_share_energy;
    d.low_carbon_share_energy = +d.low_carbon_share_energy;
    d.renewables_share_energy = +d.renewables_share_energy;
    d.other_renewables_share_energy = +d.other_renewables_share_energy;
    d.nuclear_share_energy = +d.nuclear_share_energy;
    d.flaring_co2_per_capita = +d.flaring_co2_per_capita;
    d.methane_per_capita = +d.methane_per_capita;
    d.methane = +d.methane;
    d.share_global_co2 = +d.share_global_co2;
    d.wb_income_class = d.wb_income_class
      ? d.wb_income_class.trim()
      : "Unknown";
    d.subregions = d.subregion ? d.subregion.trim() : "Global";
  });
  populateRegionSelect(rawData);
  updateView();
});

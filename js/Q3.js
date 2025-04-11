// ==== color scales and binning functions ====

function binPercent10(val) {
  if (val == null) return null;
  if (val < 0) val = 0;
  let bin = Math.floor(val / 10);
  if (bin >= 10) bin = 9;
  return bin;
}
function binNetImports(val) {
  if (val == null) return null;
  if (val < -20) return 0;
  if (val < -10) return 1;
  if (val < -5) return 2;
  if (val < 0) return 3;
  if (val < 5) return 4;
  if (val < 10) return 5;
  if (val < 20) return 6;
  return 7;
}
const pctRuralScale = [
  [0.0, "#5b3319"],
  [0.1, "#5b3319"],
  [0.1, "#7f3d1f"],
  [0.2, "#7f3d1f"],
  [0.2, "#9d4d1f"],
  [0.3, "#9d4d1f"],
  [0.3, "#bf6d2f"],
  [0.4, "#bf6d2f"],
  [0.4, "#dd8c4f"],
  [0.5, "#dd8c4f"],
  [0.5, "#efad6f"],
  [0.6, "#efad6f"],
  [0.6, "#f5ca8f"],
  [0.7, "#f5ca8f"],
  [0.7, "#fae5af"],
  [0.8, "#fae5af"],
  [0.8, "#fcf2cf"],
  [0.9, "#fcf2cf"],
  [0.9, "#fffbe6"],
  [1.0, "#fffbe6"],
];
const renewablesColors = [
  [0.0, "#00441b"],
  [0.1, "#00441b"],
  [0.1, "#006d2c"],
  [0.2, "#006d2c"],
  [0.2, "#238b45"],
  [0.3, "#238b45"],
  [0.3, "#41ae76"],
  [0.4, "#41ae76"],
  [0.4, "#66c2a4"],
  [0.5, "#66c2a4"],
  [0.5, "#8cdae2"],
  [0.6, "#8cdae2"],
  [0.6, "#b2e2e2"],
  [0.7, "#b2e2e2"],
  [0.7, "#ccece6"],
  [0.8, "#ccece6"],
  [0.8, "#e5f5f9"],
  [0.9, "#e5f5f9"],
  [0.9, "#f7fcfd"],
  [1.0, "#f7fcfd"],
];
const pctUrbanScale = [
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
];

// -------------------------------
// 2. Region and Subregion Centers for Zooming
// -------------------------------
const regionCenters = {
  Global: { lat: 0, lon: 0, scale: 0.9 },
  Africa: { lat: 2, lon: 20, scale: 1.7 },
  Asia: { lat: 30, lon: 95, scale: 1.5 },
  Europe: { lat: 55, lon: 20, scale: 2.5 },
  Americas: { lat: 15, lon: -50, scale: 1.5 }, // Combined center

  // Americas: { lat: 5, lon: -50, scale: 1.5 },
  // Americas: { lat: 0, lon: -10, scale: 1.3 },
  // "North America": { lat: 40, lon: -100, scale: 1.5 },
  // "South America": { lat: -15, lon: -60, scale: 1.8 },
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

// global var and data loading
let rawDataGlobal,
  currentDrillRegion = "Global",
  currentMode = "Q3";
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

// get group of regions for continent filtering
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

    // "North America": ["North America", "Central America", "Caribbean"],
    // "South America": ["South America"],
    Oceania: ["Oceania"],
  };
  return regionGroups[regionName] || [];
}

// ==== bubble size====
function getBubbleSize(d, metric) {
  if (!metric) return 0;
  let val = +d[metric];
  if (isNaN(val) || val <= 0) return 0;
  const scaleFactor = 0.6;
  return Math.sqrt(val) * scaleFactor;
}

// ==== data loading ====
// const link_git = "https://raw.githubusercontent.com/baonhi3008/COMP6934_Project_202395913/refs/heads/main/vd_9323_data_newest.csv"
// ./final_data/vd_9323_data_newest.csv" -> please sue this one if your browser have issue accessing the file
const link_git = "https://raw.githubusercontent.com/baonhi3008/COMP6934_Project_202395913/refs/heads/main/main_data.csv"

d3.csv(link_git).then((rawData) => {
  rawData.forEach((d) => {
    d.year = +d.year;
    d.pct_access_elec = +d.pct_access_elec;
    d.renewables_share_elec = +d.renewables_share_elec;
    d.electricity_demand = +d.electricity_demand;
    d.electricity_demand_per_capita = +d.electricity_demand_per_capita;
    d.pct_clean_fuels_tech = +d.pct_clean_fuels_tech;
    d.gdp_per_capita = +d.gdp_per_capita;
    d.electricity_generation = +d.electricity_generation;
    d.energy_per_capita = +d.energy_per_capita;
    d.net_elec_imports_share_demand = +d.net_elec_imports_share_demand;
    d.renewables_share_energy = +d.renewables_share_energy;
    d.iso_code = d.iso_code ? d.iso_code.trim() : null;
    d.subregion = d.subregion ? d.subregion.trim() : "Global";
    d.pct_urban_elec = +d.pct_urban_elec;
    d.pct_rural_elec = +d.pct_rural_elec;
    d.electricity_demand_per_capita = +d.electricity_demand_per_capita;
    d.region = d.region ? d.region.trim() : "Global";
  });
  rawDataGlobal = rawData;
  populateRegionSelect(rawData);
  // populateRegionDropdown(rawDataGlobal);
  updateMaps();
});

function createHorizontalLegend(
  containerId,
  colorStops,
  labelStops,
  colorMetric
) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.alignItems = "flex-end";
  container.style.gap = "0px";
  for (let i = 0; i < colorStops.length; i++) {
    const item = document.createElement("div");
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.alignItems = "center";
    const box = document.createElement("div");
    box.style.width = "50px";
    box.style.height = "20px";
    box.style.backgroundColor = colorStops[i];
    box.style.border = "1px solid #ccc";
    box.style.marginBottom = "3px";
    item.appendChild(box);
    const label = document.createElement("span");
    label.textContent = labelStops[i];
    label.style.fontSize = "12px";
    item.appendChild(label);
    container.appendChild(item);
  }
}

function updateBubbleLegend(colorMetric) {
  const legendDivId = "bubbleLegendContainer";
  if (colorMetric === "renewables_share_elec") {
    const renewablesColors = [
      "#00441b",
      "#006d2c",
      "#238b45",
      "#41ae76",
      "#66c2a4",
      "#8cdae2",
      "#b2e2e2",
      "#ccece6",
      "#e5f5f9",
      "#f7fcfd",
    ];
    const renewablesLabels = [
      "0%",
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "60%",
      "70%",
      "80%",
      "90%",
      "100%",
    ];
    createHorizontalLegend(
      legendDivId,
      renewablesColors,
      renewablesLabels,
      colorMetric
    );
  } else if (colorMetric === "net_elec_imports_share_demand") {
    const importsColors = [
      "#a50026",
      "#d73027",
      "#f46d43",
      "#fdae61",
      "#abd9e9",
      "#74add1",
      "#4575b4",
      "#313695",
    ];
    const importsLabels = ["-20%", "-10%", "-5%", "0%", "5%", "10%", "20%"];
    createHorizontalLegend(
      legendDivId,
      importsColors,
      importsLabels,
      colorMetric
    );
  } else {
    document.getElementById(legendDivId).innerHTML = "";
  }
}

// === Map update function ===
function updateMaps() {
  const year = +document.getElementById("yearSlider").value;
  document.getElementById("yearLabel").textContent = year;
  const region = document.getElementById("regionSelect").value;
  const colorMetric = document.getElementById("colorMetricCheck").checked
    ? document.getElementById("colorMetricSelectConditional").value
    : null;
  const sizeMetric = document.getElementById("sizeMetricCheck").checked
    ? document.getElementById("sizeMetricSelectConditional").value
    : null;
  let filtered = rawDataGlobal.filter(
    (d) => d.year === year && d.iso_code && d.iso_code.length === 3
  );
  if (region.startsWith("sub_")) {
    const subregion = region.slice(4);
    filtered = filtered.filter((d) => d.subregion === subregion);
  } else if (region === "Americas") {
    const americasSubs = getRegionGroup("Americas"); // Returns e.g. ["North America", "Central America", "Caribbean", "South America"]
    filtered = filtered.filter((d) => americasSubs.includes(d.subregion));
  } else if (region !== "Global" && region in regionCenters) {
    const subs = getRegionGroup(region);
    filtered = filtered.filter((d) => subs.includes(d.subregion));
  } else if (region !== "Global") {
    filtered = filtered.filter((d) => d.subregion === region);
  }

  const urbanZ = filtered.map((d) => binPercent10(d.pct_urban_elec));
  const pctUrbanScale = [
    [0.0, "#e6f7e6"],
    [0.1, "#e6f7e6"],
    [0.1, "#ccebc8"],
    [0.2, "#ccebc8"],
    [0.2, "#b3dfb3"],
    [0.3, "#b3dfb3"],
    [0.3, "#99d699"],
    [0.4, "#99d699"],
    [0.4, "#80cc80"],
    [0.5, "#80cc80"],
    [0.5, "#66bf66"],
    [0.6, "#66bf66"],
    [0.6, "#4db34d"],
    [0.7, "#4db34d"],
    [0.7, "#33a933"],
    [0.8, "#33a933"],
    [0.8, "#1a9f1a"],
    [0.9, "#1a9f1a"],
    [0.9, "#009900"],
    [1.0, "#009900"],
  ];
  const urbanTrace = {
    type: "choropleth",
    locationmode: "ISO-3",
    locations: filtered.map((d) => d.iso_code),
    z: urbanZ,
    text: filtered.map((d) => d.country),
    colorscale: pctUrbanScale,
    zmin: 0,
    zmax: 10,
    autocolorscale: false,
    name: "",
    colorbar: {
      title: "urban(%)",
      thickness: 15,
      len: 1,
      x: -0.1,
      tickvals: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5],
      ticktext: [
        "0–10",
        "10–20",
        "20–30",
        "30–40",
        "40–50",
        "50–60",
        "60–70",
        "70–80",
        "80–90",
        "90–100",
      ],
      tickmode: "array",
      tickfont: { size: 10 },
    },
    customdata: filtered.map((d) => d.pct_urban_elec),
    hoverinfo: "skip",
  };
  const ruralZ = filtered.map((d) => binPercent10(d.pct_rural_elec));
  const pctRuralScale = [
    [0.0, "#ffe6e6"],
    [0.1, "#ffe6e6"],
    [0.1, "#ffcccc"],
    [0.2, "#ffcccc"],
    [0.2, "#ffb3b3"],
    [0.3, "#ffb3b3"],
    [0.3, "#ff9999"],
    [0.4, "#ff9999"],
    [0.4, "#ff8080"],
    [0.5, "#ff8080"],
    [0.5, "#ff6666"],
    [0.6, "#ff6666"],
    [0.6, "#ff4d4d"],
    [0.7, "#ff4d4d"],
    [0.7, "#ff3333"],
    [0.8, "#ff3333"],
    [0.8, "#ff1a1a"],
    [0.9, "#ff1a1a"],
    [0.9, "#ff0000"],
    [1.0, "#ff0000"],
  ];
  const ruralTrace = {
    type: "choropleth",
    locationmode: "ISO-3",
    locations: filtered.map((d) => d.iso_code),
    z: ruralZ,
    text: filtered.map((d) => d.country),
    colorscale: pctRuralScale,
    zmin: 0,
    zmax: 10,
    autocolorscale: false,
    name: "",
    colorbar: {
      title: "rural(%)",
      thickness: 15,
      len: 1,
      x: 1,
      tickvals: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5],
      ticktext: [
        "0–10",
        "10–20",
        "20–30",
        "30–40",
        "40–50",
        "50–60",
        "60–70",
        "70–80",
        "80–90",
        "90–100",
      ],
      tickfont: { size: 10 },
    },
    customdata: filtered.map((d) => d.pct_rural_elec),
    hoverinfo: "skip",
  };
  let bubbleColorArray = [];
  let bubbleColorScale = [];
  let bubbleCmax = 10;
  let bubbleColorTitle = "";
  if (colorMetric === "net_elec_imports_share_demand") {
    bubbleColorTitle = "Net Imports (%)";
    bubbleColorScale = [
      [0.0, "#a50026"],
      [0.125, "#a50026"],
      [0.125, "#d73027"],
      [0.25, "#d73027"],
      [0.25, "#f46d43"],
      [0.375, "#f46d43"],
      [0.375, "#fdae61"],
      [0.5, "#fdae61"],
      [0.5, "#abd9e9"],
      [0.625, "#abd9e9"],
      [0.625, "#74add1"],
      [0.75, "#74add1"],
      [0.75, "#4575b4"],
      [0.875, "#4575b4"],
      [0.875, "#313695"],
      [1.0, "#313695"],
    ];
    filtered.forEach((d) => {
      let val = d.net_elec_imports_share_demand;
      let bin =
        val < -20
          ? 0
          : val < -10
          ? 1
          : val < -5
          ? 2
          : val < 0
          ? 3
          : val < 5
          ? 4
          : val < 10
          ? 5
          : val < 20
          ? 6
          : 7;
      bubbleColorArray.push(bin);
    });
  } else if (colorMetric === "renewables_share_elec") {
    bubbleColorTitle = "% Renewable Elec";
    bubbleColorScale = renewablesColors;
    filtered.forEach((d) => {
      bubbleColorArray.push(binPercent10(d.renewables_share_elec));
    });
  } else {
    bubbleColorScale = [
      [0, "gray"],
      [1, "gray"],
    ];
    bubbleColorArray = filtered.map((d) => 0);
    bubbleCmax = 1;
  }
  const bubbleTraceUrban = {
    type: "scattergeo",
    mode: "markers",
    locationmode: "ISO-3",
    locations: filtered.map((d) => d.iso_code),
    text: filtered.map(
      (d) =>
        `${d.country}<br>${
          document.getElementById("sizeMetricSelectConditional").value
        }: ${
          d[document.getElementById("sizeMetricSelectConditional").value]
        }<br>${colorMetric}: ${d[colorMetric]}`
    ),
    marker: {
      size: filtered.map((d) =>
        getBubbleSize(
          d,
          document.getElementById("sizeMetricSelectConditional").value
        )
      ),
      color: bubbleColorArray,
      colorscale: bubbleColorScale,
      cmin: 0,
      cmax: bubbleCmax,
      showscale: false,
      opacity: 0.8,
      sizemode: "area",
    },
  };
  updateBubbleLegend(colorMetric);
  const bubbleTraceRural = Object.assign({}, bubbleTraceUrban);
  bubbleTraceRural.marker = Object.assign({}, bubbleTraceUrban.marker, {
    showscale: false,
  });
  let center =
    regionCenters[region] ||
    subregionCenters[region] ||
    regionCenters["Global"];
  const urbanLayout = {
    title: `Urban Map | ${year} | ${region}`,
    height: 400,
    margin: { l: 0, r: 0, t: 60, b: 20 },
    geo: {
      domain: { x: [0, 1], y: [0, 1] },
      lataxis: { range: [-60, 90] },
      scope: "world",
    },
  };
  const ruralLayout = {
    title: `Rural Map | ${year} | ${region}`,
    height: 400,
    margin: { l: 0, r: 0, t: 60, b: 20 },
    geo: {
      domain: { x: [0, 1], y: [0, 1] },
      lataxis: { range: [-60, 90] },
      scope: "world",
    },
  };
  const urbanData = [urbanTrace].concat(sizeMetric ? [bubbleTraceUrban] : []);
  const ruralData = [ruralTrace].concat(sizeMetric ? [bubbleTraceRural] : []);

  Plotly.newPlot("urbanMap", urbanData, urbanLayout, {
    responsive: true,
  }).then((gd) => {
    gd.on("plotly_click", function (evt) {
      if (evt.points && evt.points.length > 0) {
        const pt = evt.points[0];
        const iso = pt.location || pt.locations;
        const row = filtered.find((r) => r.iso_code === iso);
        currentDrillRegion = row ? row.subregion || "Global" : "Global";
        updateDrilldownCharts(currentDrillRegion);
      }
    });
    Plotly.relayout(gd, {
      "geo.center.lat": center.lat,
      "geo.center.lon": center.lon,
      "geo.projection.scale": center.scale,
    });
  });

  Plotly.newPlot("ruralMap", ruralData, ruralLayout, {
    responsive: true,
  }).then((gd) => {
    gd.on("plotly_click", function (evt) {
      if (evt.points && evt.points.length > 0) {
        const pt = evt.points[0];
        const iso = pt.location || pt.locations;
        const row = filtered.find((r) => r.iso_code === iso);
        currentDrillRegion = row ? row.subregion || "Global" : "Global";
        updateDrilldownCharts(currentDrillRegion);
      }
    });
    Plotly.relayout(gd, {
      "geo.center.lat": center.lat,
      "geo.center.lon": center.lon,
      "geo.projection.scale": center.scale,
    });
  });

  updateDrilldownCharts(document.getElementById("regionSelect").value);
}

// update drilldown charts function
function updateDrilldownCharts() {
  const container = document.getElementById("trendContainer");
  if (!container) return;
  container.innerHTML =
    '<div id="urbanPanel" style="width:50%; float:left;"></div>' +
    '<div id="ruralPanel" style="width:50%; float:right;"></div>' +
    '<div style="clear:both;"></div>';
  const regionVal = document.getElementById("regionSelect").value;
  let mode;
  if (regionVal === "Global") {
    mode = "global";
  } else if (regionCenters.hasOwnProperty(regionVal)) {
    mode = "continent";
  } else {
    mode = "subregion";
  }
  const years = d3.range(1993, 2023);
  const consumptionMetric = document.getElementById("sizeMetricCheck").checked
    ? document.getElementById("sizeMetricSelectConditional").value
    : "per_capita_electricity";
  let tsData;
  if (regionVal === "Global") {
    tsData = rawDataGlobal.filter((d) => d.iso_code && d.iso_code.length === 3);
  } else if (regionVal === "Americas") {
    const americasSubs = getRegionGroup("Americas");
    tsData = rawDataGlobal.filter(
      (d) =>
        d.iso_code &&
        d.iso_code.length === 3 &&
        americasSubs.includes(d.subregion)
    );
  } else if (mode === "continent") {
    const subs = getRegionGroup(regionVal);
    tsData = rawDataGlobal.filter(
      (d) => d.iso_code && d.iso_code.length === 3 && subs.includes(d.subregion)
    );
  } else {
    tsData = rawDataGlobal.filter(
      (d) => d.iso_code && d.iso_code.length === 3 && d.subregion === regionVal
    );
  }
  function getContinentForRecord(d) {
    for (const cont in regionCenters) {
      if (cont !== "Global") {
        const subs = getRegionGroup(cont);
        if (subs.includes(d.subregion)) {
          return cont;
        }
      }
    }
    return "Other";
  }

  const currentYear = +document.getElementById("yearSlider").value;
  const currentData = tsData.filter((d) => d.year === currentYear);
  let barGroupBy;
  if (regionVal === "Global") {
    barGroupBy = (d) => getContinentForRecord(d);
  } else if (regionCenters.hasOwnProperty(regionVal)) {
    barGroupBy = (d) => d.subregion;
  } else {
    barGroupBy = (d) => d.country;
  }

  function computeBarData(data, field, yr, barGroupBy) {
    const grouped = d3.group(
      data.filter((d) => d.year === yr && !isNaN(d[field])),
      barGroupBy
    );
    const bars = [];
    grouped.forEach((recs, group) => {
      bars.push({ group: group, value: d3.mean(recs, (d) => +d[field]) });
    });
    return bars;
  }

  function computeTimeSeries(data, field, barGroupBy) {
    const grouped = d3.group(data, barGroupBy);
    const series = [];
    grouped.forEach((records, group) => {
      const yVals = years.map((yr) => {
        const recs = records.filter((d) => d.year === yr && !isNaN(d[field]));
        return recs.length ? d3.mean(recs, (d) => +d[field]) : null;
      });
      series.push({ group: group, x: years, y: yVals });
    });
    return series;
  }
  function computeBarData(data, field, yr) {
    const grouped = d3.group(
      data.filter((d) => d.year === yr && !isNaN(d[field])),
      barGroupBy
    );
    const bars = [];
    grouped.forEach((recs, group) => {
      bars.push({ group: group, value: d3.mean(recs, (d) => +d[field]) });
    });
    return bars;
  }

  const continentColorMapping = {
    Africa: "#e41a1c",
    Asia: "#377eb8",
    Europe: "#4daf4a",
    "North America": "#984ea3",
    "South America": "#ff7f00",
    Oceania: "#ffff33",
    Other: "#a65628",
  };
  const subregionColorScale = d3.scaleOrdinal(d3.schemeSet2);
  const countryColorScale = d3.scaleOrdinal(d3.schemeCategory10);
  function getScatterData(data, xField, yField) {
    return data.filter(
      (d) =>
        d[xField] != null &&
        !isNaN(d[xField]) &&
        d[yField] != null &&
        !isNaN(d[yField])
    );
  }
  // const urbanSeries = computeTimeSeries(tsData, "pct_urban_elec");
  // const ruralSeries = computeTimeSeries(tsData, "pct_rural_elec");
  const urbanSeries = computeTimeSeries(tsData, "pct_urban_elec", barGroupBy);
  const ruralSeries = computeTimeSeries(tsData, "pct_rural_elec", barGroupBy);
  const urbanBarData = computeBarData(
    tsData,
    "pct_urban_elec",
    currentYear,
    barGroupBy
  );
  const ruralBarData = computeBarData(
    tsData,
    "pct_rural_elec",
    currentYear,
    barGroupBy
  );
  const ruralScatter1 = getScatterData(
    currentData,
    "renewables_share_elec",
    "pct_rural_elec"
  );
  const urbanScatter2 = getScatterData(
    currentData,
    "per_capita_electricity",
    "pct_urban_elec"
  );
  const ruralScatter2 = getScatterData(
    currentData,
    "per_capita_electricity",
    "pct_rural_elec"
  );
  function createChartDiv(parent, idSuffix, height = "400px") {
    const div = document.createElement("div");
    div.id = idSuffix;
    div.style.width = "100%";
    div.style.height = height;
    div.style.marginBottom = "20px";
    parent.appendChild(div);
    return div;
  }
  const urbanPanel = document.getElementById("urbanPanel");
  urbanPanel.innerHTML = "";
  const urbanLineDiv = createChartDiv(urbanPanel, "urbanAccessLine", "400px");
  const urbanLineTraces = urbanSeries.map((s) => ({
    x: s.x,
    y: s.y,
    mode: "lines",
    name: s.group,
    line: { width: 1 },
  }));
  Plotly.newPlot(urbanLineDiv, urbanLineTraces, {
    title: "Urban Electricity Access Over Time",
    xaxis: { title: "Year", dtick: 1 },
    yaxis: { title: "Electricity Access (%)" },
    margin: { t: 40 },
  });
  const urbanBarDiv = createChartDiv(urbanPanel, "urbanBar", "300px");
  Plotly.newPlot(
    urbanBarDiv,
    [
      {
        x: urbanBarData.map((d) => d.group),
        y: urbanBarData.map((d) => d.value),
        type: "bar",
      },
    ],
    {
      title: `Urban Electricity Access in ${currentYear}`,
      xaxis: { title: "Subregion / Country" },
      yaxis: { title: "Electricity Access (%)" },
      margin: { t: 40 },
    }
  );
  function getScatterGroupAndColorMapping(selectedRegion) {
    let groupBy, colorMapping;
    if (selectedRegion === "Global") {
      groupBy = (d) => getContinentForRecord(d);
      colorMapping = continentColorMapping;
    } else if (regionCenters.hasOwnProperty(selectedRegion)) {
      groupBy = (d) => d.subregion;
      colorMapping = subregionColorScale;
    } else {
      groupBy = (d) => d.country;
      colorMapping = countryColorScale;
    }
    return { groupBy, colorMapping };
  }

  // Get the current selected region
  const selectedRegion = document.getElementById("regionSelect").value;
  const { groupBy, colorMapping } =
    getScatterGroupAndColorMapping(selectedRegion);

  const urbanScatter1Data = getScatterData(
    currentData,
    "renewables_share_elec",
    "pct_urban_elec"
  );
  const urbanScatter1Groups = d3.group(urbanScatter1Data, groupBy);
  const urbanScatter1Traces = [];
  const urbanScatter1Div = createChartDiv(urbanPanel, "urbanScatter1", "400px");

  urbanScatter1Groups.forEach((vals, key) => {
    urbanScatter1Traces.push({
      x: vals.map((d) => d.renewables_share_elec),
      y: vals.map((d) => d.pct_urban_elec),
      mode: "markers",
      name: key,
      marker: {
        size: 8,
        color:
          typeof colorMapping === "function"
            ? colorMapping(key)
            : colorMapping[key] || "gray",
      },
      text: vals.map((d) => d.country),
    });
  });

  Plotly.newPlot(urbanScatter1Div, urbanScatter1Traces, {
    title: "Renewables Share vs. Urban Electricity Access",
    xaxis: { title: "Renewables Share (Elec)" },
    yaxis: { title: "Urban Electricity Access (%)" },
    margin: { t: 40 },
  });
  const urbanScatter2Data = getScatterData(
    currentData,
    "per_capita_electricity",
    "pct_urban_elec"
  );
  const urbanScatter2Groups = d3.group(urbanScatter2Data, groupBy);
  const urbanScatter2Traces = [];
  const urbanScatter2Div = createChartDiv(urbanPanel, "urbanScatter2", "400px");

  urbanScatter2Groups.forEach((vals, key) => {
    urbanScatter2Traces.push({
      x: vals.map((d) => d.renewables_share_elec),
      y: vals.map((d) => d.pct_urban_elec),
      mode: "markers",
      name: key,
      marker: {
        size: 8,
        color:
          typeof colorMapping === "function"
            ? colorMapping(key)
            : colorMapping[key] || "gray",
      },
      text: vals.map((d) => d.country),
    });
  });

  Plotly.newPlot(urbanScatter2Div, urbanScatter2Traces, {
    title: "Per Capita Electricity Generation vs. Urban Electricity Access",
    xaxis: { title: "Per Capita Electricity Generation" },
    yaxis: { title: "Urban Electricity Access (%)" },
    margin: { t: 40 },
  });

  const ruralPanel = document.getElementById("ruralPanel");
  ruralPanel.innerHTML = "";
  const ruralLineDiv = createChartDiv(ruralPanel, "ruralAccessLine", "400px");
  const ruralLineTraces = ruralSeries.map((s) => ({
    x: s.x,
    y: s.y,
    mode: "lines",
    name: s.group,
    line: { width: 1 },
  }));
  Plotly.newPlot(ruralLineDiv, ruralLineTraces, {
    title: "Rural Electricity Access Over Time",
    xaxis: { title: "Year", dtick: 1 },
    yaxis: { title: "Electricity Access (%)" },
    margin: { t: 40 },
  });
  const ruralBarDiv = createChartDiv(ruralPanel, "ruralBar", "300px");
  Plotly.newPlot(
    ruralBarDiv,
    [
      {
        x: ruralBarData.map((d) => d.group),
        y: ruralBarData.map((d) => d.value),
        type: "bar",
      },
    ],
    {
      title: `Rural Electricity Access in ${currentYear}`,
      xaxis: { title: "Subregion / Country" },
      yaxis: { title: "Electricity Access (%)" },
      margin: { t: 40 },
    }
  );
  const ruralScatter1Data = getScatterData(
    currentData,
    "renewables_share_elec",
    "pct_rural_elec"
  );
  const ruralScatter1Groups = d3.group(ruralScatter1Data, groupBy);
  const ruralScatter1Traces = [];
  const ruralScatter1Div = createChartDiv(ruralPanel, "ruralScatter1", "400px");

  ruralScatter1Groups.forEach((vals, key) => {
    ruralScatter1Traces.push({
      x: vals.map((d) => d.renewables_share_elec),
      y: vals.map((d) => d.pct_rural_elec),
      mode: "markers",
      name: key,
      marker: {
        size: 8,
        color:
          typeof colorMapping === "function"
            ? colorMapping(key)
            : colorMapping[key] || "gray",
      },
      text: vals.map((d) => d.country),
    });
  });

  Plotly.newPlot(ruralScatter1Div, ruralScatter1Traces, {
    title: "Renewables Share vs. Rural Electricity Access",
    xaxis: { title: "Renewables Share (Elec)" },
    yaxis: { title: "Rural Electricity Access (%)" },
    margin: { t: 40 },
  });

  const ruralScatter2Data = getScatterData(
    currentData,
    "per_capita_electricity",
    "pct_rural_elec"
  );

  const ruralScatter2Groups = d3.group(ruralScatter2Data, groupBy);
  const ruralScatter2Div = createChartDiv(ruralPanel, "ruralScatter2", "400px");

  const ruralScatter2Traces = [];
  ruralScatter2Groups.forEach((vals, key) => {
    ruralScatter2Traces.push({
      x: vals.map((d) => d.per_capita_electricity),
      y: vals.map((d) => d.pct_rural_elec),
      mode: "markers",
      name: key,
      marker: {
        size: 8,
        color:
          typeof colorMapping === "function"
            ? colorMapping(key)
            : colorMapping[key] || "gray",
      },
      text: vals.map((d) => d.country),
    });
  });

  // plot the chart.
  Plotly.newPlot(ruralScatter2Div, ruralScatter2Traces, {
    title: "Per Capita Electricity vs. Rural Electricity Access",
    xaxis: { title: "Per Capita Electricity Generation" },
    yaxis: { title: "Rural Electricity Access (%)" },
    margin: { t: 40 },
  });
}

// ===== overall charts function =====
function overallCharts() {
  const regionVal = document.getElementById("regionSelect").value;
  let mode;
  if (regionVal === "Global") {
    mode = "global";
  } else if (regionCenters.hasOwnProperty(regionVal)) {
    mode = "continent";
  } else {
    mode = "subregion";
  }
  let tsData;
  if (regionVal === "Global") {
    tsData = rawDataGlobal.filter((d) => d.iso_code && d.iso_code.length === 3);
  } else if (regionVal === "Americas") {
    const americasSubs = getRegionGroup("Americas");
    tsData = rawDataGlobal.filter(
      (d) =>
        d.iso_code &&
        d.iso_code.length === 3 &&
        americasSubs.includes(d.subregion)
    );
  } else if (mode === "continent") {
    const subs = getRegionGroup(regionVal);
    tsData = rawDataGlobal.filter(
      (d) => d.iso_code && d.iso_code.length === 3 && subs.includes(d.subregion)
    );
  } else {
    tsData = rawDataGlobal.filter(
      (d) => d.iso_code && d.iso_code.length === 3 && d.subregion === regionVal
    );
  }

  // ==== the overallCharts container ====
  const container = document.getElementById("overallCharts");
  if (!container) {
    console.error("Container with id 'overallCharts' not found.");
    return;
  }
  container.innerHTML = "";
  container.style.width = "100%";
  const years = d3.range(1993, 2023);
  function createChartDiv(parent, idSuffix, height = "400px") {
    const div = document.createElement("div");
    div.id = idSuffix;
    div.style.width = "100%";
    div.style.height = height;
    div.style.marginBottom = "20px";
    parent.appendChild(div);
    return div;
  }

  // ==== faceted line chart (small multiples) ===
  const groupKey = mode === "global" ? "subregion" : "country";
  const groupedData = d3.group(tsData, (d) => d[groupKey]);

  const facetContainer = document.createElement("div");
  facetContainer.style.width = "100%";
  facetContainer.style.display = "flex";
  facetContainer.style.flexDirection = "column"; // We'll create rows
  facetContainer.style.gap = "20px";
  container.appendChild(facetContainer);
  function getContinentForRecord(d) {
    for (const cont in regionCenters) {
      if (cont !== "Global") {
        const subs = getRegionGroup(cont);
        if (subs.includes(d.subregion)) {
          return cont;
        }
      }
    }
    return "Other";
  }

  if (regionVal === "Global") {
    const facetContainer = document.createElement("div");
    facetContainer.style.width = "100%";
    facetContainer.style.display = "flex";
    facetContainer.style.flexDirection = "column";
    facetContainer.style.gap = "20px";
    container.appendChild(facetContainer);

    const continentGroups = d3.group(tsData, (d) => getContinentForRecord(d));

    continentGroups.forEach((records, continent) => {
      const rowContainer = document.createElement("div");
      rowContainer.style.display = "flex";
      rowContainer.style.flexDirection = "column";
      rowContainer.style.gap = "10px";

      const heading = document.createElement("h4");
      heading.textContent = continent;
      heading.style.margin = "5px 0";
      rowContainer.appendChild(heading);

      const wrapDiv = document.createElement("div");
      wrapDiv.style.display = "flex";
      wrapDiv.style.flexWrap = "wrap";
      wrapDiv.style.gap = "10px";
      rowContainer.appendChild(wrapDiv);

      const subregionGroups = d3.group(records, (d) => d.subregion);

      subregionGroups.forEach((subRecords, subregion) => {
        const facetDiv = document.createElement("div");
        facetDiv.style.width = "280px";
        facetDiv.style.height = "280px";
        facetDiv.style.border = "1px solid #ccc";
        facetDiv.style.padding = "5px";
        wrapDiv.appendChild(facetDiv);

        // compute time series for urban and rural access.
        const urbanSeries = years.map((yr) => {
          const yearRecs = subRecords.filter((d) => d.year === yr);
          return yearRecs.length
            ? d3.mean(yearRecs, (d) => d.pct_urban_elec)
            : null;
        });
        const ruralSeries = years.map((yr) => {
          const yearRecs = subRecords.filter((d) => d.year === yr);
          return yearRecs.length
            ? d3.mean(yearRecs, (d) => d.pct_rural_elec)
            : null;
        });

        const traceUrban = {
          x: years,
          y: urbanSeries,
          mode: "lines",
          name: "Urban",
          line: { color: "blue", width: 2 },
        };
        const traceRural = {
          x: years,
          y: ruralSeries,
          mode: "lines",
          name: "Rural",
          line: { color: "red", width: 2 },
        };

        // create a layout that forces a square aspect ratio.
        const layout = {
          title: { text: subregion, font: { size: 12 } },
          width: 280,
          height: 280,
          margin: { t: 30, b: 30, l: 35, r: 5 },
          xaxis: {
            tickfont: { size: 9 },
            dtick: 5,
          },
          yaxis: {
            title: { text: "% Access", font: { size: 10 } },
            tickfont: { size: 9 },
          },
          legend: { font: { size: 9 }, orientation: "h" },
        };

        // plot the facet.
        Plotly.newPlot(facetDiv, [traceUrban, traceRural], layout);
      });

      facetContainer.appendChild(rowContainer);
    });
  } else if (
    regionVal !== "Global" &&
    !regionCenters.hasOwnProperty(regionVal)
  ) {
    // create an overall container for country facets.
    const facetContainer = document.createElement("div");
    facetContainer.style.width = "100%";
    facetContainer.style.display = "flex";
    facetContainer.style.flexDirection = "column";
    facetContainer.style.gap = "20px";
    container.appendChild(facetContainer);

    // add a heading for the selected subregion.
    const heading = document.createElement("h4");
    heading.textContent = regionVal;
    heading.style.margin = "5px 0";
    facetContainer.appendChild(heading);

    // create a wrapping container for country charts.
    const wrapDiv = document.createElement("div");
    wrapDiv.style.display = "flex";
    wrapDiv.style.flexWrap = "wrap"; // Allow charts to wrap onto multiple rows.
    wrapDiv.style.gap = "10px";
    facetContainer.appendChild(wrapDiv);

    // group tsData by country.
    const countryGroups = d3.group(tsData, (d) => d.country);

    countryGroups.forEach((countryRecords, country) => {
      const facetDiv = document.createElement("div");
      facetDiv.style.width = "280px";
      facetDiv.style.height = "280px";
      facetDiv.style.border = "1px solid #ccc";
      facetDiv.style.padding = "5px";
      wrapDiv.appendChild(facetDiv);

      // compute time series for urban and rural electricity access.
      const urbanSeries = years.map((yr) => {
        const recs = countryRecords.filter((d) => d.year === yr);
        return recs.length ? d3.mean(recs, (d) => d.pct_urban_elec) : null;
      });
      const ruralSeries = years.map((yr) => {
        const recs = countryRecords.filter((d) => d.year === yr);
        return recs.length ? d3.mean(recs, (d) => d.pct_rural_elec) : null;
      });

      const traceUrban = {
        x: years,
        y: urbanSeries,
        mode: "lines",
        name: "Urban",
        line: { color: "blue", width: 2 },
      };
      const traceRural = {
        x: years,
        y: ruralSeries,
        mode: "lines",
        name: "Rural",
        line: { color: "red", width: 2 },
      };

      // layout for each facet. fixed width/height creates a square.
      const layout = {
        title: { text: country, font: { size: 12 } },
        width: 280,
        height: 280,
        margin: { t: 30, b: 30, l: 35, r: 5 },
        xaxis: {
          tickfont: { size: 9 },
          dtick: 5,
        },
        yaxis: {
          title: { text: "% Access", font: { size: 10 } },
          tickfont: { size: 9 },
        },
        legend: { font: { size: 9 }, orientation: "h" },
      };

      Plotly.newPlot(facetDiv, [traceUrban, traceRural], layout);
    });
  } else {
    const groupKey = mode === "continent" ? "subregion" : "country";
    const groupedData = d3.group(tsData, (d) => d[groupKey]);

    const defaultRow = document.createElement("div");
    defaultRow.style.display = "flex";
    defaultRow.style.flexWrap = "wrap";
    defaultRow.style.justifyContent = "space-around";
    defaultRow.style.gap = "10px";
    facetContainer.appendChild(defaultRow);

    groupedData.forEach((records, group) => {
      if (!group) return;
      const facetDiv = document.createElement("div");
      facetDiv.style.width = "30%";
      facetDiv.style.minWidth = "300px";
      facetDiv.style.margin = "10px";
      defaultRow.appendChild(facetDiv);

      const urbanSeries = years.map((yr) => {
        const yearRecs = records.filter((d) => d.year === yr);
        return yearRecs.length
          ? d3.mean(yearRecs, (d) => d.pct_urban_elec)
          : null;
      });
      const ruralSeries = years.map((yr) => {
        const yearRecs = records.filter((d) => d.year === yr);
        return yearRecs.length
          ? d3.mean(yearRecs, (d) => d.pct_rural_elec)
          : null;
      });

      const traceUrban = {
        x: years,
        y: urbanSeries,
        mode: "lines",
        name: "Urban",
        line: { color: "blue" },
      };
      const traceRural = {
        x: years,
        y: ruralSeries,
        mode: "lines",
        name: "Rural",
        line: { color: "red" },
      };
      const layout = {
        title: group,
        margin: { t: 30, b: 30, l: 40, r: 20 },
        xaxis: { title: "Year", dtick: 5 },
        yaxis: { title: "% Electricity Access" },
      };
      Plotly.newPlot(facetDiv, [traceUrban, traceRural], layout);
    });
  }

  // -===line chart: access gap ot (ur-ru) ===
  let groupKey2;
  if (regionVal === "Global") {
    groupKey2 = (d) => getContinentForRecord(d);
  } else if (regionCenters.hasOwnProperty(regionVal)) {
    groupKey2 = (d) => d.subregion;
  } else {
    groupKey2 = (d) => d.country;
  }

  // group the time series data by the grouping key
  const groupedGapData = d3.group(tsData, groupKey2);

  const gapTraces = [];
  groupedGapData.forEach((records, groupName) => {
    const groupGapValues = years.map((yr) => {
      const yearRecs = records.filter((d) => d.year === yr);
      const gaps = yearRecs.map((d) => d.pct_urban_elec - d.pct_rural_elec);
      return gaps.length ? d3.mean(gaps) : null;
    });
    gapTraces.push({
      x: years,
      y: groupGapValues,
      mode: "lines+markers",
      name: groupName,
      line: { width: 2 },
    });
  });

  const gapDiv = createChartDiv(container, "accessGapLine", "400px");
  const gapLayout = {
    title: "Access Gap Over Time (Urban - Rural)",
    xaxis: { title: "Year" },
    yaxis: { title: "Access Gap (%)" },
    margin: { t: 40 },
  };
  Plotly.newPlot(gapDiv, gapTraces, gapLayout);

  // ==== animated scatter chart: generation vs. demand (color = access gap) ====
  // X-axis: electricity generation per capita
  // Y-axis: electricity demand per capita
  // bubble color: (pct_urban_elec - pct_rural_elec)

  const continentColorMapping = {
    Africa: "#e41a1c",
    Asia: "#377eb8",
    Europe: "#4daf4a",
    "North America": "#984ea3",
    "South America": "#ff7f00",
    Oceania: "#ffff33",
    Other: "#a65628",
  };

  const scatterGenDemandDiv = createChartDiv(
    container,
    "scatterGenDemand",
    "500px"
  );
  const initYear = years[0];
  const initData3 = tsData.filter((d) => d.year === initYear);

  const scatterTrace3 = {
    x: initData3.map((d) => d.per_capita_electricity),
    y: initData3.map((d) => d.electricity_demand_per_capita),
    mode: "markers",
    text: initData3.map((d) => d.country),
    marker: {
      size: 8,
      color: initData3.map(
        (d) => continentColorMapping[getContinentForRecord(d)]
      ),
    },
  };

  const scatterLayout3 = {
    title: "Electricity Generation vs. Demand (Colored by Region)",
    xaxis: { title: "Electricity Generation per Capita" },
    yaxis: { title: "Electricity Demand per Capita" },
    updatemenus: [
      {
        type: "buttons",
        buttons: [
          {
            label: "Play",
            method: "animate",
            args: [
              null,
              {
                frame: { duration: 1000, redraw: true },
                fromcurrent: true,
              },
            ],
          },
        ],
      },
    ],
    sliders: [
      {
        active: 0,
        steps: years.map((yr) => ({
          label: yr.toString(),
          method: "animate",
          args: [
            [yr.toString()],
            { frame: { duration: 500, redraw: true }, mode: "immediate" },
          ],
        })),
      },
    ],
  };

  const scatterFrames3 = years.map((yr) => {
    const frameData = tsData.filter((d) => d.year === yr);
    return {
      name: yr.toString(),
      data: [
        {
          x: frameData.map((d) => d.per_capita_electricity),
          y: frameData.map((d) => d.electricity_demand_per_capita),
          text: frameData.map((d) => d.country),
          marker: {
            color: frameData.map(
              (d) => continentColorMapping[getContinentForRecord(d)]
            ),
          },
        },
      ],
    };
  });

  Plotly.newPlot(scatterGenDemandDiv, [scatterTrace3], scatterLayout3).then(
    function () {
      Plotly.addFrames(scatterGenDemandDiv, scatterFrames3);

      const dummyLegendTraces = [];
      Object.entries(continentColorMapping).forEach(([continent, color]) => {
        dummyLegendTraces.push({
          x: [null],
          y: [null],
          mode: "markers",
          marker: { color: color, size: 8 },
          name: continent,
          showlegend: true,
        });
      });

      Plotly.addTraces(scatterGenDemandDiv, dummyLegendTraces);
    }
  );

  //=== animated scatter plot: rural vs. urban electricity access ===
  // X-axis: % rural access, Y-axis: % urban access

  const scatterAccessDiv = createChartDiv(container, "scatterAccess", "500px");
  const initData4 = tsData.filter((d) => d.year === initYear);
  const scatterTrace4 = {
    x: initData4.map((d) => d.pct_rural_elec),
    y: initData4.map((d) => d.pct_urban_elec),
    mode: "markers",
    text: initData4.map((d) => d.country),
    marker: {
      size: 8,
      color: initData4.map(
        (d) => continentColorMapping[getContinentForRecord(d)]
      ),
    },
  };
  const scatterLayout4 = {
    title: "Share of Rural vs. Urban Electricity Access (Colored by Region)",
    xaxis: { title: "% Rural Access" },
    yaxis: { title: "% Urban Access" },
    updatemenus: [
      {
        type: "buttons",
        buttons: [
          {
            label: "Play",
            method: "animate",
            args: [
              null,
              {
                frame: { duration: 1000, redraw: true },
                fromcurrent: true,
              },
            ],
          },
        ],
      },
    ],
    sliders: [
      {
        active: 0,
        steps: years.map((yr) => ({
          label: yr.toString(),
          method: "animate",
          args: [
            [yr.toString()],
            { frame: { duration: 500, redraw: true }, mode: "immediate" },
          ],
        })),
      },
    ],
  };
  const scatterFrames4 = years.map((yr) => {
    const frameData = tsData.filter((d) => d.year === yr);
    return {
      name: yr.toString(),
      data: [
        {
          x: frameData.map((d) => d.pct_rural_elec),
          y: frameData.map((d) => d.pct_urban_elec),
          text: frameData.map((d) => d.country),
          marker: {
            color: frameData.map(
              (d) => continentColorMapping[getContinentForRecord(d)]
            ),
          },
        },
      ],
    };
  });
  Plotly.newPlot(scatterAccessDiv, [scatterTrace4], scatterLayout4).then(
    function () {
      Plotly.addFrames(scatterAccessDiv, scatterFrames4);

      const dummyLegendTraces = [];
      Object.entries(continentColorMapping).forEach(([continent, color]) => {
        dummyLegendTraces.push({
          x: [null],
          y: [null],
          mode: "markers",
          marker: { color: color, size: 8 },
          name: continent,
          showlegend: true,
        });
      });
      Plotly.addTraces(scatterAccessDiv, dummyLegendTraces);
    }
  );

  // ====  animated scatter plot: renewables share vs. rural electricity access ==
  // X-axis: % renewables share, Y-axis: % rural access

  const scatterRenewDiv = createChartDiv(container, "scatterRenew", "500px");
  const initData5 = tsData.filter((d) => d.year === initYear);
  const scatterTrace5 = {
    x: initData5.map((d) => d.renewables_share_elec),
    y: initData5.map((d) => d.pct_rural_elec),
    mode: "markers",
    text: initData5.map((d) => d.country),
    marker: {
      size: 8,
      color: initData5.map(
        (d) => continentColorMapping[getContinentForRecord(d)]
      ),
    },
  };
  const scatterLayout5 = {
    title: "Renewables Share vs. Rural Electricity Access (Colored by Region)",
    xaxis: { title: "% Renewables Share" },
    yaxis: { title: "% Rural Electricity Access" },
    updatemenus: [
      {
        type: "buttons",
        buttons: [
          {
            label: "Play",
            method: "animate",
            args: [
              null,
              {
                frame: { duration: 1000, redraw: true },
                fromcurrent: true,
              },
            ],
          },
        ],
      },
    ],
    sliders: [
      {
        active: 0,
        steps: years.map((yr) => ({
          label: yr.toString(),
          method: "animate",
          args: [
            [yr.toString()],
            { frame: { duration: 500, redraw: true }, mode: "immediate" },
          ],
        })),
      },
    ],
  };
  const scatterFrames5 = years.map((yr) => {
    const frameData = tsData.filter((d) => d.year === yr);
    return {
      name: yr.toString(),
      data: [
        {
          x: frameData.map((d) => d.renewables_share_elec),
          y: frameData.map((d) => d.pct_rural_elec),
          text: frameData.map((d) => d.country),
          marker: {
            color: frameData.map(
              (d) => continentColorMapping[getContinentForRecord(d)]
            ),
          },
        },
      ],
    };
  });
  Plotly.newPlot(scatterRenewDiv, [scatterTrace5], scatterLayout5).then(
    function () {
      Plotly.addFrames(scatterRenewDiv, scatterFrames5);

      const dummyLegendTraces = [];
      Object.entries(continentColorMapping).forEach(([continent, color]) => {
        dummyLegendTraces.push({
          x: [null],
          y: [null],
          mode: "markers",
          marker: { color: color, size: 8 },
          name: continent,
          showlegend: true,
        });
      });
      Plotly.addTraces(scatterRenewDiv, dummyLegendTraces);
    }
  );
}

//  ==== event listeners ====

document.getElementById("yearSlider").addEventListener("input", function () {
  updateMaps();
  if (
    document.querySelector('input[name="trendOptionGroup"]:checked').value ===
    "overall"
  ) {
    overallCharts();
  } else {
    updateDrilldownCharts(document.getElementById("regionSelect").value);
  }
});

document.getElementById("regionSelect").addEventListener("change", function () {
  updateMaps();
  if (
    document.querySelector('input[name="trendOptionGroup"]:checked').value ===
    "overall"
  ) {
    overallCharts();
  } else {
    updateDrilldownCharts(document.getElementById("regionSelect").value);
  }
});
document
  .getElementById("sizeMetricCheck")
  .addEventListener("change", function () {
    const show = this.checked;
    document.getElementById("sizeMetricSelectConditional").style.display = show
      ? "inline-block"
      : "none";
    updateMaps();
  });
document
  .getElementById("colorMetricCheck")
  .addEventListener("change", function () {
    const show = this.checked;
    document.getElementById("colorMetricSelectConditional").style.display = show
      ? "inline-block"
      : "none";
    updateMaps();
  });
document
  .getElementById("sizeMetricSelectConditional")
  .addEventListener("change", updateMaps);
document
  .getElementById("colorMetricSelectConditional")
  .addEventListener("change", updateMaps);
document
  .getElementById("fuelTypeSelect")
  .addEventListener("change", function () {
    if (this.value === "clean_fuel") {
      window.location.href = "clean_fuel_visual_design.html";
    } else {
      updateMaps();
    }
  });

document.querySelectorAll('input[name="trendOptionGroup"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const trendValue = document.querySelector(
      'input[name="trendOptionGroup"]:checked'
    ).value;
    const drilldownPanel = document.getElementById("drilldownPanel");
    const overallChartsContainer = document.getElementById("overallCharts");

    if (trendValue === "overall") {
      drilldownPanel.style.display = "none";
      overallChartsContainer.style.display = "block";
      overallCharts();
    } else {
      overallChartsContainer.style.display = "none";
      drilldownPanel.style.display = "block";
      updateDrilldownCharts(document.getElementById("regionSelect").value);
    }
  });
});

// ==== tab switching for drilldown panel
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");
tabButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    this.classList.add("active");
    document
      .getElementById(this.getAttribute("data-tab"))
      .classList.add("active");
    setTimeout(() => {
      if (document.getElementById("leftTrend"))
        Plotly.Plots.resize(document.getElementById("leftTrend"));
      if (document.getElementById("rightTrend"))
        Plotly.Plots.resize(document.getElementById("rightTrend"));
      if (document.getElementById("scatterChart"))
        Plotly.Plots.resize(document.getElementById("scatterChart"));
    }, 100);
  });
});

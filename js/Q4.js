const regionCenters = {
  Global: { lat: 0, lon: 0, scale: 0.9 },
  Africa: { lat: 2, lon: 20, scale: 1.7 },
  Asia: { lat: 30, lon: 95, scale: 1.5 },
  Europe: { lat: 55, lon: 20, scale: 2.5 },
  Americas: { lat: 15, lon: -50, scale: 1.5 }, // Combined center

  Oceania: { lat: -20, lon: 140, scale: 2.0 },
};
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
  Americas: ["North America", "Central America", "Caribbean", "South America"],

  // "North America": ["North America", "Central America", "Caribbean"],
  // "South America": ["South America"],
  Oceania: ["Oceania"],
};
function getRegionGroup(regionName) {
  return regionGroups[regionName] || [];
}

const incomeColorMapping = {
  "Low income": "purple",
  "Lower-middle-income countries": "#fc8d59",
  "Upper-middle-income countries": "#fee08b",
  "High-income countries": "blue",
  Unknown: "grey",
};
function getRegionName(d) {
  const knownRegions = Object.keys(regionGroups);
  if (knownRegions.includes(d.region)) return d.region;
  for (const key in regionGroups) {
    if (regionGroups[key].includes(d.subregion)) return key;
  }
  return "Other";
}

let rawDataGlobal;
let selectedCountryISO = null;

function binPercent10(val) {
  if (val == null) return null;
  if (val < 0) val = 0;
  let bin = Math.floor(val / 10);
  if (bin >= 10) bin = 9;
  return bin;
}

const purplePalette = [
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
  [0.8, "#B43757"],
  [0.9, "#B43757"],
  [0.9, "#7C0A02"],
  [1.0, "#7C0A02"],
];
const bluePalette = [
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
  [0.8, "#006D2C"],
  [0.9, "#006D2C"],
  [0.9, "#00441B"],
  [1.0, "#00441B"],
];

function getBubbleSize(d, metric) {
  if (!metric) return 0;
  let val = +d[metric];
  if (isNaN(val) || val <= 0) return 0;
  const scaleFactor = metric === "gdp" ? 0.00002 : 0.09;
  return Math.sqrt(val) * scaleFactor;
}

function drawIncomeLegend() {
  const legendDiv = document.getElementById("incomeLegend");
  legendDiv.innerHTML = "";
  Object.entries(incomeColorMapping).forEach(([income, color]) => {
    const item = document.createElement("div");
    item.style.display = "inline-block";
    item.style.marginRight = "10px";
    item.style.textAlign = "center";
    const circle = document.createElement("span");
    circle.style.display = "inline-block";
    circle.style.width = "15px";
    circle.style.height = "15px";
    circle.style.backgroundColor = color;
    circle.style.borderRadius = "50%";
    circle.style.marginRight = "5px";
    const label = document.createElement("span");
    label.textContent = income;
    item.appendChild(circle);
    item.appendChild(label);
    legendDiv.appendChild(item);
  });
}
// const link_git = "https://raw.githubusercontent.com/baonhi3008/COMP6934_Project_202395913/refs/heads/main/vd_9323_data_newest.csv"

const link_git = "https://raw.githubusercontent.com/baonhi3008/COMP6934_Project_202395913/refs/heads/main/main_data.csv"

d3.csv(link_git ).then(function (rawData) {
  rawData.forEach(function (d) {
    d.year = +d.year;
    d.pct_access_elec = +d.pct_access_elec;
    d.renewables_share_elec = +d.renewables_share_elec;
    d.pct_clean_fuels_tech = +d.pct_clean_fuels_tech;
    d.gdp_per_capita = +d.gdp_per_capita;
    d.gdp = +d.gdp;
    d.population = +d.population;
    d.wb_income_class = d.wb_income_class
      ? d.wb_income_class.trim()
      : "Unknown";
    d.iso_code = d.iso_code ? d.iso_code.trim() : null;
    d.subregion = d.subregion ? d.subregion.trim() : "Global";
    d.region = d.region ? d.region.trim() : "Global";
  });
  rawDataGlobal = rawData;
  populateRegionDropdown();
  updateChoropleth();
  drawIncomeLegend();
});

function populateRegionDropdown() {
  const regionSelect = document.getElementById("regionSelect");
  regionSelect.innerHTML = "";
  let opt = document.createElement("option");
  opt.value = "Global";
  opt.textContent = "Global";
  regionSelect.appendChild(opt);
  Object.keys(regionCenters).forEach((r) => {
    if (r !== "Global") {
      let optCont = document.createElement("option");
      optCont.value = r;
      optCont.textContent = r;
      regionSelect.appendChild(optCont);
    }
  });
  let subregions = Array.from(
    new Set(
      rawDataGlobal
        .filter((d) => d.subregion && d.subregion !== "Global")
        .map((d) => d.subregion)
    )
  );
  subregions.sort();
  subregions.forEach((sr) => {
    let optSub = document.createElement("option");
    optSub.value = sr;
    optSub.textContent = sr;
    regionSelect.appendChild(optSub);
  });
  regionSelect.addEventListener("change", function () {
    updateChoropleth();
    updateOverviewCharts();
    if (selectedCountryISO) updateDetailCardForCurrentYear();
  });
}
// ===== get current mode based on region selection======
function getCurrentMode() {
  const region = document.getElementById("regionSelect").value;
  if (region === "Global") return "global";
  else if (regionCenters.hasOwnProperty(region)) return "continent";
  else return "subregion";
}
// ====== filtering function by year======
function filterDataByYear(year) {
  return rawDataGlobal.filter(
    (d) => d.year === year && d.iso_code && d.iso_code.length === 3
  );
}

// ====== draw the choropleth map and add bubble overlay if toggled =====
function updateChoropleth() {
  const mapYear = +document.getElementById("mapYearSlider").value;
  document.getElementById("mapYearLabel").textContent = mapYear;
  let dataForYear = filterDataByYear(mapYear);
  const mode = getCurrentMode();
  const region = document.getElementById("regionSelect").value;
  if (mode === "continent") {
    const subs = getRegionGroup(region);
    dataForYear = dataForYear.filter((d) => subs.includes(d.subregion));
  } else if (mode === "subregion") {
    dataForYear = dataForYear.filter((d) => d.subregion === region);
  }
  const fuelType = document.getElementById("fuelTypeSelect").value;
  let mapTrace = {
    type: "choropleth",
    locationmode: "ISO-3",
    locations: dataForYear.map((d) => d.iso_code),
    z:
      fuelType === "electricity"
        ? dataForYear.map((d) => binPercent10(d.pct_access_elec))
        : dataForYear.map((d) => binPercent10(d.pct_clean_fuels_tech)),
    zmin: 0,
    zmax: 10,
    autocolorscale: false,
    colorscale: fuelType === "electricity" ? purplePalette : bluePalette,
    colorbar: {
      title: "% Access",
      tickfont: { size: 10 },
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
    },
  };
  const mapLayout = {
    title:
      fuelType === "electricity" ? "Electricity Access" : "Clean Fuel Access",
    geo: {
      scope: "world",
      // projection: { type: "natural earth" },
      center: { lat: 0, lon: 0 },
      lataxis: { autorange: true },
      lonaxis: { autorange: true },
    },
    margin: { t: 40, b: 20 },
  };
  Plotly.newPlot("choroplethMap", [mapTrace], mapLayout, {
    responsive: true,
  }).then(function (gd) {
    gd.on("plotly_click", function (evt) {
      if (evt.points && evt.points.length > 0) {
        const iso = evt.points[0].location;
        const countryData = dataForYear.find((d) => d.iso_code === iso);
        if (countryData) {
          selectedCountryISO = countryData.iso_code;
          updateDetailCardForCurrentYear();
        }
      }
    });
    const region = document.getElementById("regionSelect").value;
    const center = regionCenters[region] || regionCenters["Global"];
    Plotly.relayout(gd, {
      "geo.center.lat": center.lat,
      "geo.center.lon": center.lon,
      "geo.projection.scale": center.scale,
    });

    if (document.getElementById("bubbleSizeToggle").checked) {
      const bubbleSelect = document.getElementById("bubbleMetricSelect");
      const metric = bubbleSelect.value;
      const bubbleTrace = {
        type: "scattergeo",
        mode: "markers",
        locationmode: "ISO-3",
        locations: dataForYear.map((d) => d.iso_code),
        text: dataForYear.map((d) => `${d.country}<br>${metric}: ${d[metric]}`),
        marker: {
          size: dataForYear.map((d) => getBubbleSize(d, metric)),
          color: dataForYear.map(
            (d) => incomeColorMapping[d.wb_income_class] || "gray"
          ),
          symbol: "circle",
          line: { width: 0.5, color: "black" },
        },
      };
      Plotly.addTraces(gd, [bubbleTrace]);
    }
  });
}
//=== draw a donut ring chart using Plotly ===
function drawRingChart(containerId, value, color, label = "") {
  const val = Math.max(0, Math.min(100, value));
  const data = [
    {
      values: [val, 100 - val],
      labels: [label, ""],
      marker: { colors: [color, "#e6e6e6"] },
      hole: 0.7,
      type: "pie",
      textposition: "none",
      hoverinfo: "none",
      showlegend: false,
    },
  ];
  const layout = {
    margin: { t: 0, b: 0, l: 0, r: 0 },
    annotations: [
      {
        text: val + "%",
        x: 0.5,
        y: 0.5,
        font: { size: 16 },
        showarrow: false,
      },
    ],
  };
  Plotly.newPlot(containerId, data, layout, {
    displayModeBar: false,
    responsive: true,
  });
}

// === update detail card for selected country using current map year.===
function updateDetailCardForCurrentYear() {
  const currentYear = +document.getElementById("mapYearSlider").value;
  let record = rawDataGlobal.find(
    (d) => d.iso_code === selectedCountryISO && d.year === currentYear
  );
  if (!record) {
    const records = rawDataGlobal.filter(
      (d) => d.iso_code === selectedCountryISO
    );
    if (records.length > 0) {
      record = records.reduce((prev, curr) =>
        Math.abs(curr.year - currentYear) < Math.abs(prev.year - currentYear)
          ? curr
          : prev
      );
    }
  }
  if (record) {
    document.getElementById("detailCountryName").textContent = record.country;
    document.getElementById("detailRegion").textContent =
      "Region: " + (record.region || "N/A");
    document.getElementById("detailSubregion").textContent =
      "Subregion: " + (record.subregion || "N/A");
    document.getElementById("detailIncomeGroup").textContent =
      "Income Group: " + (record.wb_income_class || "N/A");
    document.getElementById("detailGDP").textContent =
      //   ${record.gdp ? (record.gdp / 1e6).toFixed(2) : "N/A"
      "GDP: " +
      (record.gdp
        ? (record.gdp / 1e6).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "N/A") +
      "$";
    document.getElementById("detailPopulation").textContent =
      "Population: " +
      (record.population ? record.population.toFixed(2) : "N/A");
    drawRingChart(
      "ringChartElectricity",
      record.pct_access_elec || 0,
      "#1f77b4",
      "Electricity"
    );
    drawRingChart(
      "ringChartCleanCooking",
      record.pct_clean_fuels_tech || 0,
      "#ff7f0e",
      "Clean Cooking"
    );
    drawRingChart(
      "ringChartRenewable",
      record.renewables_share_elec || 0,
      "#2ca02c",
      "Renewable"
    );
  } else {
    document.getElementById("detailCountryName").textContent =
      "No data available";
    document.getElementById("detailRegion").textContent = "Region: -";
    document.getElementById("detailSubregion").textContent = "Subregion: -";
    document.getElementById("detailIncomeGroup").textContent =
      "Income Group: -";
    document.getElementById("detailGDP").textContent = "GDP: -";
    document.getElementById("detailPopulation").textContent = "Population: -";
    Plotly.purge("ringChartElectricity");
    Plotly.purge("ringChartCleanCooking");
    Plotly.purge("ringChartRenewable");
  }
}

// === event listeners for map year slider, fuel type, and bubble overlay controls ===
document.getElementById("mapYearSlider").addEventListener("input", function () {
  document.getElementById("mapYearLabel").textContent = this.value;
  updateChoropleth();
  if (selectedCountryISO) updateDetailCardForCurrentYear();
});
document
  .getElementById("fuelTypeSelect")
  .addEventListener("change", function () {
    updateChoropleth();
  });
document
  .getElementById("bubbleSizeToggle")
  .addEventListener("change", function () {
    const bubbleSelect = document.getElementById("bubbleMetricSelect");
    bubbleSelect.style.display = this.checked ? "inline-block" : "none";
    updateChoropleth();
  });
document
  .getElementById("bubbleMetricSelect")
  .addEventListener("change", function () {
    updateChoropleth();
  });

// == overview panel: show/hide based on radio button selection ===
document.querySelectorAll('input[name="overviewOption"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.value === "yes") {
      document.getElementById("overviewPanel").style.display = "block";
      updateOverviewCharts();
    } else {
      document.getElementById("overviewPanel").style.display = "none";
    }
  });
});
document
  .getElementById("overviewYearSlider")
  .addEventListener("input", function () {
    document.getElementById("overviewYearLabel").textContent = this.value;
    updateOverviewCharts();
  });

// == update the overview charts based on year and region mode ==
function updateOverviewCharts() {
  const regionVal = document.getElementById("regionSelect").value;
  const year = +document.getElementById("overviewYearSlider").value;
  let dataForYear = filterDataByYear(year);

  let mode;
  if (regionVal === "Global") {
    mode = "global";
  } else if (regionCenters.hasOwnProperty(regionVal)) {
    mode = "continent";
  } else {
    mode = "subregion";
  }
  const overviewYear = +document.getElementById("overviewYearSlider").value;
  let tsData;
  if (mode === "global") {
    tsData = rawDataGlobal.filter(
      (d) => d.year === overviewYear && d.iso_code && d.iso_code.length === 3
    );
  } else if (mode === "continent") {
    const subs = getRegionGroup(regionVal);
    tsData = rawDataGlobal.filter(
      (d) =>
        d.year === overviewYear &&
        d.iso_code &&
        d.iso_code.length === 3 &&
        subs.includes(d.subregion)
    );
  } else {
    tsData = rawDataGlobal.filter(
      (d) =>
        d.year === overviewYear &&
        d.iso_code &&
        d.iso_code.length === 3 &&
        d.subregion === regionVal
    );
  }

  let groupKey;
  if (mode === "global") {
    groupKey = (d) => getRegionName(d);
  } else if (mode === "continent") {
    groupKey = (d) => d.subregion;
  } else {
    groupKey = (d) => d.country;
  }

  //  grouped bar chart.
  const groupedBar = d3.group(tsData, groupKey);
  let barGroups = [];
  groupedBar.forEach((recs, group) => {
    barGroups.push({
      group: group,
      elec: d3.mean(recs, (d) => d.pct_access_elec) || 0,
      clean: d3.mean(recs, (d) => d.pct_clean_fuels_tech) || 0,
    });
  });
  barGroups.sort((a, b) => d3.ascending(a.group, b.group));

  const barTrace1 = {
    x: barGroups.map((d) => d.elec),
    y: barGroups.map((d) => d.group),
    name: "Electricity Access",
    orientation: "h",
    type: "bar",
    marker: { color: "#1f77b4" },
  };
  const barTrace2 = {
    x: barGroups.map((d) => d.clean),
    y: barGroups.map((d) => d.group),
    name: "Clean Fuel Access",
    orientation: "h",
    type: "bar",
    marker: { color: "#ff7f0e" },
  };

  const barLayout = {
    title: `Access Metrics (${overviewYear})`,
    barmode: "group",
    xaxis: { title: "% Access", autorange: true },
    margin: { t: 40, b: 40 },
  };

  Plotly.newPlot("barChart", [barTrace1, barTrace2], barLayout, {
    responsive: true,
  });

  //  build faceted pie charts for renewables share.
  const facetedContainer = document.getElementById("facetedPieCharts");
  facetedContainer.innerHTML = "";
  const groupedPie = d3.group(tsData, groupKey);
  groupedPie.forEach((recs, group) => {
    const avgRenew = d3.mean(recs, (d) => d.renewables_share_elec) || 0;
    const pieDiv = document.createElement("div");
    pieDiv.style.width = "280px";
    pieDiv.style.height = "280px";
    pieDiv.style.display = "inline-block";
    facetedContainer.appendChild(pieDiv);

    const pieData = [
      {
        values: [avgRenew, 100 - avgRenew],
        labels: ["Renewables", "Other"],
        type: "pie",
        marker: { colors: ["#2ca02c", "#d62728"] },
        textinfo: "label+percent",
        hole: 0.7,
      },
    ];
    const pieLayout = { title: group, margin: { t: 40, b: 20 } };
    Plotly.newPlot(pieDiv, pieData, pieLayout, { responsive: true });
  });

  // scatter plot: electricity access vs. GDP Per Capita
  const scatterElecTrace = {
    x: dataForYear.map((d) => d.gdp_per_capita),
    y: dataForYear.map((d) => d.pct_access_elec),
    mode: "markers",
    type: "scatter",
    text: dataForYear.map((d) => d.country),
    marker: {
      size: 10,
      color: dataForYear.map(
        (d) => incomeColorMapping[d.wb_income_class] || "gray"
      ),
    },
    name: "",
  };
  const scatterElecLayout = {
    title: "Electricity Access vs. GDP Per Capita",
    xaxis: { title: "GDP Per Capita", autorange: true },
    yaxis: { title: "Electricity Access (%)", autorange: true },
    margin: { t: 40 },
  };
  Plotly.newPlot("scatterElectricity", [scatterElecTrace], scatterElecLayout, {
    responsive: true,
  }).then(function (plotDiv) {
    const dummyTraces = Object.entries(incomeColorMapping).map(
      ([income, color]) => ({
        x: [null],
        y: [null],
        mode: "markers",
        marker: { size: 10, color: color },
        name: income,
        showlegend: true,
      })
    );
    Plotly.addTraces(plotDiv, dummyTraces);
  });

  // scatter plot: clean fuel access vs. GDP per capita
  const scatterCleanTrace = {
    x: dataForYear.map((d) => d.gdp_per_capita),
    y: dataForYear.map((d) => d.pct_clean_fuels_tech),
    mode: "markers",
    type: "scatter",
    text: dataForYear.map((d) => d.country),
    marker: {
      size: 10,
      color: dataForYear.map(
        (d) => incomeColorMapping[d.wb_income_class] || "gray"
      ),
    },
    name: "",
  };
  const scatterCleanLayout = {
    title: "Clean Fuel Access vs. GDP Per Capita",
    xaxis: { title: "GDP Per Capita", autorange: true },
    yaxis: { title: "Clean Fuel Access (%)", autorange: true },
    margin: { t: 40 },
  };
  Plotly.newPlot("scatterCleanFuel", [scatterCleanTrace], scatterCleanLayout, {
    responsive: true,
  }).then(function (plotDiv) {
    const dummyTraces = Object.entries(incomeColorMapping).map(
      ([income, color]) => ({
        x: [null],
        y: [null],
        mode: "markers",
        marker: { size: 10, color: color },
        name: income,
        showlegend: true,
      })
    );
    Plotly.addTraces(plotDiv, dummyTraces);
  });
}

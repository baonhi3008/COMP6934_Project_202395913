// d3.csv("./final_data/vd_9323_data_newest.csv")
// const link_git = "https://raw.githubusercontent.com/baonhi3008/COMP6934_Project_202395913/refs/heads/main/vd_9323_data_newest.csv"
// d3.csv(link_git ).then((rawData) => {
const link_git = "https://raw.githubusercontent.com/baonhi3008/COMP6934_Project_202395913/refs/heads/main/main_data.csv"
d3.csv(link_git).then(function(rawData){
  rawData.forEach((d) => {
    d.year = +d.year;
    d.gdp_per_capita = +d.gdp_per_capita;
    d.pct_urban_population = +d.pct_urban_population;
    d.population = +d.population;
    d.gdp = +d.gdp;
    d.primary_energy_consumption = +d.primary_energy_consumption;
    d.energy_per_capita = +d.energy_per_capita;
    d.wb_income_class = d.wb_income_class
      ? d.wb_income_class.trim()
      : "Unknown";
    d.subregions = d.subregion ? d.subregion.trim() : "Global";
  });

  const regionCenters = {
    Global: { lat: 0, lon: 0, scale: 0.9 },
    Africa: { lat: 2, lon: 20, scale: 1.7 },
    Asia: { lat: 30, lon: 95, scale: 1.5 },
    Europe: { lat: 55, lon: 20, scale: 2.5 },
    "North America": { lat: 40, lon: -100, scale: 1.5 },
    "South America": { lat: -15, lon: -60, scale: 1.8 },
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

  // set up region dropdown (using common regions)
  const regionSelect = document.getElementById("regionSelect");
  regionSelect.innerHTML = "";
  const continentGroup = document.createElement("optgroup");
  continentGroup.label = "Continents";
  Object.keys(regionCenters).forEach((r) => {
    const opt = document.createElement("option");
    opt.value = r;
    opt.textContent = r;
    continentGroup.appendChild(opt);
  });
  regionSelect.appendChild(continentGroup);

  const subregionGroup = document.createElement("optgroup");
  subregionGroup.label = "Subregions";
  const uniqueSubregions = Array.from(
    new Set(
      rawData
        .filter((d) => d.subregion && d.subregion !== "Global")
        .map((d) => d.subregion)
    )
  ).sort();
  uniqueSubregions.forEach((sr) => {
    const opt = document.createElement("option");
    opt.value = sr;
    opt.textContent = sr;
    subregionGroup.appendChild(opt);
  });
  regionSelect.appendChild(subregionGroup);

  // define display names
  const metricDisplayNames = {
    gdp: "GDP",
    gdp_per_capita: "GDP Per Capita",
    energy_per_capita: "Per-Capita Consumption",
    primary_energy_consumption: "Primary Consumption",
    pct_urban_population: "Urbanization Rate",
    population: "Population",
    gdp: "GDP",
  };

  // define metric configurations
  const metricConfigs = {
    gdp_growth: {
      binFunction: (val) => {
        if (val === null || isNaN(val)) return null;
        if (val < 0) return 0;
        if (val < 0.05) return 1;
        if (val < 0.1) return 2;
        if (val < 0.15) return 3;
        if (val < 0.2) return 4;
        return 5;
      },
      colorScale: [
        [0.0, "#fee5d9"],
        [0.2, "#fee5d9"],
        [0.2, "#fcae91"],
        [0.4, "#fcae91"],
        [0.4, "#fb6a4a"],
        [0.6, "#fb6a4a"],
        [0.6, "#de2d26"],
        [0.8, "#de2d26"],
        [0.8, "#a50f15"],
        [1.0, "#a50f15"],
      ],
      zmin: 0,
      zmax: 5,
      tickVals: [0.5, 1.5, 2.5, 3.5, 4.5],
      tickText: ["Neg", "<5%", "5-10%", "10-15%", "15-20%", ">20%"],
      colorbarTitle: "GDP Growth",
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
      tickText: [
        "<1k",
        "1k–2k",
        "2k–5k",
        "5k–10k",
        "10k–20k",
        "20k–50k",
        ">50k",
      ],
      colorbarTitle: "GDP per Capita",
    },
    pct_urban_population: {
      binFunction: (val) => {
        if (val == null || isNaN(val)) return null;
        let bin = Math.floor(val / 10);
        return bin > 9 ? 9 : bin;
      },
      colorScale: [
        [0.0, "#4d2c0c"],
        [0.1, "#4d2c0c"],
        [0.1, "#855819"],
        [0.2, "#855819"],
        [0.2, "#bd8931"],
        [0.3, "#bd8931"],
        [0.3, "#e2c76f"],
        [0.4, "#e2c76f"],
        [0.4, "#f3e8c2"],
        [0.5, "#f3e8c2"],
        [0.5, "#d1f0ed"],
        [0.6, "#d1f0ed"],
        [0.6, "#99d7d1"],
        [0.7, "#99d7d1"],
        [0.7, "#61ada2"],
        [0.8, "#61ada2"],
        [0.8, "#2a807d"],
        [0.9, "#2a807d"],
        [0.9, "#0f5250"],
        [1.0, "#0f5250"],
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
    population: {
      binFunction: (val) => {
        if (!val || isNaN(val)) return null;
        if (val < 1e6) return 0;
        if (val < 10e6) return 1;
        if (val < 50e6) return 2;
        if (val < 150e6) return 3;
        return 4;
      },
      colorScale: [
        [0.0, "#f7fbff"],
        [0.2, "#f7fbff"],
        [0.2, "#c6dbef"],
        [0.4, "#c6dbef"],
        [0.4, "#6baed6"],
        [0.6, "#6baed6"],
        [0.6, "#3182bd"],
        [0.8, "#3182bd"],
        [0.8, "#08519c"],
        [1.0, "#08519c"],
      ],
      zmin: 0,
      zmax: 4,
      tickVals: [0.5, 1.5, 2.5, 3.5],
      tickText: ["<1M", "1M–10M", "10M–50M", "50M–150M", ">150M"],
      colorbarTitle: "Population",
    },
    gdp: {
      binFunction: (val) => {
        if (!val || isNaN(val)) return null;
        if (val < 1000) return 0;
        if (val < 10000) return 1;
        if (val < 50000) return 2;
        if (val < 100000) return 3;
        return 4;
      },
      colorScale: [
        [0.0, "#f7fbff"],
        [0.2, "#f7fbff"],
        [0.2, "#c6dbef"],
        [0.4, "#c6dbef"],
        [0.4, "#6baed6"],
        [0.6, "#6baed6"],
        [0.6, "#3182bd"],
        [0.8, "#3182bd"],
        [0.8, "#08519c"],
        [1.0, "#08519c"],
      ],
      zmin: 0,
      zmax: 4,
      tickVals: [0.5, 1.5, 2.5, 3.5],
      tickText: ["<1k", "1k–10k", "10k–50k", "50k–100k", ">100k"],
      colorbarTitle: "GDP",
    },
  };

  // define a simple income color mapping
  const incomeColorMapping = {
    "Low income": "purple",
    "Lower-middle-income countries": "darkgreen",
    "Upper-middle-income countries": "lightgreen",
    "High-income countries": "pink",
    Unknown: "grey",
  };

  // utility: get subregions array for a region
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
      "North America": ["North America", "Central America", "Caribbean"],
      "South America": ["South America"],
      Oceania: ["Oceania"],
    };
    return regionGroups[regionName] || [];
  }

  // assign a record to a continent (if possible)
  function getContinentForRecord(d) {
    for (const cont in regionCenters) {
      if (cont !== "Global") {
        const subs = getRegionGroup(cont);
        if (subs.includes(d.subregions)) {
          return cont;
        }
      }
    }
    return "Other";
  }

  // scatter chart: GDP vs. consumption (for selected year and region)
  function drawScatterChart(region, consumptionMetric) {
    const year = +yearSlider.value;
    let scatterData = [];
    if (region === "Global") {
      scatterData = rawData.filter(
        (d) => d.year === year && d.iso_code && d.iso_code.length === 3
      );
    } else if (region in regionCenters) {
      const subregions = getRegionGroup(region);
      scatterData = rawData.filter(
        (d) => d.year === year && subregions.includes(d.subregions)
      );
    } else {
      scatterData = rawData.filter(
        (d) => d.year === year && d.subregions === region
      );
    }
    // adjust bubble sizes based on the consumption metric
    if (consumptionMetric === "primary_energy_consumption") {
      bubbleSizes = scatterData.map((d) =>
        d[consumptionMetric] ? Math.sqrt(d[consumptionMetric]) * 2 : 5
      );
    } else if (consumptionMetric === "energy_per_capita") {
      bubbleSizes = scatterData.map((d) =>
        d[consumptionMetric] ? Math.sqrt(d[consumptionMetric]) * 0.01 : 6
      );
    }

    // compute marker colors based on the income class using incomeColorMapping
    const bubbleColors = scatterData.map(
      (d) => incomeColorMapping[d.wb_income_class] || "#7f7f7f"
    );

    const trace = {
      x: scatterData.map((d) => d.gdp),
      y: scatterData.map((d) => d[consumptionMetric]),
      text: scatterData.map((d) => d.country),
      mode: "markers",
      marker: {
        size: bubbleSizes,
        color: bubbleColors,
        sizemode: "area",
      },
      hovertemplate:
        "<b>%{text}</b><br>" +
        "GDP: %{x}<br>" +
        `${metricDisplayNames[consumptionMetric]}: %{y}<extra></extra>`,
    };

    const layout = {
      title: `Scatter: GDP vs. ${metricDisplayNames[consumptionMetric]} (${region})`,
      xaxis: { title: "GDP" },
      yaxis: { title: metricDisplayNames[consumptionMetric] },
      transition: {
        duration: 500,
        easing: "cubic-in-out",
      },
    };

    Plotly.react("scatterChart", [trace], layout);
  }

  function drawGrowthChart(region, consumptionMetric) {
    const years = d3.range(1993, 2024);
    let traces = [];

    if (region === "Global") {
      const globalData = rawData.filter(
        (d) => d.iso_code && d.iso_code.length === 3
      );
      const groups = d3.group(globalData, (d) => getContinentForRecord(d));
      groups.forEach((vals, continent) => {
        const yVals = years.map((yr) => {
          const yearData = vals.filter(
            (d) => d.year === yr && !isNaN(d[consumptionMetric])
          );
          return yearData.length
            ? d3.mean(yearData, (d) => d[consumptionMetric])
            : null;
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
      const continentData = rawData.filter(
        (d) =>
          d.iso_code &&
          d.iso_code.length === 3 &&
          getContinentForRecord(d) === region
      );
      const overallYVals = years.map((yr) => {
        const yearData = continentData.filter(
          (d) => d.year === yr && !isNaN(d[consumptionMetric])
        );
        return yearData.length
          ? d3.mean(yearData, (d) => d[consumptionMetric])
          : null;
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
          (d) =>
            d.iso_code && d.iso_code.length === 3 && d.subregions === subreg
        );
        if (subData.length > 0) {
          const subYVals = years.map((yr) => {
            const yearData = subData.filter(
              (d) => d.year === yr && !isNaN(d[consumptionMetric])
            );
            return yearData.length
              ? d3.mean(yearData, (d) => d[consumptionMetric])
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
          return rec ? rec[consumptionMetric] : null;
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
      title: `Trend in ${metricDisplayNames[consumptionMetric]} Over Time (${region})`,
      xaxis: {
        title: "Year",
        range: [1993, 2023],
        dtick: 1,
      },
      yaxis: {
        title: metricDisplayNames[consumptionMetric],
      },
      height: 500,
      transition: { duration: 500, easing: "cubic-in-out" },
    };

    Plotly.react("lineChart", traces, layout);
  }
  function drawFirstMetricTrend(region, firstMetric) {
    const years = d3.range(1993, 2024);
    let traces = [];

    if (region === "Global") {
      const globalData = rawData.filter(
        (d) => d.iso_code && d.iso_code.length === 3
      );
      const grouped = d3.group(globalData, (d) => getContinentForRecord(d));
      grouped.forEach((vals, continent) => {
        const yVals = years.map((yr) => {
          const yearData = vals.filter(
            (d) => d.year === yr && !isNaN(d[firstMetric])
          );
          return yearData.length
            ? d3.mean(yearData, (d) => d[firstMetric])
            : null;
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
      const regionYVals = years.map((yr) => {
        const yearData = regionData.filter(
          (d) => d.year === yr && !isNaN(d[firstMetric])
        );
        return yearData.length
          ? d3.mean(yearData, (d) => d[firstMetric])
          : null;
      });
      traces.push({
        x: years,
        y: regionYVals,
        mode: "lines+markers",
        name: region,
        line: { width: 3 },
        opacity: 0.9,
      });

      const subs = getRegionGroup(region);
      subs.forEach((subreg) => {
        const subData = rawData.filter(
          (d) =>
            d.iso_code && d.iso_code.length === 3 && d.subregions === subreg
        );
        if (subData.length > 0) {
          const subYVals = years.map((yr) => {
            const yearData = subData.filter(
              (d) => d.year === yr && !isNaN(d[firstMetric])
            );
            return yearData.length
              ? d3.mean(yearData, (d) => d[firstMetric])
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
      const grouped = d3.group(filtered, (d) => d.country);
      grouped.forEach((vals, country) => {
        vals.sort((a, b) => a.year - b.year);
        let yVals = years.map((yr) => {
          const rec = vals.find((d) => d.year === yr);
          return rec ? rec[firstMetric] : null;
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
      title: `Trend in ${metricDisplayNames[firstMetric]} Over Time (${region})`,
      xaxis: {
        title: "Year",
        range: [1993, 2023],
        dtick: 1,
        tickangle: -45,
      },
      yaxis: {
        title: metricDisplayNames[firstMetric],
      },
      height: 500,
      transition: { duration: 500, easing: "cubic-in-out" },
    };

    Plotly.react("firstMetricLineChart", traces, layout);
  }

  // setup event listeners for controls
  const yearSlider = document.getElementById("yearSlider");
  const metricSelect = document.getElementById("metricSelect");
  const consumptionSelect = document.getElementById("consumptionSelect");
  const showConsumption = document.getElementById("showConsumption");
  const showIncome = document.getElementById("showIncome");
  const consumptionGroup = document.getElementById("consumptionGroup");

  yearSlider.addEventListener("input", () => {
    document.getElementById("yearLabel").textContent = yearSlider.value;
    updateView();
  });
  metricSelect.addEventListener("change", updateView);
  regionSelect.addEventListener("change", updateView);
  consumptionSelect.addEventListener("change", updateView);
  showConsumption.addEventListener("change", () => {
    consumptionGroup.style.display = showConsumption.checked
      ? "inline-block"
      : "none";
    updateView();
  });
  showIncome.addEventListener("change", updateView);
  let activeIncomeCategory = null;

  // main update function
  function updateView() {
    const year = +yearSlider.value;
    const region = regionSelect.value;
    const currentRegion = region;
    const choroplethMetric = metricSelect.value;
    const consumptionMetric = consumptionSelect.value;

    let filtered = rawData.filter(
      (d) => d.year === year && d.iso_code && d.iso_code.length === 3
    );
    if (region !== "Global") {
      if (region in regionCenters) {
        const subregions = getRegionGroup(region);
        filtered = filtered.filter((d) => subregions.includes(d.subregions));
      } else {
        filtered = filtered.filter((d) => d.subregions === region);
      }
    }

    let zBinned;
    if (choroplethMetric === "gdp") {
      zBinned = filtered.map((d) => {
        const prev = rawData.find(
          (dd) => dd.iso_code === d.iso_code && dd.year === year - 1
        );
        const growth = prev && prev.gdp ? (d.gdp - prev.gdp) / prev.gdp : null;
        return metricConfigs.gdp_growth.binFunction(growth);
      });
    } else {
      const config = metricConfigs[choroplethMetric];
      zBinned = filtered.map((d) => config.binFunction(d[choroplethMetric]));
    }

    let bubbleSizes = [];
    if (showConsumption.checked) {
      if (consumptionMetric === "primary_energy_consumption") {
        bubbleSizes = filtered.map((d) => {
          const val = d[consumptionMetric];
          return val ? Math.sqrt(val) * 2 : 5;
        });
      } else if (consumptionMetric === "energy_per_capita") {
        bubbleSizes = filtered.map((d) => {
          const val = d[consumptionMetric];
          return val ? Math.sqrt(val) * 0.5 : 5;
        });
      }
    } else {
      bubbleSizes = filtered.map(() => 5);
    }

    const configChoro =
      metricConfigs[choroplethMetric] || metricConfigs.gdp_growth;
    const choroplethTrace = {
      type: "choropleth",
      locationmode: "ISO-3",
      locations: filtered.map((d) => d.iso_code),
      z: zBinned,
      text: filtered.map((d) => d.country),
      hovertemplate:
        "<b>%{text}</b><br>" +
        "Year: " +
        year +
        "<br>" +
        (choroplethMetric === "gdp_growth"
          ? "GDP Growth bin: %{z}"
          : `${metricDisplayNames[choroplethMetric]}: %{z}`) +
        "<extra></extra>",
      colorscale: configChoro.colorScale,
      autocolorscale: false,
      zmin: configChoro.zmin,
      zmax: configChoro.zmax,
      colorbar: {
        tickvals: configChoro.tickVals,
        ticktext: configChoro.tickText,
        title: configChoro.colorbarTitle,
        x: 0.0,
        xanchor: "left",
      },
      showlegend: false,
    };

    let bubbleTraces = [];
    if (showIncome.checked) {
      const groups = {};
      filtered.forEach((d) => {
        const key = d.wb_income_class;
        if (!groups[key]) groups[key] = [];
        groups[key].push(d);
      });
      // console.log("Income class groups:", groups);
      // console.log("Unique income classes:", Object.keys(groups));
      bubbleTraces = Object.keys(groups)
        .map((incomeClass) => {
          const groupData = groups[incomeClass];
          if (!groupData || !groupData.length) {
            console.log(`No data for income class: ${incomeClass}`);
            return null;
          }
          const sizes = groupData.map((d) => {
            const val = showConsumption.checked
              ? d[consumptionMetric]
              : d.primary_energy_consumption;
            return val ? Math.sqrt(val) * 2 : 5;
          });
          const realValues = groupData.map((d) => d[consumptionMetric]);

          const origColor = incomeColorMapping[incomeClass] || "#7f7f7f";
          // console.log(
          //   `Creating trace for ${incomeClass} with color ${origColor}`
          // );
          return {
            type: "scattergeo",
            locationmode: "ISO-3",
            locations: groupData.map((d) => d.iso_code),
            text: groupData.map((d) => d.country),
            name: incomeClass,
            customdata: realValues,
            hovertemplate:
              `<b>%{text}</b><br>Year: ${year}<br>Income: ${incomeClass}<br>` +
              (showConsumption.checked
                ? `${metricDisplayNames[consumptionMetric]}: %{customdata:.2f} TWh (kWh)`
                : "") +
              `<extra></extra>`,
            marker: {
              size: sizes,
              color: origColor,
              opacity: 0.8,
              sizemode: "area",
            },
            showlegend: true,
            originalColor: origColor,
          };
        })
        .filter((t) => t !== null);
      // console.log("Bubble traces created:", bubbleTraces);
      if (bubbleTraces.length === 0) {
        // console.warn("No bubble traces created - check data or income classes");
        bubbleTraces = [
          {
            type: "scattergeo",
            locationmode: "ISO-3",
            locations: [],
            text: [],
            name: "No Data",
            hovertemplate: `<b>No Data</b><br>Year: ${year}<extra></extra>`,
            marker: {
              size: [],
              color: "#7f7f7f",
              opacity: 0.8,
              sizemode: "area",
            },
            showlegend: false,
          },
        ];
      }
    } else {
      const defaultColor = "#7f7f7f";
      const sizes = filtered.map((d) => {
        const val = showConsumption.checked
          ? d[consumptionMetric]
          : d.primary_energy_consumption;
        return val ? Math.sqrt(val) * 2 : 5;
      });
      bubbleTraces = [
        {
          type: "scattergeo",
          locationmode: "ISO-3",
          locations: filtered.map((d) => d.iso_code),
          text: filtered.map((d) => d.country),
          hovertemplate: `<b>%{text}</b><br>Year: ${year}<extra></extra>`,
          marker: {
            size: sizes,
            color: defaultColor,
            opacity: 0.8,
            sizemode: "area",
          },
          showlegend: false,
        },
      ];
      // console.log("Bubble traces (showIncome unchecked):", bubbleTraces);
    }

    let centerInfo =
      regionCenters[region] ||
      subregionCenters[region] ||
      regionCenters["Global"];
    const mapLayout = {
      title: `Map (${metricDisplayNames[choroplethMetric]}) - ${year} (${region})`,
      geo: { projection: { type: "equirectangular" } },
      legend: showIncome.checked
        ? {
            x: 1,
            y: 0.5,
            xanchor: "left",
            yanchor: "middle",
          }
        : {},
    };

    const allTraces = [choroplethTrace, ...bubbleTraces];
    // console.log("All traces for Plotly:", allTraces);

    Plotly.newPlot("mapDiv", allTraces, mapLayout, { responsive: true })
      .then((gd) => {
        // console.log("Plotly plot created successfully, data:", gd.data);
        gd.on("plotly_legendclick", function (evt) {
          // console.log("Legend click event:", evt);
          // console.log("Trace index clicked:", evt.traceIndex);
          // console.log("All traces in plot:", gd.data);
          try {
            if (evt.traceIndex < 1) {
              console.log("Clicked choropleth trace, ignoring");
              return false;
            }

            if (evt.traceIndex >= gd.data.length) {
              console.log(
                "Trace index out of bounds:",
                evt.traceIndex,
                "length:",
                gd.data.length
              );
              return false;
            }

            const clickedTrace = gd.data[evt.traceIndex];
            if (!clickedTrace || !clickedTrace.name) {
              console.log("Invalid trace or no name", clickedTrace);
              return false;
            }

            const clickedCategory = clickedTrace.name;
            console.log(
              "Clicked category:",
              clickedCategory,
              "in region:",
              currentRegion
            );

            if (currentRegion === "Global") {
              console.log(
                "Global mode - activeIncomeCategory before:",
                activeIncomeCategory
              );
              if (activeIncomeCategory === clickedCategory) {
                console.log("Resetting to show all categories");
                gd.data.forEach((trace, idx) => {
                  if (idx >= 1 && trace.type === "scattergeo") {
                    trace.visible = true;
                    trace.marker.color = trace.originalColor || "#7f7f7f";
                  }
                });
                activeIncomeCategory = null;
              } else {
                console.log("Showing only category:", clickedCategory);
                gd.data.forEach((trace, idx) => {
                  if (idx >= 1 && trace.type === "scattergeo") {
                    trace.visible = trace.name === clickedCategory;
                    trace.marker.color = trace.originalColor || "#7f7f7f";
                  }
                });
                activeIncomeCategory = clickedCategory;
              }
              console.log("Redrawing plot with updated visibility");
              Plotly.redraw(gd);
              return false;
            } else {
              console.log("Subregion mode - using default Plotly toggle");
              return true;
            }
          } catch (error) {
            console.error("Error in legend click handler:", error);
            return false;
          }
        });
      })
      .catch((err) => {
        console.error("Error creating Plotly plot:", err);
      });

    Plotly.relayout("mapDiv", {
      "geo.center.lat": centerInfo.lat,
      "geo.center.lon": centerInfo.lon,
      "geo.projection.scale": centerInfo.scale,
    });

    // update charts
    drawScatterChart(region, consumptionMetric);
    drawGrowthChart(region, consumptionMetric);
    const firstMetric = document.getElementById("metricSelect").value; // Fixed ID
    drawFirstMetricTrend(region, firstMetric);
  }

  // initialize view
  document.getElementById("yearLabel").textContent = yearSlider.value;
  updateView();
});

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'929f3b07ec61458e',t:'MTc0MzU4NTQxOS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();

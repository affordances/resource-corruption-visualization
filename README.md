# Oil and corruption: a visualization

I wanted a way to learn more about data visualization and related libraries, but I needed a thing to visualize. A friend suggested a possible link between corruption and natural resources like oil -- do oil booms increase corruption in already corrupt countries, or is there no relationship? I liked the idea and got to work.

I discovered I could get oil export data from the [Observatory of Economic Complexity](https://atlas.media.mit.edu/en/) API, but the calls required three-character country codes (like `ago` for Angola). The [Corruption Perceptions Index](https://datahub.io/core/corruption-perceptions-index) dataset, on the other hand, had a long list of ranked countries, but no associated country codes. After some searching, I discovered a `csv` of [country codes](https://github.com/cid-harvard/classifications/blob/cdf935af16a1c0c31833938af1e8444b6387e6ac/location/International/Atlas/out/locations_international_atlas.csv) kept by the good people at the [Atlas of Economic Complexity](http://atlas.cid.harvard.edu/).

Next, I used [d3-fetch](https://www.npmjs.com/package/d3-fetch) to convert the CPI and country code `csv`s into `JSON` objects. These I ran through the function below:

```
organizeData = (corruptionData, countryData) => {
  const countryCodes = countryData.map(country => ({ name: country["name_en"], code: country["code"] }));
  const countryYears = corruptionData.map(country => {
    let currentYear = {};
    Object.entries(country).forEach(([key, value]) => {
      if (value === "-") {
        currentYear[key] = null;
      } else if (key !== "Jurisdiction") {
        currentYear[key] = Number(value);
      }
    });
    return { name: country["Jurisdiction"], years: currentYear };
  })
  const result = countryYears.map(country => {
    const match = countryCodes.find(countryMatch => countryMatch.name === country.name);
    if (match !== undefined) {
      country["code"] = match["code"];
    }
    return country;
  });
  return result;
}
```

I still had to go through the resulting object and remove duplicate countries and add a handful of still-missing country codes, but I was glad to have to automated the majority of the work.

For simplicity's sake, I ignored Transparency International's [methodology change](https://www.transparency.org/files/content/pressrelease/2012_CPIUpdatedMethodology_EMBARGO_EN.pdf) and normalized their rankings across the entire dataset -- I'm a developer, not a data scientist, and this WAS only an exercise after all.

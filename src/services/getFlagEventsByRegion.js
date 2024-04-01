async function getFlagEventsByRegion(region) {
    const resp = await fetch(`https://api.flagstatus.org/regions/${region}`);
    const json = await resp.json();
    return json[region];
}

export default getFlagEventsByRegion;

async function getFlagStatus(state) {
    const resp = await fetch(`https://api.flagstatus.org/region/${state}`);
    return resp.json();
}

export default getFlagStatus;

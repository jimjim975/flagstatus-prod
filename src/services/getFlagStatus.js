async function getFlagStatus(state) {
    const resp = await fetch(`https://api.flagstatus.org/regions/${state}`);
    return resp.json();
}

export default getFlagStatus;

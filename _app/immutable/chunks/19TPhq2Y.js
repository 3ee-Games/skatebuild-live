async function r(a,o){const t=await a(`/data/${o}`);if(!t.ok)throw new Error(`Failed to load ${o}: ${t.status}`);return t.json()}export{r as f};

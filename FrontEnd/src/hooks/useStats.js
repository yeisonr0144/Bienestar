function isNumberLike(v) {
  if (v === null || v === undefined || v === '') return false;
  const n = Number(v);
  return Number.isFinite(n);
}

export function computeStats(rows) {
  const result = { rowCount: 0, columns: [] };
  if (!rows || !rows.length) return result;
  result.rowCount = rows.length;
  const columns = Array.from(
    rows.reduce((set, r) => {
      Object.keys(r).forEach((k) => set.add(k));
      return set;
    }, new Set())
  );

  for (const col of columns) {
    const values = rows.map((r) => r[col]).filter((v) => v !== null && v !== undefined && v !== '');
    const numericValues = values.filter(isNumberLike).map(Number);
    const isNumeric = values.length > 0 && numericValues.length / values.length > 0.6; // heurística

    if (isNumeric) {
      const min = Math.min(...numericValues);
      const max = Math.max(...numericValues);
      const sum = numericValues.reduce((a, b) => a + b, 0);
      const mean = numericValues.length ? sum / numericValues.length : 0;
      result.columns.push({
        name: col,
        type: 'numeric',
        count: values.length,
        min,
        max,
        mean: Number.isFinite(mean) ? Number(mean.toFixed(2)) : null,
      });
    } else {
      // frecuencia top 10
      const freq = new Map();
      for (const v of values) freq.set(String(v), (freq.get(String(v)) || 0) + 1);
      const top = Array.from(freq.entries())
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
      result.columns.push({ name: col, type: 'categorical', count: values.length, top });
    }
  }

  return result;
}
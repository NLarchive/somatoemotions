import Ajv2020 from 'ajv/dist/2020.js';
export function parseJsonStrict(text) {
  let pos = 0;
  const ws = () => {
    while (/\s/.test(text[pos] || '') && pos < text.length) pos++;
  };
  function string() {
    const start = pos++;
    while (pos < text.length) {
      if (text[pos] === '\\') {
        pos += 2;
        continue;
      }
      if (text[pos++] === '"') return JSON.parse(text.slice(start, pos));
    }
    throw Error('Unterminated JSON string');
  }
  function value() {
    ws();
    if (text[pos] === '{') {
      pos++;
      ws();
      const keys = new Set();
      if (text[pos] === '}') {
        pos++;
        return;
      }
      while (true) {
        ws();
        if (text[pos] !== '"') throw Error('Expected JSON key');
        const k = string();
        if (keys.has(k)) throw Error(`Duplicate JSON key: ${k}`);
        keys.add(k);
        ws();
        if (text[pos++] !== ':') throw Error('Expected colon');
        value();
        ws();
        if (text[pos] === '}') {
          pos++;
          return;
        }
        if (text[pos++] !== ',') throw Error('Expected comma');
      }
    } else if (text[pos] === '[') {
      pos++;
      ws();
      if (text[pos] === ']') {
        pos++;
        return;
      }
      while (true) {
        value();
        ws();
        if (text[pos] === ']') {
          pos++;
          return;
        }
        if (text[pos++] !== ',') throw Error('Expected comma');
      }
    } else if (text[pos] === '"') string();
    else {
      const m = /^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/.exec(
        text.slice(pos),
      );
      if (!m) throw Error('Invalid JSON value');
      pos += m[0].length;
    }
  }
  value();
  ws();
  if (pos !== text.length) throw Error('Trailing JSON data');
  return JSON.parse(text);
}
export function validateContract(data, schema) {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const valid = ajv.compile(schema);
  const ok = valid(data);
  return {
    ok: Boolean(ok),
    errors: (valid.errors || []).map((e) => `${e.instancePath} ${e.message}`),
  };
}
export function run({ text }) {
  return { value: parseJsonStrict(text) };
}

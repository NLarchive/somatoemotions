import { element } from '../safe-rendering/main.js';
import { searchEmotions } from '../../application/services/navigation-service/main.js';
export const TAB_IDS = ['somatic', 'facs', 'actions'];
export function panelId(tab) {
  if (!TAB_IDS.includes(tab)) throw Error('Unknown tab');
  return `panel-${tab}`;
}
export function createShell(data, onSelect, doc = globalThis.document) {
  const scope = new doc.defaultView.AbortController();
  const on = (target, event, handler) =>
    target.addEventListener(event, handler, { signal: scope.signal });
  let query = '',
    category = 'All',
    selectedId = null;
  const nav = doc.getElementById('emotion-list'),
    count = doc.getElementById('result-count');
  function markActive() {
    for (const b of nav.querySelectorAll('button')) {
      const active = b.dataset.emotion === selectedId;
      b.classList.toggle('active', active);
      if (active) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    }
  }
  function refresh() {
    const out = searchEmotions(data, { query, category, selectedId });
    selectedId = out.selectedId;
    nav.replaceChildren();
    for (const e of out.results) {
      const b = element('button', e.display_name, 'nav-item', doc);
      b.type = 'button';
      b.dataset.emotion = e.id;
      on(b, 'click', () => {
        selectedId = e.id;
        markActive();
        onSelect(e);
      });
      nav.append(b);
    }
    markActive();
    count.textContent = out.results.length
      ? `${out.results.length} emotions shown`
      : 'No matching emotions. Try another search or category.';
    onSelect(data.emotions.find((e) => e.id === selectedId) || null);
  }
  const search = doc.getElementById('global-search');
  on(search, 'input', () => {
    query = search.value;
    refresh();
  });
  for (const button of doc.querySelectorAll('#category-filters button'))
    on(button, 'click', () => {
      category = button.dataset.filter;
      for (const b of doc.querySelectorAll('#category-filters button')) {
        const active = b === button;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      }
      refresh();
    });
  const tabs = [...doc.querySelectorAll('[role=tab]')];
  const activate = (tab) => {
    for (const b of tabs) {
      const active = b === tab;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
      b.tabIndex = active ? 0 : -1;
      const panel = doc.getElementById(panelId(b.dataset.tab));
      panel.hidden = !active;
      panel.classList.toggle('active', active);
    }
  };
  for (const b of tabs) {
    on(b, 'click', () => activate(b));
    on(b, 'keydown', (ev) => {
      let index = tabs.indexOf(b);
      if (ev.key === 'ArrowRight') index = (index + 1) % tabs.length;
      else if (ev.key === 'ArrowLeft') index = (index + tabs.length - 1) % tabs.length;
      else if (ev.key === 'Home') index = 0;
      else if (ev.key === 'End') index = tabs.length - 1;
      else return;
      ev.preventDefault();
      activate(tabs[index]);
      tabs[index].focus();
    });
  }
  refresh();
  return { refresh, selectedId: () => selectedId, dispose: () => scope.abort() };
}
export function run({ tab }) {
  return { panel: panelId(tab) };
}

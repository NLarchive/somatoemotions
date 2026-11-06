export function auditPlan(plan) {
  const errors = [],
    tasks = new Map(),
    names = new Set();
  const add = (m) => errors.push(m);
  for (const t of plan.tasks || []) {
    if (tasks.has(t.task_id)) add(`Duplicate task ID ${t.task_id}`);
    tasks.set(t.task_id, t);
    if (names.has(t.task_name)) add('Duplicate task name');
    names.add(t.task_name);
  }
  if (!tasks.size) add('No tasks');
  if (!tasks.size) return { ok: false, errors };
  const units = new Map((plan.unit_registry || []).map((u) => [u.name, u]));
  const nodes = new Set((plan.project_structure?.path_graph?.nodes || []).map((n) => n.id));
  const categories = new Set((plan.categories || []).map((c) => c.name));
  const workers = new Set((plan.workers || []).map((w) => w.worker_id));
  for (const t of tasks.values()) {
    for (const [field, enumeration] of [
      ['status', 'status'],
      ['priority', 'priority'],
      ['complexity', 'complexity'],
    ])
      if (!plan.enums?.[enumeration]?.includes(t[field])) add(`Invalid ${field}: ${t.task_id}`);
    if (!(t.progress_percentage >= 0 && t.progress_percentage <= 100))
      add(`Invalid progress ${t.task_id}`);
    if (
      (t.status === 'Done' && t.progress_percentage !== 100) ||
      (t.status === 'Not Started' && t.progress_percentage !== 0)
    )
      add(`Status/progress mismatch ${t.task_id}`);
    for (const field of ['start_date', 'end_date', 'due_date']) {
      const value = t[field];
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
        !Number.isFinite(Date.parse(value)) ||
        new Date(value).toISOString().slice(0, 10) !== value
      )
        add(`Invalid date ${t.task_id}/${field}`);
    }
    if (t.start_date > t.end_date || t.end_date > t.due_date) add(`Invalid dates ${t.task_id}`);
    if (!categories.has(t.category_name) || !nodes.has(t.path_node_id))
      add(`Unknown category/path ${t.task_id}`);
    for (const w of t.assigned_workers || [])
      if (!workers.has(w.worker_id)) add(`Unknown worker ${t.task_id}`);
    if (t.target_unit && !units.has(t.target_unit)) add(`Unknown unit ${t.task_id}`);
    for (const dep of t.dependencies || []) {
      if (!tasks.has(dep.predecessor_task_id) || dep.predecessor_task_id === t.task_id)
        add(`Invalid dependency ${t.task_id}`);
      else if (dep.type === 'FS' && tasks.get(dep.predecessor_task_id).end_date > t.start_date)
        add(`Invalid predecessor schedule ${t.task_id}`);
    }
    if (t.target_unit) {
      const u = units.get(t.target_unit);
      const expected = new Set(
        (t.dependencies || [])
          .map((x) => tasks.get(x.predecessor_task_id)?.target_unit)
          .filter(Boolean),
      );
      const actual = new Set((u?.depends_on || []).map((x) => x.unit));
      if (expected.size !== actual.size || [...expected].some((x) => !actual.has(x)))
        add(`Task/unit dependency mismatch ${t.task_id}`);
    }
  }
  const visited = new Set(),
    active = new Set();
  function visit(id) {
    if (active.has(id)) {
      add(`Dependency cycle ${id}`);
      return;
    }
    if (visited.has(id)) return;
    active.add(id);
    for (const dep of tasks.get(id)?.dependencies || []) visit(dep.predecessor_task_id);
    active.delete(id);
    visited.add(id);
  }
  for (const id of tasks.keys()) visit(id);
  for (const u of units.values())
    for (const dep of u.depends_on || []) {
      const target = units.get(dep.unit);
      if (!target || !plan.project_structure.dependency_rules[u.layer]?.includes(target.layer))
        add(`Disallowed unit dependency ${u.name}`);
    }
  for (const e of plan.project_structure?.path_graph?.edges || [])
    if (!nodes.has(e.from) || !nodes.has(e.to)) add('Unknown path edge');
  const edges = plan.project_structure?.path_graph?.edges || [];
  const expectedEdges = new Set();
  for (const u of units.values())
    for (const dep of u.depends_on || []) {
      const target = units.get(dep.unit);
      if (target) expectedEdges.add(u.path + '|' + target.path);
    }
  const actualEdges = new Set(
    edges.filter((e) => e.role !== 'contains').map((e) => e.from + '|' + e.to),
  );
  if (
    expectedEdges.size !== actualEdges.size ||
    [...expectedEdges].some((e) => !actualEdges.has(e))
  )
    add('Path/unit dependency graph mismatch');
  for (const e of edges)
    if (e.role === 'contains' && e.to.slice(0, e.to.lastIndexOf('/')) !== e.from)
      add('Invalid path containment');
  for (const m of plan.project?.milestones || [])
    for (const n of m.linked_task_names || []) if (!names.has(n)) add('Unknown milestone task');
  const nav = plan.navigation?.modules?.flatMap((x) => x.taskIds) || [];
  if (
    nav.length !== tasks.size ||
    new Set(nav).size !== tasks.size ||
    nav.some((id) => !tasks.has(id))
  )
    add('Navigation mismatch');
  const end = plan.project?.graph_end;
  if (end?.terminal_task_id !== undefined) {
    const prerequisites = new Set(end.required_task_ids || []);
    if (
      !tasks.has(end.terminal_task_id) ||
      prerequisites.size !== tasks.size - 1 ||
      [...tasks.keys()].some((id) => id !== end.terminal_task_id && !prerequisites.has(id))
    )
      add('Terminal task must account for all other project tasks');
    if (
      tasks.get(end.terminal_task_id)?.status === 'Done' &&
      [...prerequisites].some((id) => !['Done', 'Cancelled'].includes(tasks.get(id)?.status))
    )
      add('Terminal task closed with unfinished prerequisites');
  }
  if (
    plan.project?.status === 'Completed' &&
    [...tasks.values()].some((t) => !['Done', 'Cancelled'].includes(t.status))
  )
    add('Project completed with unfinished tasks');
  return { ok: !errors.length, errors };
}
export function run({ plan }) {
  return auditPlan(plan);
}

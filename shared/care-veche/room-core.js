/* SUTI care / veche: bounded local discussion data. No storage, network or execution. */
(function (root) {
  'use strict';

  var SOURCE_SHA256 = '58b895e7af0ed3b057a2be1951af42023bc2b6f346432f569ade88577e9711fb';
  var SOURCE_VERSION = '2026-11-13.v1';
  var ENVELOPE_SCHEMA = 'suti.care-veche.room-envelope.v1';
  var STATE_SCHEMA = 'suti.care-veche.room-state.v1';
  var MODULE_IDS = Object.freeze(['SUTI.angels', 'SUTI.care', 'SUTI.verenium', 'SUTI.veche', 'SUTI.os', 'SUTI.lab', 'SUTI.uni', 'SUTI.world', 'SUTI.clan', 'SUTI.audit', 'SUTI.crystal', 'SUTI.oracle', 'SUTI.sotkan', 'SUTI.game', 'SUTI.logos']);
  var CLAIM_TYPES = Object.freeze(['FACT', 'OBSERVATION', 'INTERPRETATION', 'HYPOTHESIS', 'EVALUATION', 'SYMBOL', 'UNKNOWN']);
  var KINDS = Object.freeze(['contribution', 'proposal', 'position', 'decision_draft']);
  var ACTOR_KINDS = Object.freeze(['human', 'agent', 'tool']);
  var ROLES = Object.freeze(['initiator', 'contributor', 'reviewer', 'human_steward']);
  var POSITIONS = Object.freeze(['support', 'objection', 'abstain', 'no_response']);
  var LIMITS = Object.freeze({ MAX_RECORDS: 256, MAX_TEXT_CHARS: 4000, MAX_TITLE_CHARS: 160, MAX_LABEL_CHARS: 120, MAX_ID_CHARS: 96, MAX_ENVELOPE_BYTES: 1048576 });
  var BASE_KEYS = ['schema', 'source_version', 'source_sha256', 'visibility', 'decision', 'execution', 'transport', 'publish', 'identity_verification', 'consent_verification', 'records'];
  var RECORD_KEYS = ['id', 'kind', 'created_at', 'actor', 'module_id', 'claim_type', 'title', 'body', 'source_ref', 'proposal_id', 'position', 'visibility', 'decision', 'execution'];
  var REQUIRED_RECORD_KEYS = ['id', 'kind', 'created_at', 'actor', 'module_id', 'claim_type', 'title', 'body', 'source_ref'];
  var BAD_CONTROLS = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/u;
  var ID_PATTERN = /^[A-Za-z][A-Za-z0-9._-]{0,95}$/;

  class RoomValidationError extends Error {
    constructor(code, message, path) {
      super(message);
      this.name = 'RoomValidationError';
      this.code = code;
      this.path = path || '$';
    }
  }
  function fail(code, message, path) { throw new RoomValidationError(code, message, path); }
  function own(value, key) { return Object.prototype.hasOwnProperty.call(value, key); }
  function freeze(value) {
    if (value && typeof value === 'object') {
      Object.keys(value).forEach(function (key) { freeze(value[key]); });
      Object.freeze(value);
    }
    return value;
  }

  // Inspect descriptors first: getters, hidden fields and non-JSON values are never read.
  function inspectJSON(value, path, seen, depth, budget) {
    if (depth > 8 || ++budget.nodes > 12000) fail('SHAPE_LIMIT', 'JSON structure exceeds the local limit.', path);
    if (typeof value === 'string') {
      if (exceedsLength(value, LIMITS.MAX_TEXT_CHARS)) fail('TEXT_LIMIT', 'Text exceeds the local character limit.', path);
      if (BAD_CONTROLS.test(value)) fail('CONTROL_CHARACTER', 'Text contains a disallowed control character.', path);
      return;
    }
    if (value === null || typeof value === 'boolean') return;
    if (typeof value === 'number' && Number.isFinite(value)) return;
    if (typeof value !== 'object') fail('NON_JSON_VALUE', 'Only plain JSON data is accepted.', path);
    if (seen.has(value)) fail('NON_JSON_VALUE', 'Cyclic object references are not accepted.', path);
    seen.add(value);
    if (Object.getOwnPropertySymbols(value).length) fail('NON_PLAIN_SHAPE', 'Symbol properties are not accepted.', path);
    var array = Array.isArray(value);
    var prototype = Object.getPrototypeOf(value);
    if (array ? prototype !== Array.prototype : prototype !== Object.prototype && prototype !== null) fail('NON_PLAIN_SHAPE', 'Only plain objects and arrays are accepted.', path);
    if (array && value.length > LIMITS.MAX_RECORDS) fail('RECORD_LIMIT', 'Too many local records.', path);
    var descriptors = Object.getOwnPropertyDescriptors(value);
    var keys = Object.keys(descriptors);
    if (keys.length > (array ? LIMITS.MAX_RECORDS + 1 : 32)) fail('SHAPE_LIMIT', 'Object has too many fields.', path);
    keys.forEach(function (key) {
      if (key === '__proto__' || key === 'prototype' || key === 'constructor') fail('PROTOTYPE_KEY', 'Prototype-related fields are not accepted.', path + '.' + key);
      var descriptor = descriptors[key];
      if (!own(descriptor, 'value')) fail('ACCESSOR_PROPERTY', 'Accessor properties are not accepted.', path + '.' + key);
      if (array && key === 'length') return;
      if (!descriptor.enumerable) fail('NON_PLAIN_SHAPE', 'Hidden properties are not accepted.', path + '.' + key);
      if (array && (!/^(0|[1-9][0-9]*)$/.test(key) || Number(key) >= value.length)) fail('NON_PLAIN_SHAPE', 'Arrays may contain indexed records only.', path + '.' + key);
      inspectJSON(descriptor.value, path + (array ? '[' + key + ']' : '.' + key), seen, depth + 1, budget);
    });
    if (array) {
      for (var i = 0; i < value.length; i += 1) if (!own(descriptors, String(i))) fail('NON_PLAIN_SHAPE', 'Sparse arrays are not accepted.', path);
    }
    seen.delete(value);
  }
  function inspect(value, path) { inspectJSON(value, path || '$', new Set(), 0, { nodes: 0 }); }
  function object(value, path) {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) fail('TYPE_INVALID', 'A plain object is required.', path);
  }
  function shape(value, allowed, required, path) {
    object(value, path);
    Object.keys(value).forEach(function (key) { if (allowed.indexOf(key) < 0) fail('UNKNOWN_FIELD', 'Unexpected field is not accepted.', path + '.' + key); });
    required.forEach(function (key) { if (!own(value, key)) fail('REQUIRED_FIELD', 'Required field is missing.', path + '.' + key); });
  }
  function constant(value, expected, path, code) { if (value !== expected) fail(code || 'BOUNDARY_INVALID', 'This local boundary must remain fixed.', path); }
  function enumeration(value, choices, path) { if (typeof value !== 'string' || choices.indexOf(value) < 0) fail('ENUM_INVALID', 'Value is outside the supported choices.', path); }
  function exceedsLength(value, limit) {
    var count = 0;
    for (var character of value) { if (++count > limit) return true; }
    return false;
  }
  function textField(value, limit, path, nonblank) {
    if (typeof value !== 'string') fail('TYPE_INVALID', 'A plain text string is required.', path);
    if (exceedsLength(value, limit)) fail('TEXT_LIMIT', 'Text exceeds the field character limit.', path);
    if (BAD_CONTROLS.test(value)) fail('CONTROL_CHARACTER', 'Text contains a disallowed control character.', path);
    if (nonblank && !value.trim()) fail('TEXT_REQUIRED', 'Non-empty text is required.', path);
  }
  function identifier(value, path) {
    if (typeof value !== 'string' || !ID_PATTERN.test(value)) fail('ID_INVALID', 'Use a bounded identifier, without paths or commands.', path);
    if (value === '__proto__' || value === 'prototype' || value === 'constructor') fail('ID_INVALID', 'Reserved identifiers are not accepted.', path);
  }
  function timestamp(value, path) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) fail('TIMESTAMP_INVALID', 'A real UTC ISO timestamp is required.', path);
    var time = Date.parse(value);
    var expected = value.length === 20 ? value.slice(0, -1) + '.000Z' : value;
    if (!Number.isFinite(time) || new Date(time).toISOString() !== expected) fail('TIMESTAMP_INVALID', 'A real UTC ISO timestamp is required.', path);
  }
  function normalizeRecord(input, path, imported) {
    shape(input, RECORD_KEYS, imported ? REQUIRED_RECORD_KEYS.concat(['visibility', 'decision', 'execution']) : REQUIRED_RECORD_KEYS, path);
    identifier(input.id, path + '.id');
    enumeration(input.kind, KINDS, path + '.kind');
    timestamp(input.created_at, path + '.created_at');
    shape(input.actor, ['id', 'label', 'kind', 'role', 'identity'], ['id', 'label', 'kind', 'role', 'identity'], path + '.actor');
    identifier(input.actor.id, path + '.actor.id');
    textField(input.actor.label, LIMITS.MAX_LABEL_CHARS, path + '.actor.label', true);
    enumeration(input.actor.kind, ACTOR_KINDS, path + '.actor.kind');
    enumeration(input.actor.role, ROLES, path + '.actor.role');
    constant(input.actor.identity, 'UNVERIFIED', path + '.actor.identity', 'IDENTITY_UNVERIFIED_ONLY');
    if (input.actor.role === 'human_steward' && input.actor.kind !== 'human') fail('ROLE_KIND_INVALID', 'The human steward label requires the declared human kind.', path + '.actor.role');
    enumeration(input.module_id, MODULE_IDS, path + '.module_id');
    enumeration(input.claim_type, CLAIM_TYPES, path + '.claim_type');
    textField(input.title, LIMITS.MAX_TITLE_CHARS, path + '.title', false);
    textField(input.body, LIMITS.MAX_TEXT_CHARS, path + '.body', true);
    textField(input.source_ref, LIMITS.MAX_TEXT_CHARS, path + '.source_ref', false);
    ['visibility', 'decision', 'execution'].forEach(function (key) {
      if (own(input, key)) constant(input[key], key === 'visibility' ? 'private' : key === 'decision' ? 'HOLD' : 'OFF', path + '.' + key);
    });
    var referenceRequired = input.kind === 'position' || input.kind === 'decision_draft';
    if (referenceRequired) {
      if (!own(input, 'proposal_id')) fail('REQUIRED_FIELD', 'A proposal reference is required.', path + '.proposal_id');
      identifier(input.proposal_id, path + '.proposal_id');
    } else if (own(input, 'proposal_id')) fail('FIELD_NOT_ALLOWED', 'This record kind has no proposal reference.', path + '.proposal_id');
    if (input.kind === 'position') {
      if (!own(input, 'position')) fail('REQUIRED_FIELD', 'A position is required.', path + '.position');
      enumeration(input.position, POSITIONS, path + '.position');
    } else if (own(input, 'position')) fail('FIELD_NOT_ALLOWED', 'Only a position record has a position field.', path + '.position');
    var result = {
      id: input.id, kind: input.kind, created_at: input.created_at,
      actor: { id: input.actor.id, label: input.actor.label, kind: input.actor.kind, role: input.actor.role, identity: 'UNVERIFIED' },
      module_id: input.module_id, claim_type: input.claim_type, title: input.title, body: input.body, source_ref: input.source_ref
    };
    if (referenceRequired) result.proposal_id = input.proposal_id;
    if (input.kind === 'position') result.position = input.position;
    result.visibility = 'private'; result.decision = 'HOLD'; result.execution = 'OFF';
    return result;
  }
  function container(records, state) {
    return {
      schema: state ? STATE_SCHEMA : ENVELOPE_SCHEMA,
      source_version: SOURCE_VERSION, source_sha256: SOURCE_SHA256,
      visibility: 'private', decision: 'HOLD', execution: 'OFF', transport: 'OFF', publish: 'HOLD',
      identity_verification: 'UNVERIFIED', consent_verification: 'UNVERIFIED', records: records
    };
  }
  function byteLength(value) {
    var serialized = JSON.stringify(value), count = 0;
    for (var i = 0; i < serialized.length; i += 1) {
      var code = serialized.charCodeAt(i);
      if (code < 128) count += 1;
      else if (code < 2048) count += 2;
      else if (code >= 0xD800 && code <= 0xDBFF && i + 1 < serialized.length && serialized.charCodeAt(i + 1) >= 0xDC00 && serialized.charCodeAt(i + 1) <= 0xDFFF) { count += 4; i += 1; }
      else count += 3;
    }
    return count;
  }
  function sizeLimit(records) {
    if (records.length > LIMITS.MAX_RECORDS) fail('RECORD_LIMIT', 'Too many local records.', '$.records');
    if (byteLength(container(records, false)) > LIMITS.MAX_ENVELOPE_BYTES) fail('ENVELOPE_LIMIT', 'The local envelope exceeds one MiB.', '$');
  }
  function deduplicate(records) {
    var byId = new Map(), unique = [], duplicates = 0;
    records.forEach(function (record) {
      if (byId.has(record.id)) {
        if (JSON.stringify(byId.get(record.id)) !== JSON.stringify(record)) fail('ID_CONFLICT', 'An existing record ID has different data.', '$.records');
        duplicates += 1;
      } else { byId.set(record.id, record); unique.push(record); }
    });
    return { records: unique, duplicates: duplicates, byId: byId };
  }
  function references(records) {
    var byId = new Map(records.map(function (record) { return [record.id, record]; }));
    records.forEach(function (record, index) {
      if (own(record, 'proposal_id')) {
        var proposal = byId.get(record.proposal_id);
        if (!proposal || proposal.kind !== 'proposal') fail('REFERENCE_INVALID', 'The reference must resolve to an existing proposal.', '$.records[' + index + '].proposal_id');
      }
    });
  }
  function readContainer(input, state, resolveReferences) {
    inspect(input);
    shape(input, BASE_KEYS, BASE_KEYS, '$');
    constant(input.schema, state ? STATE_SCHEMA : ENVELOPE_SCHEMA, '$.schema', 'SCHEMA_INVALID');
    constant(input.source_version, SOURCE_VERSION, '$.source_version', 'SOURCE_VERSION_INVALID');
    constant(input.source_sha256, SOURCE_SHA256, '$.source_sha256', 'SOURCE_SHA_INVALID');
    ['visibility', 'decision', 'execution', 'transport', 'publish', 'identity_verification', 'consent_verification'].forEach(function (key) {
      var expected = key === 'visibility' ? 'private' : key === 'decision' || key === 'publish' ? 'HOLD' : key.indexOf('verification') >= 0 ? 'UNVERIFIED' : 'OFF';
      constant(input[key], expected, '$.' + key);
    });
    if (!Array.isArray(input.records)) fail('TYPE_INVALID', 'Records must be an array.', '$.records');
    // Bound raw data before deduplication as well as the resulting canonical envelope.
    if (byteLength(input) > LIMITS.MAX_ENVELOPE_BYTES) fail('ENVELOPE_LIMIT', 'The local envelope exceeds one MiB.', '$');
    var normalized = input.records.map(function (record, index) { return normalizeRecord(record, '$.records[' + index + ']', true); });
    var result = deduplicate(normalized);
    if (state && result.duplicates) fail('STATE_DUPLICATE', 'A state must contain unique record IDs.', '$.records');
    if (resolveReferences) references(result.records);
    sizeLimit(result.records);
    return result;
  }
  function createState() { return freeze(container([], true)); }
  function addContribution(state, input) {
    var current = readContainer(state, true, true);
    inspect(input, '$.input');
    var record = normalizeRecord(input, '$.input', false);
    var merged = deduplicate(current.records.concat([record]));
    references(merged.records); sizeLimit(merged.records);
    return freeze(container(merged.records, true));
  }
  function importEnvelope(state, envelope) {
    var current = readContainer(state, true, true);
    var incoming = readContainer(envelope, false, false);
    var merged = deduplicate(current.records.concat(incoming.records));
    // All validation completes before a new state is returned; existing data is untouched.
    references(merged.records); sizeLimit(merged.records);
    return freeze(container(merged.records, true));
  }
  function exportEnvelope(state) {
    var current = readContainer(state, true, true);
    return freeze(container(current.records, false));
  }
  function validateEnvelope(envelope) {
    var result = readContainer(envelope, false, true);
    return freeze({ valid: true, record_count: result.records.length, duplicate_count: result.duplicates });
  }
  function emptyCounts() { return { support: 0, objection: 0, abstain: 0, no_response: 0 }; }
  function summarize(state, proposalId) {
    var current = readContainer(state, true, true);
    identifier(proposalId, '$.proposalId');
    var proposal = current.records.find(function (record) { return record.id === proposalId && record.kind === 'proposal'; });
    if (!proposal) fail('REFERENCE_INVALID', 'A proposal ID is required for a summary.', '$.proposalId');
    var counts = emptyCounts(), byActorKind = { human: emptyCounts(), agent: emptyCounts(), tool: emptyCounts() };
    var positions = current.records.filter(function (record) { return record.kind === 'position' && record.proposal_id === proposalId; });
    positions.forEach(function (record) { counts[record.position] += 1; byActorKind[record.actor.kind][record.position] += 1; });
    return freeze({
      proposal_id: proposalId, proposal: proposal, counts: counts, by_actor_kind: byActorKind,
      position_record_count: positions.length,
      distinct_actor_ids: new Set(positions.map(function (record) { return record.actor.id; })).size,
      positions: positions,
      decision_drafts: current.records.filter(function (record) { return record.kind === 'decision_draft' && record.proposal_id === proposalId; }),
      basis: 'local_records_only', verified_votes: false, quorum: 'NOT_EVALUATED', consent: 'NOT_INFERRED', decision: 'HOLD', execution: 'OFF'
    });
  }
  var api = Object.freeze({
    SOURCE_SHA256: SOURCE_SHA256, SOURCE_VERSION: SOURCE_VERSION, ENVELOPE_SCHEMA: ENVELOPE_SCHEMA, STATE_SCHEMA: STATE_SCHEMA,
    MODULE_IDS: MODULE_IDS, CLAIM_TYPES: CLAIM_TYPES, KINDS: KINDS, ACTOR_KINDS: ACTOR_KINDS, ROLES: ROLES, POSITIONS: POSITIONS, LIMITS: LIMITS,
    RoomValidationError: RoomValidationError, createState: createState, addContribution: addContribution,
    importEnvelope: importEnvelope, exportEnvelope: exportEnvelope, summarize: summarize, validateEnvelope: validateEnvelope
  });
  root.SutiRoomCore = api;
  if (typeof module === 'object' && module && module.exports) module.exports = api;
})(typeof globalThis === 'object' ? globalThis : this);

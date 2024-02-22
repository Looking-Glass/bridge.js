var Qe = Object.defineProperty;
var Xe = (n, e, t) => e in n ? Qe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var b = (n, e, t) => (Xe(n, typeof e != "symbol" ? e + "" : e, t), t);
function Ke(n) {
  const e = JSON.parse(n);
  return e == null ? (console.warn("Unable to parse calibration"), null) : {
    DPI: e.DPI.value,
    center: e.center.value,
    configVersion: e.configVersion,
    flipImageX: e.flipImageX.value,
    flipImageY: e.flipImageY.value,
    flipSubp: e.flipSubp.value,
    fringe: e.fringe.value,
    invView: e.invView.value,
    pitch: e.pitch.value,
    screenH: e.screenH.value,
    screenW: e.screenW.value,
    serial: e.serial,
    slope: e.slope.value,
    verticalAngle: e.verticalAngle.value,
    viewCone: e.viewCone.value
  };
}
function Fe(n) {
  const e = JSON.parse(n);
  return e == null ? null : {
    quiltAspect: e.quiltAspect,
    quiltWidth: e.quiltX,
    quiltHeight: e.quiltY,
    rows: e.tileY,
    columns: e.tileX
  };
}
function et(n) {
  return {
    calibration: Ke(n.calibration.value),
    defaultQuilt: Fe(n.defaultQuilt.value),
    hardwareVersion: n.hardwareVersion.value,
    index: n.index.value,
    state: n.state.value,
    windowCoords: n.windowCoords.value
  };
}
async function T(n) {
  let e, t = j.getInstance();
  t.getVerbosity() >= 3 && t.getVerbosity() !== void 0 && console.group("Endpoint:", n.endpoint), await new Promise((r) => setTimeout(r, 10)), n.baseUrl == null && (n.baseUrl = "http://localhost:33334/"), t.getVerbosity() == 3 && (console.group("Message:"), t.log(`${n.baseUrl + n.endpoint}`), t.log("body:", n.requestBody), console.groupEnd());
  const s = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(n.requestBody)
  };
  try {
    let r = await fetch(`${n.baseUrl + n.endpoint}`, s);
    return r.ok ? (r.status == 408 && (t.warn("%c Bridge Timeout:", "color: #ff0000", r), console.groupEnd()), e = await r.json(), e.status.value !== "Completion" && e.status.value !== "Pending" ? (console.warn("%c Bridge Failure:", "color: #ff0000", e), console.groupEnd(), { success: !0, response: e }) : (t.log("%c Response:", "color: #00aa00", e), console.groupEnd(), { success: !0, response: e })) : { success: !1, response: null };
  } catch (r) {
    return console.group("%c Bridge Error:", "color: #ff0000"), console.error("Bridge Error", r), console.groupEnd(), console.groupEnd(), { success: !1, response: null };
  }
}
async function tt({ name: n, orchestration: e }) {
  if (j.getInstance().log("%c function call: tryEnterOrchestration ", "color: magenta; font-weight: bold; border: solid"), (n == null || n == "") && (n = "default"), e !== "" && e !== void 0)
    return { success: !1, response: null };
  let r = await T({
    endpoint: "enter_orchestration",
    requestBody: {
      name: n
    }
  });
  return r.success == !1 ? (console.error("failed to enter orchestration", r), { success: !1, response: null }) : (console.groupEnd(), { success: !0, response: r.response });
}
async function st(n) {
  let e = {
    orchestration: n
  }, t = new Promise((r) => {
    let a = setTimeout(() => {
      clearTimeout(a), r({ success: !1, response: null });
    }, 5e3);
  }), s = await Promise.race([
    T({
      endpoint: "exit_orchestration",
      requestBody: e
    }),
    t
  ]);
  return !s || s.success == !1 ? { success: !1, response: null } : { success: !0, response: s.response };
}
function nt() {
  return window !== void 0 ? !0 : (console.error("Window is unavailable!"), !1);
}
function rt() {
  return "WebSocket" in window ? !0 : (console.error("WebSocket NOT supported by your Browser!"), !1);
}
class at {
  constructor() {
    b(this, "eventSource");
    b(this, "MessageHandler");
    b(this, "ws");
    this.eventSource = void 0, this.MessageHandler = {}, this.ws = void 0;
  }
  /**
   * adds a new message handler object to the BridgeEventSource class
   * @param event the event name to listen for
   * @param MessageHandler the function to call when the event is received
   */
  addMessageHandler({ event: e, MessageHandler: t }) {
    var r;
    const s = j.getInstance();
    e in this.MessageHandler || (this.MessageHandler[e] = []), (r = this.MessageHandler[e]) == null || r.push(t), s.log(`%c Add Message Handler: ${e} `, "color: YellowGreen; font-weight: bold; border: solid;");
  }
  removeMessageHandler({ event: e, MessageHandler: t }) {
    var r, a;
    if (j.getInstance().log(`%c Message Handler Removed: ${e} `, "color: Tomato; font-weight: bold; border: solid;"), e in this.MessageHandler) {
      const i = (r = this.MessageHandler[e]) == null ? void 0 : r.findIndex((o) => o === t);
      i !== -1 && i !== void 0 && ((a = this.MessageHandler[e]) == null || a.splice(i, 1));
    }
  }
  callMessageHandler(e) {
    let t;
    try {
      t = JSON.parse(e);
    } catch (s) {
      j.getInstance().error("Failed to parse JSON", s);
      return;
    }
    if (t.payload.value.event.value in this.MessageHandler) {
      const s = this.MessageHandler[t.payload.value.event.value];
      s && s.forEach((r) => r(t));
    }
  }
  connectEvent() {
    const e = this.MessageHandler["Bridge Connected"];
    e && e.forEach((t) => t(void 0));
  }
  disconnectEvent() {
    const e = this.MessageHandler["Bridge Disconnected"];
    e && e.forEach((t) => t(void 0));
  }
  async connectToBridgeEventSource(e) {
    const t = j.getInstance();
    if (t.log("%c Connect to Bridge Events Source ", "color: chartreuse; font-weight: bold; border: solid"), !nt())
      return { success: !1 };
    if (!rt())
      return { success: !1 };
    let s = this;
    return this.ws = new WebSocket("ws://localhost:9724/event_source"), new Promise((r) => {
      this.ws !== void 0 && (this.ws.onopen = () => {
        var o;
        j.getInstance().log("%c Connected to Websocket ", "color: chartreuse; font-weight: bold; border: solid");
        const i = {
          subscribe_orchestration_events: e
        };
        (o = this.ws) == null || o.send(JSON.stringify(i)), r({ success: !0 });
      }, this.ws.onmessage = function(a) {
        s.callMessageHandler(a.data);
      }, this.ws.onclose = function() {
        const a = j.getInstance();
        a.manualDisconnect || a.disconnect(), a.log(`%c Disconnected from Websocket, Manual Disconnect: ${a.manualDisconnect} `, "color: red; font-weight: bold; border: solid");
      }, this.ws.onerror = function(a) {
        t.warn("Unable to connect to WebSocket, is Bridge Running?", a), r({ success: !1 });
      });
    });
  }
}
class $e {
  constructor(e) {
    b(this, "orchestration");
    b(this, "hologram");
    b(this, "id");
    b(this, "index");
    b(this, "playlistName");
    this.hologram = e.hologram, this.id = e.id, this.index = e.index, this.playlistName = e.playlistName, this.orchestration = e.orchestration;
  }
  toBridge() {
    let e;
    if (this.hologram.type == "quilt") {
      const t = this.hologram.settings;
      return e = {
        orchestration: this.orchestration,
        id: this.id,
        name: this.playlistName,
        index: this.index,
        uri: this.hologram.uri,
        rows: t.rows,
        cols: t.columns,
        focus: t.focus ? t.focus : 0,
        aspect: t.aspect,
        view_count: t.viewCount,
        isRGBD: 0
      }, e;
    } else if (this.hologram.type == "rgbd") {
      const t = this.hologram.settings;
      return e = {
        orchestration: this.orchestration,
        id: this.id,
        name: this.playlistName,
        index: this.index,
        uri: this.hologram.uri,
        rows: 8,
        cols: 13,
        focus: t.focus ? t.focus : 0,
        aspect: t.aspect,
        view_count: 8 * 13,
        isRGBD: 1,
        depth_loc: t.depth_loc,
        depth_inversion: t.depth_inversion,
        chroma_depth: t.chroma_depth,
        depthiness: t.depthiness,
        zoom: t.zoom
      }, e;
    }
    throw new Error("Invalid hologram type");
  }
}
class Be extends $e {
  constructor(e) {
    super(e);
  }
}
class Ve extends $e {
  constructor(e) {
    super(e);
  }
}
class De {
  constructor(e) {
    b(this, "name");
    b(this, "loop");
    b(this, "items");
    b(this, "orchestration");
    var t;
    this.name = e.name, this.loop = e.loop, this.orchestration = e.orchestration, e.items ? this.items = (t = e.items) == null ? void 0 : t.map((s, r) => {
      if (s.type == "quilt")
        return new Be({
          hologram: s,
          id: r,
          index: r,
          playlistName: this.name,
          orchestration: this.orchestration
        });
      if (s.type == "rgbd")
        return new Ve({
          hologram: s,
          id: r,
          index: r,
          playlistName: this.name,
          orchestration: this.orchestration
        });
    }).filter((s) => !!s) : this.items = [];
  }
  setName(e) {
    this.name = e;
  }
  addItem(e) {
    let t;
    return e.type == "quilt" ? (t = new Be({
      hologram: e,
      id: this.items.length,
      index: this.items.length,
      playlistName: this.name,
      orchestration: this.orchestration
    }), this.items.push(t), t) : e.type == "rgbd" ? (t = new Ve({
      hologram: e,
      id: this.items.length,
      index: this.items.length,
      playlistName: this.name,
      orchestration: this.orchestration
    }), this.items.push(t), t) : void 0;
  }
  async addPlaylistItemToBridge(e) {
    const t = e.toBridge();
    return (await T({ endpoint: "insert_playlist_entry", requestBody: t })).success == !1 ? (console.error("failed to insert playlist entry"), !1) : !0;
  }
  removeItem(e) {
    if (e.id != null) {
      this.items.splice(e.id, 1);
      for (let t = 0; t < this.items.length; t++)
        this.items[t].id = t;
    }
  }
  clearItems() {
    this.items = [];
  }
  /**
   * gets the object for the current playlist that is currently being played
   * @param orchestration
   * @param head
   * @returns
   */
  getCurrent({ orchestration: e, head: t }) {
    return {
      orchestration: e,
      name: this.name,
      head_index: t
    };
  }
  /**
   * create the json object for the playlist instance
   * @param orchestration
   * @returns
   */
  getInstance(e) {
    return { orchestration: e, name: this.name, loop: this.loop };
  }
  /**
   * this function will play a playlist on a Looking Glass display
   * the playlist must be created and populated with content before calling this function
   * @param playlist
   * @param head
   * @returns
   */
  async play({ head: e } = {}) {
    let t = this.orchestration;
    const s = this.getInstance(this.orchestration);
    e || (e = -1);
    let r = await T({ endpoint: "instance_playlist", requestBody: s });
    if (r.success == !1)
      return console.error("failed to initialize playlist"), !1;
    const a = this.items;
    if (r.success == !0 && t !== void 0)
      for (let u = 0; u < a.length; u++) {
        a[u].orchestration = this.orchestration;
        const d = a[u].toBridge();
        if ((await T({ endpoint: "insert_playlist_entry", requestBody: d })).success == !1)
          return console.error("failed to insert playlist entry"), !1;
      }
    const i = this.getCurrent({ orchestration: t, head: e });
    return (await T({
      endpoint: "play_playlist",
      requestBody: i
    })).success != !1;
  }
}
var w;
(function(n) {
  n.assertEqual = (r) => r;
  function e(r) {
  }
  n.assertIs = e;
  function t(r) {
    throw new Error();
  }
  n.assertNever = t, n.arrayToEnum = (r) => {
    const a = {};
    for (const i of r)
      a[i] = i;
    return a;
  }, n.getValidEnumValues = (r) => {
    const a = n.objectKeys(r).filter((o) => typeof r[r[o]] != "number"), i = {};
    for (const o of a)
      i[o] = r[o];
    return n.objectValues(i);
  }, n.objectValues = (r) => n.objectKeys(r).map(function(a) {
    return r[a];
  }), n.objectKeys = typeof Object.keys == "function" ? (r) => Object.keys(r) : (r) => {
    const a = [];
    for (const i in r)
      Object.prototype.hasOwnProperty.call(r, i) && a.push(i);
    return a;
  }, n.find = (r, a) => {
    for (const i of r)
      if (a(i))
        return i;
  }, n.isInteger = typeof Number.isInteger == "function" ? (r) => Number.isInteger(r) : (r) => typeof r == "number" && isFinite(r) && Math.floor(r) === r;
  function s(r, a = " | ") {
    return r.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  n.joinValues = s, n.jsonStringifyReplacer = (r, a) => typeof a == "bigint" ? a.toString() : a;
})(w || (w = {}));
var Oe;
(function(n) {
  n.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(Oe || (Oe = {}));
const h = w.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), z = (n) => {
  switch (typeof n) {
    case "undefined":
      return h.undefined;
    case "string":
      return h.string;
    case "number":
      return isNaN(n) ? h.nan : h.number;
    case "boolean":
      return h.boolean;
    case "function":
      return h.function;
    case "bigint":
      return h.bigint;
    case "symbol":
      return h.symbol;
    case "object":
      return Array.isArray(n) ? h.array : n === null ? h.null : n.then && typeof n.then == "function" && n.catch && typeof n.catch == "function" ? h.promise : typeof Map < "u" && n instanceof Map ? h.map : typeof Set < "u" && n instanceof Set ? h.set : typeof Date < "u" && n instanceof Date ? h.date : h.object;
    default:
      return h.unknown;
  }
}, c = w.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), it = (n) => JSON.stringify(n, null, 2).replace(/"([^"]+)":/g, "$1:");
class M extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const t = e || function(a) {
      return a.message;
    }, s = { _errors: [] }, r = (a) => {
      for (const i of a.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(r);
        else if (i.code === "invalid_return_type")
          r(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          r(i.argumentsError);
        else if (i.path.length === 0)
          s._errors.push(t(i));
        else {
          let o = s, u = 0;
          for (; u < i.path.length; ) {
            const d = i.path[u];
            u === i.path.length - 1 ? (o[d] = o[d] || { _errors: [] }, o[d]._errors.push(t(i))) : o[d] = o[d] || { _errors: [] }, o = o[d], u++;
          }
        }
    };
    return r(this), s;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, w.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, s = [];
    for (const r of this.issues)
      r.path.length > 0 ? (t[r.path[0]] = t[r.path[0]] || [], t[r.path[0]].push(e(r))) : s.push(e(r));
    return { formErrors: s, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
M.create = (n) => new M(n);
const ae = (n, e) => {
  let t;
  switch (n.code) {
    case c.invalid_type:
      n.received === h.undefined ? t = "Required" : t = `Expected ${n.expected}, received ${n.received}`;
      break;
    case c.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(n.expected, w.jsonStringifyReplacer)}`;
      break;
    case c.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${w.joinValues(n.keys, ", ")}`;
      break;
    case c.invalid_union:
      t = "Invalid input";
      break;
    case c.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${w.joinValues(n.options)}`;
      break;
    case c.invalid_enum_value:
      t = `Invalid enum value. Expected ${w.joinValues(n.options)}, received '${n.received}'`;
      break;
    case c.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case c.invalid_return_type:
      t = "Invalid function return type";
      break;
    case c.invalid_date:
      t = "Invalid date";
      break;
    case c.invalid_string:
      typeof n.validation == "object" ? "includes" in n.validation ? (t = `Invalid input: must include "${n.validation.includes}"`, typeof n.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${n.validation.position}`)) : "startsWith" in n.validation ? t = `Invalid input: must start with "${n.validation.startsWith}"` : "endsWith" in n.validation ? t = `Invalid input: must end with "${n.validation.endsWith}"` : w.assertNever(n.validation) : n.validation !== "regex" ? t = `Invalid ${n.validation}` : t = "Invalid";
      break;
    case c.too_small:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "more than"} ${n.minimum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "over"} ${n.minimum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${n.minimum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(n.minimum))}` : t = "Invalid input";
      break;
    case c.too_big:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "less than"} ${n.maximum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "under"} ${n.maximum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "bigint" ? t = `BigInt must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly" : n.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(n.maximum))}` : t = "Invalid input";
      break;
    case c.custom:
      t = "Invalid input";
      break;
    case c.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case c.not_multiple_of:
      t = `Number must be a multiple of ${n.multipleOf}`;
      break;
    case c.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, w.assertNever(n);
  }
  return { message: t };
};
let Ue = ae;
function ot(n) {
  Ue = n;
}
function _e() {
  return Ue;
}
const be = (n) => {
  const { data: e, path: t, errorMaps: s, issueData: r } = n, a = [...t, ...r.path || []], i = {
    ...r,
    path: a
  };
  let o = "";
  const u = s.filter((d) => !!d).slice().reverse();
  for (const d of u)
    o = d(i, { data: e, defaultError: o }).message;
  return {
    ...r,
    path: a,
    message: r.message || o
  };
}, lt = [];
function f(n, e) {
  const t = be({
    issueData: e,
    data: n.data,
    path: n.path,
    errorMaps: [
      n.common.contextualErrorMap,
      n.schemaErrorMap,
      _e(),
      ae
      // then global default map
    ].filter((s) => !!s)
  });
  n.common.issues.push(t);
}
class E {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const s = [];
    for (const r of t) {
      if (r.status === "aborted")
        return y;
      r.status === "dirty" && e.dirty(), s.push(r.value);
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, t) {
    const s = [];
    for (const r of t)
      s.push({
        key: await r.key,
        value: await r.value
      });
    return E.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, t) {
    const s = {};
    for (const r of t) {
      const { key: a, value: i } = r;
      if (a.status === "aborted" || i.status === "aborted")
        return y;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), (typeof i.value < "u" || r.alwaysSet) && (s[a.value] = i.value);
    }
    return { status: e.value, value: s };
  }
}
const y = Object.freeze({
  status: "aborted"
}), He = (n) => ({ status: "dirty", value: n }), O = (n) => ({ status: "valid", value: n }), je = (n) => n.status === "aborted", Ze = (n) => n.status === "dirty", xe = (n) => n.status === "valid", we = (n) => typeof Promise < "u" && n instanceof Promise;
var p;
(function(n) {
  n.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, n.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(p || (p = {}));
class V {
  constructor(e, t, s, r) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = s, this._key = r;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const qe = (n, e) => {
  if (xe(e))
    return { success: !0, data: e.value };
  if (!n.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new M(n.common.issues);
      return this._error = t, this._error;
    }
  };
};
function g(n) {
  if (!n)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: s, description: r } = n;
  if (e && (t || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: r } : { errorMap: (i, o) => i.code !== "invalid_type" ? { message: o.defaultError } : typeof o.data > "u" ? { message: s ?? o.defaultError } : { message: t ?? o.defaultError }, description: r };
}
class _ {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return z(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: z(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new E(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: z(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (we(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const s = this.safeParse(e, t);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(e, t) {
    var s;
    const r = {
      common: {
        issues: [],
        async: (s = t == null ? void 0 : t.async) !== null && s !== void 0 ? s : !1,
        contextualErrorMap: t == null ? void 0 : t.errorMap
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: z(e)
    }, a = this._parseSync({ data: e, path: r.path, parent: r });
    return qe(r, a);
  }
  async parseAsync(e, t) {
    const s = await this.safeParseAsync(e, t);
    if (s.success)
      return s.data;
    throw s.error;
  }
  async safeParseAsync(e, t) {
    const s = {
      common: {
        issues: [],
        contextualErrorMap: t == null ? void 0 : t.errorMap,
        async: !0
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: z(e)
    }, r = this._parse({ data: e, path: s.path, parent: s }), a = await (we(r) ? r : Promise.resolve(r));
    return qe(s, a);
  }
  refine(e, t) {
    const s = (r) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(r) : t;
    return this._refinement((r, a) => {
      const i = e(r), o = () => a.addIssue({
        code: c.custom,
        ...s(r)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((u) => u ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((s, r) => e(s) ? !0 : (r.addIssue(typeof t == "function" ? t(s, r) : t), !1));
  }
  _refinement(e) {
    return new A({
      schema: this,
      typeName: m.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return $.create(this, this._def);
  }
  nullable() {
    return K.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return R.create(this, this._def);
  }
  promise() {
    return ne.create(this, this._def);
  }
  or(e) {
    return ce.create([this, e], this._def);
  }
  and(e) {
    return ue.create(this, e, this._def);
  }
  transform(e) {
    return new A({
      ...g(this._def),
      schema: this,
      typeName: m.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new me({
      ...g(this._def),
      innerType: this,
      defaultValue: t,
      typeName: m.ZodDefault
    });
  }
  brand() {
    return new We({
      typeName: m.ZodBranded,
      type: this,
      ...g(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Pe({
      ...g(this._def),
      innerType: this,
      catchValue: t,
      typeName: m.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return ye.create(this, e);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const ct = /^c[^\s-]{8,}$/i, ut = /^[a-z][a-z0-9]*$/, dt = /[0-9A-HJKMNP-TV-Z]{26}/, ht = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, ft = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/, pt = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u, mt = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, yt = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, gt = (n) => n.precision ? n.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${n.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${n.precision}}Z$`) : n.precision === 0 ? n.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : n.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function vt(n, e) {
  return !!((e === "v4" || !e) && mt.test(n) || (e === "v6" || !e) && yt.test(n));
}
class Z extends _ {
  constructor() {
    super(...arguments), this._regex = (e, t, s) => this.refinement((r) => e.test(r), {
      validation: t,
      code: c.invalid_string,
      ...p.errToObj(s)
    }), this.nonempty = (e) => this.min(1, p.errToObj(e)), this.trim = () => new Z({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    }), this.toLowerCase = () => new Z({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    }), this.toUpperCase = () => new Z({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== h.string) {
      const a = this._getOrReturnCtx(e);
      return f(
        a,
        {
          code: c.invalid_type,
          expected: h.string,
          received: a.parsedType
        }
        //
      ), y;
    }
    const s = new E();
    let r;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (r = this._getOrReturnCtx(e, r), f(r, {
          code: c.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (r = this._getOrReturnCtx(e, r), f(r, {
          code: c.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (r = this._getOrReturnCtx(e, r), i ? f(r, {
          code: c.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && f(r, {
          code: c.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), s.dirty());
      } else if (a.kind === "email")
        ft.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "email",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "emoji")
        pt.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "emoji",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "uuid")
        ht.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "uuid",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid")
        ct.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "cuid",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid2")
        ut.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "cuid2",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "ulid")
        dt.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "ulid",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          r = this._getOrReturnCtx(e, r), f(r, {
            validation: "url",
            code: c.invalid_string,
            message: a.message
          }), s.dirty();
        }
      else
        a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "regex",
          code: c.invalid_string,
          message: a.message
        }), s.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: c.invalid_string,
          validation: { includes: a.value, position: a.position },
          message: a.message
        }), s.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: c.invalid_string,
          validation: { startsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: c.invalid_string,
          validation: { endsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "datetime" ? gt(a).test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: c.invalid_string,
          validation: "datetime",
          message: a.message
        }), s.dirty()) : a.kind === "ip" ? vt(e.data, a.version) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "ip",
          code: c.invalid_string,
          message: a.message
        }), s.dirty()) : w.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _addCheck(e) {
    return new Z({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...p.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...p.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...p.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...p.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...p.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...p.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...p.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...p.errToObj(e) });
  }
  datetime(e) {
    var t;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (t = e == null ? void 0 : e.offset) !== null && t !== void 0 ? t : !1,
      ...p.errToObj(e == null ? void 0 : e.message)
    });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...p.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...p.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...p.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...p.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...p.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...p.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...p.errToObj(t)
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
Z.create = (n) => {
  var e;
  return new Z({
    checks: [],
    typeName: m.ZodString,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ...g(n)
  });
};
function _t(n, e) {
  const t = (n.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, r = t > s ? t : s, a = parseInt(n.toFixed(r).replace(".", "")), i = parseInt(e.toFixed(r).replace(".", ""));
  return a % i / Math.pow(10, r);
}
class W extends _ {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== h.number) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: c.invalid_type,
        expected: h.number,
        received: a.parsedType
      }), y;
    }
    let s;
    const r = new E();
    for (const a of this._def.checks)
      a.kind === "int" ? w.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), f(s, {
        code: c.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), r.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: c.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), r.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: c.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), r.dirty()) : a.kind === "multipleOf" ? _t(e.data, a.value) !== 0 && (s = this._getOrReturnCtx(e, s), f(s, {
        code: c.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), r.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (s = this._getOrReturnCtx(e, s), f(s, {
        code: c.not_finite,
        message: a.message
      }), r.dirty()) : w.assertNever(a);
    return { status: r.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t));
  }
  setLimit(e, t, s, r) {
    return new W({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: s,
          message: p.toString(r)
        }
      ]
    });
  }
  _addCheck(e) {
    return new W({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: p.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: p.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: p.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: p.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: p.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: p.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: p.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: p.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && w.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return !0;
      s.kind === "min" ? (t === null || s.value > t) && (t = s.value) : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
W.create = (n) => new W({
  checks: [],
  typeName: m.ZodNumber,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...g(n)
});
class G extends _ {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== h.bigint) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: c.invalid_type,
        expected: h.bigint,
        received: a.parsedType
      }), y;
    }
    let s;
    const r = new E();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: c.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), r.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: c.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), r.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: c.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), r.dirty()) : w.assertNever(a);
    return { status: r.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t));
  }
  setLimit(e, t, s, r) {
    return new G({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: s,
          message: p.toString(r)
        }
      ]
    });
  }
  _addCheck(e) {
    return new G({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
G.create = (n) => {
  var e;
  return new G({
    checks: [],
    typeName: m.ZodBigInt,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ...g(n)
  });
};
class ie extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== h.boolean) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: c.invalid_type,
        expected: h.boolean,
        received: s.parsedType
      }), y;
    }
    return O(e.data);
  }
}
ie.create = (n) => new ie({
  typeName: m.ZodBoolean,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...g(n)
});
class Q extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== h.date) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: c.invalid_type,
        expected: h.date,
        received: a.parsedType
      }), y;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: c.invalid_date
      }), y;
    }
    const s = new E();
    let r;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (r = this._getOrReturnCtx(e, r), f(r, {
        code: c.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), s.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (r = this._getOrReturnCtx(e, r), f(r, {
        code: c.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), s.dirty()) : w.assertNever(a);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Q({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: p.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: p.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
Q.create = (n) => new Q({
  checks: [],
  coerce: (n == null ? void 0 : n.coerce) || !1,
  typeName: m.ZodDate,
  ...g(n)
});
class ke extends _ {
  _parse(e) {
    if (this._getType(e) !== h.symbol) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: c.invalid_type,
        expected: h.symbol,
        received: s.parsedType
      }), y;
    }
    return O(e.data);
  }
}
ke.create = (n) => new ke({
  typeName: m.ZodSymbol,
  ...g(n)
});
class oe extends _ {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: c.invalid_type,
        expected: h.undefined,
        received: s.parsedType
      }), y;
    }
    return O(e.data);
  }
}
oe.create = (n) => new oe({
  typeName: m.ZodUndefined,
  ...g(n)
});
class le extends _ {
  _parse(e) {
    if (this._getType(e) !== h.null) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: c.invalid_type,
        expected: h.null,
        received: s.parsedType
      }), y;
    }
    return O(e.data);
  }
}
le.create = (n) => new le({
  typeName: m.ZodNull,
  ...g(n)
});
class se extends _ {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return O(e.data);
  }
}
se.create = (n) => new se({
  typeName: m.ZodAny,
  ...g(n)
});
class Y extends _ {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return O(e.data);
  }
}
Y.create = (n) => new Y({
  typeName: m.ZodUnknown,
  ...g(n)
});
class U extends _ {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return f(t, {
      code: c.invalid_type,
      expected: h.never,
      received: t.parsedType
    }), y;
  }
}
U.create = (n) => new U({
  typeName: m.ZodNever,
  ...g(n)
});
class Te extends _ {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: c.invalid_type,
        expected: h.void,
        received: s.parsedType
      }), y;
    }
    return O(e.data);
  }
}
Te.create = (n) => new Te({
  typeName: m.ZodVoid,
  ...g(n)
});
class R extends _ {
  _parse(e) {
    const { ctx: t, status: s } = this._processInputParams(e), r = this._def;
    if (t.parsedType !== h.array)
      return f(t, {
        code: c.invalid_type,
        expected: h.array,
        received: t.parsedType
      }), y;
    if (r.exactLength !== null) {
      const i = t.data.length > r.exactLength.value, o = t.data.length < r.exactLength.value;
      (i || o) && (f(t, {
        code: i ? c.too_big : c.too_small,
        minimum: o ? r.exactLength.value : void 0,
        maximum: i ? r.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: r.exactLength.message
      }), s.dirty());
    }
    if (r.minLength !== null && t.data.length < r.minLength.value && (f(t, {
      code: c.too_small,
      minimum: r.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.minLength.message
    }), s.dirty()), r.maxLength !== null && t.data.length > r.maxLength.value && (f(t, {
      code: c.too_big,
      maximum: r.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.maxLength.message
    }), s.dirty()), t.common.async)
      return Promise.all([...t.data].map((i, o) => r.type._parseAsync(new V(t, i, t.path, o)))).then((i) => E.mergeArray(s, i));
    const a = [...t.data].map((i, o) => r.type._parseSync(new V(t, i, t.path, o)));
    return E.mergeArray(s, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new R({
      ...this._def,
      minLength: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new R({
      ...this._def,
      maxLength: { value: e, message: p.toString(t) }
    });
  }
  length(e, t) {
    return new R({
      ...this._def,
      exactLength: { value: e, message: p.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
R.create = (n, e) => new R({
  type: n,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: m.ZodArray,
  ...g(e)
});
function ee(n) {
  if (n instanceof C) {
    const e = {};
    for (const t in n.shape) {
      const s = n.shape[t];
      e[t] = $.create(ee(s));
    }
    return new C({
      ...n._def,
      shape: () => e
    });
  } else
    return n instanceof R ? new R({
      ...n._def,
      type: ee(n.element)
    }) : n instanceof $ ? $.create(ee(n.unwrap())) : n instanceof K ? K.create(ee(n.unwrap())) : n instanceof D ? D.create(n.items.map((e) => ee(e))) : n;
}
class C extends _ {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = w.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== h.object) {
      const d = this._getOrReturnCtx(e);
      return f(d, {
        code: c.invalid_type,
        expected: h.object,
        received: d.parsedType
      }), y;
    }
    const { status: s, ctx: r } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof U && this._def.unknownKeys === "strip"))
      for (const d in r.data)
        i.includes(d) || o.push(d);
    const u = [];
    for (const d of i) {
      const v = a[d], F = r.data[d];
      u.push({
        key: { status: "valid", value: d },
        value: v._parse(new V(r, F, r.path, d)),
        alwaysSet: d in r.data
      });
    }
    if (this._def.catchall instanceof U) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const v of o)
          u.push({
            key: { status: "valid", value: v },
            value: { status: "valid", value: r.data[v] }
          });
      else if (d === "strict")
        o.length > 0 && (f(r, {
          code: c.unrecognized_keys,
          keys: o
        }), s.dirty());
      else if (d !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const v of o) {
        const F = r.data[v];
        u.push({
          key: { status: "valid", value: v },
          value: d._parse(
            new V(r, F, r.path, v)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: v in r.data
        });
      }
    }
    return r.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const v of u) {
        const F = await v.key;
        d.push({
          key: F,
          value: await v.value,
          alwaysSet: v.alwaysSet
        });
      }
      return d;
    }).then((d) => E.mergeObjectSync(s, d)) : E.mergeObjectSync(s, u);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return p.errToObj, new C({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, s) => {
          var r, a, i, o;
          const u = (i = (a = (r = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(r, t, s).message) !== null && i !== void 0 ? i : s.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (o = p.errToObj(e).message) !== null && o !== void 0 ? o : u
          } : {
            message: u
          };
        }
      } : {}
    });
  }
  strip() {
    return new C({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new C({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new C({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new C({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: m.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new C({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return w.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (t[s] = this.shape[s]);
    }), new C({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return w.objectKeys(this.shape).forEach((s) => {
      e[s] || (t[s] = this.shape[s]);
    }), new C({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return ee(this);
  }
  partial(e) {
    const t = {};
    return w.objectKeys(this.shape).forEach((s) => {
      const r = this.shape[s];
      e && !e[s] ? t[s] = r : t[s] = r.optional();
    }), new C({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return w.objectKeys(this.shape).forEach((s) => {
      if (e && !e[s])
        t[s] = this.shape[s];
      else {
        let a = this.shape[s];
        for (; a instanceof $; )
          a = a._def.innerType;
        t[s] = a;
      }
    }), new C({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return ze(w.objectKeys(this.shape));
  }
}
C.create = (n, e) => new C({
  shape: () => n,
  unknownKeys: "strip",
  catchall: U.create(),
  typeName: m.ZodObject,
  ...g(e)
});
C.strictCreate = (n, e) => new C({
  shape: () => n,
  unknownKeys: "strict",
  catchall: U.create(),
  typeName: m.ZodObject,
  ...g(e)
});
C.lazycreate = (n, e) => new C({
  shape: n,
  unknownKeys: "strip",
  catchall: U.create(),
  typeName: m.ZodObject,
  ...g(e)
});
class ce extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = this._def.options;
    function r(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new M(o.ctx.common.issues));
      return f(t, {
        code: c.invalid_union,
        unionErrors: i
      }), y;
    }
    if (t.common.async)
      return Promise.all(s.map(async (a) => {
        const i = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: t.data,
            path: t.path,
            parent: i
          }),
          ctx: i
        };
      })).then(r);
    {
      let a;
      const i = [];
      for (const u of s) {
        const d = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, v = u._parseSync({
          data: t.data,
          path: t.path,
          parent: d
        });
        if (v.status === "valid")
          return v;
        v.status === "dirty" && !a && (a = { result: v, ctx: d }), d.common.issues.length && i.push(d.common.issues);
      }
      if (a)
        return t.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((u) => new M(u));
      return f(t, {
        code: c.invalid_union,
        unionErrors: o
      }), y;
    }
  }
  get options() {
    return this._def.options;
  }
}
ce.create = (n, e) => new ce({
  options: n,
  typeName: m.ZodUnion,
  ...g(e)
});
const ve = (n) => n instanceof he ? ve(n.schema) : n instanceof A ? ve(n.innerType()) : n instanceof fe ? [n.value] : n instanceof J ? n.options : n instanceof pe ? Object.keys(n.enum) : n instanceof me ? ve(n._def.innerType) : n instanceof oe ? [void 0] : n instanceof le ? [null] : null;
class Se extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.object)
      return f(t, {
        code: c.invalid_type,
        expected: h.object,
        received: t.parsedType
      }), y;
    const s = this.discriminator, r = t.data[s], a = this.optionsMap.get(r);
    return a ? t.common.async ? a._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : a._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (f(t, {
      code: c.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [s]
    }), y);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, t, s) {
    const r = /* @__PURE__ */ new Map();
    for (const a of t) {
      const i = ve(a.shape[e]);
      if (!i)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of i) {
        if (r.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        r.set(o, a);
      }
    }
    return new Se({
      typeName: m.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: r,
      ...g(s)
    });
  }
}
function Me(n, e) {
  const t = z(n), s = z(e);
  if (n === e)
    return { valid: !0, data: n };
  if (t === h.object && s === h.object) {
    const r = w.objectKeys(e), a = w.objectKeys(n).filter((o) => r.indexOf(o) !== -1), i = { ...n, ...e };
    for (const o of a) {
      const u = Me(n[o], e[o]);
      if (!u.valid)
        return { valid: !1 };
      i[o] = u.data;
    }
    return { valid: !0, data: i };
  } else if (t === h.array && s === h.array) {
    if (n.length !== e.length)
      return { valid: !1 };
    const r = [];
    for (let a = 0; a < n.length; a++) {
      const i = n[a], o = e[a], u = Me(i, o);
      if (!u.valid)
        return { valid: !1 };
      r.push(u.data);
    }
    return { valid: !0, data: r };
  } else
    return t === h.date && s === h.date && +n == +e ? { valid: !0, data: n } : { valid: !1 };
}
class ue extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), r = (a, i) => {
      if (je(a) || je(i))
        return y;
      const o = Me(a.value, i.value);
      return o.valid ? ((Ze(a) || Ze(i)) && t.dirty(), { status: t.value, value: o.data }) : (f(s, {
        code: c.invalid_intersection_types
      }), y);
    };
    return s.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      }),
      this._def.right._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      })
    ]).then(([a, i]) => r(a, i)) : r(this._def.left._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }), this._def.right._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }));
  }
}
ue.create = (n, e, t) => new ue({
  left: n,
  right: e,
  typeName: m.ZodIntersection,
  ...g(t)
});
class D extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.array)
      return f(s, {
        code: c.invalid_type,
        expected: h.array,
        received: s.parsedType
      }), y;
    if (s.data.length < this._def.items.length)
      return f(s, {
        code: c.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), y;
    !this._def.rest && s.data.length > this._def.items.length && (f(s, {
      code: c.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const a = [...s.data].map((i, o) => {
      const u = this._def.items[o] || this._def.rest;
      return u ? u._parse(new V(s, i, s.path, o)) : null;
    }).filter((i) => !!i);
    return s.common.async ? Promise.all(a).then((i) => E.mergeArray(t, i)) : E.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new D({
      ...this._def,
      rest: e
    });
  }
}
D.create = (n, e) => {
  if (!Array.isArray(n))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new D({
    items: n,
    typeName: m.ZodTuple,
    rest: null,
    ...g(e)
  });
};
class de extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.object)
      return f(s, {
        code: c.invalid_type,
        expected: h.object,
        received: s.parsedType
      }), y;
    const r = [], a = this._def.keyType, i = this._def.valueType;
    for (const o in s.data)
      r.push({
        key: a._parse(new V(s, o, s.path, o)),
        value: i._parse(new V(s, s.data[o], s.path, o))
      });
    return s.common.async ? E.mergeObjectAsync(t, r) : E.mergeObjectSync(t, r);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, s) {
    return t instanceof _ ? new de({
      keyType: e,
      valueType: t,
      typeName: m.ZodRecord,
      ...g(s)
    }) : new de({
      keyType: Z.create(),
      valueType: e,
      typeName: m.ZodRecord,
      ...g(t)
    });
  }
}
class Ce extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.map)
      return f(s, {
        code: c.invalid_type,
        expected: h.map,
        received: s.parsedType
      }), y;
    const r = this._def.keyType, a = this._def.valueType, i = [...s.data.entries()].map(([o, u], d) => ({
      key: r._parse(new V(s, o, s.path, [d, "key"])),
      value: a._parse(new V(s, u, s.path, [d, "value"]))
    }));
    if (s.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const u of i) {
          const d = await u.key, v = await u.value;
          if (d.status === "aborted" || v.status === "aborted")
            return y;
          (d.status === "dirty" || v.status === "dirty") && t.dirty(), o.set(d.value, v.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const u of i) {
        const d = u.key, v = u.value;
        if (d.status === "aborted" || v.status === "aborted")
          return y;
        (d.status === "dirty" || v.status === "dirty") && t.dirty(), o.set(d.value, v.value);
      }
      return { status: t.value, value: o };
    }
  }
}
Ce.create = (n, e, t) => new Ce({
  valueType: e,
  keyType: n,
  typeName: m.ZodMap,
  ...g(t)
});
class X extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.set)
      return f(s, {
        code: c.invalid_type,
        expected: h.set,
        received: s.parsedType
      }), y;
    const r = this._def;
    r.minSize !== null && s.data.size < r.minSize.value && (f(s, {
      code: c.too_small,
      minimum: r.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.minSize.message
    }), t.dirty()), r.maxSize !== null && s.data.size > r.maxSize.value && (f(s, {
      code: c.too_big,
      maximum: r.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.maxSize.message
    }), t.dirty());
    const a = this._def.valueType;
    function i(u) {
      const d = /* @__PURE__ */ new Set();
      for (const v of u) {
        if (v.status === "aborted")
          return y;
        v.status === "dirty" && t.dirty(), d.add(v.value);
      }
      return { status: t.value, value: d };
    }
    const o = [...s.data.values()].map((u, d) => a._parse(new V(s, u, s.path, d)));
    return s.common.async ? Promise.all(o).then((u) => i(u)) : i(o);
  }
  min(e, t) {
    return new X({
      ...this._def,
      minSize: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new X({
      ...this._def,
      maxSize: { value: e, message: p.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
X.create = (n, e) => new X({
  valueType: n,
  minSize: null,
  maxSize: null,
  typeName: m.ZodSet,
  ...g(e)
});
class te extends _ {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.function)
      return f(t, {
        code: c.invalid_type,
        expected: h.function,
        received: t.parsedType
      }), y;
    function s(o, u) {
      return be({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          _e(),
          ae
        ].filter((d) => !!d),
        issueData: {
          code: c.invalid_arguments,
          argumentsError: u
        }
      });
    }
    function r(o, u) {
      return be({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          _e(),
          ae
        ].filter((d) => !!d),
        issueData: {
          code: c.invalid_return_type,
          returnTypeError: u
        }
      });
    }
    const a = { errorMap: t.common.contextualErrorMap }, i = t.data;
    return this._def.returns instanceof ne ? O(async (...o) => {
      const u = new M([]), d = await this._def.args.parseAsync(o, a).catch((Ne) => {
        throw u.addIssue(s(o, Ne)), u;
      }), v = await i(...d);
      return await this._def.returns._def.type.parseAsync(v, a).catch((Ne) => {
        throw u.addIssue(r(v, Ne)), u;
      });
    }) : O((...o) => {
      const u = this._def.args.safeParse(o, a);
      if (!u.success)
        throw new M([s(o, u.error)]);
      const d = i(...u.data), v = this._def.returns.safeParse(d, a);
      if (!v.success)
        throw new M([r(d, v.error)]);
      return v.data;
    });
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new te({
      ...this._def,
      args: D.create(e).rest(Y.create())
    });
  }
  returns(e) {
    return new te({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, s) {
    return new te({
      args: e || D.create([]).rest(Y.create()),
      returns: t || Y.create(),
      typeName: m.ZodFunction,
      ...g(s)
    });
  }
}
class he extends _ {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
he.create = (n, e) => new he({
  getter: n,
  typeName: m.ZodLazy,
  ...g(e)
});
class fe extends _ {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return f(t, {
        received: t.data,
        code: c.invalid_literal,
        expected: this._def.value
      }), y;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
fe.create = (n, e) => new fe({
  value: n,
  typeName: m.ZodLiteral,
  ...g(e)
});
function ze(n, e) {
  return new J({
    values: n,
    typeName: m.ZodEnum,
    ...g(e)
  });
}
class J extends _ {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return f(t, {
        expected: w.joinValues(s),
        received: t.parsedType,
        code: c.invalid_type
      }), y;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return f(t, {
        received: t.data,
        code: c.invalid_enum_value,
        options: s
      }), y;
    }
    return O(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e) {
    return J.create(e);
  }
  exclude(e) {
    return J.create(this.options.filter((t) => !e.includes(t)));
  }
}
J.create = ze;
class pe extends _ {
  _parse(e) {
    const t = w.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== h.string && s.parsedType !== h.number) {
      const r = w.objectValues(t);
      return f(s, {
        expected: w.joinValues(r),
        received: s.parsedType,
        code: c.invalid_type
      }), y;
    }
    if (t.indexOf(e.data) === -1) {
      const r = w.objectValues(t);
      return f(s, {
        received: s.data,
        code: c.invalid_enum_value,
        options: r
      }), y;
    }
    return O(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
pe.create = (n, e) => new pe({
  values: n,
  typeName: m.ZodNativeEnum,
  ...g(e)
});
class ne extends _ {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.promise && t.common.async === !1)
      return f(t, {
        code: c.invalid_type,
        expected: h.promise,
        received: t.parsedType
      }), y;
    const s = t.parsedType === h.promise ? t.data : Promise.resolve(t.data);
    return O(s.then((r) => this._def.type.parseAsync(r, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
ne.create = (n, e) => new ne({
  type: n,
  typeName: m.ZodPromise,
  ...g(e)
});
class A extends _ {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === m.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), r = this._def.effect || null;
    if (r.type === "preprocess") {
      const i = r.transform(s.data);
      return s.common.async ? Promise.resolve(i).then((o) => this._def.schema._parseAsync({
        data: o,
        path: s.path,
        parent: s
      })) : this._def.schema._parseSync({
        data: i,
        path: s.path,
        parent: s
      });
    }
    const a = {
      addIssue: (i) => {
        f(s, i), i.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), r.type === "refinement") {
      const i = (o) => {
        const u = r.refinement(o, a);
        if (s.common.async)
          return Promise.resolve(u);
        if (u instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? y : (o.status === "dirty" && t.dirty(), i(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => o.status === "aborted" ? y : (o.status === "dirty" && t.dirty(), i(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (r.type === "transform")
      if (s.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!xe(i))
          return i;
        const o = r.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((i) => xe(i) ? Promise.resolve(r.transform(i.value, a)).then((o) => ({ status: t.value, value: o })) : i);
    w.assertNever(r);
  }
}
A.create = (n, e, t) => new A({
  schema: n,
  typeName: m.ZodEffects,
  effect: e,
  ...g(t)
});
A.createWithPreprocess = (n, e, t) => new A({
  schema: e,
  effect: { type: "preprocess", transform: n },
  typeName: m.ZodEffects,
  ...g(t)
});
class $ extends _ {
  _parse(e) {
    return this._getType(e) === h.undefined ? O(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
$.create = (n, e) => new $({
  innerType: n,
  typeName: m.ZodOptional,
  ...g(e)
});
class K extends _ {
  _parse(e) {
    return this._getType(e) === h.null ? O(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
K.create = (n, e) => new K({
  innerType: n,
  typeName: m.ZodNullable,
  ...g(e)
});
class me extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let s = t.data;
    return t.parsedType === h.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
me.create = (n, e) => new me({
  innerType: n,
  typeName: m.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...g(e)
});
class Pe extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, r = this._def.innerType._parse({
      data: s.data,
      path: s.path,
      parent: {
        ...s
      }
    });
    return we(r) ? r.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new M(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: r.status === "valid" ? r.value : this._def.catchValue({
        get error() {
          return new M(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Pe.create = (n, e) => new Pe({
  innerType: n,
  typeName: m.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...g(e)
});
class Ie extends _ {
  _parse(e) {
    if (this._getType(e) !== h.nan) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: c.invalid_type,
        expected: h.nan,
        received: s.parsedType
      }), y;
    }
    return { status: "valid", value: e.data };
  }
}
Ie.create = (n) => new Ie({
  typeName: m.ZodNaN,
  ...g(n)
});
const bt = Symbol("zod_brand");
class We extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = t.data;
    return this._def.type._parse({
      data: s,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ye extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return a.status === "aborted" ? y : a.status === "dirty" ? (t.dirty(), He(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: s.path,
          parent: s
        });
      })();
    {
      const r = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return r.status === "aborted" ? y : r.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: r.value
      }) : this._def.out._parseSync({
        data: r.value,
        path: s.path,
        parent: s
      });
    }
  }
  static create(e, t) {
    return new ye({
      in: e,
      out: t,
      typeName: m.ZodPipeline
    });
  }
}
const Ge = (n, e = {}, t) => n ? se.create().superRefine((s, r) => {
  var a, i;
  if (!n(s)) {
    const o = typeof e == "function" ? e(s) : typeof e == "string" ? { message: e } : e, u = (i = (a = o.fatal) !== null && a !== void 0 ? a : t) !== null && i !== void 0 ? i : !0, d = typeof o == "string" ? { message: o } : o;
    r.addIssue({ code: "custom", ...d, fatal: u });
  }
}) : se.create(), xt = {
  object: C.lazycreate
};
var m;
(function(n) {
  n.ZodString = "ZodString", n.ZodNumber = "ZodNumber", n.ZodNaN = "ZodNaN", n.ZodBigInt = "ZodBigInt", n.ZodBoolean = "ZodBoolean", n.ZodDate = "ZodDate", n.ZodSymbol = "ZodSymbol", n.ZodUndefined = "ZodUndefined", n.ZodNull = "ZodNull", n.ZodAny = "ZodAny", n.ZodUnknown = "ZodUnknown", n.ZodNever = "ZodNever", n.ZodVoid = "ZodVoid", n.ZodArray = "ZodArray", n.ZodObject = "ZodObject", n.ZodUnion = "ZodUnion", n.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", n.ZodIntersection = "ZodIntersection", n.ZodTuple = "ZodTuple", n.ZodRecord = "ZodRecord", n.ZodMap = "ZodMap", n.ZodSet = "ZodSet", n.ZodFunction = "ZodFunction", n.ZodLazy = "ZodLazy", n.ZodLiteral = "ZodLiteral", n.ZodEnum = "ZodEnum", n.ZodEffects = "ZodEffects", n.ZodNativeEnum = "ZodNativeEnum", n.ZodOptional = "ZodOptional", n.ZodNullable = "ZodNullable", n.ZodDefault = "ZodDefault", n.ZodCatch = "ZodCatch", n.ZodPromise = "ZodPromise", n.ZodBranded = "ZodBranded", n.ZodPipeline = "ZodPipeline";
})(m || (m = {}));
const wt = (n, e = {
  message: `Input not instance of ${n.name}`
}) => Ge((t) => t instanceof n, e), Ee = Z.create, ge = W.create, kt = Ie.create, Tt = G.create, Je = ie.create, Ct = Q.create, Pt = ke.create, It = oe.create, St = le.create, Et = se.create, Nt = Y.create, Ot = U.create, jt = Te.create, Zt = R.create, re = C.create, Mt = C.strictCreate, Ye = ce.create, Rt = Se.create, At = ue.create, Bt = D.create, Vt = de.create, Dt = Ce.create, qt = X.create, Lt = te.create, $t = he.create, B = fe.create, Ut = J.create, Ht = pe.create, zt = ne.create, Le = A.create, Wt = $.create, Gt = K.create, Jt = A.createWithPreprocess, Yt = ye.create, Qt = () => Ee().optional(), Xt = () => ge().optional(), Kt = () => Je().optional(), Ft = {
  string: (n) => Z.create({ ...n, coerce: !0 }),
  number: (n) => W.create({ ...n, coerce: !0 }),
  boolean: (n) => ie.create({
    ...n,
    coerce: !0
  }),
  bigint: (n) => G.create({ ...n, coerce: !0 }),
  date: (n) => Q.create({ ...n, coerce: !0 })
}, es = y;
var l = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: ae,
  setErrorMap: ot,
  getErrorMap: _e,
  makeIssue: be,
  EMPTY_PATH: lt,
  addIssueToContext: f,
  ParseStatus: E,
  INVALID: y,
  DIRTY: He,
  OK: O,
  isAborted: je,
  isDirty: Ze,
  isValid: xe,
  isAsync: we,
  get util() {
    return w;
  },
  get objectUtil() {
    return Oe;
  },
  ZodParsedType: h,
  getParsedType: z,
  ZodType: _,
  ZodString: Z,
  ZodNumber: W,
  ZodBigInt: G,
  ZodBoolean: ie,
  ZodDate: Q,
  ZodSymbol: ke,
  ZodUndefined: oe,
  ZodNull: le,
  ZodAny: se,
  ZodUnknown: Y,
  ZodNever: U,
  ZodVoid: Te,
  ZodArray: R,
  ZodObject: C,
  ZodUnion: ce,
  ZodDiscriminatedUnion: Se,
  ZodIntersection: ue,
  ZodTuple: D,
  ZodRecord: de,
  ZodMap: Ce,
  ZodSet: X,
  ZodFunction: te,
  ZodLazy: he,
  ZodLiteral: fe,
  ZodEnum: J,
  ZodNativeEnum: pe,
  ZodPromise: ne,
  ZodEffects: A,
  ZodTransformer: A,
  ZodOptional: $,
  ZodNullable: K,
  ZodDefault: me,
  ZodCatch: Pe,
  ZodNaN: Ie,
  BRAND: bt,
  ZodBranded: We,
  ZodPipeline: ye,
  custom: Ge,
  Schema: _,
  ZodSchema: _,
  late: xt,
  get ZodFirstPartyTypeKind() {
    return m;
  },
  coerce: Ft,
  any: Et,
  array: Zt,
  bigint: Tt,
  boolean: Je,
  date: Ct,
  discriminatedUnion: Rt,
  effect: Le,
  enum: Ut,
  function: Lt,
  instanceof: wt,
  intersection: At,
  lazy: $t,
  literal: B,
  map: Dt,
  nan: kt,
  nativeEnum: Ht,
  never: Ot,
  null: St,
  nullable: Gt,
  number: ge,
  object: re,
  oboolean: Kt,
  onumber: Xt,
  optional: Wt,
  ostring: Qt,
  pipeline: Yt,
  preprocess: Jt,
  promise: zt,
  record: Vt,
  set: qt,
  strictObject: Mt,
  string: Ee,
  symbol: Pt,
  transformer: Le,
  tuple: Bt,
  undefined: It,
  union: Ye,
  unknown: Nt,
  void: jt,
  NEVER: es,
  ZodIssueCode: c,
  quotelessJson: it,
  ZodError: M
});
const x = Ee(), ts = re({
  name: x,
  type: B("UNSIGNED_INT"),
  value: ge()
});
re({
  name: x,
  type: B("INT"),
  value: ge()
});
re({
  name: x,
  type: B("FLOAT"),
  value: ge()
});
const ss = B("INT2"), I = re({
  name: x,
  type: B("WSTRING"),
  value: Ee()
}), q = B("VARIANT_MAP"), ns = B("Completion"), rs = B("UnknownOrchestration"), as = B("Pending"), is = B("Failure"), P = re({
  name: x,
  type: I,
  value: Ye([ns, as, is, rs])
});
l.object({
  name: x,
  // the payload value is unique to each bridge response.
  payload: I,
  status: P
});
const S = l.object({
  name: x,
  payload: l.object({
    name: x,
    type: I,
    value: l.string()
  }),
  status: P
});
l.object({
  name: x,
  orchestration: S,
  payload: l.object({
    name: x,
    type: q,
    value: l.object({
      id: I.optional(),
      message: I
    })
  }),
  status: P
});
l.object({
  name: x,
  orchestration: S,
  payload: l.object({
    name: x,
    type: q,
    value: l.object({
      name: I
    })
  }),
  status: P
});
l.object({
  name: x,
  orchestration: S,
  payload: l.object({
    name: x,
    type: q,
    value: l.object({
      index: I
    })
  }),
  status: P
});
l.object({
  name: x,
  orchestration: S,
  payload: l.object({
    name: x,
    type: q,
    value: l.object({
      name: I
    })
  }),
  status: P
});
l.object({
  name: x,
  orchestration: S,
  status: P
});
const os = l.object({
  name: x,
  type: q,
  value: l.object({
    calibration: I,
    defaultQuilt: I,
    hardwareVersion: I,
    hwid: I,
    index: ts,
    state: I,
    windowCoords: l.object({
      name: x,
      type: ss,
      value: l.object({
        x: l.number(),
        y: l.number()
      })
    })
  })
}), ls = l.object({
  name: x,
  orchestration: S,
  payload: l.object({
    name: x,
    type: q,
    value: l.record(os).optional()
  }),
  status: P
});
l.object({
  name: x,
  orchestration: S,
  payload: l.object({
    name: x,
    type: q,
    value: l.object({
      name: I
    })
  }),
  status: P
});
l.object({
  name: x,
  orchestration: S,
  status: P
});
l.object({
  name: x,
  orchestration: S,
  status: P
});
l.object({
  name: x,
  orchestration: S,
  payload: l.object({
    name: x,
    type: q,
    value: l.object({
      playlist_name: I,
      playlist_path: I
    })
  }),
  status: P
});
l.object({
  name: x,
  orchestration: S,
  payload: l.object({
    name: x,
    type: q,
    value: l.object({
      playlist_name: I
    })
  }),
  status: P
});
l.object({
  name: x,
  orchestration: S,
  payload: l.object({
    name: x,
    type: q,
    value: l.object({
      playlist_name: I
    })
  }),
  status: P
});
l.object({
  name: x,
  orchestration: S,
  status: P
});
l.object({
  name: x,
  orchestration: S,
  status: P
});
l.object({
  name: x,
  orchestration: S,
  status: P
});
l.object({
  name: x,
  orchestration: S,
  status: P
});
l.object({
  name: x,
  orchestration: S,
  status: P
});
class N {
  constructor(e) {
    b(this, "bridgeEventName");
    b(this, "client");
    this.bridgeEventName = e.bridgeEventName, this.client = e.client, this.client.addEventListener(this.bridgeEventName, this.handle.bind(this));
  }
}
class Ts extends N {
  constructor(e) {
    super({ bridgeEventName: "Monitor Connect", client: e.client });
  }
  handle(e) {
    this.client.log("%c Monitor Connect ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Cs extends N {
  constructor(e) {
    super({ bridgeEventName: "Monitor Disconnect", client: e.client });
  }
  handle(e) {
    this.client.log("%c Monitor Disconnect ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Ps extends N {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Pause", client: e.client });
  }
  handle(e) {
    this.client.log("%c Transport Control Pause ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Is extends N {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Play", client: e.client });
  }
  handle(e) {
    this.client.log("%c Transport Control Play ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Ss extends N {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Next", client: e.client });
  }
  handle(e) {
    this.client.log("%c Transport Control Next ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Es extends N {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Previous", client: e.client });
  }
  handle(e) {
    this.client.log("%c Transport Control Previous ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Ns extends N {
  constructor(e) {
    super({ bridgeEventName: "Progress Start", client: e.client });
  }
  handle(e) {
    this.client.log("%c Progress Start ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Os extends N {
  constructor(e) {
    super({ bridgeEventName: "Progress Completion", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class js extends N {
  constructor(e) {
    super({ bridgeEventName: "Progress Update", client: e.client });
  }
  handle(e) {
    this.client.log("%c Progress Update ", "color: aqua; font-weight: bold; border: solid;", e.payload.value.progress_type, e.payload.value.progress.value);
  }
}
class Zs extends N {
  constructor(e) {
    super({ bridgeEventName: "Playlist Instance", client: e.client });
  }
  handle(e) {
    this.client.log("%c Playlist Instance ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Ms extends N {
  constructor(e) {
    super({ bridgeEventName: "Playlist Insert", client: e.client });
  }
  handle(e) {
    this.client.log("%c Playlist Insert ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Rs extends N {
  constructor(e) {
    super({ bridgeEventName: "Playlist Delete", client: e.client });
  }
  handle(e) {
    this.client.log("%c Playlist Delete ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class As extends N {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class Bs extends N {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist Complete", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class Vs extends N {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist Cancelled", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class cs extends N {
  constructor(e) {
    super({ bridgeEventName: "New Item Playing", client: e.client });
  }
  handle(e) {
    var a, i;
    this.client.log("%c New Item Playing ", "color: aqua; font-weight: bold; border: solid;", e);
    let t = this.client.currentPlaylistIndex, s = (i = (a = this.client.playlists) == null ? void 0 : a[t]) == null ? void 0 : i.name, r = this.client.currentPlaylistItemIndex;
    e.payload.value.playlist_name.value == s && e.payload.value.index.value == r && (this.client.isCastPending = !1);
  }
}
function H(n) {
  const [e, t, s, r] = n.split(".").map(Number);
  return {
    major: e,
    minor: t,
    patch: s,
    hotfix: r
  };
}
const k = class {
  constructor() {
    /** The name of the current orchestration */
    b(this, "orchestration");
    /** A boolean that stores if the Bridge session is valid or not
     *  If the orchestration is not valid, some functions will not work
     */
    b(this, "isConnected");
    /**A boolean for checking the status of the current disconnect event */
    b(this, "isDisconnecting");
    /**An array containing the connected Looking Glass Displays */
    b(this, "displays");
    /**an Array containing Playlists, we store this to easily switch between multiple playlists */
    b(this, "playlists");
    /** The index of playlists that is currently active */
    b(this, "currentPlaylistIndex");
    /**The index of the playlist Item that is currently active */
    b(this, "currentPlaylistItemIndex");
    /**store if we're currently in the middle of a cast */
    b(this, "isCastPending", !1);
    /**the version of the Looking Glass Driver that's running */
    b(this, "version");
    b(this, "currentHologram");
    /**a boolean for whether a disconnect was triggered automatically or manually */
    b(this, "manualDisconnect", !1);
    b(this, "playState", "STOPPED");
    if (this.orchestration = "", this.isConnected = !1, this.isDisconnecting = !1, this.displays = [], k.eventsource = new at(), k.fallback = void 0, this.playlists = [], this.currentPlaylistIndex = 0, this.currentPlaylistItemIndex = 0, this.version = { major: 0, minor: 0, patch: 0, hotfix: 0 }, !k.instance)
      k.instance = this;
    else
      return k.instance;
  }
  static getInstance() {
    return k.instance || (k.instance = new k()), k.instance;
  }
  /**
   * A helper function to check and see if Looking Glass Bridge is running or not.
   * @returns boolean, true if Bridge is running, false if Bridge is not running
   */
  async status() {
    this.log("%c function call: status ", "color: magenta; font-weight: bold; border: solid");
    const e = new Promise((t) => {
      let s = setTimeout(() => {
        clearTimeout(s), t(new Error("Timed out"));
      }, 5e3);
    });
    try {
      const t = await Promise.race([fetch("http://localhost:33334/"), e]);
      if (!t.ok)
        throw new Error(`HTTP error! status: ${t.status}`);
      return !0;
    } catch (t) {
      return t.message === "Timed out" ? this.warn("Request timed out") : console.warn("Looking Glass Bridge is not running, please start Bridge and try again."), !1;
    }
  }
  /**
   * Attempt to connect to Looking Glass Bridge.
   * @returns
   */
  async connect() {
    if (this.log("%c function call: connect ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !0)
      return console.warn("Already connected to Looking Glass Bridge."), { success: !0, response: { version: this.version, orchestration: this.orchestration } };
    if (await this.status() == !1)
      return {
        success: !1,
        response: { version: { major: 0, minor: 0, patch: 0, hotfix: 0 }, orchestration: "" }
      };
    if (this.isConnected = !0, (await this.createOrchestration("")).success == !1) {
      let s = await this.getVersion();
      if (s.success == !1)
        return { success: !1, response: { version: H("0"), orchestration: "" } };
      if (s.response.major < 2 && s.response.minor < 1)
        return { success: !1, response: { version: s.response, orchestration: "" } };
    }
    return await this.subscribeToEvents(), k.eventsource.connectEvent(), new cs({ client: this }), { success: !0, response: { version: this.version, orchestration: this.orchestration } };
  }
  /**
   * Creates an orchestration called "default" if one does not already exist.
   * @returns string, the name of the current orchestration
   */
  async createOrchestration(e) {
    var r, a;
    if (this.log("%c function call: createOrchestration ", "color: magenta; font-weight: bold; border: solid"), await this.status() == !1)
      return { success: !1, response: null };
    const t = await this.getVersion();
    if (t.response.major < 2 && t.response.minor < 1)
      return console.error("Unable to get Looking Glass Bridge version, please upgrade Looking Glass Bridge."), { success: !1, response: null };
    let s = await tt({ name: e, orchestration: this.orchestration });
    return s.success == !0 && (r = s.response) != null && r.payload.value && (this.orchestration = (a = s.response) == null ? void 0 : a.payload.value), { success: !0, response: this.orchestration };
  }
  /**
   * Disconnect from Looking Glass Bridge, free up resources.
   */
  async disconnect() {
    var t, s, r, a;
    return this.log("%c function call: disconnect ", "color: magenta; font-weight: bold; border: solid"), this.isDisconnecting == !0 || this.isConnected == !1 ? { success: !1 } : (this.isDisconnecting = !0, this.manualDisconnect = !0, (await st(this.orchestration)).success == !1 && console.warn(" ⚠️ Unable to exit orchestration, Bridge is not reachable."), (t = k.eventsource) == null || t.disconnectEvent(), (r = (s = k.eventsource) == null ? void 0 : s.ws) == null || r.close(), (a = k.fallback) == null || a.ws.close(), k.fallback = void 0, this.displays = [], this.playlists = [], this.currentHologram = void 0, this.orchestration = "", this.isDisconnecting = !1, this.isCastPending = !1, this.isConnected = !1, { success: !0 });
  }
  /**
   * changes the state of the Looking Glass Bridge Window
   * @param showWindow boolean, true to show the Looking Glass window, false to hide the Looking Glass window
   * @returns
   */
  async showWindow(e) {
    if (this.isConnected == !1)
      return { success: !1, response: null };
    this.log("%c function call: showWindow ", "color: magenta; font-weight: bold; border: solid");
    let t = "this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.";
    if (await this.isVersionCompatible() == !1)
      return console.warn(t), { success: !1, response: null };
    const s = {
      orchestration: this.orchestration,
      show_window: e,
      head_index: -1
    };
    let r = await T({
      endpoint: "show_window",
      requestBody: s
    });
    return r.success == !1 ? { success: !1, response: null } : { success: !0, response: r.response };
  }
  /**
   * A helper function to get the version of Looking Glass Bridge that is running.
   * @returns string of the version of Looking Glass Bridge that is running
   */
  async getVersion() {
    var t;
    this.log("%c function call: getVersion ", "color: magenta; font-weight: bold; border: solid");
    let e = await T({ endpoint: "bridge_version", requestBody: {} });
    if (e.success == !0) {
      let s = H(e.response.payload.value);
      return this.version = s, { success: !0, response: this.version };
    } else {
      let s = await ((t = k.fallback) == null ? void 0 : t.getLegacyVersion());
      return s == null ? { success: !1, response: H("0") } : { success: !0, response: H(s) };
    }
  }
  /**
   * A helper function to get the version of the Looking Glass Bridge API
   * @returns the current version of the Looking Glass API
   */
  async apiVersion() {
    if (this.log("%c function call: apiVersion ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: H("0") };
    if (await this.isVersionCompatible() == !1)
      return { success: !1, response: H("0") };
    let e = await T({ endpoint: "api_version", requestBody: {} });
    return e.success == !1 ? (console.warn("this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge."), { success: !1, response: H("0") }) : { success: !0, response: H(e.response.payload.value) };
  }
  /**
   * QueryDisplays finds all displays that are connected to the computer,
   * searches for Looking Glass displays, and returns them as an array of Display objects
   * @returns the display object
   */
  async getDisplays() {
    if (this.log("%c function call: displays ", "color: magenta; font-weight: bold; border: solid"), this.displays = [], this.isConnected == !1)
      return { success: !1, response: null };
    const e = {
      orchestration: this.orchestration
    };
    let t = await T({
      endpoint: "available_output_devices",
      requestBody: e
    });
    if (t.success == !1)
      return { success: !1, response: null };
    ls.safeParse(t.response);
    for (let s in t.response.payload.value) {
      let r = t.response.payload.value[`${s}`];
      if (r.value.hwid.value.includes("LKG")) {
        let a = et(r.value);
        a != null && this.displays.push(a);
      }
    }
    return { success: !0, response: this.displays };
  }
  /**Delete the instance of the playlist from Bridge, this will stop the playlist from playing if it's active. */
  async deletePlaylist(e) {
    if (this.log("%c function call: deletePlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    const t = e.getInstance(this.orchestration);
    let s = await T({
      endpoint: "delete_playlist",
      requestBody: t
    });
    return s.success == !1 ? { success: !1, response: null } : s;
  }
  /**
   * This function will allow you to cast a single hologram to the Looking Glass
   * @param hologram
   */
  async cast(e) {
    var a, i, o;
    if (this.isConnected == !1)
      return { success: !1 };
    if (this.log("%c function call: cast ", "color: magenta; font-weight: bold; border: solid"), this.isCastPending == !0)
      return this.warn("already casting please wait"), { success: !1 };
    this.isCastPending = !0;
    let t = "Cast_" + Math.random().toString(36).substring(7), s;
    s == null && (s = new De({
      name: t,
      loop: !0,
      items: [],
      orchestration: this.orchestration
    }), (a = this.playlists) == null || a.push(s));
    let r = s.addItem(e);
    if (r !== void 0)
      await s.play(), (i = this.playlists) == null || i.forEach((u) => {
        var d;
        u.name != t && (this.deletePlaylist(u), (d = this.playlists) == null || d.splice(this.playlists.indexOf(u), 1));
      }), this.currentPlaylistIndex = ((o = this.playlists) == null ? void 0 : o.indexOf(s)) ?? 0, this.currentPlaylistItemIndex = r.index;
    else
      return { success: !1 };
    return this.currentHologram = e, this.isCastPending = !1, { success: !0 };
  }
  getCurrentPlaylist() {
    var e;
    return (e = this.playlists) == null ? void 0 : e[this.currentPlaylistIndex];
  }
  async playRemotePlaylist(e, t = 0) {
    var a, i, o;
    if (!this.isConnected && !(await this.connect()).success)
      return { success: !1 };
    if (console.log("%c function call: playRemotePlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isCastPending == !0)
      return { success: !1 };
    this.isCastPending = !0;
    let s = "Cast_" + Math.random().toString(36).substring(7);
    const r = new De({
      name: s,
      loop: !0,
      items: e,
      orchestration: this.orchestration
    });
    return (a = this.playlists) == null || a.push(r), (i = this.playlists) == null || i.forEach((u) => {
      var d;
      u.name != s && (this.deletePlaylist(u), (d = this.playlists) == null || d.splice(this.playlists.indexOf(u), 1));
    }), this.currentPlaylistIndex = ((o = this.playlists) == null ? void 0 : o.indexOf(r)) ?? 0, this.currentPlaylistItemIndex = t, this.currentHologram = e[t], this.isCastPending = !1, await r.play(), { success: !0 };
  }
  /**Play a Playlist created by Looking Glass Studio, requires the full path to the playlist.json file. */
  async playStudioPlaylist(e) {
    if (this.log("%c function call: subscribeToEvents ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    const t = {
      orchestration: this.orchestration,
      name: "Studio Playlist",
      playlist_path: e,
      loop: !0
    };
    await T({
      endpoint: "instance_studio_playlist",
      requestBody: t
    });
    const s = {
      orchestration: this.orchestration,
      name: "Studio Playlist",
      head_index: -1
    };
    return { success: !0, response: (await T({
      endpoint: "play_playlist",
      requestBody: s
    })).response };
  }
  /**stop playing the studio playlist */
  async stopStudioPlaylist() {
    if (this.log("%c function call: stopStudioPlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1 };
    const e = {
      orchestration: this.orchestration,
      name: "Studio Playlist",
      loop: !1
    };
    return (await T({
      endpoint: "delete_playlist",
      requestBody: e
    })).success == !1 ? { success: !1 } : (await this.showWindow(!1), { success: !0 });
  }
  /**Get the current playlist that is set to start automatically */
  async getAutoStartPlaylist() {
    if (this.log("%c function call: getAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    let e = {
      orchestration: this.orchestration,
      head_index: -1
    }, t = await T({
      endpoint: "get_autostart_playlist",
      requestBody: e
    });
    return t.success == !1 ? { success: !1, response: null } : { success: !0, response: t.response };
  }
  /**Choose a Playlist that exists on the local file system to set as the start up playlist */
  async setAutoStartPlaylist(e) {
    if (this.log("%c function call: setAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    let t = {
      orchestration: this.orchestration,
      head_index: -1,
      playlist_name: e.playlistName,
      playlist_path: e.playlistPath
    }, s = await T({
      endpoint: "set_autostart_playlist",
      requestBody: t
    });
    return s.success == !1 ? { success: !1, response: null } : { success: !0, response: s.response };
  }
  /**set a playlist to auto-start, requires that all files are local on the system */
  async createAutoStartPlaylist(e) {
    if (this.log("%c function call: createAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    for (let r = 0; r < e.playlist.items.length; r++)
      if (e.playlist.items[r].hologram.uri.includes("http"))
        return this.warn("playlist contains a web uri, cannot create autostart playlist"), { success: !1, response: null };
    let t = {
      orchestration: this.orchestration,
      head_index: -1,
      playlist_name: e.playlist.name
    }, s = await T({
      endpoint: "set_named_autostart_playlist",
      requestBody: t
    });
    return s.success == !1 ? { success: !1, response: null } : { success: !0, response: s.response };
  }
  // TRANSPORT CONTROLS
  /**Play the currently instanced playlist */
  async play() {
    let e = {
      orchestration: this.orchestration
    }, t = await T({
      endpoint: "transport_control_play",
      requestBody: e
    });
    return t.success == !1 ? { success: !1, response: null } : (this.playState = "PLAYING", { success: !0, response: t.response });
  }
  /**Pause the currently playing playlist */
  async pause() {
    let e = {
      orchestration: this.orchestration
    }, t = await T({
      endpoint: "transport_control_pause",
      requestBody: e
    });
    return t.success == !1 ? { success: !1, response: null } : (this.playState = "PAUSED", { success: !0, response: t.response });
  }
  /**Got to the next playlist item */
  async next() {
    let e = {
      orchestration: this.orchestration
    }, t = await T({
      endpoint: "transport_control_next",
      requestBody: e
    });
    if (t.success == !1)
      return { success: !1, response: null };
    const s = this.getCurrentPlaylist(), r = s == null ? void 0 : s.loop, a = s == null ? void 0 : s.items.length;
    return this.currentPlaylistItemIndex + 1 === a ? r && (this.currentPlaylistItemIndex = 0) : this.currentPlaylistItemIndex++, { success: !0, response: t.response };
  }
  /**Go to the previous playlist item */
  async previous() {
    let e = {
      orchestration: this.orchestration
    }, t = await T({
      endpoint: "transport_control_previous",
      requestBody: e
    });
    if (t.success == !1)
      return { success: !1, response: null };
    const s = this.getCurrentPlaylist(), r = s == null ? void 0 : s.loop, a = s == null ? void 0 : s.items.length;
    return this.currentPlaylistIndex === 0 ? r && a && (this.currentPlaylistItemIndex = a) : this.currentPlaylistItemIndex--, { success: !0, response: t.response };
  }
  /**Seek to a specific item in a playlist */
  async seek(e) {
    let t = {
      orchestration: this.orchestration,
      index: e
    }, s = await T({
      endpoint: "transport_control_seek_to_index",
      requestBody: t
    });
    return s.success == !1 ? { success: !1, response: null } : { success: !0, response: s.response };
  }
  /**
   * Connect to Looking Glass Bridge's EventSource.
   * The event source is a websocket connection that will send events from Bridge to the client.
   * @returns the bridge event source
   */
  async subscribeToEvents() {
    var t;
    this.log("%c function call: subscribeToEvents ", "color: magenta; font-weight: bold; border: solid");
    let e = await ((t = k.eventsource) == null ? void 0 : t.connectToBridgeEventSource(this.orchestration));
    return (e == null ? void 0 : e.success) == !0 ? { success: !0 } : { success: !1 };
  }
  /**
   * Adds an event listener that returns a message from Bridge's websocket based event source.
   * @param event the event to listen for
   * @param MessageHandler the function to call when the event is received
   */
  async addEventListener(e, t) {
    k.eventsource == null ? await this.subscribeToEvents() : k.eventsource.addMessageHandler({ event: e, MessageHandler: t });
  }
  async removeEventListener(e, t) {
    k.eventsource == null ? await this.subscribeToEvents() : k.eventsource.removeMessageHandler({ event: e, MessageHandler: t });
  }
  /**Update the parameters of the current hologram */
  async updateCurrentHologram({ name: e, parameter: t, value: s }) {
    let r = {
      orchestration: this.orchestration,
      name: e,
      [t]: `${s}`
    }, a = await T({ endpoint: "update_current_entry", requestBody: r });
    return a.success == !1 ? { success: !1, response: null } : { success: !0, response: a.response };
  }
  getCurrentHologram() {
    return this.currentHologram;
  }
  getVerbosity() {
    return k.verbosity;
  }
  /**
   *Set the level of console logging that Bridge.js library will do.
   * @param verbosity 0 = no logging, 1 = errors only, 2 = only bridge values, 3 = full bridge response
   */
  setVerbosity(e) {
    k.verbosity = e;
  }
  /**Asbtraction for logging with verbosity setting */
  log(...e) {
    k.verbosity >= 2 && console.log.apply(console, e);
  }
  /**Asbtraction for logging with verbosity setting */
  warn(...e) {
    k.verbosity >= 1 && console.warn.apply(e);
  }
  /**Asbtraction for logging with verbosity setting */
  error(...e) {
    k.verbosity >= 0 && console.error.apply(e);
  }
  /**
   * helper function for determining if the version of Bridge is valid.
   * @returns boolean, true if the version is compatible, false if not
   */
  async isVersionCompatible() {
    return this.version.major == 0 ? this.isConnected = !1 : this.version.major < 2 && this.version.minor < 1 ? (this.warn("Please update to the latest version for the best experience"), this.isConnected = !1) : this.version.major >= 2 && this.version.minor >= 2 && (this.isConnected = !0), this.isConnected;
  }
};
let j = k;
/** the instance of the client that we create, BridgeClient is a singleton, there can only be one */
b(j, "instance"), b(j, "fallback"), /** The websocket connection to Bridge's Event Source, this returns information from Bridge */
b(j, "eventsource"), /**control how often we log to the console, 3 is everything, 0 is nothing */
b(j, "verbosity");
const L = (n, e) => l.number().refine((t) => t >= n && t <= e, {
  message: `The value should be between ${n} and ${e}`
}), us = {
  min: 0.1,
  max: 10,
  range: L(0.1, 10),
  type: "float"
}, Re = {
  min: 0.1,
  max: 4,
  range: L(0.1, 4),
  type: "float"
}, ds = {
  min: 0,
  max: 1,
  range: L(0, 1),
  type: "float"
}, hs = {
  min: -1,
  max: 1,
  range: L(-1, 1),
  type: "float"
}, fs = {
  min: -1,
  max: 1,
  range: L(-1, 1),
  type: "float"
}, Ae = {
  min: 0.1,
  max: 2,
  range: L(0.1, 2),
  type: "float"
}, ps = {
  min: -0.05,
  max: 0.05,
  range: L(-0.05, 0.05),
  type: "float"
}, ms = {
  min: 1,
  max: 50,
  range: L(1, 50),
  type: "int"
}, ys = {
  min: 1,
  max: 50,
  range: L(1, 50),
  type: "int"
}, gs = {
  min: 1,
  max: 2500,
  range: L(1, 2500),
  type: "int"
}, Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ASPECT: us,
  CROP_POS_X: hs,
  CROP_POS_Y: fs,
  DEPTHINESS: Re,
  DEPTH_CUTOFF: ds,
  FOCUS: ps,
  QUILT_COLS: ys,
  QUILT_ROWS: ms,
  QUILT_VIEW_COUNT: gs,
  ZOOM: Ae
}, Symbol.toStringTag, { value: "Module" })), qs = l.union([l.literal("quilt"), l.literal("rgbd")]), vs = l.object({
  rows: l.number(),
  columns: l.number(),
  aspect: l.number(),
  viewCount: l.number(),
  focus: l.number().optional()
}), _s = l.object({
  /**Aspect Ratio of the hologram,
   * this should match the source image you provide, not the RGBD Pair */
  aspect: l.number(),
  /**Where are the holograms located?
   * 0 Top
   * 1 Bottom
   * 2 Right
   * 3 Left */
  depth_loc: l.union([l.literal(0), l.literal(1), l.literal(2), l.literal(3)]),
  /**Is the Depth inverted? 0 for false, 1 for true */
  depth_inversion: l.union([l.literal(0), l.literal(1)]),
  /**Is the depth map chroma or grayscale? 0 for false, 1 for true */
  chroma_depth: l.union([l.literal(0), l.literal(1)]),
  /**Depthiness can be a value between 0.1 and 2 */
  depthiness: Re.range,
  /**Controls the Focus of the hologram */
  focus: l.number().optional(),
  /**Whether or not to cutoff depth beyond a certain point. 0 for false, 1 for true */
  depth_cutoff: l.union([l.literal(1), l.literal(0)]).optional(),
  /**Zoom can be between 0.1 and 2 */
  zoom: Ae.range
}), bs = {
  quilt: vs,
  rgbd: _s
};
class xs {
  constructor(e) {
    b(this, "uri");
    b(this, "type");
    b(this, "settings");
    this.uri = e.uri, this.type = "quilt", this.settings = e.settings;
  }
}
class ws {
  constructor(e) {
    b(this, "uri");
    b(this, "type");
    b(this, "settings");
    this.uri = e.uri, this.type = "rgbd", this.settings = e.settings;
  }
}
function Ls({ uri: n, type: e, settings: t }) {
  switch (bs[e].safeParse(t), e) {
    case "quilt":
      return new xs({ uri: n, settings: t });
    case "rgbd":
      return new ws({ uri: n, settings: t });
    default:
      throw new Error(`Invalid type: ${e}`);
  }
}
const $s = l.union([
  l.literal("focus"),
  l.literal("crop_pos_x"),
  l.literal("crop_pos_y"),
  l.literal("zoom"),
  //rgbd specific
  l.literal("depth_loc"),
  l.literal("depth_inversion"),
  l.literal("chroma_depth"),
  l.literal("depthiness"),
  l.literal("depth_cutoff")
]), Us = l.object({
  focus: l.number().optional(),
  crop_pos_x: l.number().optional(),
  crop_pos_y: l.number().optional(),
  zoom: Ae.range,
  //rgbd specific
  depth_loc: l.union([l.literal(0), l.literal(1), l.literal(2), l.literal(3)]),
  depth_inversion: l.union([l.literal(0), l.literal(1)]),
  chroma_depth: l.union([l.literal(0), l.literal(1)]),
  depthiness: Re.range,
  depth_cutoff: l.union([l.literal(1), l.literal(0)]).optional()
});
export {
  j as BridgeClient,
  N as MessageHandler,
  Ts as MonitorConnectedMessageHandler,
  Cs as MonitorDisconnectedMessageHandler,
  cs as NewItemPlayingMessageHandler,
  De as Playlist,
  Rs as PlaylistDeleteMessageHandler,
  Ms as PlaylistInsertMessageHandler,
  Zs as PlaylistInstanceMessageHandler,
  Os as ProgressCompletionMessageHandler,
  Ns as ProgressStartMessageHandler,
  js as ProgressUpdateMessageHandler,
  xs as QuiltHologram,
  vs as QuiltHologramArgs,
  Be as QuiltPlaylistItem,
  ws as RGBDHologram,
  _s as RGBDHologramArgs,
  Ve as RGBDPlaylistItem,
  Vs as SyncPlayPlaylistCancelledMessageHandler,
  Bs as SyncPlayPlaylistCompleteMessageHandler,
  As as SyncPlayPlaylistMessageHandler,
  Ss as TransportControlNextMessageHandler,
  Ps as TransportControlPauseMessageHandler,
  Is as TransportControlPlayMessageHandler,
  Es as TransportControlPreviousMessageHandler,
  Ds as defaults,
  Ls as hologramFactory,
  bs as hologramMap,
  Us as hologramParamMap,
  qs as hologramTypeSchema,
  $s as parameterNames
};
//# sourceMappingURL=looking-glass-bridge.mjs.map

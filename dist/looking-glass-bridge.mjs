var Ye = Object.defineProperty;
var Qe = (n, e, t) => e in n ? Ye(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var x = (n, e, t) => (Qe(n, typeof e != "symbol" ? e + "" : e, t), t);
function Xe(n) {
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
function Ke(n) {
  const e = JSON.parse(n);
  return e == null ? null : {
    quiltAspect: e.quiltAspect,
    quiltWidth: e.quiltX,
    quiltHeight: e.quiltY,
    rows: e.tileY,
    columns: e.tileX
  };
}
function Fe(n) {
  return {
    calibration: Xe(n.calibration.value),
    defaultQuilt: Ke(n.defaultQuilt.value),
    hardwareVersion: n.hardwareVersion.value,
    index: n.index.value,
    state: n.state.value,
    windowCoords: n.windowCoords.value
  };
}
async function I(n) {
  let e, t = E.getInstance();
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
async function et({ name: n, orchestration: e }) {
  if (E.getInstance().log("%c function call: tryEnterOrchestration ", "color: magenta; font-weight: bold; border: solid"), (n == null || n == "") && (n = "default"), e !== "" && e !== void 0)
    return { success: !1, response: null };
  let r = await I({
    endpoint: "enter_orchestration",
    requestBody: {
      name: n
    }
  });
  return r.success == !1 ? (console.error("failed to enter orchestration", r), { success: !1, response: null }) : (console.groupEnd(), { success: !0, response: r.response });
}
async function tt(n) {
  let e = {
    orchestration: n
  }, t = new Promise((r) => {
    let a = setTimeout(() => {
      clearTimeout(a), r({ success: !1, response: null });
    }, 5e3);
  }), s = await Promise.race([
    I({
      endpoint: "exit_orchestration",
      requestBody: e
    }),
    t
  ]);
  return !s || s.success == !1 ? { success: !1, response: null } : { success: !0, response: s.response };
}
function st() {
  return window !== void 0 ? !0 : (console.error("Window is unavailable!"), !1);
}
function nt() {
  return "WebSocket" in window ? !0 : (console.error("WebSocket NOT supported by your Browser!"), !1);
}
class rt {
  constructor() {
    x(this, "eventSource");
    x(this, "MessageHandler");
    x(this, "ws");
    this.eventSource = void 0, this.MessageHandler = {}, this.ws = void 0;
  }
  /**
   * adds a new message handler object to the BridgeEventSource class
   * @param event the event name to listen for
   * @param MessageHandler the function to call when the event is received
   */
  addMessageHandler({ event: e, MessageHandler: t }) {
    var r;
    const s = E.getInstance();
    e in this.MessageHandler || (this.MessageHandler[e] = []), (r = this.MessageHandler[e]) == null || r.push(t), s.log(`%c Add Message Handler: ${e} `, "color: YellowGreen; font-weight: bold; border: solid;");
  }
  removeMessageHandler({ event: e, MessageHandler: t }) {
    var r, a;
    if (E.getInstance().log(`%c Message Handler Removed: ${e} `, "color: Tomato; font-weight: bold; border: solid;"), e in this.MessageHandler) {
      const o = (r = this.MessageHandler[e]) == null ? void 0 : r.findIndex((c) => c === t);
      o !== -1 && o !== void 0 && ((a = this.MessageHandler[e]) == null || a.splice(o, 1));
    }
  }
  callMessageHandler(e) {
    let t;
    try {
      t = JSON.parse(e);
    } catch (s) {
      E.getInstance().error("Failed to parse JSON", s);
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
    const t = E.getInstance();
    if (t.log("%c Connect to Bridge Events Source ", "color: chartreuse; font-weight: bold; border: solid"), !st())
      return { success: !1 };
    if (!nt())
      return { success: !1 };
    let s = this;
    return this.ws = new WebSocket("ws://localhost:9724/event_source"), new Promise((r) => {
      this.ws !== void 0 && (this.ws.onopen = () => {
        var c;
        E.getInstance().log("%c Connected to Websocket ", "color: chartreuse; font-weight: bold; border: solid");
        const o = {
          subscribe_orchestration_events: e
        };
        (c = this.ws) == null || c.send(JSON.stringify(o)), r({ success: !0 });
      }, this.ws.onmessage = function(a) {
        s.callMessageHandler(a.data);
      }, this.ws.onclose = function() {
        const a = E.getInstance();
        a.manualDisconnect || a.disconnect(), a.log(`%c Disconnected from Websocket, Manual Disconnect: ${a.manualDisconnect} `, "color: red; font-weight: bold; border: solid");
      }, this.ws.onerror = function(a) {
        t.warn("Unable to connect to WebSocket, is Bridge Running?", a), r({ success: !1 });
      });
    });
  }
}
class De {
  constructor(e) {
    x(this, "orchestration");
    x(this, "hologram");
    x(this, "id");
    x(this, "index");
    x(this, "playlistName");
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
class Re extends De {
  constructor(e) {
    super(e);
  }
}
class Me extends De {
  constructor(e) {
    super(e);
  }
}
class Ae {
  constructor(e) {
    x(this, "name");
    x(this, "loop");
    x(this, "items");
    x(this, "orchestration");
    var t;
    this.name = e.name, this.loop = e.loop, this.orchestration = e.orchestration, e.items ? this.items = (t = e.items) == null ? void 0 : t.map((s, r) => {
      if (s.type == "quilt")
        return new Re({
          hologram: s,
          id: r,
          index: r,
          playlistName: this.name,
          orchestration: this.orchestration
        });
      if (s.type == "rgbd")
        return new Me({
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
    return e.type == "quilt" ? (t = new Re({
      hologram: e,
      id: this.items.length,
      index: this.items.length,
      playlistName: this.name,
      orchestration: this.orchestration
    }), this.items.push(t), t) : e.type == "rgbd" ? (t = new Me({
      hologram: e,
      id: this.items.length,
      index: this.items.length,
      playlistName: this.name,
      orchestration: this.orchestration
    }), this.items.push(t), t) : void 0;
  }
  async addPlaylistItemToBridge(e) {
    const t = e.toBridge();
    return (await I({ endpoint: "insert_playlist_entry", requestBody: t })).success == !1 ? (console.error("failed to insert playlist entry"), !1) : !0;
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
    let r = await I({ endpoint: "instance_playlist", requestBody: s });
    if (r.success == !1)
      return console.error("failed to initialize playlist"), !1;
    const a = this.items;
    if (r.success == !0 && t !== void 0)
      for (let u = 0; u < a.length; u++) {
        a[u].orchestration = this.orchestration;
        const d = a[u].toBridge();
        if ((await I({ endpoint: "insert_playlist_entry", requestBody: d })).success == !1)
          return console.error("failed to insert playlist entry"), !1;
      }
    const o = this.getCurrent({ orchestration: t, head: e });
    return (await I({
      endpoint: "play_playlist",
      requestBody: o
    })).success != !1;
  }
}
var k;
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
    for (const o of r)
      a[o] = o;
    return a;
  }, n.getValidEnumValues = (r) => {
    const a = n.objectKeys(r).filter((c) => typeof r[r[c]] != "number"), o = {};
    for (const c of a)
      o[c] = r[c];
    return n.objectValues(o);
  }, n.objectValues = (r) => n.objectKeys(r).map(function(a) {
    return r[a];
  }), n.objectKeys = typeof Object.keys == "function" ? (r) => Object.keys(r) : (r) => {
    const a = [];
    for (const o in r)
      Object.prototype.hasOwnProperty.call(r, o) && a.push(o);
    return a;
  }, n.find = (r, a) => {
    for (const o of r)
      if (a(o))
        return o;
  }, n.isInteger = typeof Number.isInteger == "function" ? (r) => Number.isInteger(r) : (r) => typeof r == "number" && isFinite(r) && Math.floor(r) === r;
  function s(r, a = " | ") {
    return r.map((o) => typeof o == "string" ? `'${o}'` : o).join(a);
  }
  n.joinValues = s, n.jsonStringifyReplacer = (r, a) => typeof a == "bigint" ? a.toString() : a;
})(k || (k = {}));
var Se;
(function(n) {
  n.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(Se || (Se = {}));
const h = k.arrayToEnum([
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
]), H = (n) => {
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
}, l = k.arrayToEnum([
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
]), at = (n) => JSON.stringify(n, null, 2).replace(/"([^"]+)":/g, "$1:");
class Z extends Error {
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
      for (const o of a.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(r);
        else if (o.code === "invalid_return_type")
          r(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          r(o.argumentsError);
        else if (o.path.length === 0)
          s._errors.push(t(o));
        else {
          let c = s, u = 0;
          for (; u < o.path.length; ) {
            const d = o.path[u];
            u === o.path.length - 1 ? (c[d] = c[d] || { _errors: [] }, c[d]._errors.push(t(o))) : c[d] = c[d] || { _errors: [] }, c = c[d], u++;
          }
        }
    };
    return r(this), s;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, k.jsonStringifyReplacer, 2);
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
Z.create = (n) => new Z(n);
const ne = (n, e) => {
  let t;
  switch (n.code) {
    case l.invalid_type:
      n.received === h.undefined ? t = "Required" : t = `Expected ${n.expected}, received ${n.received}`;
      break;
    case l.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(n.expected, k.jsonStringifyReplacer)}`;
      break;
    case l.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${k.joinValues(n.keys, ", ")}`;
      break;
    case l.invalid_union:
      t = "Invalid input";
      break;
    case l.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${k.joinValues(n.options)}`;
      break;
    case l.invalid_enum_value:
      t = `Invalid enum value. Expected ${k.joinValues(n.options)}, received '${n.received}'`;
      break;
    case l.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case l.invalid_return_type:
      t = "Invalid function return type";
      break;
    case l.invalid_date:
      t = "Invalid date";
      break;
    case l.invalid_string:
      typeof n.validation == "object" ? "includes" in n.validation ? (t = `Invalid input: must include "${n.validation.includes}"`, typeof n.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${n.validation.position}`)) : "startsWith" in n.validation ? t = `Invalid input: must start with "${n.validation.startsWith}"` : "endsWith" in n.validation ? t = `Invalid input: must end with "${n.validation.endsWith}"` : k.assertNever(n.validation) : n.validation !== "regex" ? t = `Invalid ${n.validation}` : t = "Invalid";
      break;
    case l.too_small:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "more than"} ${n.minimum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "over"} ${n.minimum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${n.minimum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(n.minimum))}` : t = "Invalid input";
      break;
    case l.too_big:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "less than"} ${n.maximum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "under"} ${n.maximum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "bigint" ? t = `BigInt must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly" : n.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(n.maximum))}` : t = "Invalid input";
      break;
    case l.custom:
      t = "Invalid input";
      break;
    case l.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case l.not_multiple_of:
      t = `Number must be a multiple of ${n.multipleOf}`;
      break;
    case l.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, k.assertNever(n);
  }
  return { message: t };
};
let qe = ne;
function it(n) {
  qe = n;
}
function ye() {
  return qe;
}
const ge = (n) => {
  const { data: e, path: t, errorMaps: s, issueData: r } = n, a = [...t, ...r.path || []], o = {
    ...r,
    path: a
  };
  let c = "";
  const u = s.filter((d) => !!d).slice().reverse();
  for (const d of u)
    c = d(o, { data: e, defaultError: c }).message;
  return {
    ...r,
    path: a,
    message: r.message || c
  };
}, ot = [];
function f(n, e) {
  const t = ge({
    issueData: e,
    data: n.data,
    path: n.path,
    errorMaps: [
      n.common.contextualErrorMap,
      n.schemaErrorMap,
      ye(),
      ne
      // then global default map
    ].filter((s) => !!s)
  });
  n.common.issues.push(t);
}
class P {
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
        return g;
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
    return P.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, t) {
    const s = {};
    for (const r of t) {
      const { key: a, value: o } = r;
      if (a.status === "aborted" || o.status === "aborted")
        return g;
      a.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), (typeof o.value < "u" || r.alwaysSet) && (s[a.value] = o.value);
    }
    return { status: e.value, value: s };
  }
}
const g = Object.freeze({
  status: "aborted"
}), Le = (n) => ({ status: "dirty", value: n }), j = (n) => ({ status: "valid", value: n }), Pe = (n) => n.status === "aborted", je = (n) => n.status === "dirty", ve = (n) => n.status === "valid", _e = (n) => typeof Promise < "u" && n instanceof Promise;
var m;
(function(n) {
  n.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, n.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(m || (m = {}));
class B {
  constructor(e, t, s, r) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = s, this._key = r;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Be = (n, e) => {
  if (ve(e))
    return { success: !0, data: e.value };
  if (!n.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new Z(n.common.issues);
      return this._error = t, this._error;
    }
  };
};
function v(n) {
  if (!n)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: s, description: r } = n;
  if (e && (t || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: r } : { errorMap: (o, c) => o.code !== "invalid_type" ? { message: c.defaultError } : typeof c.data > "u" ? { message: s ?? c.defaultError } : { message: t ?? c.defaultError }, description: r };
}
class b {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return H(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: H(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new P(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: H(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (_e(t))
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
      parsedType: H(e)
    }, a = this._parseSync({ data: e, path: r.path, parent: r });
    return Be(r, a);
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
      parsedType: H(e)
    }, r = this._parse({ data: e, path: s.path, parent: s }), a = await (_e(r) ? r : Promise.resolve(r));
    return Be(s, a);
  }
  refine(e, t) {
    const s = (r) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(r) : t;
    return this._refinement((r, a) => {
      const o = e(r), c = () => a.addIssue({
        code: l.custom,
        ...s(r)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((u) => u ? !0 : (c(), !1)) : o ? !0 : (c(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((s, r) => e(s) ? !0 : (r.addIssue(typeof t == "function" ? t(s, r) : t), !1));
  }
  _refinement(e) {
    return new M({
      schema: this,
      typeName: y.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return L.create(this, this._def);
  }
  nullable() {
    return X.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return R.create(this, this._def);
  }
  promise() {
    return se.create(this, this._def);
  }
  or(e) {
    return oe.create([this, e], this._def);
  }
  and(e) {
    return ce.create(this, e, this._def);
  }
  transform(e) {
    return new M({
      ...v(this._def),
      schema: this,
      typeName: y.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new fe({
      ...v(this._def),
      innerType: this,
      defaultValue: t,
      typeName: y.ZodDefault
    });
  }
  brand() {
    return new Ue({
      typeName: y.ZodBranded,
      type: this,
      ...v(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new ke({
      ...v(this._def),
      innerType: this,
      catchValue: t,
      typeName: y.ZodCatch
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
    return pe.create(this, e);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const ct = /^c[^\s-]{8,}$/i, lt = /^[a-z][a-z0-9]*$/, ut = /[0-9A-HJKMNP-TV-Z]{26}/, dt = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, ht = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/, ft = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u, pt = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, mt = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, yt = (n) => n.precision ? n.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${n.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${n.precision}}Z$`) : n.precision === 0 ? n.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : n.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function gt(n, e) {
  return !!((e === "v4" || !e) && pt.test(n) || (e === "v6" || !e) && mt.test(n));
}
class O extends b {
  constructor() {
    super(...arguments), this._regex = (e, t, s) => this.refinement((r) => e.test(r), {
      validation: t,
      code: l.invalid_string,
      ...m.errToObj(s)
    }), this.nonempty = (e) => this.min(1, m.errToObj(e)), this.trim = () => new O({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    }), this.toLowerCase = () => new O({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    }), this.toUpperCase = () => new O({
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
          code: l.invalid_type,
          expected: h.string,
          received: a.parsedType
        }
        //
      ), g;
    }
    const s = new P();
    let r;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (r = this._getOrReturnCtx(e, r), f(r, {
          code: l.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (r = this._getOrReturnCtx(e, r), f(r, {
          code: l.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "length") {
        const o = e.data.length > a.value, c = e.data.length < a.value;
        (o || c) && (r = this._getOrReturnCtx(e, r), o ? f(r, {
          code: l.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : c && f(r, {
          code: l.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), s.dirty());
      } else if (a.kind === "email")
        ht.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "email",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "emoji")
        ft.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "emoji",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "uuid")
        dt.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "uuid",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid")
        ct.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "cuid",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid2")
        lt.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "cuid2",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "ulid")
        ut.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "ulid",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          r = this._getOrReturnCtx(e, r), f(r, {
            validation: "url",
            code: l.invalid_string,
            message: a.message
          }), s.dirty();
        }
      else
        a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "regex",
          code: l.invalid_string,
          message: a.message
        }), s.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: l.invalid_string,
          validation: { includes: a.value, position: a.position },
          message: a.message
        }), s.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: l.invalid_string,
          validation: { startsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: l.invalid_string,
          validation: { endsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "datetime" ? yt(a).test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: l.invalid_string,
          validation: "datetime",
          message: a.message
        }), s.dirty()) : a.kind === "ip" ? gt(e.data, a.version) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "ip",
          code: l.invalid_string,
          message: a.message
        }), s.dirty()) : k.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _addCheck(e) {
    return new O({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...m.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...m.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...m.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...m.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...m.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...m.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...m.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...m.errToObj(e) });
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
      ...m.errToObj(e == null ? void 0 : e.message)
    });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...m.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...m.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...m.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...m.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...m.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...m.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...m.errToObj(t)
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
O.create = (n) => {
  var e;
  return new O({
    checks: [],
    typeName: y.ZodString,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ...v(n)
  });
};
function vt(n, e) {
  const t = (n.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, r = t > s ? t : s, a = parseInt(n.toFixed(r).replace(".", "")), o = parseInt(e.toFixed(r).replace(".", ""));
  return a % o / Math.pow(10, r);
}
class z extends b {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== h.number) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_type,
        expected: h.number,
        received: a.parsedType
      }), g;
    }
    let s;
    const r = new P();
    for (const a of this._def.checks)
      a.kind === "int" ? k.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), r.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), r.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), r.dirty()) : a.kind === "multipleOf" ? vt(e.data, a.value) !== 0 && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), r.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.not_finite,
        message: a.message
      }), r.dirty()) : k.assertNever(a);
    return { status: r.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, m.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, m.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, m.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, m.toString(t));
  }
  setLimit(e, t, s, r) {
    return new z({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: s,
          message: m.toString(r)
        }
      ]
    });
  }
  _addCheck(e) {
    return new z({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: m.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: m.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: m.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: m.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: m.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: m.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: m.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: m.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: m.toString(e)
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && k.isInteger(e.value));
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
z.create = (n) => new z({
  checks: [],
  typeName: y.ZodNumber,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...v(n)
});
class W extends b {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== h.bigint) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_type,
        expected: h.bigint,
        received: a.parsedType
      }), g;
    }
    let s;
    const r = new P();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), r.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), r.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), r.dirty()) : k.assertNever(a);
    return { status: r.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, m.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, m.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, m.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, m.toString(t));
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
          message: m.toString(r)
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
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: m.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: m.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: m.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: m.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: m.toString(t)
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
W.create = (n) => {
  var e;
  return new W({
    checks: [],
    typeName: y.ZodBigInt,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ...v(n)
  });
};
class re extends b {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== h.boolean) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.boolean,
        received: s.parsedType
      }), g;
    }
    return j(e.data);
  }
}
re.create = (n) => new re({
  typeName: y.ZodBoolean,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...v(n)
});
class Y extends b {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== h.date) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_type,
        expected: h.date,
        received: a.parsedType
      }), g;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_date
      }), g;
    }
    const s = new P();
    let r;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (r = this._getOrReturnCtx(e, r), f(r, {
        code: l.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), s.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (r = this._getOrReturnCtx(e, r), f(r, {
        code: l.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), s.dirty()) : k.assertNever(a);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Y({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: m.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: m.toString(t)
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
Y.create = (n) => new Y({
  checks: [],
  coerce: (n == null ? void 0 : n.coerce) || !1,
  typeName: y.ZodDate,
  ...v(n)
});
class be extends b {
  _parse(e) {
    if (this._getType(e) !== h.symbol) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.symbol,
        received: s.parsedType
      }), g;
    }
    return j(e.data);
  }
}
be.create = (n) => new be({
  typeName: y.ZodSymbol,
  ...v(n)
});
class ae extends b {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.undefined,
        received: s.parsedType
      }), g;
    }
    return j(e.data);
  }
}
ae.create = (n) => new ae({
  typeName: y.ZodUndefined,
  ...v(n)
});
class ie extends b {
  _parse(e) {
    if (this._getType(e) !== h.null) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.null,
        received: s.parsedType
      }), g;
    }
    return j(e.data);
  }
}
ie.create = (n) => new ie({
  typeName: y.ZodNull,
  ...v(n)
});
class te extends b {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return j(e.data);
  }
}
te.create = (n) => new te({
  typeName: y.ZodAny,
  ...v(n)
});
class J extends b {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return j(e.data);
  }
}
J.create = (n) => new J({
  typeName: y.ZodUnknown,
  ...v(n)
});
class $ extends b {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return f(t, {
      code: l.invalid_type,
      expected: h.never,
      received: t.parsedType
    }), g;
  }
}
$.create = (n) => new $({
  typeName: y.ZodNever,
  ...v(n)
});
class xe extends b {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.void,
        received: s.parsedType
      }), g;
    }
    return j(e.data);
  }
}
xe.create = (n) => new xe({
  typeName: y.ZodVoid,
  ...v(n)
});
class R extends b {
  _parse(e) {
    const { ctx: t, status: s } = this._processInputParams(e), r = this._def;
    if (t.parsedType !== h.array)
      return f(t, {
        code: l.invalid_type,
        expected: h.array,
        received: t.parsedType
      }), g;
    if (r.exactLength !== null) {
      const o = t.data.length > r.exactLength.value, c = t.data.length < r.exactLength.value;
      (o || c) && (f(t, {
        code: o ? l.too_big : l.too_small,
        minimum: c ? r.exactLength.value : void 0,
        maximum: o ? r.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: r.exactLength.message
      }), s.dirty());
    }
    if (r.minLength !== null && t.data.length < r.minLength.value && (f(t, {
      code: l.too_small,
      minimum: r.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.minLength.message
    }), s.dirty()), r.maxLength !== null && t.data.length > r.maxLength.value && (f(t, {
      code: l.too_big,
      maximum: r.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.maxLength.message
    }), s.dirty()), t.common.async)
      return Promise.all([...t.data].map((o, c) => r.type._parseAsync(new B(t, o, t.path, c)))).then((o) => P.mergeArray(s, o));
    const a = [...t.data].map((o, c) => r.type._parseSync(new B(t, o, t.path, c)));
    return P.mergeArray(s, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new R({
      ...this._def,
      minLength: { value: e, message: m.toString(t) }
    });
  }
  max(e, t) {
    return new R({
      ...this._def,
      maxLength: { value: e, message: m.toString(t) }
    });
  }
  length(e, t) {
    return new R({
      ...this._def,
      exactLength: { value: e, message: m.toString(t) }
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
  typeName: y.ZodArray,
  ...v(e)
});
function F(n) {
  if (n instanceof C) {
    const e = {};
    for (const t in n.shape) {
      const s = n.shape[t];
      e[t] = L.create(F(s));
    }
    return new C({
      ...n._def,
      shape: () => e
    });
  } else
    return n instanceof R ? new R({
      ...n._def,
      type: F(n.element)
    }) : n instanceof L ? L.create(F(n.unwrap())) : n instanceof X ? X.create(F(n.unwrap())) : n instanceof V ? V.create(n.items.map((e) => F(e))) : n;
}
class C extends b {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = k.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== h.object) {
      const d = this._getOrReturnCtx(e);
      return f(d, {
        code: l.invalid_type,
        expected: h.object,
        received: d.parsedType
      }), g;
    }
    const { status: s, ctx: r } = this._processInputParams(e), { shape: a, keys: o } = this._getCached(), c = [];
    if (!(this._def.catchall instanceof $ && this._def.unknownKeys === "strip"))
      for (const d in r.data)
        o.includes(d) || c.push(d);
    const u = [];
    for (const d of o) {
      const _ = a[d], K = r.data[d];
      u.push({
        key: { status: "valid", value: d },
        value: _._parse(new B(r, K, r.path, d)),
        alwaysSet: d in r.data
      });
    }
    if (this._def.catchall instanceof $) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const _ of c)
          u.push({
            key: { status: "valid", value: _ },
            value: { status: "valid", value: r.data[_] }
          });
      else if (d === "strict")
        c.length > 0 && (f(r, {
          code: l.unrecognized_keys,
          keys: c
        }), s.dirty());
      else if (d !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const _ of c) {
        const K = r.data[_];
        u.push({
          key: { status: "valid", value: _ },
          value: d._parse(
            new B(r, K, r.path, _)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: _ in r.data
        });
      }
    }
    return r.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const _ of u) {
        const K = await _.key;
        d.push({
          key: K,
          value: await _.value,
          alwaysSet: _.alwaysSet
        });
      }
      return d;
    }).then((d) => P.mergeObjectSync(s, d)) : P.mergeObjectSync(s, u);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return m.errToObj, new C({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, s) => {
          var r, a, o, c;
          const u = (o = (a = (r = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(r, t, s).message) !== null && o !== void 0 ? o : s.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (c = m.errToObj(e).message) !== null && c !== void 0 ? c : u
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
      typeName: y.ZodObject
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
    return k.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (t[s] = this.shape[s]);
    }), new C({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return k.objectKeys(this.shape).forEach((s) => {
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
    return F(this);
  }
  partial(e) {
    const t = {};
    return k.objectKeys(this.shape).forEach((s) => {
      const r = this.shape[s];
      e && !e[s] ? t[s] = r : t[s] = r.optional();
    }), new C({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return k.objectKeys(this.shape).forEach((s) => {
      if (e && !e[s])
        t[s] = this.shape[s];
      else {
        let a = this.shape[s];
        for (; a instanceof L; )
          a = a._def.innerType;
        t[s] = a;
      }
    }), new C({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return $e(k.objectKeys(this.shape));
  }
}
C.create = (n, e) => new C({
  shape: () => n,
  unknownKeys: "strip",
  catchall: $.create(),
  typeName: y.ZodObject,
  ...v(e)
});
C.strictCreate = (n, e) => new C({
  shape: () => n,
  unknownKeys: "strict",
  catchall: $.create(),
  typeName: y.ZodObject,
  ...v(e)
});
C.lazycreate = (n, e) => new C({
  shape: n,
  unknownKeys: "strip",
  catchall: $.create(),
  typeName: y.ZodObject,
  ...v(e)
});
class oe extends b {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = this._def.options;
    function r(a) {
      for (const c of a)
        if (c.result.status === "valid")
          return c.result;
      for (const c of a)
        if (c.result.status === "dirty")
          return t.common.issues.push(...c.ctx.common.issues), c.result;
      const o = a.map((c) => new Z(c.ctx.common.issues));
      return f(t, {
        code: l.invalid_union,
        unionErrors: o
      }), g;
    }
    if (t.common.async)
      return Promise.all(s.map(async (a) => {
        const o = {
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
            parent: o
          }),
          ctx: o
        };
      })).then(r);
    {
      let a;
      const o = [];
      for (const u of s) {
        const d = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, _ = u._parseSync({
          data: t.data,
          path: t.path,
          parent: d
        });
        if (_.status === "valid")
          return _;
        _.status === "dirty" && !a && (a = { result: _, ctx: d }), d.common.issues.length && o.push(d.common.issues);
      }
      if (a)
        return t.common.issues.push(...a.ctx.common.issues), a.result;
      const c = o.map((u) => new Z(u));
      return f(t, {
        code: l.invalid_union,
        unionErrors: c
      }), g;
    }
  }
  get options() {
    return this._def.options;
  }
}
oe.create = (n, e) => new oe({
  options: n,
  typeName: y.ZodUnion,
  ...v(e)
});
const me = (n) => n instanceof ue ? me(n.schema) : n instanceof M ? me(n.innerType()) : n instanceof de ? [n.value] : n instanceof G ? n.options : n instanceof he ? Object.keys(n.enum) : n instanceof fe ? me(n._def.innerType) : n instanceof ae ? [void 0] : n instanceof ie ? [null] : null;
class Ie extends b {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.object)
      return f(t, {
        code: l.invalid_type,
        expected: h.object,
        received: t.parsedType
      }), g;
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
      code: l.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [s]
    }), g);
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
      const o = me(a.shape[e]);
      if (!o)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const c of o) {
        if (r.has(c))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(c)}`);
        r.set(c, a);
      }
    }
    return new Ie({
      typeName: y.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: r,
      ...v(s)
    });
  }
}
function Ee(n, e) {
  const t = H(n), s = H(e);
  if (n === e)
    return { valid: !0, data: n };
  if (t === h.object && s === h.object) {
    const r = k.objectKeys(e), a = k.objectKeys(n).filter((c) => r.indexOf(c) !== -1), o = { ...n, ...e };
    for (const c of a) {
      const u = Ee(n[c], e[c]);
      if (!u.valid)
        return { valid: !1 };
      o[c] = u.data;
    }
    return { valid: !0, data: o };
  } else if (t === h.array && s === h.array) {
    if (n.length !== e.length)
      return { valid: !1 };
    const r = [];
    for (let a = 0; a < n.length; a++) {
      const o = n[a], c = e[a], u = Ee(o, c);
      if (!u.valid)
        return { valid: !1 };
      r.push(u.data);
    }
    return { valid: !0, data: r };
  } else
    return t === h.date && s === h.date && +n == +e ? { valid: !0, data: n } : { valid: !1 };
}
class ce extends b {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), r = (a, o) => {
      if (Pe(a) || Pe(o))
        return g;
      const c = Ee(a.value, o.value);
      return c.valid ? ((je(a) || je(o)) && t.dirty(), { status: t.value, value: c.data }) : (f(s, {
        code: l.invalid_intersection_types
      }), g);
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
    ]).then(([a, o]) => r(a, o)) : r(this._def.left._parseSync({
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
ce.create = (n, e, t) => new ce({
  left: n,
  right: e,
  typeName: y.ZodIntersection,
  ...v(t)
});
class V extends b {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.array)
      return f(s, {
        code: l.invalid_type,
        expected: h.array,
        received: s.parsedType
      }), g;
    if (s.data.length < this._def.items.length)
      return f(s, {
        code: l.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), g;
    !this._def.rest && s.data.length > this._def.items.length && (f(s, {
      code: l.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const a = [...s.data].map((o, c) => {
      const u = this._def.items[c] || this._def.rest;
      return u ? u._parse(new B(s, o, s.path, c)) : null;
    }).filter((o) => !!o);
    return s.common.async ? Promise.all(a).then((o) => P.mergeArray(t, o)) : P.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new V({
      ...this._def,
      rest: e
    });
  }
}
V.create = (n, e) => {
  if (!Array.isArray(n))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new V({
    items: n,
    typeName: y.ZodTuple,
    rest: null,
    ...v(e)
  });
};
class le extends b {
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
        code: l.invalid_type,
        expected: h.object,
        received: s.parsedType
      }), g;
    const r = [], a = this._def.keyType, o = this._def.valueType;
    for (const c in s.data)
      r.push({
        key: a._parse(new B(s, c, s.path, c)),
        value: o._parse(new B(s, s.data[c], s.path, c))
      });
    return s.common.async ? P.mergeObjectAsync(t, r) : P.mergeObjectSync(t, r);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, s) {
    return t instanceof b ? new le({
      keyType: e,
      valueType: t,
      typeName: y.ZodRecord,
      ...v(s)
    }) : new le({
      keyType: O.create(),
      valueType: e,
      typeName: y.ZodRecord,
      ...v(t)
    });
  }
}
class we extends b {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.map)
      return f(s, {
        code: l.invalid_type,
        expected: h.map,
        received: s.parsedType
      }), g;
    const r = this._def.keyType, a = this._def.valueType, o = [...s.data.entries()].map(([c, u], d) => ({
      key: r._parse(new B(s, c, s.path, [d, "key"])),
      value: a._parse(new B(s, u, s.path, [d, "value"]))
    }));
    if (s.common.async) {
      const c = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const u of o) {
          const d = await u.key, _ = await u.value;
          if (d.status === "aborted" || _.status === "aborted")
            return g;
          (d.status === "dirty" || _.status === "dirty") && t.dirty(), c.set(d.value, _.value);
        }
        return { status: t.value, value: c };
      });
    } else {
      const c = /* @__PURE__ */ new Map();
      for (const u of o) {
        const d = u.key, _ = u.value;
        if (d.status === "aborted" || _.status === "aborted")
          return g;
        (d.status === "dirty" || _.status === "dirty") && t.dirty(), c.set(d.value, _.value);
      }
      return { status: t.value, value: c };
    }
  }
}
we.create = (n, e, t) => new we({
  valueType: e,
  keyType: n,
  typeName: y.ZodMap,
  ...v(t)
});
class Q extends b {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.set)
      return f(s, {
        code: l.invalid_type,
        expected: h.set,
        received: s.parsedType
      }), g;
    const r = this._def;
    r.minSize !== null && s.data.size < r.minSize.value && (f(s, {
      code: l.too_small,
      minimum: r.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.minSize.message
    }), t.dirty()), r.maxSize !== null && s.data.size > r.maxSize.value && (f(s, {
      code: l.too_big,
      maximum: r.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.maxSize.message
    }), t.dirty());
    const a = this._def.valueType;
    function o(u) {
      const d = /* @__PURE__ */ new Set();
      for (const _ of u) {
        if (_.status === "aborted")
          return g;
        _.status === "dirty" && t.dirty(), d.add(_.value);
      }
      return { status: t.value, value: d };
    }
    const c = [...s.data.values()].map((u, d) => a._parse(new B(s, u, s.path, d)));
    return s.common.async ? Promise.all(c).then((u) => o(u)) : o(c);
  }
  min(e, t) {
    return new Q({
      ...this._def,
      minSize: { value: e, message: m.toString(t) }
    });
  }
  max(e, t) {
    return new Q({
      ...this._def,
      maxSize: { value: e, message: m.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Q.create = (n, e) => new Q({
  valueType: n,
  minSize: null,
  maxSize: null,
  typeName: y.ZodSet,
  ...v(e)
});
class ee extends b {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.function)
      return f(t, {
        code: l.invalid_type,
        expected: h.function,
        received: t.parsedType
      }), g;
    function s(c, u) {
      return ge({
        data: c,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          ye(),
          ne
        ].filter((d) => !!d),
        issueData: {
          code: l.invalid_arguments,
          argumentsError: u
        }
      });
    }
    function r(c, u) {
      return ge({
        data: c,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          ye(),
          ne
        ].filter((d) => !!d),
        issueData: {
          code: l.invalid_return_type,
          returnTypeError: u
        }
      });
    }
    const a = { errorMap: t.common.contextualErrorMap }, o = t.data;
    return this._def.returns instanceof se ? j(async (...c) => {
      const u = new Z([]), d = await this._def.args.parseAsync(c, a).catch((Ce) => {
        throw u.addIssue(s(c, Ce)), u;
      }), _ = await o(...d);
      return await this._def.returns._def.type.parseAsync(_, a).catch((Ce) => {
        throw u.addIssue(r(_, Ce)), u;
      });
    }) : j((...c) => {
      const u = this._def.args.safeParse(c, a);
      if (!u.success)
        throw new Z([s(c, u.error)]);
      const d = o(...u.data), _ = this._def.returns.safeParse(d, a);
      if (!_.success)
        throw new Z([r(d, _.error)]);
      return _.data;
    });
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new ee({
      ...this._def,
      args: V.create(e).rest(J.create())
    });
  }
  returns(e) {
    return new ee({
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
    return new ee({
      args: e || V.create([]).rest(J.create()),
      returns: t || J.create(),
      typeName: y.ZodFunction,
      ...v(s)
    });
  }
}
class ue extends b {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
ue.create = (n, e) => new ue({
  getter: n,
  typeName: y.ZodLazy,
  ...v(e)
});
class de extends b {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return f(t, {
        received: t.data,
        code: l.invalid_literal,
        expected: this._def.value
      }), g;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
de.create = (n, e) => new de({
  value: n,
  typeName: y.ZodLiteral,
  ...v(e)
});
function $e(n, e) {
  return new G({
    values: n,
    typeName: y.ZodEnum,
    ...v(e)
  });
}
class G extends b {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return f(t, {
        expected: k.joinValues(s),
        received: t.parsedType,
        code: l.invalid_type
      }), g;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return f(t, {
        received: t.data,
        code: l.invalid_enum_value,
        options: s
      }), g;
    }
    return j(e.data);
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
    return G.create(e);
  }
  exclude(e) {
    return G.create(this.options.filter((t) => !e.includes(t)));
  }
}
G.create = $e;
class he extends b {
  _parse(e) {
    const t = k.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== h.string && s.parsedType !== h.number) {
      const r = k.objectValues(t);
      return f(s, {
        expected: k.joinValues(r),
        received: s.parsedType,
        code: l.invalid_type
      }), g;
    }
    if (t.indexOf(e.data) === -1) {
      const r = k.objectValues(t);
      return f(s, {
        received: s.data,
        code: l.invalid_enum_value,
        options: r
      }), g;
    }
    return j(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
he.create = (n, e) => new he({
  values: n,
  typeName: y.ZodNativeEnum,
  ...v(e)
});
class se extends b {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.promise && t.common.async === !1)
      return f(t, {
        code: l.invalid_type,
        expected: h.promise,
        received: t.parsedType
      }), g;
    const s = t.parsedType === h.promise ? t.data : Promise.resolve(t.data);
    return j(s.then((r) => this._def.type.parseAsync(r, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
se.create = (n, e) => new se({
  type: n,
  typeName: y.ZodPromise,
  ...v(e)
});
class M extends b {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === y.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), r = this._def.effect || null;
    if (r.type === "preprocess") {
      const o = r.transform(s.data);
      return s.common.async ? Promise.resolve(o).then((c) => this._def.schema._parseAsync({
        data: c,
        path: s.path,
        parent: s
      })) : this._def.schema._parseSync({
        data: o,
        path: s.path,
        parent: s
      });
    }
    const a = {
      addIssue: (o) => {
        f(s, o), o.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), r.type === "refinement") {
      const o = (c) => {
        const u = r.refinement(c, a);
        if (s.common.async)
          return Promise.resolve(u);
        if (u instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return c;
      };
      if (s.common.async === !1) {
        const c = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return c.status === "aborted" ? g : (c.status === "dirty" && t.dirty(), o(c.value), { status: t.value, value: c.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((c) => c.status === "aborted" ? g : (c.status === "dirty" && t.dirty(), o(c.value).then(() => ({ status: t.value, value: c.value }))));
    }
    if (r.type === "transform")
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!ve(o))
          return o;
        const c = r.transform(o.value, a);
        if (c instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: c };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => ve(o) ? Promise.resolve(r.transform(o.value, a)).then((c) => ({ status: t.value, value: c })) : o);
    k.assertNever(r);
  }
}
M.create = (n, e, t) => new M({
  schema: n,
  typeName: y.ZodEffects,
  effect: e,
  ...v(t)
});
M.createWithPreprocess = (n, e, t) => new M({
  schema: e,
  effect: { type: "preprocess", transform: n },
  typeName: y.ZodEffects,
  ...v(t)
});
class L extends b {
  _parse(e) {
    return this._getType(e) === h.undefined ? j(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
L.create = (n, e) => new L({
  innerType: n,
  typeName: y.ZodOptional,
  ...v(e)
});
class X extends b {
  _parse(e) {
    return this._getType(e) === h.null ? j(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
X.create = (n, e) => new X({
  innerType: n,
  typeName: y.ZodNullable,
  ...v(e)
});
class fe extends b {
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
fe.create = (n, e) => new fe({
  innerType: n,
  typeName: y.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...v(e)
});
class ke extends b {
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
    return _e(r) ? r.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new Z(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: r.status === "valid" ? r.value : this._def.catchValue({
        get error() {
          return new Z(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ke.create = (n, e) => new ke({
  innerType: n,
  typeName: y.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...v(e)
});
class Te extends b {
  _parse(e) {
    if (this._getType(e) !== h.nan) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.nan,
        received: s.parsedType
      }), g;
    }
    return { status: "valid", value: e.data };
  }
}
Te.create = (n) => new Te({
  typeName: y.ZodNaN,
  ...v(n)
});
const _t = Symbol("zod_brand");
class Ue extends b {
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
class pe extends b {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return a.status === "aborted" ? g : a.status === "dirty" ? (t.dirty(), Le(a.value)) : this._def.out._parseAsync({
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
      return r.status === "aborted" ? g : r.status === "dirty" ? (t.dirty(), {
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
    return new pe({
      in: e,
      out: t,
      typeName: y.ZodPipeline
    });
  }
}
const He = (n, e = {}, t) => n ? te.create().superRefine((s, r) => {
  var a, o;
  if (!n(s)) {
    const c = typeof e == "function" ? e(s) : typeof e == "string" ? { message: e } : e, u = (o = (a = c.fatal) !== null && a !== void 0 ? a : t) !== null && o !== void 0 ? o : !0, d = typeof c == "string" ? { message: c } : c;
    r.addIssue({ code: "custom", ...d, fatal: u });
  }
}) : te.create(), bt = {
  object: C.lazycreate
};
var y;
(function(n) {
  n.ZodString = "ZodString", n.ZodNumber = "ZodNumber", n.ZodNaN = "ZodNaN", n.ZodBigInt = "ZodBigInt", n.ZodBoolean = "ZodBoolean", n.ZodDate = "ZodDate", n.ZodSymbol = "ZodSymbol", n.ZodUndefined = "ZodUndefined", n.ZodNull = "ZodNull", n.ZodAny = "ZodAny", n.ZodUnknown = "ZodUnknown", n.ZodNever = "ZodNever", n.ZodVoid = "ZodVoid", n.ZodArray = "ZodArray", n.ZodObject = "ZodObject", n.ZodUnion = "ZodUnion", n.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", n.ZodIntersection = "ZodIntersection", n.ZodTuple = "ZodTuple", n.ZodRecord = "ZodRecord", n.ZodMap = "ZodMap", n.ZodSet = "ZodSet", n.ZodFunction = "ZodFunction", n.ZodLazy = "ZodLazy", n.ZodLiteral = "ZodLiteral", n.ZodEnum = "ZodEnum", n.ZodEffects = "ZodEffects", n.ZodNativeEnum = "ZodNativeEnum", n.ZodOptional = "ZodOptional", n.ZodNullable = "ZodNullable", n.ZodDefault = "ZodDefault", n.ZodCatch = "ZodCatch", n.ZodPromise = "ZodPromise", n.ZodBranded = "ZodBranded", n.ZodPipeline = "ZodPipeline";
})(y || (y = {}));
const xt = (n, e = {
  message: `Input not instance of ${n.name}`
}) => He((t) => t instanceof n, e), Ne = O.create, ze = z.create, wt = Te.create, kt = W.create, We = re.create, Tt = Y.create, It = be.create, Ct = ae.create, St = ie.create, Pt = te.create, jt = J.create, Et = $.create, Nt = xe.create, Ot = R.create, Ge = C.create, Zt = C.strictCreate, Je = oe.create, Rt = Ie.create, Mt = ce.create, At = V.create, Bt = le.create, Vt = we.create, Dt = Q.create, qt = ee.create, Lt = ue.create, A = de.create, $t = G.create, Ut = he.create, Ht = se.create, Ve = M.create, zt = L.create, Wt = X.create, Gt = M.createWithPreprocess, Jt = pe.create, Yt = () => Ne().optional(), Qt = () => ze().optional(), Xt = () => We().optional(), Kt = {
  string: (n) => O.create({ ...n, coerce: !0 }),
  number: (n) => z.create({ ...n, coerce: !0 }),
  boolean: (n) => re.create({
    ...n,
    coerce: !0
  }),
  bigint: (n) => W.create({ ...n, coerce: !0 }),
  date: (n) => Y.create({ ...n, coerce: !0 })
}, Ft = g;
var i = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: ne,
  setErrorMap: it,
  getErrorMap: ye,
  makeIssue: ge,
  EMPTY_PATH: ot,
  addIssueToContext: f,
  ParseStatus: P,
  INVALID: g,
  DIRTY: Le,
  OK: j,
  isAborted: Pe,
  isDirty: je,
  isValid: ve,
  isAsync: _e,
  get util() {
    return k;
  },
  get objectUtil() {
    return Se;
  },
  ZodParsedType: h,
  getParsedType: H,
  ZodType: b,
  ZodString: O,
  ZodNumber: z,
  ZodBigInt: W,
  ZodBoolean: re,
  ZodDate: Y,
  ZodSymbol: be,
  ZodUndefined: ae,
  ZodNull: ie,
  ZodAny: te,
  ZodUnknown: J,
  ZodNever: $,
  ZodVoid: xe,
  ZodArray: R,
  ZodObject: C,
  ZodUnion: oe,
  ZodDiscriminatedUnion: Ie,
  ZodIntersection: ce,
  ZodTuple: V,
  ZodRecord: le,
  ZodMap: we,
  ZodSet: Q,
  ZodFunction: ee,
  ZodLazy: ue,
  ZodLiteral: de,
  ZodEnum: G,
  ZodNativeEnum: he,
  ZodPromise: se,
  ZodEffects: M,
  ZodTransformer: M,
  ZodOptional: L,
  ZodNullable: X,
  ZodDefault: fe,
  ZodCatch: ke,
  ZodNaN: Te,
  BRAND: _t,
  ZodBranded: Ue,
  ZodPipeline: pe,
  custom: He,
  Schema: b,
  ZodSchema: b,
  late: bt,
  get ZodFirstPartyTypeKind() {
    return y;
  },
  coerce: Kt,
  any: Pt,
  array: Ot,
  bigint: kt,
  boolean: We,
  date: Tt,
  discriminatedUnion: Rt,
  effect: Ve,
  enum: $t,
  function: qt,
  instanceof: xt,
  intersection: Mt,
  lazy: Lt,
  literal: A,
  map: Vt,
  nan: wt,
  nativeEnum: Ut,
  never: Et,
  null: St,
  nullable: Wt,
  number: ze,
  object: Ge,
  oboolean: Xt,
  onumber: Qt,
  optional: zt,
  ostring: Yt,
  pipeline: Jt,
  preprocess: Gt,
  promise: Ht,
  record: Bt,
  set: Dt,
  strictObject: Zt,
  string: Ne,
  symbol: It,
  transformer: Ve,
  tuple: At,
  undefined: Ct,
  union: Je,
  unknown: jt,
  void: Nt,
  NEVER: Ft,
  ZodIssueCode: l,
  quotelessJson: at,
  ZodError: Z
});
const es = A("UNSIGNED_INT");
A("INT");
A("FLOAT");
const ts = A("INT2"), w = A("WSTRING"), D = A("VARIANT_MAP"), ss = A("Completion"), ns = A("UnknownOrchestration"), rs = A("Pending"), as = A("Failure"), p = Ne(), S = Ge({
  name: p,
  type: w,
  value: Je([ss, rs, as, ns])
});
i.object({
  name: p,
  // the payload value is unique to each bridge response.
  payload: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  status: S
});
i.object({
  name: p,
  payload: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  payload: i.object({
    name: p,
    type: D,
    value: i.object({
      id: i.object({
        name: p,
        type: w,
        value: i.string()
      }).optional(),
      message: i.object({
        name: p,
        type: w,
        value: i.string()
      })
    })
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  payload: i.object({
    name: p,
    type: D,
    value: i.object({
      name: i.object({
        name: p,
        type: w,
        value: i.string()
      })
    })
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  payload: i.object({
    name: p,
    type: D,
    value: i.object({
      index: i.object({
        name: p,
        type: w,
        value: i.string()
      })
    })
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  payload: i.object({
    name: p,
    type: D,
    value: i.object({
      name: i.object({
        name: p,
        type: w,
        value: i.string()
      })
    })
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  status: S
});
const is = i.object({
  name: p,
  type: D,
  value: i.object({
    calibration: i.object({
      name: p,
      type: w,
      value: i.string()
    }),
    defaultQuilt: i.object({
      name: p,
      type: w,
      value: i.string()
    }),
    hardwareVersion: i.object({
      name: p,
      type: w,
      value: i.string()
    }),
    hwid: i.object({
      name: p,
      type: w,
      value: i.string()
    }),
    index: i.object({
      name: p,
      type: es,
      value: i.number()
    }),
    state: i.object({
      name: p,
      type: w,
      value: i.string()
    }),
    windowCoords: i.object({
      name: p,
      type: ts,
      value: i.object({
        x: i.number(),
        y: i.number()
      })
    })
  })
}), os = i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  payload: i.object({
    name: p,
    type: D,
    value: i.record(is).optional()
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  payload: i.object({
    name: p,
    type: D,
    value: i.object({
      name: i.object({
        name: p,
        type: w,
        value: i.string()
      })
    })
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  payload: i.object({
    name: p,
    type: D,
    value: i.object({
      playlist_name: i.object({
        name: p,
        type: w,
        value: i.string()
      }),
      playlist_path: i.object({
        name: p,
        type: w,
        value: i.string()
      })
    })
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  payload: i.object({
    name: p,
    type: D,
    value: i.object({
      playlist_name: i.object({
        name: p,
        type: w,
        value: i.string()
      })
    })
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  payload: i.object({
    name: p,
    type: D,
    value: i.object({
      playlist_name: i.object({
        name: p,
        type: w,
        value: i.string()
      })
    })
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  status: S
});
i.object({
  name: p,
  orchestration: i.object({
    name: p,
    type: w,
    value: i.string()
  }),
  status: S
});
class N {
  constructor(e) {
    x(this, "bridgeEventName");
    x(this, "client");
    this.bridgeEventName = e.bridgeEventName, this.client = e.client, this.client.addEventListener(this.bridgeEventName, this.handle.bind(this));
  }
}
class ks extends N {
  constructor(e) {
    super({ bridgeEventName: "Monitor Connect", client: e.client });
  }
  handle(e) {
    this.client.log("%c Monitor Connect ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Ts extends N {
  constructor(e) {
    super({ bridgeEventName: "Monitor Disconnect", client: e.client });
  }
  handle(e) {
    this.client.log("%c Monitor Disconnect ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Is extends N {
  constructor(e) {
    super({ bridgeEventName: "Progress Start", client: e.client });
  }
  handle(e) {
    this.client.log("%c Progress Start ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Cs extends N {
  constructor(e) {
    super({ bridgeEventName: "Progress Completion", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class Ss extends N {
  constructor(e) {
    super({ bridgeEventName: "Progress Update", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class Ps extends N {
  constructor(e) {
    super({ bridgeEventName: "Playlist Instance", client: e.client });
  }
  handle(e) {
    this.client.log("%c Playlist Instance ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class js extends N {
  constructor(e) {
    super({ bridgeEventName: "Playlist Insert", client: e.client });
  }
  handle(e) {
    this.client.log("%c Playlist Insert ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Es extends N {
  constructor(e) {
    super({ bridgeEventName: "Playlist Delete", client: e.client });
  }
  handle(e) {
    this.client.log("%c Playlist Delete ", "color: aqua; font-weight: bold; border: solid;", e);
  }
}
class Ns extends N {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class Os extends N {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist Complete", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class Zs extends N {
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
    var a, o;
    this.client.log("%c New Item Playing ", "color: aqua; font-weight: bold; border: solid;", e);
    let t = this.client.currentPlaylistIndex, s = (o = (a = this.client.playlists) == null ? void 0 : a[t]) == null ? void 0 : o.name, r = this.client.currentPlaylistItemIndex;
    e.payload.value.playlist_name.value == s && e.payload.value.index.value == r && (this.client.isCastPending = !1);
  }
}
function U(n) {
  const [e, t, s, r] = n.split(".").map(Number);
  return {
    major: e,
    minor: t,
    patch: s,
    hotfix: r
  };
}
const T = class {
  constructor() {
    /** The name of the current orchestration */
    x(this, "orchestration");
    /** A boolean that stores if the Bridge session is valid or not
     *  If the orchestration is not valid, some functions will not work
     */
    x(this, "isConnected");
    /**A boolean for checking the status of the current disconnect event */
    x(this, "isDisconnecting");
    /**An array containing the connected Looking Glass Displays */
    x(this, "displays");
    /**an Array containing Playlists, we store this to easily switch between multiple playlists */
    x(this, "playlists");
    /** The index of playlists that is currently active */
    x(this, "currentPlaylistIndex");
    /**The index of the playlist Item that is currently active */
    x(this, "currentPlaylistItemIndex");
    /**store if we're currently in the middle of a cast */
    x(this, "isCastPending", !1);
    /**the version of the Looking Glass Driver that's running */
    x(this, "version");
    x(this, "currentHologram");
    /**a boolean for whether a disconnect was triggered automatically or manually */
    x(this, "manualDisconnect", !1);
    x(this, "playState", "STOPPED");
    if (this.orchestration = "", this.isConnected = !1, this.isDisconnecting = !1, this.displays = [], T.eventsource = new rt(), T.fallback = void 0, this.playlists = [], this.currentPlaylistIndex = 0, this.currentPlaylistItemIndex = 0, this.version = { major: 0, minor: 0, patch: 0, hotfix: 0 }, !T.instance)
      T.instance = this;
    else
      return T.instance;
  }
  static getInstance() {
    return T.instance || (T.instance = new T()), T.instance;
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
        return { success: !1, response: { version: U("0"), orchestration: "" } };
      if (s.response.major < 2 && s.response.minor < 1)
        return { success: !1, response: { version: s.response, orchestration: "" } };
    }
    return await this.subscribeToEvents(), T.eventsource.connectEvent(), new cs({ client: this }), { success: !0, response: { version: this.version, orchestration: this.orchestration } };
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
    let s = await et({ name: e, orchestration: this.orchestration });
    return s.success == !0 && (r = s.response) != null && r.payload.value && (this.orchestration = (a = s.response) == null ? void 0 : a.payload.value), { success: !0, response: this.orchestration };
  }
  /**
   * Disconnect from Looking Glass Bridge, free up resources.
   */
  async disconnect() {
    var t, s, r, a;
    return this.log("%c function call: disconnect ", "color: magenta; font-weight: bold; border: solid"), this.isDisconnecting == !0 || this.isConnected == !1 ? { success: !1 } : (this.isDisconnecting = !0, this.manualDisconnect = !0, (await tt(this.orchestration)).success == !1 && console.warn(" ⚠️ Unable to exit orchestration, Bridge is not reachable."), (t = T.eventsource) == null || t.disconnectEvent(), (r = (s = T.eventsource) == null ? void 0 : s.ws) == null || r.close(), (a = T.fallback) == null || a.ws.close(), T.fallback = void 0, this.displays = [], this.playlists = [], this.currentHologram = void 0, this.orchestration = "", this.isDisconnecting = !1, this.isCastPending = !1, this.isConnected = !1, { success: !0 });
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
    let r = await I({
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
    let e = await I({ endpoint: "bridge_version", requestBody: {} });
    if (e.success == !0) {
      let s = U(e.response.payload.value);
      return this.version = s, { success: !0, response: this.version };
    } else {
      let s = await ((t = T.fallback) == null ? void 0 : t.getLegacyVersion());
      return s == null ? { success: !1, response: U("0") } : { success: !0, response: U(s) };
    }
  }
  /**
   * A helper function to get the version of the Looking Glass Bridge API
   * @returns the current version of the Looking Glass API
   */
  async apiVersion() {
    if (this.log("%c function call: apiVersion ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: U("0") };
    if (await this.isVersionCompatible() == !1)
      return { success: !1, response: U("0") };
    let e = await I({ endpoint: "api_version", requestBody: {} });
    return e.success == !1 ? (console.warn("this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge."), { success: !1, response: U("0") }) : { success: !0, response: U(e.response.payload.value) };
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
    let t = await I({
      endpoint: "available_output_devices",
      requestBody: e
    });
    if (t.success == !1)
      return { success: !1, response: null };
    os.safeParse(t.response);
    for (let s in t.response.payload.value) {
      let r = t.response.payload.value[`${s}`];
      if (r.value.hwid.value.includes("LKG")) {
        let a = Fe(r.value);
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
    let s = await I({
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
    var a, o, c;
    if (this.isConnected == !1)
      return { success: !1 };
    if (this.log("%c function call: cast ", "color: magenta; font-weight: bold; border: solid"), this.isCastPending == !0)
      return this.warn("already casting please wait"), { success: !1 };
    this.isCastPending = !0;
    let t = "Cast_" + Math.random().toString(36).substring(7), s;
    s == null && (s = new Ae({
      name: t,
      loop: !0,
      items: [],
      orchestration: this.orchestration
    }), (a = this.playlists) == null || a.push(s));
    let r = s.addItem(e);
    if (r !== void 0)
      await s.play(), (o = this.playlists) == null || o.forEach((u) => {
        var d;
        u.name != t && (this.deletePlaylist(u), (d = this.playlists) == null || d.splice(this.playlists.indexOf(u), 1));
      }), this.currentPlaylistIndex = ((c = this.playlists) == null ? void 0 : c.indexOf(s)) ?? 0, this.currentPlaylistItemIndex = r.index;
    else
      return { success: !1 };
    return this.currentHologram = e, this.isCastPending = !1, { success: !0 };
  }
  getCurrentPlaylist() {
    var e;
    return (e = this.playlists) == null ? void 0 : e[this.currentPlaylistIndex];
  }
  async playRemotePlaylist(e, t = 0) {
    var a, o, c;
    if (!this.isConnected && !(await this.connect()).success)
      return { success: !1 };
    if (console.log("%c function call: playRemotePlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isCastPending == !0)
      return { success: !1 };
    this.isCastPending = !0;
    let s = "Cast_" + Math.random().toString(36).substring(7);
    const r = new Ae({
      name: s,
      loop: !0,
      items: e,
      orchestration: this.orchestration
    });
    return (a = this.playlists) == null || a.push(r), (o = this.playlists) == null || o.forEach((u) => {
      var d;
      u.name != s && (this.deletePlaylist(u), (d = this.playlists) == null || d.splice(this.playlists.indexOf(u), 1));
    }), this.currentPlaylistIndex = ((c = this.playlists) == null ? void 0 : c.indexOf(r)) ?? 0, this.currentPlaylistItemIndex = t, this.currentHologram = e[t], this.isCastPending = !1, await r.play(), { success: !0 };
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
    await I({
      endpoint: "instance_studio_playlist",
      requestBody: t
    });
    const s = {
      orchestration: this.orchestration,
      name: "Studio Playlist",
      head_index: -1
    };
    return { success: !0, response: (await I({
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
    return (await I({
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
    }, t = await I({
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
    }, s = await I({
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
    }, s = await I({
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
    }, t = await I({
      endpoint: "transport_control_play",
      requestBody: e
    });
    return t.success == !1 ? { success: !1, response: null } : (this.playState = "PLAYING", { success: !0, response: t.response });
  }
  /**Pause the currently playing playlist */
  async pause() {
    let e = {
      orchestration: this.orchestration
    }, t = await I({
      endpoint: "transport_control_pause",
      requestBody: e
    });
    return t.success == !1 ? { success: !1, response: null } : (this.playState = "PAUSED", { success: !0, response: t.response });
  }
  /**Got to the next playlist item */
  async next() {
    let e = {
      orchestration: this.orchestration
    }, t = await I({
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
    }, t = await I({
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
    }, s = await I({
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
    let e = await ((t = T.eventsource) == null ? void 0 : t.connectToBridgeEventSource(this.orchestration));
    return (e == null ? void 0 : e.success) == !0 ? { success: !0 } : { success: !1 };
  }
  /**
   * Adds an event listener that returns a message from Bridge's websocket based event source.
   * @param event the event to listen for
   * @param MessageHandler the function to call when the event is received
   */
  async addEventListener(e, t) {
    T.eventsource == null ? await this.subscribeToEvents() : T.eventsource.addMessageHandler({ event: e, MessageHandler: t });
  }
  async removeEventListener(e, t) {
    T.eventsource == null ? await this.subscribeToEvents() : T.eventsource.removeMessageHandler({ event: e, MessageHandler: t });
  }
  /**Update the parameters of the current hologram */
  async updateCurrentHologram({ name: e, parameter: t, value: s }) {
    let r = {
      orchestration: this.orchestration,
      name: e,
      [t]: `${s}`
    }, a = await I({ endpoint: "update_current_entry", requestBody: r });
    return a.success == !1 ? { success: !1, response: null } : { success: !0, response: a.response };
  }
  getCurrentHologram() {
    return this.currentHologram;
  }
  getVerbosity() {
    return T.verbosity;
  }
  /**
   *Set the level of console logging that Bridge.js library will do.
   * @param verbosity 0 = no logging, 1 = errors only, 2 = only bridge values, 3 = full bridge response
   */
  setVerbosity(e) {
    T.verbosity = e;
  }
  /**Asbtraction for logging with verbosity setting */
  log(...e) {
    T.verbosity >= 2 && console.log.apply(console, e);
  }
  /**Asbtraction for logging with verbosity setting */
  warn(...e) {
    T.verbosity >= 1 && console.warn.apply(e);
  }
  /**Asbtraction for logging with verbosity setting */
  error(...e) {
    T.verbosity >= 0 && console.error.apply(e);
  }
  /**
   * helper function for determining if the version of Bridge is valid.
   * @returns boolean, true if the version is compatible, false if not
   */
  async isVersionCompatible() {
    return this.version.major == 0 ? this.isConnected = !1 : this.version.major < 2 && this.version.minor < 1 ? (this.warn("Please update to the latest version for the best experience"), this.isConnected = !1) : this.version.major >= 2 && this.version.minor >= 2 && (this.isConnected = !0), this.isConnected;
  }
};
let E = T;
/** the instance of the client that we create, BridgeClient is a singleton, there can only be one */
x(E, "instance"), x(E, "fallback"), /** The websocket connection to Bridge's Event Source, this returns information from Bridge */
x(E, "eventsource"), /**control how often we log to the console, 3 is everything, 0 is nothing */
x(E, "verbosity");
const q = (n, e) => i.number().refine((t) => t >= n && t <= e, {
  message: `The value should be between ${n} and ${e}`
}), ls = {
  min: 0.1,
  max: 10,
  range: q(0.1, 10),
  type: "float"
}, Oe = {
  min: 0.1,
  max: 4,
  range: q(0.1, 4),
  type: "float"
}, us = {
  min: 0,
  max: 1,
  range: q(0, 1),
  type: "float"
}, ds = {
  min: -1,
  max: 1,
  range: q(-1, 1),
  type: "float"
}, hs = {
  min: -1,
  max: 1,
  range: q(-1, 1),
  type: "float"
}, Ze = {
  min: 0.1,
  max: 2,
  range: q(0.1, 2),
  type: "float"
}, fs = {
  min: -0.05,
  max: 0.05,
  range: q(-0.05, 0.05),
  type: "float"
}, ps = {
  min: 1,
  max: 50,
  range: q(1, 50),
  type: "int"
}, ms = {
  min: 1,
  max: 50,
  range: q(1, 50),
  type: "int"
}, ys = {
  min: 1,
  max: 2500,
  range: q(1, 2500),
  type: "int"
}, Rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ASPECT: ls,
  CROP_POS_X: ds,
  CROP_POS_Y: hs,
  DEPTHINESS: Oe,
  DEPTH_CUTOFF: us,
  FOCUS: fs,
  QUILT_COLS: ms,
  QUILT_ROWS: ps,
  QUILT_VIEW_COUNT: ys,
  ZOOM: Ze
}, Symbol.toStringTag, { value: "Module" })), Ms = i.union([i.literal("quilt"), i.literal("rgbd")]), gs = i.object({
  rows: i.number(),
  columns: i.number(),
  aspect: i.number(),
  viewCount: i.number(),
  focus: i.number().optional()
}), vs = i.object({
  /**Aspect Ratio of the hologram,
   * this should match the source image you provide, not the RGBD Pair */
  aspect: i.number(),
  /**Where are the holograms located?
   * 0 Top
   * 1 Bottom
   * 2 Right
   * 3 Left */
  depth_loc: i.union([i.literal(0), i.literal(1), i.literal(2), i.literal(3)]),
  /**Is the Depth inverted? 0 for false, 1 for true */
  depth_inversion: i.union([i.literal(0), i.literal(1)]),
  /**Is the depth map chroma or grayscale? 0 for false, 1 for true */
  chroma_depth: i.union([i.literal(0), i.literal(1)]),
  /**Depthiness can be a value between 0.1 and 2 */
  depthiness: Oe.range,
  /**Controls the Focus of the hologram */
  focus: i.number().optional(),
  /**Whether or not to cutoff depth beyond a certain point. 0 for false, 1 for true */
  depth_cutoff: i.union([i.literal(1), i.literal(0)]).optional(),
  /**Zoom can be between 0.1 and 2 */
  zoom: Ze.range
}), _s = {
  quilt: gs,
  rgbd: vs
};
class bs {
  constructor(e) {
    x(this, "uri");
    x(this, "type");
    x(this, "settings");
    this.uri = e.uri, this.type = "quilt", this.settings = e.settings;
  }
}
class xs {
  constructor(e) {
    x(this, "uri");
    x(this, "type");
    x(this, "settings");
    this.uri = e.uri, this.type = "rgbd", this.settings = e.settings;
  }
}
function As({ uri: n, type: e, settings: t }) {
  switch (_s[e].safeParse(t), e) {
    case "quilt":
      return new bs({ uri: n, settings: t });
    case "rgbd":
      return new xs({ uri: n, settings: t });
    default:
      throw new Error(`Invalid type: ${e}`);
  }
}
const Bs = i.union([
  i.literal("focus"),
  i.literal("crop_pos_x"),
  i.literal("crop_pos_y"),
  i.literal("zoom"),
  //rgbd specific
  i.literal("depth_loc"),
  i.literal("depth_inversion"),
  i.literal("chroma_depth"),
  i.literal("depthiness"),
  i.literal("depth_cutoff")
]), Vs = i.object({
  focus: i.number().optional(),
  crop_pos_x: i.number().optional(),
  crop_pos_y: i.number().optional(),
  zoom: Ze.range,
  //rgbd specific
  depth_loc: i.union([i.literal(0), i.literal(1), i.literal(2), i.literal(3)]),
  depth_inversion: i.union([i.literal(0), i.literal(1)]),
  chroma_depth: i.union([i.literal(0), i.literal(1)]),
  depthiness: Oe.range,
  depth_cutoff: i.union([i.literal(1), i.literal(0)]).optional()
});
export {
  E as BridgeClient,
  N as MessageHandler,
  ks as MonitorConnectedMessageHandler,
  Ts as MonitorDisconnectedMessageHandler,
  cs as NewItemPlayingMessageHandler,
  Ae as Playlist,
  Es as PlaylistDeleteMessageHandler,
  js as PlaylistInsertMessageHandler,
  Ps as PlaylistInstanceMessageHandler,
  Cs as ProgressCompletionMessageHandler,
  Is as ProgressStartMessageHandler,
  Ss as ProgressUpdateMessageHandler,
  bs as QuiltHologram,
  gs as QuiltHologramArgs,
  Re as QuiltPlaylistItem,
  xs as RGBDHologram,
  vs as RGBDHologramArgs,
  Me as RGBDPlaylistItem,
  Zs as SyncPlayPlaylistCancelledMessageHandler,
  Os as SyncPlayPlaylistCompleteMessageHandler,
  Ns as SyncPlayPlaylistMessageHandler,
  Rs as defaults,
  As as hologramFactory,
  _s as hologramMap,
  Vs as hologramParamMap,
  Ms as hologramTypeSchema,
  Bs as parameterNames
};
//# sourceMappingURL=looking-glass-bridge.mjs.map
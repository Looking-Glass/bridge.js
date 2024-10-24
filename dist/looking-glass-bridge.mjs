var st = Object.defineProperty;
var nt = (n, e, t) => e in n ? st(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var w = (n, e, t) => (nt(n, typeof e != "symbol" ? e + "" : e, t), t);
function rt(n) {
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
function at(n) {
  const e = JSON.parse(n);
  return e == null ? null : {
    quiltAspect: e.quiltAspect,
    quiltWidth: e.quiltX,
    quiltHeight: e.quiltY,
    rows: e.tileY,
    columns: e.tileX
  };
}
function it(n) {
  return {
    calibration: rt(n.calibration.value),
    defaultQuilt: at(n.defaultQuilt.value),
    hwid: n.hwid.value,
    hardwareVersion: n.hardwareVersion.value,
    index: n.index.value,
    state: n.state.value,
    windowCoords: n.windowCoords.value
  };
}
async function j(n) {
  let e, t = N.getInstance();
  t.getVerbosity() >= 3 && t.getVerbosity() !== void 0 && console.group("Endpoint:", n.endpoint), await new Promise((r) => setTimeout(r, 10)), n.baseUrl == null && (n.baseUrl = "http://localhost:33334/"), t.getVerbosity() == 3 && (console.group("Message:"), t.log(`${n.baseUrl + n.endpoint}`), t.log("body:", n.requestBody), console.groupEnd());
  const s = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(n.requestBody)
  };
  try {
    t.time(n.endpoint);
    let r = await fetch(`${n.baseUrl + n.endpoint}`, s);
    return r.ok ? (r.status == 408 && (t.warn("%c Bridge Timeout:", "color: #ff0000", r), console.groupEnd()), e = await r.json(), e.status.value !== "Completion" && e.status.value !== "Pending" ? (t.warn("%c Bridge Failure:", "color: #ff0000", e), console.groupEnd(), { success: !0, response: e }) : (t.log("%c Response:", "color: #00aa00", e), t.timeEnd(n.endpoint), console.groupEnd(), { success: !0, response: e })) : { success: !1, response: null };
  } catch (r) {
    return console.group("%c Bridge Error:", "color: #ff0000"), console.error("Bridge Error", r), console.groupEnd(), console.groupEnd(), { success: !1, response: null };
  }
}
async function ot({ name: n, orchestration: e }) {
  if (N.getInstance().log("%c function call: tryEnterOrchestration ", "color: magenta; font-weight: bold; border: solid"), (n == null || n == "") && (n = "default"), e !== "" && e !== void 0)
    return { success: !1, response: null };
  let r = await j({
    endpoint: "enter_orchestration",
    requestBody: {
      name: n
    }
  });
  return r.success == !1 ? (console.error("failed to enter orchestration", r), { success: !1, response: null }) : (console.groupEnd(), { success: !0, response: r.response });
}
async function lt(n) {
  let e = {
    orchestration: n
  }, t = new Promise((r) => {
    let i = setTimeout(() => {
      clearTimeout(i), r({ success: !1, response: null });
    }, 5e3);
  }), s = await Promise.race([
    j({
      endpoint: "exit_orchestration",
      requestBody: e
    }),
    t
  ]);
  return !s || s.success == !1 ? { success: !1, response: null } : { success: !0, response: s.response };
}
function ct() {
  return window !== void 0 ? !0 : (console.error("Window is unavailable!"), !1);
}
function ut() {
  return "WebSocket" in window ? !0 : (console.error("WebSocket NOT supported by your Browser!"), !1);
}
class dt {
  constructor() {
    w(this, "eventSource");
    w(this, "MessageHandler");
    w(this, "ws");
    this.eventSource = void 0, this.MessageHandler = {}, this.ws = void 0;
  }
  /**
   * adds a new message handler object to the BridgeEventSource class
   * @param event the event name to listen for
   * @param MessageHandler the function to call when the event is received
   */
  addMessageHandler({ event: e, MessageHandler: t }) {
    var r;
    const s = N.getInstance();
    e in this.MessageHandler || (this.MessageHandler[e] = []), (r = this.MessageHandler[e]) == null || r.push(t), s.log(`%c Add Message Handler: ${e} `, "color: YellowGreen; font-weight: bold; border: solid;");
  }
  removeMessageHandler({ event: e, MessageHandler: t }) {
    var r, i;
    if (N.getInstance().log(`%c Message Handler Removed: ${e} `, "color: Tomato; font-weight: bold; border: solid;"), e in this.MessageHandler) {
      const o = (r = this.MessageHandler[e]) == null ? void 0 : r.findIndex((l) => l === t);
      o !== -1 && o !== void 0 && ((i = this.MessageHandler[e]) == null || i.splice(o, 1));
    }
  }
  callMessageHandler(e) {
    let t;
    if ("All Events" in this.MessageHandler) {
      const s = JSON.parse(e), r = this.MessageHandler["All Events"];
      r && r.forEach((i) => i(s));
    }
    try {
      t = JSON.parse(e);
    } catch (s) {
      N.getInstance().error("Failed to parse JSON", s);
      return;
    }
    if (t.payload.value.event.value in this.MessageHandler) {
      const s = this.MessageHandler[t.payload.value.event.value];
      s && s.forEach((r) => r(t));
    }
  }
  // custom internal event handlers for connect and disconnect, we get those internally not from bridge
  connectEvent() {
    const e = this.MessageHandler["Bridge Connected"];
    e && e.forEach((t) => t(void 0));
  }
  disconnectEvent() {
    const e = this.MessageHandler["Bridge Disconnected"];
    e && e.forEach((t) => t(void 0)), this.MessageHandler = {};
  }
  async connectToBridgeEventSource(e) {
    const t = N.getInstance();
    if (t.log("%c Connect to Bridge Events Source ", "color: chartreuse; font-weight: bold; border: solid"), !ct())
      return { success: !1 };
    if (!ut())
      return { success: !1 };
    let s = this;
    return this.ws = new WebSocket("ws://localhost:9724/event_source"), new Promise((r) => {
      this.ws !== void 0 && (this.ws.onopen = () => {
        var l;
        N.getInstance().log("%c Connected to Websocket ", "color: chartreuse; font-weight: bold; border: solid");
        const o = {
          subscribe_orchestration_events: e
        };
        (l = this.ws) == null || l.send(JSON.stringify(o)), r({ success: !0 });
      }, this.ws.onmessage = function(i) {
        s.callMessageHandler(i.data);
      }, this.ws.onclose = function() {
        const i = N.getInstance();
        i.manualDisconnect || i.disconnect(), i.log(`%c Disconnected from Websocket, Manual Disconnect: ${i.manualDisconnect} `, "color: red; font-weight: bold; border: solid");
      }, this.ws.onerror = function(i) {
        t.warn("Unable to connect to WebSocket, is Bridge Running?", i), r({ success: !1 });
      });
    });
  }
}
class He {
  constructor(e) {
    w(this, "orchestration");
    w(this, "hologram");
    w(this, "id");
    w(this, "index");
    w(this, "playlistName");
    w(this, "tag");
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
        zoom: t.zoom ? t.zoom : 1,
        crop_pos_x: t.crop_pos_x ? t.crop_pos_x : 0,
        crop_pos_y: t.crop_pos_y ? t.crop_pos_y : 0,
        aspect: t.aspect,
        view_count: t.viewCount,
        isRGBD: 0,
        tag: t.tag ? t.tag : ""
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
        crop_pos_x: t.crop_pos_x ? t.crop_pos_x : 0,
        crop_pos_y: t.crop_pos_y ? t.crop_pos_y : 0,
        depth_inversion: t.depth_inversion,
        chroma_depth: t.chroma_depth,
        depthiness: t.depthiness,
        zoom: t.zoom,
        tag: t.tag ? t.tag : ""
      }, e;
    }
    throw new Error("Invalid hologram type");
  }
}
class Be extends He {
  constructor(e) {
    super(e);
  }
}
class De extends He {
  constructor(e) {
    super(e);
  }
}
class Le {
  constructor(e) {
    w(this, "name");
    w(this, "loop");
    w(this, "items");
    w(this, "orchestration");
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
        return new De({
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
    }), this.items.push(t), t) : e.type == "rgbd" ? (t = new De({
      hologram: e,
      id: this.items.length,
      index: this.items.length,
      playlistName: this.name,
      orchestration: this.orchestration
    }), this.items.push(t), t) : void 0;
  }
  async addPlaylistItemToBridge(e) {
    const t = e.toBridge();
    return (await j({ endpoint: "insert_playlist_entry", requestBody: t })).success == !1 ? (console.error("failed to insert playlist entry"), !1) : !0;
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
    let r = await j({ endpoint: "instance_playlist", requestBody: s });
    if (r.success == !1)
      return console.error("failed to initialize playlist"), !1;
    const i = this.items;
    if (r.success == !0 && t !== void 0)
      for (let d = 0; d < i.length; d++) {
        i[d].orchestration = this.orchestration;
        const h = i[d].toBridge();
        if ((await j({ endpoint: "insert_playlist_entry", requestBody: h })).success == !1)
          return console.error("failed to insert playlist entry"), !1;
      }
    const o = this.getCurrent({ orchestration: t, head: e });
    return (await j({
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
    const i = {};
    for (const o of r)
      i[o] = o;
    return i;
  }, n.getValidEnumValues = (r) => {
    const i = n.objectKeys(r).filter((l) => typeof r[r[l]] != "number"), o = {};
    for (const l of i)
      o[l] = r[l];
    return n.objectValues(o);
  }, n.objectValues = (r) => n.objectKeys(r).map(function(i) {
    return r[i];
  }), n.objectKeys = typeof Object.keys == "function" ? (r) => Object.keys(r) : (r) => {
    const i = [];
    for (const o in r)
      Object.prototype.hasOwnProperty.call(r, o) && i.push(o);
    return i;
  }, n.find = (r, i) => {
    for (const o of r)
      if (i(o))
        return o;
  }, n.isInteger = typeof Number.isInteger == "function" ? (r) => Number.isInteger(r) : (r) => typeof r == "number" && isFinite(r) && Math.floor(r) === r;
  function s(r, i = " | ") {
    return r.map((o) => typeof o == "string" ? `'${o}'` : o).join(i);
  }
  n.joinValues = s, n.jsonStringifyReplacer = (r, i) => typeof i == "bigint" ? i.toString() : i;
})(k || (k = {}));
var Ne;
(function(n) {
  n.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(Ne || (Ne = {}));
const p = k.arrayToEnum([
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
      return p.undefined;
    case "string":
      return p.string;
    case "number":
      return isNaN(n) ? p.nan : p.number;
    case "boolean":
      return p.boolean;
    case "function":
      return p.function;
    case "bigint":
      return p.bigint;
    case "symbol":
      return p.symbol;
    case "object":
      return Array.isArray(n) ? p.array : n === null ? p.null : n.then && typeof n.then == "function" && n.catch && typeof n.catch == "function" ? p.promise : typeof Map < "u" && n instanceof Map ? p.map : typeof Set < "u" && n instanceof Set ? p.set : typeof Date < "u" && n instanceof Date ? p.date : p.object;
    default:
      return p.unknown;
  }
}, u = k.arrayToEnum([
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
]), ht = (n) => JSON.stringify(n, null, 2).replace(/"([^"]+)":/g, "$1:");
class R extends Error {
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
    const t = e || function(i) {
      return i.message;
    }, s = { _errors: [] }, r = (i) => {
      for (const o of i.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(r);
        else if (o.code === "invalid_return_type")
          r(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          r(o.argumentsError);
        else if (o.path.length === 0)
          s._errors.push(t(o));
        else {
          let l = s, d = 0;
          for (; d < o.path.length; ) {
            const h = o.path[d];
            d === o.path.length - 1 ? (l[h] = l[h] || { _errors: [] }, l[h]._errors.push(t(o))) : l[h] = l[h] || { _errors: [] }, l = l[h], d++;
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
R.create = (n) => new R(n);
const oe = (n, e) => {
  let t;
  switch (n.code) {
    case u.invalid_type:
      n.received === p.undefined ? t = "Required" : t = `Expected ${n.expected}, received ${n.received}`;
      break;
    case u.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(n.expected, k.jsonStringifyReplacer)}`;
      break;
    case u.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${k.joinValues(n.keys, ", ")}`;
      break;
    case u.invalid_union:
      t = "Invalid input";
      break;
    case u.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${k.joinValues(n.options)}`;
      break;
    case u.invalid_enum_value:
      t = `Invalid enum value. Expected ${k.joinValues(n.options)}, received '${n.received}'`;
      break;
    case u.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case u.invalid_return_type:
      t = "Invalid function return type";
      break;
    case u.invalid_date:
      t = "Invalid date";
      break;
    case u.invalid_string:
      typeof n.validation == "object" ? "includes" in n.validation ? (t = `Invalid input: must include "${n.validation.includes}"`, typeof n.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${n.validation.position}`)) : "startsWith" in n.validation ? t = `Invalid input: must start with "${n.validation.startsWith}"` : "endsWith" in n.validation ? t = `Invalid input: must end with "${n.validation.endsWith}"` : k.assertNever(n.validation) : n.validation !== "regex" ? t = `Invalid ${n.validation}` : t = "Invalid";
      break;
    case u.too_small:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "more than"} ${n.minimum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "over"} ${n.minimum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${n.minimum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(n.minimum))}` : t = "Invalid input";
      break;
    case u.too_big:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "less than"} ${n.maximum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "under"} ${n.maximum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "bigint" ? t = `BigInt must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly" : n.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(n.maximum))}` : t = "Invalid input";
      break;
    case u.custom:
      t = "Invalid input";
      break;
    case u.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case u.not_multiple_of:
      t = `Number must be a multiple of ${n.multipleOf}`;
      break;
    case u.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, k.assertNever(n);
  }
  return { message: t };
};
let ze = oe;
function pt(n) {
  ze = n;
}
function be() {
  return ze;
}
const xe = (n) => {
  const { data: e, path: t, errorMaps: s, issueData: r } = n, i = [...t, ...r.path || []], o = {
    ...r,
    path: i
  };
  let l = "";
  const d = s.filter((h) => !!h).slice().reverse();
  for (const h of d)
    l = h(o, { data: e, defaultError: l }).message;
  return {
    ...r,
    path: i,
    message: r.message || l
  };
}, ft = [];
function f(n, e) {
  const t = xe({
    issueData: e,
    data: n.data,
    path: n.path,
    errorMaps: [
      n.common.contextualErrorMap,
      n.schemaErrorMap,
      be(),
      oe
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
        return v;
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
      const { key: i, value: o } = r;
      if (i.status === "aborted" || o.status === "aborted")
        return v;
      i.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), (typeof o.value < "u" || r.alwaysSet) && (s[i.value] = o.value);
    }
    return { status: e.value, value: s };
  }
}
const v = Object.freeze({
  status: "aborted"
}), We = (n) => ({ status: "dirty", value: n }), S = (n) => ({ status: "valid", value: n }), Oe = (n) => n.status === "aborted", Ze = (n) => n.status === "dirty", we = (n) => n.status === "valid", ke = (n) => typeof Promise < "u" && n instanceof Promise;
var y;
(function(n) {
  n.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, n.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(y || (y = {}));
class D {
  constructor(e, t, s, r) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = s, this._key = r;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const $e = (n, e) => {
  if (we(e))
    return { success: !0, data: e.value };
  if (!n.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new R(n.common.issues);
      return this._error = t, this._error;
    }
  };
};
function _(n) {
  if (!n)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: s, description: r } = n;
  if (e && (t || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: r } : { errorMap: (o, l) => o.code !== "invalid_type" ? { message: l.defaultError } : typeof l.data > "u" ? { message: s ?? l.defaultError } : { message: t ?? l.defaultError }, description: r };
}
class x {
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
      status: new E(),
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
    if (ke(t))
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
    }, i = this._parseSync({ data: e, path: r.path, parent: r });
    return $e(r, i);
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
    }, r = this._parse({ data: e, path: s.path, parent: s }), i = await (ke(r) ? r : Promise.resolve(r));
    return $e(s, i);
  }
  refine(e, t) {
    const s = (r) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(r) : t;
    return this._refinement((r, i) => {
      const o = e(r), l = () => i.addIssue({
        code: u.custom,
        ...s(r)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((d) => d ? !0 : (l(), !1)) : o ? !0 : (l(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((s, r) => e(s) ? !0 : (r.addIssue(typeof t == "function" ? t(s, r) : t), !1));
  }
  _refinement(e) {
    return new A({
      schema: this,
      typeName: g.ZodEffects,
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
    return F.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return V.create(this, this._def);
  }
  promise() {
    return ae.create(this, this._def);
  }
  or(e) {
    return de.create([this, e], this._def);
  }
  and(e) {
    return he.create(this, e, this._def);
  }
  transform(e) {
    return new A({
      ..._(this._def),
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new ge({
      ..._(this._def),
      innerType: this,
      defaultValue: t,
      typeName: g.ZodDefault
    });
  }
  brand() {
    return new Ye({
      typeName: g.ZodBranded,
      type: this,
      ..._(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Ce({
      ..._(this._def),
      innerType: this,
      catchValue: t,
      typeName: g.ZodCatch
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
    return ve.create(this, e);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const mt = /^c[^\s-]{8,}$/i, yt = /^[a-z][a-z0-9]*$/, gt = /[0-9A-HJKMNP-TV-Z]{26}/, vt = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, _t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/, bt = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u, xt = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, wt = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, kt = (n) => n.precision ? n.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${n.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${n.precision}}Z$`) : n.precision === 0 ? n.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : n.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function Tt(n, e) {
  return !!((e === "v4" || !e) && xt.test(n) || (e === "v6" || !e) && wt.test(n));
}
class M extends x {
  constructor() {
    super(...arguments), this._regex = (e, t, s) => this.refinement((r) => e.test(r), {
      validation: t,
      code: u.invalid_string,
      ...y.errToObj(s)
    }), this.nonempty = (e) => this.min(1, y.errToObj(e)), this.trim = () => new M({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    }), this.toLowerCase = () => new M({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    }), this.toUpperCase = () => new M({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== p.string) {
      const i = this._getOrReturnCtx(e);
      return f(
        i,
        {
          code: u.invalid_type,
          expected: p.string,
          received: i.parsedType
        }
        //
      ), v;
    }
    const s = new E();
    let r;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value && (r = this._getOrReturnCtx(e, r), f(r, {
          code: u.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), s.dirty());
      else if (i.kind === "max")
        e.data.length > i.value && (r = this._getOrReturnCtx(e, r), f(r, {
          code: u.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), s.dirty());
      else if (i.kind === "length") {
        const o = e.data.length > i.value, l = e.data.length < i.value;
        (o || l) && (r = this._getOrReturnCtx(e, r), o ? f(r, {
          code: u.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : l && f(r, {
          code: u.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), s.dirty());
      } else if (i.kind === "email")
        _t.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "email",
          code: u.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "emoji")
        bt.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "emoji",
          code: u.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "uuid")
        vt.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "uuid",
          code: u.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "cuid")
        mt.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "cuid",
          code: u.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "cuid2")
        yt.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "cuid2",
          code: u.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "ulid")
        gt.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "ulid",
          code: u.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch {
          r = this._getOrReturnCtx(e, r), f(r, {
            validation: "url",
            code: u.invalid_string,
            message: i.message
          }), s.dirty();
        }
      else
        i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "regex",
          code: u.invalid_string,
          message: i.message
        }), s.dirty())) : i.kind === "trim" ? e.data = e.data.trim() : i.kind === "includes" ? e.data.includes(i.value, i.position) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: u.invalid_string,
          validation: { includes: i.value, position: i.position },
          message: i.message
        }), s.dirty()) : i.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : i.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : i.kind === "startsWith" ? e.data.startsWith(i.value) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: u.invalid_string,
          validation: { startsWith: i.value },
          message: i.message
        }), s.dirty()) : i.kind === "endsWith" ? e.data.endsWith(i.value) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: u.invalid_string,
          validation: { endsWith: i.value },
          message: i.message
        }), s.dirty()) : i.kind === "datetime" ? kt(i).test(e.data) || (r = this._getOrReturnCtx(e, r), f(r, {
          code: u.invalid_string,
          validation: "datetime",
          message: i.message
        }), s.dirty()) : i.kind === "ip" ? Tt(e.data, i.version) || (r = this._getOrReturnCtx(e, r), f(r, {
          validation: "ip",
          code: u.invalid_string,
          message: i.message
        }), s.dirty()) : k.assertNever(i);
    return { status: s.value, value: e.data };
  }
  _addCheck(e) {
    return new M({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...y.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...y.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...y.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...y.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...y.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...y.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...y.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...y.errToObj(e) });
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
      ...y.errToObj(e == null ? void 0 : e.message)
    });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...y.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...y.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...y.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...y.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...y.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...y.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...y.errToObj(t)
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
M.create = (n) => {
  var e;
  return new M({
    checks: [],
    typeName: g.ZodString,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ..._(n)
  });
};
function jt(n, e) {
  const t = (n.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, r = t > s ? t : s, i = parseInt(n.toFixed(r).replace(".", "")), o = parseInt(e.toFixed(r).replace(".", ""));
  return i % o / Math.pow(10, r);
}
class z extends x {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== p.number) {
      const i = this._getOrReturnCtx(e);
      return f(i, {
        code: u.invalid_type,
        expected: p.number,
        received: i.parsedType
      }), v;
    }
    let s;
    const r = new E();
    for (const i of this._def.checks)
      i.kind === "int" ? k.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), f(s, {
        code: u.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), r.dirty()) : i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: u.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), r.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: u.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), r.dirty()) : i.kind === "multipleOf" ? jt(e.data, i.value) !== 0 && (s = this._getOrReturnCtx(e, s), f(s, {
        code: u.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), r.dirty()) : i.kind === "finite" ? Number.isFinite(e.data) || (s = this._getOrReturnCtx(e, s), f(s, {
        code: u.not_finite,
        message: i.message
      }), r.dirty()) : k.assertNever(i);
    return { status: r.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, y.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, y.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, y.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, y.toString(t));
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
          message: y.toString(r)
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
      message: y.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: y.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: y.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: y.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: y.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: y.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: y.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: y.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: y.toString(e)
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
  typeName: g.ZodNumber,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ..._(n)
});
class W extends x {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== p.bigint) {
      const i = this._getOrReturnCtx(e);
      return f(i, {
        code: u.invalid_type,
        expected: p.bigint,
        received: i.parsedType
      }), v;
    }
    let s;
    const r = new E();
    for (const i of this._def.checks)
      i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: u.too_small,
        type: "bigint",
        minimum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), r.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: u.too_big,
        type: "bigint",
        maximum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), r.dirty()) : i.kind === "multipleOf" ? e.data % i.value !== BigInt(0) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: u.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), r.dirty()) : k.assertNever(i);
    return { status: r.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, y.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, y.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, y.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, y.toString(t));
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
          message: y.toString(r)
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
      message: y.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: y.toString(t)
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
    typeName: g.ZodBigInt,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ..._(n)
  });
};
class le extends x {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== p.boolean) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: u.invalid_type,
        expected: p.boolean,
        received: s.parsedType
      }), v;
    }
    return S(e.data);
  }
}
le.create = (n) => new le({
  typeName: g.ZodBoolean,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ..._(n)
});
class X extends x {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== p.date) {
      const i = this._getOrReturnCtx(e);
      return f(i, {
        code: u.invalid_type,
        expected: p.date,
        received: i.parsedType
      }), v;
    }
    if (isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return f(i, {
        code: u.invalid_date
      }), v;
    }
    const s = new E();
    let r;
    for (const i of this._def.checks)
      i.kind === "min" ? e.data.getTime() < i.value && (r = this._getOrReturnCtx(e, r), f(r, {
        code: u.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), s.dirty()) : i.kind === "max" ? e.data.getTime() > i.value && (r = this._getOrReturnCtx(e, r), f(r, {
        code: u.too_big,
        message: i.message,
        inclusive: !0,
        exact: !1,
        maximum: i.value,
        type: "date"
      }), s.dirty()) : k.assertNever(i);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new X({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: y.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: y.toString(t)
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
X.create = (n) => new X({
  checks: [],
  coerce: (n == null ? void 0 : n.coerce) || !1,
  typeName: g.ZodDate,
  ..._(n)
});
class Te extends x {
  _parse(e) {
    if (this._getType(e) !== p.symbol) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: u.invalid_type,
        expected: p.symbol,
        received: s.parsedType
      }), v;
    }
    return S(e.data);
  }
}
Te.create = (n) => new Te({
  typeName: g.ZodSymbol,
  ..._(n)
});
class ce extends x {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: u.invalid_type,
        expected: p.undefined,
        received: s.parsedType
      }), v;
    }
    return S(e.data);
  }
}
ce.create = (n) => new ce({
  typeName: g.ZodUndefined,
  ..._(n)
});
class ue extends x {
  _parse(e) {
    if (this._getType(e) !== p.null) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: u.invalid_type,
        expected: p.null,
        received: s.parsedType
      }), v;
    }
    return S(e.data);
  }
}
ue.create = (n) => new ue({
  typeName: g.ZodNull,
  ..._(n)
});
class re extends x {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return S(e.data);
  }
}
re.create = (n) => new re({
  typeName: g.ZodAny,
  ..._(n)
});
class Q extends x {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return S(e.data);
  }
}
Q.create = (n) => new Q({
  typeName: g.ZodUnknown,
  ..._(n)
});
class U extends x {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return f(t, {
      code: u.invalid_type,
      expected: p.never,
      received: t.parsedType
    }), v;
  }
}
U.create = (n) => new U({
  typeName: g.ZodNever,
  ..._(n)
});
class je extends x {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: u.invalid_type,
        expected: p.void,
        received: s.parsedType
      }), v;
    }
    return S(e.data);
  }
}
je.create = (n) => new je({
  typeName: g.ZodVoid,
  ..._(n)
});
class V extends x {
  _parse(e) {
    const { ctx: t, status: s } = this._processInputParams(e), r = this._def;
    if (t.parsedType !== p.array)
      return f(t, {
        code: u.invalid_type,
        expected: p.array,
        received: t.parsedType
      }), v;
    if (r.exactLength !== null) {
      const o = t.data.length > r.exactLength.value, l = t.data.length < r.exactLength.value;
      (o || l) && (f(t, {
        code: o ? u.too_big : u.too_small,
        minimum: l ? r.exactLength.value : void 0,
        maximum: o ? r.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: r.exactLength.message
      }), s.dirty());
    }
    if (r.minLength !== null && t.data.length < r.minLength.value && (f(t, {
      code: u.too_small,
      minimum: r.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.minLength.message
    }), s.dirty()), r.maxLength !== null && t.data.length > r.maxLength.value && (f(t, {
      code: u.too_big,
      maximum: r.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.maxLength.message
    }), s.dirty()), t.common.async)
      return Promise.all([...t.data].map((o, l) => r.type._parseAsync(new D(t, o, t.path, l)))).then((o) => E.mergeArray(s, o));
    const i = [...t.data].map((o, l) => r.type._parseSync(new D(t, o, t.path, l)));
    return E.mergeArray(s, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new V({
      ...this._def,
      minLength: { value: e, message: y.toString(t) }
    });
  }
  max(e, t) {
    return new V({
      ...this._def,
      maxLength: { value: e, message: y.toString(t) }
    });
  }
  length(e, t) {
    return new V({
      ...this._def,
      exactLength: { value: e, message: y.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
V.create = (n, e) => new V({
  type: n,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: g.ZodArray,
  ..._(e)
});
function te(n) {
  if (n instanceof P) {
    const e = {};
    for (const t in n.shape) {
      const s = n.shape[t];
      e[t] = $.create(te(s));
    }
    return new P({
      ...n._def,
      shape: () => e
    });
  } else
    return n instanceof V ? new V({
      ...n._def,
      type: te(n.element)
    }) : n instanceof $ ? $.create(te(n.unwrap())) : n instanceof F ? F.create(te(n.unwrap())) : n instanceof L ? L.create(n.items.map((e) => te(e))) : n;
}
class P extends x {
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
    if (this._getType(e) !== p.object) {
      const h = this._getOrReturnCtx(e);
      return f(h, {
        code: u.invalid_type,
        expected: p.object,
        received: h.parsedType
      }), v;
    }
    const { status: s, ctx: r } = this._processInputParams(e), { shape: i, keys: o } = this._getCached(), l = [];
    if (!(this._def.catchall instanceof U && this._def.unknownKeys === "strip"))
      for (const h in r.data)
        o.includes(h) || l.push(h);
    const d = [];
    for (const h of o) {
      const b = i[h], ee = r.data[h];
      d.push({
        key: { status: "valid", value: h },
        value: b._parse(new D(r, ee, r.path, h)),
        alwaysSet: h in r.data
      });
    }
    if (this._def.catchall instanceof U) {
      const h = this._def.unknownKeys;
      if (h === "passthrough")
        for (const b of l)
          d.push({
            key: { status: "valid", value: b },
            value: { status: "valid", value: r.data[b] }
          });
      else if (h === "strict")
        l.length > 0 && (f(r, {
          code: u.unrecognized_keys,
          keys: l
        }), s.dirty());
      else if (h !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const h = this._def.catchall;
      for (const b of l) {
        const ee = r.data[b];
        d.push({
          key: { status: "valid", value: b },
          value: h._parse(
            new D(r, ee, r.path, b)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: b in r.data
        });
      }
    }
    return r.common.async ? Promise.resolve().then(async () => {
      const h = [];
      for (const b of d) {
        const ee = await b.key;
        h.push({
          key: ee,
          value: await b.value,
          alwaysSet: b.alwaysSet
        });
      }
      return h;
    }).then((h) => E.mergeObjectSync(s, h)) : E.mergeObjectSync(s, d);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return y.errToObj, new P({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, s) => {
          var r, i, o, l;
          const d = (o = (i = (r = this._def).errorMap) === null || i === void 0 ? void 0 : i.call(r, t, s).message) !== null && o !== void 0 ? o : s.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (l = y.errToObj(e).message) !== null && l !== void 0 ? l : d
          } : {
            message: d
          };
        }
      } : {}
    });
  }
  strip() {
    return new P({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new P({
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
    return new P({
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
    return new P({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: g.ZodObject
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
    return new P({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return k.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (t[s] = this.shape[s]);
    }), new P({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return k.objectKeys(this.shape).forEach((s) => {
      e[s] || (t[s] = this.shape[s]);
    }), new P({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return te(this);
  }
  partial(e) {
    const t = {};
    return k.objectKeys(this.shape).forEach((s) => {
      const r = this.shape[s];
      e && !e[s] ? t[s] = r : t[s] = r.optional();
    }), new P({
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
        let i = this.shape[s];
        for (; i instanceof $; )
          i = i._def.innerType;
        t[s] = i;
      }
    }), new P({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return Ge(k.objectKeys(this.shape));
  }
}
P.create = (n, e) => new P({
  shape: () => n,
  unknownKeys: "strip",
  catchall: U.create(),
  typeName: g.ZodObject,
  ..._(e)
});
P.strictCreate = (n, e) => new P({
  shape: () => n,
  unknownKeys: "strict",
  catchall: U.create(),
  typeName: g.ZodObject,
  ..._(e)
});
P.lazycreate = (n, e) => new P({
  shape: n,
  unknownKeys: "strip",
  catchall: U.create(),
  typeName: g.ZodObject,
  ..._(e)
});
class de extends x {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = this._def.options;
    function r(i) {
      for (const l of i)
        if (l.result.status === "valid")
          return l.result;
      for (const l of i)
        if (l.result.status === "dirty")
          return t.common.issues.push(...l.ctx.common.issues), l.result;
      const o = i.map((l) => new R(l.ctx.common.issues));
      return f(t, {
        code: u.invalid_union,
        unionErrors: o
      }), v;
    }
    if (t.common.async)
      return Promise.all(s.map(async (i) => {
        const o = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await i._parseAsync({
            data: t.data,
            path: t.path,
            parent: o
          }),
          ctx: o
        };
      })).then(r);
    {
      let i;
      const o = [];
      for (const d of s) {
        const h = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, b = d._parseSync({
          data: t.data,
          path: t.path,
          parent: h
        });
        if (b.status === "valid")
          return b;
        b.status === "dirty" && !i && (i = { result: b, ctx: h }), h.common.issues.length && o.push(h.common.issues);
      }
      if (i)
        return t.common.issues.push(...i.ctx.common.issues), i.result;
      const l = o.map((d) => new R(d));
      return f(t, {
        code: u.invalid_union,
        unionErrors: l
      }), v;
    }
  }
  get options() {
    return this._def.options;
  }
}
de.create = (n, e) => new de({
  options: n,
  typeName: g.ZodUnion,
  ..._(e)
});
const _e = (n) => n instanceof fe ? _e(n.schema) : n instanceof A ? _e(n.innerType()) : n instanceof me ? [n.value] : n instanceof G ? n.options : n instanceof ye ? Object.keys(n.enum) : n instanceof ge ? _e(n._def.innerType) : n instanceof ce ? [void 0] : n instanceof ue ? [null] : null;
class Ee extends x {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.object)
      return f(t, {
        code: u.invalid_type,
        expected: p.object,
        received: t.parsedType
      }), v;
    const s = this.discriminator, r = t.data[s], i = this.optionsMap.get(r);
    return i ? t.common.async ? i._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : i._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (f(t, {
      code: u.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [s]
    }), v);
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
    for (const i of t) {
      const o = _e(i.shape[e]);
      if (!o)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const l of o) {
        if (r.has(l))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(l)}`);
        r.set(l, i);
      }
    }
    return new Ee({
      typeName: g.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: r,
      ..._(s)
    });
  }
}
function Me(n, e) {
  const t = H(n), s = H(e);
  if (n === e)
    return { valid: !0, data: n };
  if (t === p.object && s === p.object) {
    const r = k.objectKeys(e), i = k.objectKeys(n).filter((l) => r.indexOf(l) !== -1), o = { ...n, ...e };
    for (const l of i) {
      const d = Me(n[l], e[l]);
      if (!d.valid)
        return { valid: !1 };
      o[l] = d.data;
    }
    return { valid: !0, data: o };
  } else if (t === p.array && s === p.array) {
    if (n.length !== e.length)
      return { valid: !1 };
    const r = [];
    for (let i = 0; i < n.length; i++) {
      const o = n[i], l = e[i], d = Me(o, l);
      if (!d.valid)
        return { valid: !1 };
      r.push(d.data);
    }
    return { valid: !0, data: r };
  } else
    return t === p.date && s === p.date && +n == +e ? { valid: !0, data: n } : { valid: !1 };
}
class he extends x {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), r = (i, o) => {
      if (Oe(i) || Oe(o))
        return v;
      const l = Me(i.value, o.value);
      return l.valid ? ((Ze(i) || Ze(o)) && t.dirty(), { status: t.value, value: l.data }) : (f(s, {
        code: u.invalid_intersection_types
      }), v);
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
    ]).then(([i, o]) => r(i, o)) : r(this._def.left._parseSync({
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
he.create = (n, e, t) => new he({
  left: n,
  right: e,
  typeName: g.ZodIntersection,
  ..._(t)
});
class L extends x {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== p.array)
      return f(s, {
        code: u.invalid_type,
        expected: p.array,
        received: s.parsedType
      }), v;
    if (s.data.length < this._def.items.length)
      return f(s, {
        code: u.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), v;
    !this._def.rest && s.data.length > this._def.items.length && (f(s, {
      code: u.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const i = [...s.data].map((o, l) => {
      const d = this._def.items[l] || this._def.rest;
      return d ? d._parse(new D(s, o, s.path, l)) : null;
    }).filter((o) => !!o);
    return s.common.async ? Promise.all(i).then((o) => E.mergeArray(t, o)) : E.mergeArray(t, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new L({
      ...this._def,
      rest: e
    });
  }
}
L.create = (n, e) => {
  if (!Array.isArray(n))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new L({
    items: n,
    typeName: g.ZodTuple,
    rest: null,
    ..._(e)
  });
};
class pe extends x {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== p.object)
      return f(s, {
        code: u.invalid_type,
        expected: p.object,
        received: s.parsedType
      }), v;
    const r = [], i = this._def.keyType, o = this._def.valueType;
    for (const l in s.data)
      r.push({
        key: i._parse(new D(s, l, s.path, l)),
        value: o._parse(new D(s, s.data[l], s.path, l))
      });
    return s.common.async ? E.mergeObjectAsync(t, r) : E.mergeObjectSync(t, r);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, s) {
    return t instanceof x ? new pe({
      keyType: e,
      valueType: t,
      typeName: g.ZodRecord,
      ..._(s)
    }) : new pe({
      keyType: M.create(),
      valueType: e,
      typeName: g.ZodRecord,
      ..._(t)
    });
  }
}
class Pe extends x {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== p.map)
      return f(s, {
        code: u.invalid_type,
        expected: p.map,
        received: s.parsedType
      }), v;
    const r = this._def.keyType, i = this._def.valueType, o = [...s.data.entries()].map(([l, d], h) => ({
      key: r._parse(new D(s, l, s.path, [h, "key"])),
      value: i._parse(new D(s, d, s.path, [h, "value"]))
    }));
    if (s.common.async) {
      const l = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const d of o) {
          const h = await d.key, b = await d.value;
          if (h.status === "aborted" || b.status === "aborted")
            return v;
          (h.status === "dirty" || b.status === "dirty") && t.dirty(), l.set(h.value, b.value);
        }
        return { status: t.value, value: l };
      });
    } else {
      const l = /* @__PURE__ */ new Map();
      for (const d of o) {
        const h = d.key, b = d.value;
        if (h.status === "aborted" || b.status === "aborted")
          return v;
        (h.status === "dirty" || b.status === "dirty") && t.dirty(), l.set(h.value, b.value);
      }
      return { status: t.value, value: l };
    }
  }
}
Pe.create = (n, e, t) => new Pe({
  valueType: e,
  keyType: n,
  typeName: g.ZodMap,
  ..._(t)
});
class K extends x {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== p.set)
      return f(s, {
        code: u.invalid_type,
        expected: p.set,
        received: s.parsedType
      }), v;
    const r = this._def;
    r.minSize !== null && s.data.size < r.minSize.value && (f(s, {
      code: u.too_small,
      minimum: r.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.minSize.message
    }), t.dirty()), r.maxSize !== null && s.data.size > r.maxSize.value && (f(s, {
      code: u.too_big,
      maximum: r.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.maxSize.message
    }), t.dirty());
    const i = this._def.valueType;
    function o(d) {
      const h = /* @__PURE__ */ new Set();
      for (const b of d) {
        if (b.status === "aborted")
          return v;
        b.status === "dirty" && t.dirty(), h.add(b.value);
      }
      return { status: t.value, value: h };
    }
    const l = [...s.data.values()].map((d, h) => i._parse(new D(s, d, s.path, h)));
    return s.common.async ? Promise.all(l).then((d) => o(d)) : o(l);
  }
  min(e, t) {
    return new K({
      ...this._def,
      minSize: { value: e, message: y.toString(t) }
    });
  }
  max(e, t) {
    return new K({
      ...this._def,
      maxSize: { value: e, message: y.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
K.create = (n, e) => new K({
  valueType: n,
  minSize: null,
  maxSize: null,
  typeName: g.ZodSet,
  ..._(e)
});
class se extends x {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.function)
      return f(t, {
        code: u.invalid_type,
        expected: p.function,
        received: t.parsedType
      }), v;
    function s(l, d) {
      return xe({
        data: l,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          be(),
          oe
        ].filter((h) => !!h),
        issueData: {
          code: u.invalid_arguments,
          argumentsError: d
        }
      });
    }
    function r(l, d) {
      return xe({
        data: l,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          be(),
          oe
        ].filter((h) => !!h),
        issueData: {
          code: u.invalid_return_type,
          returnTypeError: d
        }
      });
    }
    const i = { errorMap: t.common.contextualErrorMap }, o = t.data;
    return this._def.returns instanceof ae ? S(async (...l) => {
      const d = new R([]), h = await this._def.args.parseAsync(l, i).catch((Se) => {
        throw d.addIssue(s(l, Se)), d;
      }), b = await o(...h);
      return await this._def.returns._def.type.parseAsync(b, i).catch((Se) => {
        throw d.addIssue(r(b, Se)), d;
      });
    }) : S((...l) => {
      const d = this._def.args.safeParse(l, i);
      if (!d.success)
        throw new R([s(l, d.error)]);
      const h = o(...d.data), b = this._def.returns.safeParse(h, i);
      if (!b.success)
        throw new R([r(h, b.error)]);
      return b.data;
    });
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new se({
      ...this._def,
      args: L.create(e).rest(Q.create())
    });
  }
  returns(e) {
    return new se({
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
    return new se({
      args: e || L.create([]).rest(Q.create()),
      returns: t || Q.create(),
      typeName: g.ZodFunction,
      ..._(s)
    });
  }
}
class fe extends x {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
fe.create = (n, e) => new fe({
  getter: n,
  typeName: g.ZodLazy,
  ..._(e)
});
class me extends x {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return f(t, {
        received: t.data,
        code: u.invalid_literal,
        expected: this._def.value
      }), v;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
me.create = (n, e) => new me({
  value: n,
  typeName: g.ZodLiteral,
  ..._(e)
});
function Ge(n, e) {
  return new G({
    values: n,
    typeName: g.ZodEnum,
    ..._(e)
  });
}
class G extends x {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return f(t, {
        expected: k.joinValues(s),
        received: t.parsedType,
        code: u.invalid_type
      }), v;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return f(t, {
        received: t.data,
        code: u.invalid_enum_value,
        options: s
      }), v;
    }
    return S(e.data);
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
G.create = Ge;
class ye extends x {
  _parse(e) {
    const t = k.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== p.string && s.parsedType !== p.number) {
      const r = k.objectValues(t);
      return f(s, {
        expected: k.joinValues(r),
        received: s.parsedType,
        code: u.invalid_type
      }), v;
    }
    if (t.indexOf(e.data) === -1) {
      const r = k.objectValues(t);
      return f(s, {
        received: s.data,
        code: u.invalid_enum_value,
        options: r
      }), v;
    }
    return S(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
ye.create = (n, e) => new ye({
  values: n,
  typeName: g.ZodNativeEnum,
  ..._(e)
});
class ae extends x {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.promise && t.common.async === !1)
      return f(t, {
        code: u.invalid_type,
        expected: p.promise,
        received: t.parsedType
      }), v;
    const s = t.parsedType === p.promise ? t.data : Promise.resolve(t.data);
    return S(s.then((r) => this._def.type.parseAsync(r, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
ae.create = (n, e) => new ae({
  type: n,
  typeName: g.ZodPromise,
  ..._(e)
});
class A extends x {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === g.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), r = this._def.effect || null;
    if (r.type === "preprocess") {
      const o = r.transform(s.data);
      return s.common.async ? Promise.resolve(o).then((l) => this._def.schema._parseAsync({
        data: l,
        path: s.path,
        parent: s
      })) : this._def.schema._parseSync({
        data: o,
        path: s.path,
        parent: s
      });
    }
    const i = {
      addIssue: (o) => {
        f(s, o), o.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), r.type === "refinement") {
      const o = (l) => {
        const d = r.refinement(l, i);
        if (s.common.async)
          return Promise.resolve(d);
        if (d instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return l;
      };
      if (s.common.async === !1) {
        const l = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return l.status === "aborted" ? v : (l.status === "dirty" && t.dirty(), o(l.value), { status: t.value, value: l.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((l) => l.status === "aborted" ? v : (l.status === "dirty" && t.dirty(), o(l.value).then(() => ({ status: t.value, value: l.value }))));
    }
    if (r.type === "transform")
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!we(o))
          return o;
        const l = r.transform(o.value, i);
        if (l instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: l };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => we(o) ? Promise.resolve(r.transform(o.value, i)).then((l) => ({ status: t.value, value: l })) : o);
    k.assertNever(r);
  }
}
A.create = (n, e, t) => new A({
  schema: n,
  typeName: g.ZodEffects,
  effect: e,
  ..._(t)
});
A.createWithPreprocess = (n, e, t) => new A({
  schema: e,
  effect: { type: "preprocess", transform: n },
  typeName: g.ZodEffects,
  ..._(t)
});
class $ extends x {
  _parse(e) {
    return this._getType(e) === p.undefined ? S(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
$.create = (n, e) => new $({
  innerType: n,
  typeName: g.ZodOptional,
  ..._(e)
});
class F extends x {
  _parse(e) {
    return this._getType(e) === p.null ? S(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
F.create = (n, e) => new F({
  innerType: n,
  typeName: g.ZodNullable,
  ..._(e)
});
class ge extends x {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let s = t.data;
    return t.parsedType === p.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ge.create = (n, e) => new ge({
  innerType: n,
  typeName: g.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ..._(e)
});
class Ce extends x {
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
    return ke(r) ? r.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new R(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: r.status === "valid" ? r.value : this._def.catchValue({
        get error() {
          return new R(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Ce.create = (n, e) => new Ce({
  innerType: n,
  typeName: g.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ..._(e)
});
class Ie extends x {
  _parse(e) {
    if (this._getType(e) !== p.nan) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: u.invalid_type,
        expected: p.nan,
        received: s.parsedType
      }), v;
    }
    return { status: "valid", value: e.data };
  }
}
Ie.create = (n) => new Ie({
  typeName: g.ZodNaN,
  ..._(n)
});
const Pt = Symbol("zod_brand");
class Ye extends x {
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
class ve extends x {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return i.status === "aborted" ? v : i.status === "dirty" ? (t.dirty(), We(i.value)) : this._def.out._parseAsync({
          data: i.value,
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
      return r.status === "aborted" ? v : r.status === "dirty" ? (t.dirty(), {
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
    return new ve({
      in: e,
      out: t,
      typeName: g.ZodPipeline
    });
  }
}
const Je = (n, e = {}, t) => n ? re.create().superRefine((s, r) => {
  var i, o;
  if (!n(s)) {
    const l = typeof e == "function" ? e(s) : typeof e == "string" ? { message: e } : e, d = (o = (i = l.fatal) !== null && i !== void 0 ? i : t) !== null && o !== void 0 ? o : !0, h = typeof l == "string" ? { message: l } : l;
    r.addIssue({ code: "custom", ...h, fatal: d });
  }
}) : re.create(), Ct = {
  object: P.lazycreate
};
var g;
(function(n) {
  n.ZodString = "ZodString", n.ZodNumber = "ZodNumber", n.ZodNaN = "ZodNaN", n.ZodBigInt = "ZodBigInt", n.ZodBoolean = "ZodBoolean", n.ZodDate = "ZodDate", n.ZodSymbol = "ZodSymbol", n.ZodUndefined = "ZodUndefined", n.ZodNull = "ZodNull", n.ZodAny = "ZodAny", n.ZodUnknown = "ZodUnknown", n.ZodNever = "ZodNever", n.ZodVoid = "ZodVoid", n.ZodArray = "ZodArray", n.ZodObject = "ZodObject", n.ZodUnion = "ZodUnion", n.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", n.ZodIntersection = "ZodIntersection", n.ZodTuple = "ZodTuple", n.ZodRecord = "ZodRecord", n.ZodMap = "ZodMap", n.ZodSet = "ZodSet", n.ZodFunction = "ZodFunction", n.ZodLazy = "ZodLazy", n.ZodLiteral = "ZodLiteral", n.ZodEnum = "ZodEnum", n.ZodEffects = "ZodEffects", n.ZodNativeEnum = "ZodNativeEnum", n.ZodOptional = "ZodOptional", n.ZodNullable = "ZodNullable", n.ZodDefault = "ZodDefault", n.ZodCatch = "ZodCatch", n.ZodPromise = "ZodPromise", n.ZodBranded = "ZodBranded", n.ZodPipeline = "ZodPipeline";
})(g || (g = {}));
const It = (n, e = {
  message: `Input not instance of ${n.name}`
}) => Je((t) => t instanceof n, e), Re = M.create, Qe = z.create, Et = Ie.create, St = W.create, Xe = le.create, Nt = X.create, Ot = Te.create, Zt = ce.create, Mt = ue.create, Rt = re.create, Vt = Q.create, At = U.create, Bt = je.create, Dt = V.create, Ke = P.create, Lt = P.strictCreate, Fe = de.create, $t = Ee.create, Ut = he.create, qt = L.create, Ht = pe.create, zt = Pe.create, Wt = K.create, Gt = se.create, Yt = fe.create, B = me.create, Jt = G.create, Qt = ye.create, Xt = ae.create, Ue = A.create, Kt = $.create, Ft = F.create, es = A.createWithPreprocess, ts = ve.create, ss = () => Re().optional(), ns = () => Qe().optional(), rs = () => Xe().optional(), as = {
  string: (n) => M.create({ ...n, coerce: !0 }),
  number: (n) => z.create({ ...n, coerce: !0 }),
  boolean: (n) => le.create({
    ...n,
    coerce: !0
  }),
  bigint: (n) => W.create({ ...n, coerce: !0 }),
  date: (n) => X.create({ ...n, coerce: !0 })
}, is = v;
var a = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: oe,
  setErrorMap: pt,
  getErrorMap: be,
  makeIssue: xe,
  EMPTY_PATH: ft,
  addIssueToContext: f,
  ParseStatus: E,
  INVALID: v,
  DIRTY: We,
  OK: S,
  isAborted: Oe,
  isDirty: Ze,
  isValid: we,
  isAsync: ke,
  get util() {
    return k;
  },
  get objectUtil() {
    return Ne;
  },
  ZodParsedType: p,
  getParsedType: H,
  ZodType: x,
  ZodString: M,
  ZodNumber: z,
  ZodBigInt: W,
  ZodBoolean: le,
  ZodDate: X,
  ZodSymbol: Te,
  ZodUndefined: ce,
  ZodNull: ue,
  ZodAny: re,
  ZodUnknown: Q,
  ZodNever: U,
  ZodVoid: je,
  ZodArray: V,
  ZodObject: P,
  ZodUnion: de,
  ZodDiscriminatedUnion: Ee,
  ZodIntersection: he,
  ZodTuple: L,
  ZodRecord: pe,
  ZodMap: Pe,
  ZodSet: K,
  ZodFunction: se,
  ZodLazy: fe,
  ZodLiteral: me,
  ZodEnum: G,
  ZodNativeEnum: ye,
  ZodPromise: ae,
  ZodEffects: A,
  ZodTransformer: A,
  ZodOptional: $,
  ZodNullable: F,
  ZodDefault: ge,
  ZodCatch: Ce,
  ZodNaN: Ie,
  BRAND: Pt,
  ZodBranded: Ye,
  ZodPipeline: ve,
  custom: Je,
  Schema: x,
  ZodSchema: x,
  late: Ct,
  get ZodFirstPartyTypeKind() {
    return g;
  },
  coerce: as,
  any: Rt,
  array: Dt,
  bigint: St,
  boolean: Xe,
  date: Nt,
  discriminatedUnion: $t,
  effect: Ue,
  enum: Jt,
  function: Gt,
  instanceof: It,
  intersection: Ut,
  lazy: Yt,
  literal: B,
  map: zt,
  nan: Et,
  nativeEnum: Qt,
  never: At,
  null: Mt,
  nullable: Ft,
  number: Qe,
  object: Ke,
  oboolean: rs,
  onumber: ns,
  optional: Kt,
  ostring: ss,
  pipeline: ts,
  preprocess: es,
  promise: Xt,
  record: Ht,
  set: Wt,
  strictObject: Lt,
  string: Re,
  symbol: Ot,
  transformer: Ue,
  tuple: qt,
  undefined: Zt,
  union: Fe,
  unknown: Vt,
  void: Bt,
  NEVER: is,
  ZodIssueCode: u,
  quotelessJson: ht,
  ZodError: R
});
const ne = B("UNSIGNED_INT"), qe = B("INT"), ie = B("FLOAT"), os = B("INT2"), m = B("WSTRING"), Z = B("VARIANT_MAP"), ls = B("Completion"), cs = B("UnknownOrchestration"), us = B("Pending"), ds = B("Failure"), c = Re(), C = Ke({
  name: c,
  type: m,
  value: Fe([ls, us, ds, cs])
});
a.object({
  name: c,
  // the payload value is unique to each bridge response.
  payload: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  status: C
});
a.object({
  name: c,
  payload: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  payload: a.object({
    name: c,
    type: Z,
    value: a.object({
      id: a.object({
        name: c,
        type: m,
        value: a.string()
      }).optional(),
      message: a.object({
        name: c,
        type: m,
        value: a.string()
      })
    })
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  payload: a.object({
    name: c,
    type: Z,
    value: a.object({
      name: a.object({
        name: c,
        type: m,
        value: a.string()
      })
    })
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  payload: a.object({
    name: c,
    type: Z,
    value: a.object({
      index: a.object({
        name: c,
        type: m,
        value: a.string()
      })
    })
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  payload: a.object({
    name: c,
    type: Z,
    value: a.object({
      name: a.object({
        name: c,
        type: m,
        value: a.string()
      })
    })
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  status: C
});
const hs = a.object({
  name: a.literal("displayProblems"),
  type: Z,
  value: a.record(a.object({
    name: c,
    type: m,
    value: a.object({
      errorType: a.object({
        name: c,
        type: m,
        value: a.union([
          a.literal("invalidResolution"),
          a.literal("invalidScale"),
          a.literal("invalidOrientation"),
          a.literal("invalidBitDepth")
        ])
      }),
      expectedX: a.object({
        name: c,
        type: ie,
        value: a.number()
      }),
      expectedY: a.object({
        name: c,
        type: ie,
        value: a.number()
      }).optional(),
      observeredX: a.object({
        name: c,
        type: ie,
        value: a.number()
      }),
      observeredY: a.object({
        name: c,
        type: ie,
        value: a.number()
      }).optional()
    })
  }))
}), ps = a.object({
  name: c,
  type: Z,
  value: a.object({
    calibration: a.object({
      name: c,
      type: m,
      value: a.string()
    }),
    defaultQuilt: a.object({
      name: c,
      type: m,
      value: a.string()
    }),
    displayProblems: a.record(hs).optional(),
    hardwareVersion: a.object({
      name: c,
      type: m,
      value: a.string()
    }),
    hwid: a.object({
      name: c,
      type: m,
      value: a.string()
    }),
    index: a.object({
      name: c,
      type: ne,
      value: a.number()
    }),
    state: a.object({
      name: c,
      type: m,
      value: a.string()
    }),
    windowCoords: a.object({
      name: c,
      type: os,
      value: a.object({
        x: a.number(),
        y: a.number()
      })
    })
  })
}), fs = a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  payload: a.object({
    name: c,
    type: Z,
    value: a.record(ps).optional()
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  payload: a.object({
    name: c,
    type: Z,
    value: a.object({
      name: a.object({
        name: c,
        type: m,
        value: a.string()
      })
    })
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  payload: a.object({
    name: c,
    type: Z,
    value: a.object({
      playlist_name: a.object({
        name: c,
        type: m,
        value: a.string()
      }),
      playlist_path: a.object({
        name: c,
        type: m,
        value: a.string()
      })
    })
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  payload: a.object({
    name: c,
    type: Z,
    value: a.object({
      playlist_name: a.object({
        name: c,
        type: m,
        value: a.string()
      })
    })
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  payload: a.object({
    name: c,
    type: Z,
    value: a.object({
      playlist_name: a.object({
        name: c,
        type: m,
        value: a.string()
      })
    })
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  status: C
});
a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  status: C
});
class I {
  constructor(e) {
    w(this, "bridgeEventName");
    w(this, "client");
    this.bridgeEventName = e.bridgeEventName, this.client = e.client, this.client.addEventListener(this.bridgeEventName, this.handle.bind(this));
  }
}
class $s extends I {
  constructor(e) {
    super({ bridgeEventName: "Monitor Connect", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Monitor Connect ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class Us extends I {
  constructor(e) {
    super({ bridgeEventName: "Monitor Disconnect", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Monitor Disconnect ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class qs extends I {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Pause", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Transport Control Pause ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class Hs extends I {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Play", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Transport Control Play ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class zs extends I {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Next", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Transport Control Next ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class Ws extends I {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Previous", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Transport Control Previous ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class Gs extends I {
  constructor(e) {
    super({ bridgeEventName: "Progress Start", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Progress Start ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class Ys extends I {
  constructor(e) {
    super({ bridgeEventName: "Progress Completion", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class Js extends I {
  constructor(e) {
    super({ bridgeEventName: "Progress Update", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Progress Update ", "color: BlueViolet; font-weight: bold; border: solid;", e.payload.value.progress_type, e.payload.value.progress.value);
  }
}
class Qs extends I {
  constructor(e) {
    super({ bridgeEventName: "Playlist Instance", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Playlist Instance ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class Xs extends I {
  constructor(e) {
    super({ bridgeEventName: "Playlist Insert", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Playlist Insert ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class Ks extends I {
  constructor(e) {
    super({ bridgeEventName: "Playlist Delete", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Playlist Delete ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class Fs extends I {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class en extends I {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist Complete", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class tn extends I {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist Cancelled", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class ms extends I {
  constructor(e) {
    super({ bridgeEventName: "New Item Playing", client: e.client });
  }
  handle(e) {
    var i, o;
    this.client.log("%c ⬅️ New Item Playing ", "color: BlueViolet; font-weight: bold; border: solid;", e);
    let t = this.client.currentPlaylistIndex, s = (o = (i = this.client.playlists) == null ? void 0 : i[t]) == null ? void 0 : o.name, r = this.client.currentPlaylistItemIndex;
    e.payload.value.playlist_name.value == s && e.payload.value.index.value == r && (this.client.isCastPending = !1);
  }
}
class ys extends I {
  constructor(e) {
    super({ bridgeEventName: "All Events", client: e.client });
  }
  handle(e) {
    e.payload.value.event.value !== "Progress Update" && this.client.log(`%c ⬅️ ${e.payload.value.event.value}`, "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
function q(n) {
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
    w(this, "orchestration");
    /** A boolean that stores if the Bridge session is valid or not
     *  If the orchestration is not valid, some functions will not work
     */
    w(this, "isConnected");
    /**A boolean for checking the status of the current disconnect event */
    w(this, "isDisconnecting");
    /**An array containing the connected Looking Glass Displays */
    w(this, "displays");
    /**an Array containing Playlists, we store this to easily switch between multiple playlists */
    w(this, "playlists");
    /** The index of playlists that is currently active */
    w(this, "currentPlaylistIndex");
    /**The index of the playlist Item that is currently active */
    w(this, "currentPlaylistItemIndex");
    /**store if we're currently in the middle of a cast */
    w(this, "isCastPending", !1);
    /**the version of the Looking Glass Driver that's running */
    w(this, "version");
    w(this, "currentHologram");
    /**a boolean for whether a disconnect was triggered automatically or manually */
    w(this, "manualDisconnect", !1);
    w(this, "playState", "STOPPED");
    if (this.orchestration = "", this.isConnected = !1, this.isDisconnecting = !1, this.displays = [], T.eventsource = new dt(), T.fallback = void 0, this.playlists = [], this.currentPlaylistIndex = 0, this.currentPlaylistItemIndex = 0, this.version = { major: 0, minor: 0, patch: 0, hotfix: 0 }, !T.instance)
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
    this.log("%c ➡️ function call: status ", "color: magenta; font-weight: bold; border: solid");
    const e = new Promise((t, s) => {
      let r = setTimeout(() => {
        clearTimeout(r), s(new Error("Timed out"));
      }, 500);
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
    if (this.log("%c ➡️ function call: connect ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !0)
      return console.warn("Already connected to Looking Glass Bridge."), { success: !0, response: { version: this.version, orchestration: this.orchestration } };
    if (await this.status() == !1)
      return {
        success: !1,
        response: { version: { major: 0, minor: 0, patch: 0, hotfix: 0 }, orchestration: "" }
      };
    if (this.isConnected = !0, (await this.createOrchestration("")).success == !1) {
      let s = await this.getVersion();
      if (s.success == !1)
        return { success: !1, response: { version: q("0"), orchestration: "" } };
      if (s.response.major < 2 && s.response.minor < 1)
        return { success: !1, response: { version: s.response, orchestration: "" } };
    }
    return await this.subscribeToEvents(), T.eventsource.connectEvent(), new ms({ client: this }), new ys({ client: this }), { success: !0, response: { version: this.version, orchestration: this.orchestration } };
  }
  /**
   * Creates an orchestration called "default" if one does not already exist.
   * @returns string, the name of the current orchestration
   */
  async createOrchestration(e) {
    var r, i;
    if (this.log("%c ➡️ function call: createOrchestration ", "color: magenta; font-weight: bold; border: solid"), await this.status() == !1)
      return { success: !1, response: null };
    const t = await this.getVersion();
    if (t.response.major < 2 && t.response.minor < 1)
      return console.error("Unable to get Looking Glass Bridge version, please upgrade Looking Glass Bridge."), { success: !1, response: null };
    let s = await ot({ name: e, orchestration: this.orchestration });
    return s.success == !0 && (r = s.response) != null && r.payload.value && (this.orchestration = (i = s.response) == null ? void 0 : i.payload.value), { success: !0, response: this.orchestration };
  }
  /**
   * Disconnect from Looking Glass Bridge, free up resources.
   */
  async disconnect() {
    var t, s, r, i;
    return this.log("%c ➡️ function call: disconnect ", "color: magenta; font-weight: bold; border: solid"), this.isDisconnecting == !0 || this.isConnected == !1 ? { success: !1 } : (this.isDisconnecting = !0, this.manualDisconnect = !0, (await lt(this.orchestration)).success == !1 && console.warn(" ⚠️ Unable to exit orchestration, Bridge is not reachable."), (t = T.eventsource) == null || t.disconnectEvent(), (r = (s = T.eventsource) == null ? void 0 : s.ws) == null || r.close(), (i = T.fallback) == null || i.ws.close(), T.fallback = void 0, this.displays = [], this.playlists = [], this.currentHologram = void 0, this.orchestration = "", this.isDisconnecting = !1, this.isCastPending = !1, this.isConnected = !1, { success: !0 });
  }
  /**
   * changes the state of the Looking Glass Bridge Window
   * @param showWindow boolean, true to show the Looking Glass window, false to hide the Looking Glass window
   * @returns
   */
  async showWindow(e) {
    if (this.isConnected == !1)
      return { success: !1, response: null };
    this.log("%c ➡️ function call: showWindow ", "color: magenta; font-weight: bold; border: solid");
    let t = "this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge.";
    if (await this.isVersionCompatible() == !1)
      return console.warn(t), { success: !1, response: null };
    const s = {
      orchestration: this.orchestration,
      show_window: e,
      head_index: -1
    };
    let r = await j({
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
    this.log("%c ➡️ function call: getVersion ", "color: magenta; font-weight: bold; border: solid");
    let e = await j({ endpoint: "bridge_version", requestBody: {} });
    if (e.success == !0) {
      let s = q(e.response.payload.value);
      return this.version = s, { success: !0, response: this.version };
    } else {
      let s = await ((t = T.fallback) == null ? void 0 : t.getLegacyVersion());
      return s == null ? { success: !1, response: q("0") } : { success: !0, response: q(s) };
    }
  }
  /**
   * A helper function to get the version of the Looking Glass Bridge API
   * @returns the current version of the Looking Glass API
   */
  async apiVersion() {
    if (this.log("%c ➡️ function call: apiVersion ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: q("0") };
    if (await this.isVersionCompatible() == !1)
      return { success: !1, response: q("0") };
    let e = await j({ endpoint: "api_version", requestBody: {} });
    return e.success == !1 ? (console.warn("this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge."), { success: !1, response: q("0") }) : { success: !0, response: q(e.response.payload.value) };
  }
  /**
   * getDisplays finds all displays that are connected to the computer,
   * searches for Looking Glass displays, and returns them as an array of Display objects
   * @returns the display object
   */
  async getDisplays() {
    if (this.log("%c ➡️ function call: displays ", "color: magenta; font-weight: bold; border: solid"), this.displays = [], this.isConnected == !1)
      return { success: !1, response: null };
    const e = {
      orchestration: this.orchestration
    };
    let t = await j({
      endpoint: "available_output_devices",
      requestBody: e
    });
    if (t.success == !1)
      return { success: !1, response: null };
    fs.safeParse(t.response);
    for (let s in t.response.payload.value) {
      let r = t.response.payload.value[`${s}`];
      if (r.value.hardwareVersion.value !== "thirdparty") {
        let i = it(r.value);
        i != null && this.displays.push(i);
      }
    }
    return { success: !0, response: this.displays };
  }
  /**Delete the instance of the playlist from Bridge, this will stop the playlist from playing if it's active. */
  async deletePlaylist(e) {
    if (this.log("%c ➡️ function call: deletePlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    const t = e.getInstance(this.orchestration);
    let s = await j({
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
    var i, o, l;
    if (this.isConnected == !1)
      return { success: !1 };
    if (this.log("%c ➡️ function call: cast ", "color: magenta; font-weight: bold; border: solid"), this.isCastPending == !0)
      return this.warn("already casting please wait"), { success: !1 };
    if (this.displays.length == 0)
      return this.warn("no displays found"), { success: !1 };
    this.isCastPending = !0;
    let t = "Cast_" + Math.random().toString(36).substring(7), s;
    s == null && (s = new Le({
      name: t,
      loop: !0,
      items: [],
      orchestration: this.orchestration
    }), (i = this.playlists) == null || i.push(s));
    let r = s.addItem(e);
    if (r !== void 0)
      await s.play(), (o = this.playlists) == null || o.forEach((d) => {
        var h;
        d.name != t && (this.deletePlaylist(d), (h = this.playlists) == null || h.splice(this.playlists.indexOf(d), 1));
      }), this.currentPlaylistIndex = ((l = this.playlists) == null ? void 0 : l.indexOf(s)) ?? 0, this.currentPlaylistItemIndex = r.index;
    else
      return { success: !1 };
    return this.currentHologram = e, this.isCastPending = !1, { success: !0 };
  }
  getCurrentPlaylist() {
    var e;
    return (e = this.playlists) == null ? void 0 : e[this.currentPlaylistIndex];
  }
  async playRemotePlaylist(e, t = 0) {
    var i, o, l;
    if (!this.isConnected && !(await this.connect()).success)
      return { success: !1 };
    if (console.log("%c ➡️ function call: playRemotePlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isCastPending == !0)
      return { success: !1 };
    this.isCastPending = !0;
    let s = "Cast_" + Math.random().toString(36).substring(7);
    const r = new Le({
      name: s,
      loop: !0,
      items: e,
      orchestration: this.orchestration
    });
    return (i = this.playlists) == null || i.push(r), (o = this.playlists) == null || o.forEach((d) => {
      var h;
      d.name != s && (this.deletePlaylist(d), (h = this.playlists) == null || h.splice(this.playlists.indexOf(d), 1));
    }), this.currentPlaylistIndex = ((l = this.playlists) == null ? void 0 : l.indexOf(r)) ?? 0, this.currentPlaylistItemIndex = t, this.currentHologram = e[t], this.isCastPending = !1, await r.play(), { success: !0 };
  }
  /**Play a Playlist created by Looking Glass Studio, requires the full path to the playlist.json file. */
  async playStudioPlaylist(e) {
    if (this.log("%c ➡️ function call: subscribeToEvents ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    const t = {
      orchestration: this.orchestration,
      name: "Studio Playlist",
      playlist_path: e,
      loop: !0
    };
    await j({
      endpoint: "instance_studio_playlist",
      requestBody: t
    });
    const s = {
      orchestration: this.orchestration,
      name: "Studio Playlist",
      head_index: -1
    };
    return { success: !0, response: (await j({
      endpoint: "play_playlist",
      requestBody: s
    })).response };
  }
  /**stop playing the studio playlist */
  async stopStudioPlaylist() {
    if (this.log("%c ➡️ function call: stopStudioPlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1 };
    const e = {
      orchestration: this.orchestration,
      name: "Studio Playlist",
      loop: !1
    };
    return (await j({
      endpoint: "delete_playlist",
      requestBody: e
    })).success == !1 ? { success: !1 } : (await this.showWindow(!1), { success: !0 });
  }
  /**Get the current playlist that is set to start automatically */
  async getAutoStartPlaylist() {
    if (this.log("%c ➡️ function call: getAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    let e = {
      orchestration: this.orchestration,
      head_index: -1
    }, t = await j({
      endpoint: "get_autostart_playlist",
      requestBody: e
    });
    return t.success == !1 ? { success: !1, response: null } : { success: !0, response: t.response };
  }
  /**Choose a Playlist that exists on the local file system to set as the start up playlist */
  async setAutoStartPlaylist(e) {
    if (this.log("%c ➡️ function call: setAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    let t = {
      orchestration: this.orchestration,
      head_index: -1,
      playlist_name: e.playlistName,
      playlist_path: e.playlistPath
    }, s = await j({
      endpoint: "set_autostart_playlist",
      requestBody: t
    });
    return s.success == !1 ? { success: !1, response: null } : { success: !0, response: s.response };
  }
  /**set a playlist to auto-start, requires that all files are local on the system */
  async createAutoStartPlaylist(e) {
    if (this.log("%c ➡️ function call: createAutoStartPlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    for (let r = 0; r < e.playlist.items.length; r++)
      if (e.playlist.items[r].hologram.uri.includes("http"))
        return this.warn("playlist contains a web uri, cannot create autostart playlist"), { success: !1, response: null };
    let t = {
      orchestration: this.orchestration,
      head_index: -1,
      playlist_name: e.playlist.name
    }, s = await j({
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
    }, t = await j({
      endpoint: "transport_control_play",
      requestBody: e
    });
    return t.success == !1 ? { success: !1, response: null } : (this.playState = "PLAYING", { success: !0, response: t.response });
  }
  /**Pause the currently playing playlist */
  async pause() {
    let e = {
      orchestration: this.orchestration
    }, t = await j({
      endpoint: "transport_control_pause",
      requestBody: e
    });
    return t.success == !1 ? { success: !1, response: null } : (this.playState = "PAUSED", { success: !0, response: t.response });
  }
  /**Got to the next playlist item */
  async next() {
    let e = {
      orchestration: this.orchestration
    }, t = await j({
      endpoint: "transport_control_next",
      requestBody: e
    });
    if (t.success == !1)
      return { success: !1, response: null };
    const s = this.getCurrentPlaylist(), r = s == null ? void 0 : s.loop, i = s == null ? void 0 : s.items.length;
    return this.currentPlaylistItemIndex + 1 === i ? r && (this.currentPlaylistItemIndex = 0) : this.currentPlaylistItemIndex++, { success: !0, response: t.response };
  }
  /**Go to the previous playlist item */
  async previous() {
    let e = {
      orchestration: this.orchestration
    }, t = await j({
      endpoint: "transport_control_previous",
      requestBody: e
    });
    if (t.success == !1)
      return { success: !1, response: null };
    const s = this.getCurrentPlaylist(), r = s == null ? void 0 : s.loop, i = s == null ? void 0 : s.items.length;
    return this.currentPlaylistIndex === 0 ? r && i && (this.currentPlaylistItemIndex = i) : this.currentPlaylistItemIndex--, { success: !0, response: t.response };
  }
  /**Seek to a specific item in a playlist */
  async seek(e) {
    let t = {
      orchestration: this.orchestration,
      index: e
    }, s = await j({
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
    this.log("%c ➡️ function call: subscribeToEvents ", "color: magenta; font-weight: bold; border: solid");
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
    }, i = await j({ endpoint: "update_current_entry", requestBody: r });
    return i.success == !1 ? { success: !1, response: null } : { success: !0, response: i.response };
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
  time(e) {
    T.verbosity >= 2 && console.time(e);
  }
  timeEnd(e) {
    T.verbosity >= 2 && console.timeEnd(e);
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
let N = T;
/** the instance of the client that we create, BridgeClient is a singleton, there can only be one */
w(N, "instance"), w(N, "fallback"), /** The websocket connection to Bridge's Event Source, this returns information from Bridge */
w(N, "eventsource"), /**control how often we log to the console, 3 is everything, 0 is nothing */
w(N, "verbosity");
const O = (n, e) => a.number().refine((t) => t >= n && t <= e, {
  message: `The value should be between ${n} and ${e}`
}), gs = {
  min: 1,
  max: 50,
  range: O(1, 50),
  type: "int",
  defaultValue: 5
}, vs = {
  min: 1,
  max: 50,
  range: O(1, 50),
  type: "int",
  defaultValue: 9
}, _s = {
  min: 0.1,
  max: 10,
  range: O(0.1, 10),
  type: "float",
  defaultValue: 1
}, Ve = {
  min: 0.1,
  max: 4,
  range: O(0.1, 4),
  type: "float",
  defaultValue: 1.5
}, bs = {
  min: 0,
  max: 1,
  range: O(0, 1),
  type: "float",
  defaultValue: 0
}, xs = {
  min: -2,
  max: 2,
  range: O(-2, 2),
  type: "float",
  defaultValue: 0
}, ws = {
  min: -2,
  max: 2,
  range: O(-2, 2),
  type: "float",
  defaultValue: 0
}, Ae = {
  min: 0.1,
  max: 4,
  range: O(0.1, 4),
  type: "float",
  defaultValue: 0
}, ks = {
  min: -0.05,
  max: 0.05,
  range: O(-0.05, 0.05),
  type: "float",
  defaultValue: 0
}, Ts = {
  min: 1,
  max: 50,
  range: O(1, 50),
  type: "int",
  defaultValue: 5
}, js = {
  min: 1,
  max: 50,
  range: O(1, 50),
  type: "int",
  defaultValue: 9
}, Ps = {
  min: 1,
  max: 2500,
  range: O(1, 2500),
  type: "int",
  defaultValue: 45
}, et = {
  min: -1,
  max: 1,
  range: O(-1, 1),
  type: "float",
  defaultValue: 0.01
}, tt = {
  min: 0,
  max: 3,
  range: O(0, 3),
  type: "int",
  defaultValue: 2
}, sn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ASPECT: _s,
  COLUMNS: gs,
  CROP_POS_X: xs,
  CROP_POS_Y: ws,
  DEPTHINESS: Ve,
  DEPTH_CUTOFF: bs,
  FILTER_MODE: tt,
  FOCUS: ks,
  GAUSSIAN_SIGMA: et,
  QUILT_COLS: js,
  QUILT_ROWS: Ts,
  QUILT_VIEW_COUNT: Ps,
  ROWS: vs,
  ZOOM: Ae
}, Symbol.toStringTag, { value: "Module" })), nn = a.union([a.literal("quilt"), a.literal("rgbd")]), Cs = a.object({
  rows: a.number(),
  columns: a.number(),
  crop_pos_x: a.number().optional(),
  crop_pos_y: a.number().optional(),
  aspect: a.number(),
  viewCount: a.number(),
  focus: a.number().optional(),
  zoom: a.number().optional(),
  tag: a.string().optional()
}), Is = a.object({
  rows: a.number().optional(),
  columns: a.number().optional(),
  crop_pos_x: a.number().optional(),
  crop_pos_y: a.number().optional(),
  /**Aspect Ratio of the hologram,
   * this should match the source image you provide, not the RGBD Pair */
  aspect: a.number(),
  /**Where are the holograms located?
   * 0 Top
   * 1 Bottom
   * 2 Right
   * 3 Left */
  depth_loc: a.union([a.literal(0), a.literal(1), a.literal(2), a.literal(3)]),
  /**Is the Depth inverted? 0 for false, 1 for true */
  depth_inversion: a.union([a.literal(0), a.literal(1)]),
  /**Is the depth map chroma or grayscale? 0 for false, 1 for true */
  chroma_depth: a.union([a.literal(0), a.literal(1)]),
  /**Depthiness can be a value between 0.1 and 2 */
  depthiness: Ve.range,
  /**Controls the Focus of the hologram */
  focus: a.number().optional(),
  /**Whether or not to cutoff depth beyond a certain point. 0 for false, 1 for true */
  depth_cutoff: a.union([a.literal(1), a.literal(0)]).optional(),
  /**Zoom can be between 0.1 and 2 */
  zoom: Ae.range,
  tag: a.string().optional()
}), Es = {
  quilt: Cs,
  rgbd: Is
};
class Ss {
  constructor(e) {
    w(this, "uri");
    w(this, "type");
    w(this, "settings");
    this.uri = e.uri, this.type = "quilt", this.settings = e.settings;
  }
}
class Ns {
  constructor(e) {
    w(this, "uri");
    w(this, "type");
    w(this, "settings");
    this.uri = e.uri, this.type = "rgbd", this.settings = e.settings;
  }
}
function rn({ uri: n, type: e, settings: t }) {
  switch (Es[e].safeParse(t), e) {
    case "quilt":
      return new Ss({ uri: n, settings: t });
    case "rgbd":
      return new Ns({ uri: n, settings: t });
    default:
      throw new Error(`Invalid type: ${e}`);
  }
}
const an = a.union([
  a.literal("focus"),
  a.literal("aspect"),
  a.literal("cols"),
  a.literal("rows"),
  a.literal("crop_pos_x"),
  a.literal("crop_pos_y"),
  a.literal("zoom"),
  a.literal("filter_mode"),
  a.literal("gaussian_sigma"),
  //rgbd specific
  a.literal("depth_loc"),
  a.literal("depth_inversion"),
  a.literal("chroma_depth"),
  a.literal("depthiness"),
  a.literal("depth_cutoff")
]), on = a.object({
  focus: a.number().optional(),
  aspect: a.number().optional(),
  cols: a.number().optional(),
  rows: a.number().optional(),
  crop_pos_x: a.number().optional(),
  crop_pos_y: a.number().optional(),
  zoom: Ae.range,
  filter_mode: tt.range,
  gaussian_sigma: et.range,
  //rgbd specific
  depth_loc: a.union([a.literal(0), a.literal(1), a.literal(2), a.literal(3)]),
  depth_inversion: a.union([a.literal(0), a.literal(1)]),
  chroma_depth: a.union([a.literal(0), a.literal(1)]),
  depthiness: Ve.range,
  depth_cutoff: a.union([a.literal(1), a.literal(0)]).optional()
}), Y = a.union([
  a.literal("Monitor Connect"),
  a.literal("Monitor Disconnect"),
  a.literal("New Item Playing"),
  a.literal("Progress Start"),
  a.literal("Progress Completion"),
  a.literal("Progress Update"),
  a.literal("Playlist Instance"),
  a.literal("Playlist Insert"),
  a.literal("Playlist Delete"),
  a.literal("Sync/Play Playlist"),
  a.literal("Sync/Play Playlist Complete"),
  a.literal("Sync/Play Playlist Cancelled"),
  a.literal("Transport Control Pause"),
  a.literal("Transport Control Play"),
  a.literal("Transport Control Next"),
  a.literal("Transport Control Previous"),
  a.literal("All Events")
]), Os = a.object({
  event: a.object({
    name: c,
    type: m,
    value: Y
  }),
  message: a.object({
    name: c,
    type: m,
    value: a.string()
  })
}), Zs = a.object({
  event: a.object({
    name: c,
    type: m,
    value: Y
  }),
  head_index: a.object({
    name: c,
    type: ne,
    value: a.number()
  }),
  height: a.object({
    name: c,
    type: ne,
    value: a.number()
  }),
  hw: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  hw_long_name: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  hw_short_name: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  made_by_looking_glass: a.object({
    name: c,
    type: m,
    value: a.boolean()
  }),
  message: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  name: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  width: a.object({
    name: c,
    type: ne,
    value: a.number()
  }),
  x: a.object({
    name: c,
    type: qe,
    value: a.number()
  }),
  y: a.object({
    name: c,
    type: qe,
    value: a.number()
  })
}), Ms = a.object({
  event: a.object({
    name: c,
    type: m,
    value: Y
  }),
  message: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  progress: a.object({
    name: c,
    type: ie,
    value: a.number()
  }),
  progress_type: a.object({
    name: c,
    type: m,
    value: a.string()
  })
}), Rs = a.object({
  event: a.object({
    name: c,
    type: m,
    value: Y
  }),
  index: a.object({
    name: c,
    type: ne,
    value: a.number()
  }),
  message: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  uri: a.object({
    name: c,
    type: m,
    value: a.string()
  })
}), Vs = a.object({
  event: a.object({
    name: c,
    type: m,
    value: Y
  }),
  message: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  name: a.object({
    name: c,
    type: m,
    value: a.string()
  })
}), As = a.object({
  event: a.object({
    name: c,
    type: m,
    value: Y
  }),
  message: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  name: a.object({
    name: c,
    type: m,
    value: a.string()
  })
}), Bs = a.object({
  event: a.object({
    name: c,
    type: m,
    value: Y
  }),
  message: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  name: a.object({
    name: c,
    type: m,
    value: a.string()
  })
}), Ds = a.object({
  event: a.object({
    name: c,
    type: m,
    value: Y
  }),
  index: a.object({
    name: c,
    type: ne,
    value: a.number()
  }),
  playlist_name: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  tag: a.object({
    name: c,
    type: m,
    value: a.string()
  })
}), J = (n) => a.object({
  name: c,
  orchestration: a.object({
    name: c,
    type: m,
    value: a.string()
  }),
  payload: a.object({
    name: c,
    type: Z,
    value: n
  }),
  status: C
}), ln = J(Zs), cn = J(Ms), un = J(Rs), dn = J(Vs), hn = J(As), pn = J(Bs), fn = J(Ds), mn = J(Os);
export {
  ys as AllEventsMessageHandler,
  N as BridgeClient,
  Y as BridgeEvent,
  I as MessageHandler,
  $s as MonitorConnectedMessageHandler,
  Us as MonitorDisconnectedMessageHandler,
  ms as NewItemPlayingMessageHandler,
  Le as Playlist,
  Ks as PlaylistDeleteMessageHandler,
  Xs as PlaylistInsertMessageHandler,
  Qs as PlaylistInstanceMessageHandler,
  Ys as ProgressCompletionMessageHandler,
  Gs as ProgressStartMessageHandler,
  Js as ProgressUpdateMessageHandler,
  Ss as QuiltHologram,
  Cs as QuiltHologramArgs,
  Be as QuiltPlaylistItem,
  Ns as RGBDHologram,
  Is as RGBDHologramArgs,
  De as RGBDPlaylistItem,
  tn as SyncPlayPlaylistCancelledMessageHandler,
  en as SyncPlayPlaylistCompleteMessageHandler,
  Fs as SyncPlayPlaylistMessageHandler,
  zs as TransportControlNextMessageHandler,
  qs as TransportControlPauseMessageHandler,
  Hs as TransportControlPlayMessageHandler,
  Ws as TransportControlPreviousMessageHandler,
  mn as allEventsResponse,
  sn as defaults,
  hn as deletePlaylistResponse,
  rn as hologramFactory,
  Es as hologramMap,
  on as hologramParamMap,
  nn as hologramTypeSchema,
  un as insertPlaylistResponse,
  dn as instancePlaylistResponse,
  ln as monitorConnectResponse,
  fn as newItemPlayingResponse,
  an as parameterNames,
  cn as progressUpdateResponse,
  j as sendMessage,
  pn as transportControlResponse,
  rt as tryParseCalibration,
  it as tryParseDisplay,
  at as tryParseQuilt
};
//# sourceMappingURL=looking-glass-bridge.mjs.map

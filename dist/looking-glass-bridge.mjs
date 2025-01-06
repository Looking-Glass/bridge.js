var ct = Object.defineProperty;
var dt = (n, e, t) => e in n ? ct(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var w = (n, e, t) => (dt(n, typeof e != "symbol" ? e + "" : e, t), t);
function ut(n) {
  const e = JSON.parse(n);
  return e == null ? (console.warn("Unable to parse calibration"), null) : {
    DPI: e.DPI.value,
    center: e.center.value,
    configVersion: e.configVersion,
    flipImageX: e.flipImageX.value,
    flipImageY: e.flipImageY.value,
    flipSubp: e.flipSubp.value,
    fringe: e.fringe.value ?? 0,
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
function ht(n) {
  const e = JSON.parse(n);
  return e == null ? null : {
    quiltAspect: e.quiltAspect,
    quiltWidth: e.quiltX,
    quiltHeight: e.quiltY,
    rows: e.tileY,
    columns: e.tileX
  };
}
function ft(n) {
  console.log(`debugging in parsing function ${{ value: { value: n } }}`);
  let e = null;
  try {
    e = {
      calibration: ut(n.calibration.value),
      defaultQuilt: ht(n.defaultQuilt.value),
      hwid: n.hwid.value,
      hardwareVersion: n.hardwareVersion.value,
      index: n.index.value,
      state: n.state.value,
      windowCoords: n.windowCoords.value
    };
  } catch (t) {
    console.error({ error: t }), console.log(e);
  }
  return e;
}
async function C(n) {
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
async function pt({ name: n, orchestration: e }) {
  if (N.getInstance().log("%c function call: tryEnterOrchestration ", "color: magenta; font-weight: bold; border: solid"), (n == null || n == "") && (n = "default"), e !== "" && e !== void 0)
    return { success: !1, response: null };
  let r = await C({
    endpoint: "enter_orchestration",
    requestBody: {
      name: n
    }
  });
  return r.success == !1 ? (console.error("failed to enter orchestration", r), { success: !1, response: null }) : (console.groupEnd(), { success: !0, response: r.response });
}
async function mt(n) {
  let e = {
    orchestration: n
  }, t = new Promise((r) => {
    let a = setTimeout(() => {
      clearTimeout(a), r({ success: !1, response: null });
    }, 5e3);
  }), s = await Promise.race([
    C({
      endpoint: "exit_orchestration",
      requestBody: e
    }),
    t
  ]);
  return !s || s.success == !1 ? { success: !1, response: null } : { success: !0, response: s.response };
}
function gt() {
  return window !== void 0 ? !0 : (console.error("Window is unavailable!"), !1);
}
function yt() {
  return "WebSocket" in window ? !0 : (console.error("WebSocket NOT supported by your Browser!"), !1);
}
class vt {
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
    var r, a;
    if (N.getInstance().log(`%c Message Handler Removed: ${e} `, "color: Tomato; font-weight: bold; border: solid;"), e in this.MessageHandler) {
      const o = (r = this.MessageHandler[e]) == null ? void 0 : r.findIndex((l) => l === t);
      o !== -1 && o !== void 0 && ((a = this.MessageHandler[e]) == null || a.splice(o, 1));
    }
  }
  callMessageHandler(e) {
    let t;
    if ("All Events" in this.MessageHandler) {
      const s = JSON.parse(e), r = this.MessageHandler["All Events"];
      r && r.forEach((a) => a(s));
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
    if (t.log("%c Connect to Bridge Events Source ", "color: chartreuse; font-weight: bold; border: solid"), !gt())
      return { success: !1 };
    if (!yt())
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
      }, this.ws.onmessage = function(a) {
        s.callMessageHandler(a.data);
      }, this.ws.onclose = function() {
        const a = N.getInstance();
        a.manualDisconnect || a.disconnect(), a.log(`%c Disconnected from Websocket, Manual Disconnect: ${a.manualDisconnect} `, "color: red; font-weight: bold; border: solid");
      }, this.ws.onerror = function(a) {
        t.warn("Unable to connect to WebSocket, is Bridge Running?", a), r({ success: !1 });
      });
    });
  }
}
class Je {
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
class He extends Je {
  constructor(e) {
    super(e);
  }
}
class qe extends Je {
  constructor(e) {
    super(e);
  }
}
class ze {
  constructor(e) {
    w(this, "name");
    w(this, "loop");
    w(this, "items");
    w(this, "orchestration");
    var t;
    this.name = e.name, this.loop = e.loop, this.orchestration = e.orchestration, e.items ? this.items = (t = e.items) == null ? void 0 : t.map((s, r) => {
      if (s.type == "quilt")
        return new He({
          hologram: s,
          id: r,
          index: r,
          playlistName: this.name,
          orchestration: this.orchestration
        });
      if (s.type == "rgbd")
        return new qe({
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
    return e.type == "quilt" ? (t = new He({
      hologram: e,
      id: this.items.length,
      index: this.items.length,
      playlistName: this.name,
      orchestration: this.orchestration
    }), this.items.push(t), t) : e.type == "rgbd" ? (t = new qe({
      hologram: e,
      id: this.items.length,
      index: this.items.length,
      playlistName: this.name,
      orchestration: this.orchestration
    }), this.items.push(t), t) : void 0;
  }
  async addPlaylistItemToBridge(e) {
    const t = e.toBridge();
    return (await C({ endpoint: "insert_playlist_entry", requestBody: t })).success == !1 ? (console.error("failed to insert playlist entry"), !1) : !0;
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
    let r = await C({ endpoint: "instance_playlist", requestBody: s });
    if (r.success == !1)
      return console.error("failed to initialize playlist"), !1;
    const a = this.items;
    if (r.success == !0 && t !== void 0)
      for (let d = 0; d < a.length; d++) {
        a[d].orchestration = this.orchestration;
        const u = a[d].toBridge();
        if ((await C({ endpoint: "insert_playlist_entry", requestBody: u })).success == !1)
          return console.error("failed to insert playlist entry"), !1;
      }
    const o = this.getCurrent({ orchestration: t, head: e });
    return (await C({
      endpoint: "play_playlist",
      requestBody: o
    })).success != !1;
  }
}
class E {
  constructor(e) {
    w(this, "bridgeEventName");
    w(this, "client");
    this.bridgeEventName = e.bridgeEventName, this.client = e.client, this.client.addEventListener(this.bridgeEventName, this.handle.bind(this));
  }
}
class Xs extends E {
  constructor(e) {
    super({ bridgeEventName: "Monitor Connect", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Monitor Connect ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class Fs extends E {
  constructor(e) {
    super({ bridgeEventName: "Monitor Disconnect", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Monitor Disconnect ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class Ks extends E {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Pause", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Transport Control Pause ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class en extends E {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Play", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Transport Control Play ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class tn extends E {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Next", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Transport Control Next ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class sn extends E {
  constructor(e) {
    super({ bridgeEventName: "Transport Control Previous", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Transport Control Previous ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class nn extends E {
  constructor(e) {
    super({ bridgeEventName: "Progress Start", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Progress Start ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class rn extends E {
  constructor(e) {
    super({ bridgeEventName: "Progress Completion", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class an extends E {
  constructor(e) {
    super({ bridgeEventName: "Progress Update", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Progress Update ", "color: BlueViolet; font-weight: bold; border: solid;", e.payload.value.progress_type, e.payload.value.progress.value);
  }
}
class on extends E {
  constructor(e) {
    super({ bridgeEventName: "Playlist Instance", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Playlist Instance ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class ln extends E {
  constructor(e) {
    super({ bridgeEventName: "Playlist Insert", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Playlist Insert ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class cn extends E {
  constructor(e) {
    super({ bridgeEventName: "Playlist Delete", client: e.client });
  }
  handle(e) {
    this.client.log("%c ⬅️ Playlist Delete ", "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
class dn extends E {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class un extends E {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist Complete", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class hn extends E {
  constructor(e) {
    super({ bridgeEventName: "Sync/Play Playlist Cancelled", client: e.client });
  }
  handle(e) {
    this.client.log(e);
  }
}
class _t extends E {
  constructor(e) {
    super({ bridgeEventName: "New Item Playing", client: e.client });
  }
  handle(e) {
    var a, o;
    this.client.log("%c ⬅️ New Item Playing ", "color: BlueViolet; font-weight: bold; border: solid;", e);
    let t = this.client.currentPlaylistIndex, s = (o = (a = this.client.playlists) == null ? void 0 : a[t]) == null ? void 0 : o.name, r = this.client.currentPlaylistItemIndex;
    e.payload.value.playlist_name.value == s && e.payload.value.index.value == r && (this.client.isCastPending = !1);
  }
}
class bt extends E {
  constructor(e) {
    super({ bridgeEventName: "All Events", client: e.client });
  }
  handle(e) {
    e.payload.value.event.value !== "Progress Update" && this.client.log(`%c ⬅️ ${e.payload.value.event.value}`, "color: BlueViolet; font-weight: bold; border: solid;", e);
  }
}
function U(n) {
  if (!n)
    throw new Error("No version string provided");
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
    if (this.orchestration = "", this.isConnected = !1, this.isDisconnecting = !1, this.displays = [], k.eventsource = new vt(), k.fallback = void 0, this.playlists = [], this.currentPlaylistIndex = 0, this.currentPlaylistItemIndex = 0, this.version = { major: 0, minor: 0, patch: 0, hotfix: 0 }, !k.instance)
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
        return { success: !1, response: { version: U("0"), orchestration: "" } };
      if (s.response.major < 2 && s.response.minor < 1)
        return { success: !1, response: { version: s.response, orchestration: "" } };
    }
    return await this.subscribeToEvents(), k.eventsource.connectEvent(), new _t({ client: this }), new bt({ client: this }), { success: !0, response: { version: this.version, orchestration: this.orchestration } };
  }
  /**
   * Creates an orchestration called "default" if one does not already exist.
   * @returns string, the name of the current orchestration
   */
  async createOrchestration(e) {
    var r, a, o;
    if (this.log("%c ➡️ function call: createOrchestration ", "color: magenta; font-weight: bold; border: solid"), await this.status() == !1)
      return { success: !1, response: null };
    const t = await this.getVersion();
    if (t.response.major < 2 && t.response.minor < 1)
      return console.error("Unable to get Looking Glass Bridge version, please upgrade Looking Glass Bridge."), { success: !1, response: null };
    let s = await pt({ name: e, orchestration: this.orchestration });
    return s.success == !0 && (a = (r = s.response) == null ? void 0 : r.payload) != null && a.value && (this.orchestration = (o = s.response) == null ? void 0 : o.payload.value), { success: !0, response: this.orchestration };
  }
  /**
   * Disconnect from Looking Glass Bridge, free up resources.
   */
  async disconnect() {
    var t, s, r, a;
    return this.log("%c ➡️ function call: disconnect ", "color: magenta; font-weight: bold; border: solid"), this.isDisconnecting == !0 || this.isConnected == !1 ? { success: !1 } : (this.isDisconnecting = !0, this.manualDisconnect = !0, (await mt(this.orchestration)).success == !1 && console.warn(" ⚠️ Unable to exit orchestration, Bridge is not reachable."), (t = k.eventsource) == null || t.disconnectEvent(), (r = (s = k.eventsource) == null ? void 0 : s.ws) == null || r.close(), (a = k.fallback) == null || a.ws.close(), k.fallback = void 0, this.displays = [], this.playlists = [], this.currentHologram = void 0, this.orchestration = "", this.isDisconnecting = !1, this.isCastPending = !1, this.isConnected = !1, { success: !0 });
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
    let r = await C({
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
    var t, s;
    this.log("%c ➡️ function call: getVersion ", "color: magenta; font-weight: bold; border: solid");
    let e = await C({ endpoint: "bridge_version", requestBody: {} });
    if (e.success == !0) {
      let r = U((t = e.response.payload) == null ? void 0 : t.value);
      return this.version = r, { success: !0, response: this.version };
    } else {
      let r = await ((s = k.fallback) == null ? void 0 : s.getLegacyVersion());
      return r == null ? { success: !1, response: U("0") } : { success: !0, response: U(r) };
    }
  }
  /**
   * A helper function to get the version of the Looking Glass Bridge API
   * @returns the current version of the Looking Glass API
   */
  async apiVersion() {
    var s, r;
    if (this.log("%c ➡️ function call: apiVersion ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: U("0") };
    if (await this.isVersionCompatible() == !1)
      return { success: !1, response: U("0") };
    let e = await C({ endpoint: "api_version", requestBody: {} });
    return e.success == !1 ? (console.warn("this call is only supported in bridge 2.2 or newer, please upgrade Looking Glass Bridge."), { success: !1, response: U("0") }) : ((s = e.response.payload) == null ? void 0 : s.value) == null ? { success: !1, response: U("0") } : { success: !0, response: U((r = e.response.payload) == null ? void 0 : r.value) };
  }
  /**
   * getDisplays finds all displays that are connected to the computer,
   * searches for Looking Glass displays, and returns them as an array of Display objects
   * @returns the display object
   */
  async getDisplays() {
    var s, r, a, o;
    if (this.log("%c ➡️ function call: displays ", "color: magenta; font-weight: bold; border: solid"), this.displays = [], this.isConnected == !1)
      return { success: !1, response: null };
    const e = {
      orchestration: this.orchestration
    };
    let t = await C({
      endpoint: "available_output_devices",
      requestBody: e
    });
    if (t.success == !1)
      return { success: !1, response: null };
    for (let l in (s = t.response.payload) == null ? void 0 : s.value) {
      console.log("%c ⚠️ DEBUG! ", "color: orange; font-weight: bold; border: solid", { payload: t.response.payload });
      let d = (r = t.response.payload) == null ? void 0 : r.value[`${l}`];
      if (console.log("%c ⚠️ DEBUG! ", "color: orange; font-weight: bold; border: solid", { display: d }), ((o = (a = d.value) == null ? void 0 : a.hardwareVersion) == null ? void 0 : o.value) !== "thirdparty") {
        console.log("%c ⚠️ DEBUG -- display value! ", "color: orange; font-weight: bold; border: solid", { display: d }), d.value || console.log("%c ⚠️ DEBUG -- display value failed! ", "color: orange; font-weight: bold; border: solid", { display: d });
        let m = ft(d.value);
        console.log("%c ⚠️ DEBUG -- parsed display failed! ", "color: orange; font-weight: bold; border: solid", { display: d.value }), m != null && this.displays.push(m);
      }
    }
    return { success: !0, response: this.displays };
  }
  /**Delete the instance of the playlist from Bridge, this will stop the playlist from playing if it's active. */
  async deletePlaylist(e) {
    if (this.log("%c ➡️ function call: deletePlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isConnected == !1)
      return { success: !1, response: null };
    const t = e.getInstance(this.orchestration);
    let s = await C({
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
    var a, o, l;
    if (this.isConnected == !1)
      return { success: !1 };
    if (this.log("%c ➡️ function call: cast ", "color: magenta; font-weight: bold; border: solid"), this.isCastPending == !0)
      return this.warn("already casting please wait"), { success: !1 };
    if (this.displays.length == 0)
      return this.warn("no displays found"), { success: !1 };
    this.isCastPending = !0;
    let t = "Cast_" + Math.random().toString(36).substring(7), s;
    s == null && (s = new ze({
      name: t,
      loop: !0,
      items: [],
      orchestration: this.orchestration
    }), (a = this.playlists) == null || a.push(s));
    let r = s.addItem(e);
    if (r !== void 0)
      await s.play(), (o = this.playlists) == null || o.forEach((d) => {
        var u;
        d.name != t && (this.deletePlaylist(d), (u = this.playlists) == null || u.splice(this.playlists.indexOf(d), 1));
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
    var a, o, l;
    if (!this.isConnected && !(await this.connect()).success)
      return { success: !1 };
    if (console.log("%c ➡️ function call: playRemotePlaylist ", "color: magenta; font-weight: bold; border: solid"), this.isCastPending == !0)
      return { success: !1 };
    this.isCastPending = !0;
    let s = "Cast_" + Math.random().toString(36).substring(7);
    const r = new ze({
      name: s,
      loop: !0,
      items: e,
      orchestration: this.orchestration
    });
    return (a = this.playlists) == null || a.push(r), (o = this.playlists) == null || o.forEach((d) => {
      var u;
      d.name != s && (this.deletePlaylist(d), (u = this.playlists) == null || u.splice(this.playlists.indexOf(d), 1));
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
    await C({
      endpoint: "instance_studio_playlist",
      requestBody: t
    });
    const s = {
      orchestration: this.orchestration,
      name: "Studio Playlist",
      head_index: -1
    };
    return { success: !0, response: (await C({
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
    return (await C({
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
    }, t = await C({
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
    }, s = await C({
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
    }, s = await C({
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
    }, t = await C({
      endpoint: "transport_control_play",
      requestBody: e
    });
    return t.success == !1 ? { success: !1, response: null } : (this.playState = "PLAYING", { success: !0, response: t.response });
  }
  /**Pause the currently playing playlist */
  async pause() {
    let e = {
      orchestration: this.orchestration
    }, t = await C({
      endpoint: "transport_control_pause",
      requestBody: e
    });
    return t.success == !1 ? { success: !1, response: null } : (this.playState = "PAUSED", { success: !0, response: t.response });
  }
  /**Got to the next playlist item */
  async next() {
    let e = {
      orchestration: this.orchestration
    }, t = await C({
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
    }, t = await C({
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
    }, s = await C({
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
    }, a = await C({ endpoint: "update_current_entry", requestBody: r });
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
  time(e) {
    k.verbosity >= 2 && console.time(e);
  }
  timeEnd(e) {
    k.verbosity >= 2 && console.timeEnd(e);
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
let N = k;
/** the instance of the client that we create, BridgeClient is a singleton, there can only be one */
w(N, "instance"), w(N, "fallback"), /** The websocket connection to Bridge's Event Source, this returns information from Bridge */
w(N, "eventsource"), /**control how often we log to the console, 3 is everything, 0 is nothing */
w(N, "verbosity");
var x;
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
    const a = n.objectKeys(r).filter((l) => typeof r[r[l]] != "number"), o = {};
    for (const l of a)
      o[l] = r[l];
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
})(x || (x = {}));
var Re;
(function(n) {
  n.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(Re || (Re = {}));
const f = x.arrayToEnum([
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
]), q = (n) => {
  switch (typeof n) {
    case "undefined":
      return f.undefined;
    case "string":
      return f.string;
    case "number":
      return isNaN(n) ? f.nan : f.number;
    case "boolean":
      return f.boolean;
    case "function":
      return f.function;
    case "bigint":
      return f.bigint;
    case "symbol":
      return f.symbol;
    case "object":
      return Array.isArray(n) ? f.array : n === null ? f.null : n.then && typeof n.then == "function" && n.catch && typeof n.catch == "function" ? f.promise : typeof Map < "u" && n instanceof Map ? f.map : typeof Set < "u" && n instanceof Set ? f.set : typeof Date < "u" && n instanceof Date ? f.date : f.object;
    default:
      return f.unknown;
  }
}, c = x.arrayToEnum([
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
]), wt = (n) => JSON.stringify(n, null, 2).replace(/"([^"]+)":/g, "$1:");
class O extends Error {
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
          let l = s, d = 0;
          for (; d < o.path.length; ) {
            const u = o.path[d];
            d === o.path.length - 1 ? (l[u] = l[u] || { _errors: [] }, l[u]._errors.push(t(o))) : l[u] = l[u] || { _errors: [] }, l = l[u], d++;
          }
        }
    };
    return r(this), s;
  }
  static assert(e) {
    if (!(e instanceof O))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, x.jsonStringifyReplacer, 2);
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
O.create = (n) => new O(n);
const ne = (n, e) => {
  let t;
  switch (n.code) {
    case c.invalid_type:
      n.received === f.undefined ? t = "Required" : t = `Expected ${n.expected}, received ${n.received}`;
      break;
    case c.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(n.expected, x.jsonStringifyReplacer)}`;
      break;
    case c.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${x.joinValues(n.keys, ", ")}`;
      break;
    case c.invalid_union:
      t = "Invalid input";
      break;
    case c.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${x.joinValues(n.options)}`;
      break;
    case c.invalid_enum_value:
      t = `Invalid enum value. Expected ${x.joinValues(n.options)}, received '${n.received}'`;
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
      typeof n.validation == "object" ? "includes" in n.validation ? (t = `Invalid input: must include "${n.validation.includes}"`, typeof n.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${n.validation.position}`)) : "startsWith" in n.validation ? t = `Invalid input: must start with "${n.validation.startsWith}"` : "endsWith" in n.validation ? t = `Invalid input: must end with "${n.validation.endsWith}"` : x.assertNever(n.validation) : n.validation !== "regex" ? t = `Invalid ${n.validation}` : t = "Invalid";
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
      t = e.defaultError, x.assertNever(n);
  }
  return { message: t };
};
let Qe = ne;
function xt(n) {
  Qe = n;
}
function Te() {
  return Qe;
}
const Ce = (n) => {
  const { data: e, path: t, errorMaps: s, issueData: r } = n, a = [...t, ...r.path || []], o = {
    ...r,
    path: a
  };
  if (r.message !== void 0)
    return {
      ...r,
      path: a,
      message: r.message
    };
  let l = "";
  const d = s.filter((u) => !!u).slice().reverse();
  for (const u of d)
    l = u(o, { data: e, defaultError: l }).message;
  return {
    ...r,
    path: a,
    message: l
  };
}, kt = [];
function h(n, e) {
  const t = Te(), s = Ce({
    issueData: e,
    data: n.data,
    path: n.path,
    errorMaps: [
      n.common.contextualErrorMap,
      n.schemaErrorMap,
      t,
      t === ne ? void 0 : ne
      // then global default map
    ].filter((r) => !!r)
  });
  n.common.issues.push(s);
}
class S {
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
    for (const r of t) {
      const a = await r.key, o = await r.value;
      s.push({
        key: a,
        value: o
      });
    }
    return S.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, t) {
    const s = {};
    for (const r of t) {
      const { key: a, value: o } = r;
      if (a.status === "aborted" || o.status === "aborted")
        return y;
      a.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof o.value < "u" || r.alwaysSet) && (s[a.value] = o.value);
    }
    return { status: e.value, value: s };
  }
}
const y = Object.freeze({
  status: "aborted"
}), te = (n) => ({ status: "dirty", value: n }), I = (n) => ({ status: "valid", value: n }), Me = (n) => n.status === "aborted", Ae = (n) => n.status === "dirty", ce = (n) => n.status === "valid", de = (n) => typeof Promise < "u" && n instanceof Promise;
function Pe(n, e, t, s) {
  if (t === "a" && !s)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? n !== e || !s : !e.has(n))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? s : t === "a" ? s.call(n) : s ? s.value : e.get(n);
}
function Xe(n, e, t, s, r) {
  if (s === "m")
    throw new TypeError("Private method is not writable");
  if (s === "a" && !r)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? n !== e || !r : !e.has(n))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return s === "a" ? r.call(n, t) : r ? r.value = t : e.set(n, t), t;
}
var p;
(function(n) {
  n.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, n.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(p || (p = {}));
var ie, oe;
class D {
  constructor(e, t, s, r) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = s, this._key = r;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const We = (n, e) => {
  if (ce(e))
    return { success: !0, data: e.value };
  if (!n.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new O(n.common.issues);
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
  return e ? { errorMap: e, description: r } : { errorMap: (o, l) => {
    var d, u;
    const { message: m } = n;
    return o.code === "invalid_enum_value" ? { message: m ?? l.defaultError } : typeof l.data > "u" ? { message: (d = m ?? s) !== null && d !== void 0 ? d : l.defaultError } : o.code !== "invalid_type" ? { message: l.defaultError } : { message: (u = m ?? t) !== null && u !== void 0 ? u : l.defaultError };
  }, description: r };
}
class _ {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return q(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: q(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new S(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: q(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (de(t))
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
      parsedType: q(e)
    }, a = this._parseSync({ data: e, path: r.path, parent: r });
    return We(r, a);
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
      parsedType: q(e)
    }, r = this._parse({ data: e, path: s.path, parent: s }), a = await (de(r) ? r : Promise.resolve(r));
    return We(s, a);
  }
  refine(e, t) {
    const s = (r) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(r) : t;
    return this._refinement((r, a) => {
      const o = e(r), l = () => a.addIssue({
        code: c.custom,
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
    return B.create(this, this._def);
  }
  nullable() {
    return Y.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return M.create(this, this._def);
  }
  promise() {
    return ae.create(this, this._def);
  }
  or(e) {
    return pe.create([this, e], this._def);
  }
  and(e) {
    return me.create(this, e, this._def);
  }
  transform(e) {
    return new A({
      ...v(this._def),
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new be({
      ...v(this._def),
      innerType: this,
      defaultValue: t,
      typeName: g.ZodDefault
    });
  }
  brand() {
    return new Be({
      typeName: g.ZodBranded,
      type: this,
      ...v(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new we({
      ...v(this._def),
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
    return ke.create(this, e);
  }
  readonly() {
    return xe.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Tt = /^c[^\s-]{8,}$/i, Ct = /^[0-9a-z]+$/, Pt = /^[0-9A-HJKMNP-TV-Z]{26}$/, Et = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, St = /^[a-z0-9_-]{21}$/i, It = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Nt = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, jt = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Ze;
const Ot = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Zt = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, Rt = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Fe = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Mt = new RegExp(`^${Fe}$`);
function Ke(n) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return n.precision ? e = `${e}\\.\\d{${n.precision}}` : n.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function At(n) {
  return new RegExp(`^${Ke(n)}$`);
}
function et(n) {
  let e = `${Fe}T${Ke(n)}`;
  const t = [];
  return t.push(n.local ? "Z?" : "Z"), n.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function Vt(n, e) {
  return !!((e === "v4" || !e) && Ot.test(n) || (e === "v6" || !e) && Zt.test(n));
}
class R extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== f.string) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: c.invalid_type,
        expected: f.string,
        received: a.parsedType
      }), y;
    }
    const s = new S();
    let r;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (r = this._getOrReturnCtx(e, r), h(r, {
          code: c.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (r = this._getOrReturnCtx(e, r), h(r, {
          code: c.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "length") {
        const o = e.data.length > a.value, l = e.data.length < a.value;
        (o || l) && (r = this._getOrReturnCtx(e, r), o ? h(r, {
          code: c.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : l && h(r, {
          code: c.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), s.dirty());
      } else if (a.kind === "email")
        Nt.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "email",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "emoji")
        Ze || (Ze = new RegExp(jt, "u")), Ze.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "emoji",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "uuid")
        Et.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "uuid",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "nanoid")
        St.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "nanoid",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid")
        Tt.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "cuid",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid2")
        Ct.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "cuid2",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "ulid")
        Pt.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "ulid",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          r = this._getOrReturnCtx(e, r), h(r, {
            validation: "url",
            code: c.invalid_string,
            message: a.message
          }), s.dirty();
        }
      else
        a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "regex",
          code: c.invalid_string,
          message: a.message
        }), s.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (r = this._getOrReturnCtx(e, r), h(r, {
          code: c.invalid_string,
          validation: { includes: a.value, position: a.position },
          message: a.message
        }), s.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (r = this._getOrReturnCtx(e, r), h(r, {
          code: c.invalid_string,
          validation: { startsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (r = this._getOrReturnCtx(e, r), h(r, {
          code: c.invalid_string,
          validation: { endsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "datetime" ? et(a).test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          code: c.invalid_string,
          validation: "datetime",
          message: a.message
        }), s.dirty()) : a.kind === "date" ? Mt.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          code: c.invalid_string,
          validation: "date",
          message: a.message
        }), s.dirty()) : a.kind === "time" ? At(a).test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          code: c.invalid_string,
          validation: "time",
          message: a.message
        }), s.dirty()) : a.kind === "duration" ? It.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "duration",
          code: c.invalid_string,
          message: a.message
        }), s.dirty()) : a.kind === "ip" ? Vt(e.data, a.version) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "ip",
          code: c.invalid_string,
          message: a.message
        }), s.dirty()) : a.kind === "base64" ? Rt.test(e.data) || (r = this._getOrReturnCtx(e, r), h(r, {
          validation: "base64",
          code: c.invalid_string,
          message: a.message
        }), s.dirty()) : x.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _regex(e, t, s) {
    return this.refinement((r) => e.test(r), {
      validation: t,
      code: c.invalid_string,
      ...p.errToObj(s)
    });
  }
  _addCheck(e) {
    return new R({
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
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...p.errToObj(e) });
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
  base64(e) {
    return this._addCheck({ kind: "base64", ...p.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...p.errToObj(e) });
  }
  datetime(e) {
    var t, s;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (t = e == null ? void 0 : e.offset) !== null && t !== void 0 ? t : !1,
      local: (s = e == null ? void 0 : e.local) !== null && s !== void 0 ? s : !1,
      ...p.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...p.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...p.errToObj(e) });
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
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(e) {
    return this.min(1, p.errToObj(e));
  }
  trim() {
    return new R({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new R({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new R({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
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
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
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
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
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
R.create = (n) => {
  var e;
  return new R({
    checks: [],
    typeName: g.ZodString,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ...v(n)
  });
};
function Bt(n, e) {
  const t = (n.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, r = t > s ? t : s, a = parseInt(n.toFixed(r).replace(".", "")), o = parseInt(e.toFixed(r).replace(".", ""));
  return a % o / Math.pow(10, r);
}
class z extends _ {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== f.number) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: c.invalid_type,
        expected: f.number,
        received: a.parsedType
      }), y;
    }
    let s;
    const r = new S();
    for (const a of this._def.checks)
      a.kind === "int" ? x.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: c.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), r.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), h(s, {
        code: c.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), r.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), h(s, {
        code: c.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), r.dirty()) : a.kind === "multipleOf" ? Bt(e.data, a.value) !== 0 && (s = this._getOrReturnCtx(e, s), h(s, {
        code: c.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), r.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: c.not_finite,
        message: a.message
      }), r.dirty()) : x.assertNever(a);
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
    return new z({
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
    return new z({
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && x.isInteger(e.value));
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
  ...v(n)
});
class W extends _ {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== f.bigint) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: c.invalid_type,
        expected: f.bigint,
        received: a.parsedType
      }), y;
    }
    let s;
    const r = new S();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), h(s, {
        code: c.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), r.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), h(s, {
        code: c.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), r.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (s = this._getOrReturnCtx(e, s), h(s, {
        code: c.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), r.dirty()) : x.assertNever(a);
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
W.create = (n) => {
  var e;
  return new W({
    checks: [],
    typeName: g.ZodBigInt,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ...v(n)
  });
};
class ue extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== f.boolean) {
      const s = this._getOrReturnCtx(e);
      return h(s, {
        code: c.invalid_type,
        expected: f.boolean,
        received: s.parsedType
      }), y;
    }
    return I(e.data);
  }
}
ue.create = (n) => new ue({
  typeName: g.ZodBoolean,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...v(n)
});
class F extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== f.date) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: c.invalid_type,
        expected: f.date,
        received: a.parsedType
      }), y;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: c.invalid_date
      }), y;
    }
    const s = new S();
    let r;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (r = this._getOrReturnCtx(e, r), h(r, {
        code: c.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), s.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (r = this._getOrReturnCtx(e, r), h(r, {
        code: c.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), s.dirty()) : x.assertNever(a);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new F({
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
F.create = (n) => new F({
  checks: [],
  coerce: (n == null ? void 0 : n.coerce) || !1,
  typeName: g.ZodDate,
  ...v(n)
});
class Ee extends _ {
  _parse(e) {
    if (this._getType(e) !== f.symbol) {
      const s = this._getOrReturnCtx(e);
      return h(s, {
        code: c.invalid_type,
        expected: f.symbol,
        received: s.parsedType
      }), y;
    }
    return I(e.data);
  }
}
Ee.create = (n) => new Ee({
  typeName: g.ZodSymbol,
  ...v(n)
});
class he extends _ {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const s = this._getOrReturnCtx(e);
      return h(s, {
        code: c.invalid_type,
        expected: f.undefined,
        received: s.parsedType
      }), y;
    }
    return I(e.data);
  }
}
he.create = (n) => new he({
  typeName: g.ZodUndefined,
  ...v(n)
});
class fe extends _ {
  _parse(e) {
    if (this._getType(e) !== f.null) {
      const s = this._getOrReturnCtx(e);
      return h(s, {
        code: c.invalid_type,
        expected: f.null,
        received: s.parsedType
      }), y;
    }
    return I(e.data);
  }
}
fe.create = (n) => new fe({
  typeName: g.ZodNull,
  ...v(n)
});
class re extends _ {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return I(e.data);
  }
}
re.create = (n) => new re({
  typeName: g.ZodAny,
  ...v(n)
});
class X extends _ {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return I(e.data);
  }
}
X.create = (n) => new X({
  typeName: g.ZodUnknown,
  ...v(n)
});
class H extends _ {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return h(t, {
      code: c.invalid_type,
      expected: f.never,
      received: t.parsedType
    }), y;
  }
}
H.create = (n) => new H({
  typeName: g.ZodNever,
  ...v(n)
});
class Se extends _ {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const s = this._getOrReturnCtx(e);
      return h(s, {
        code: c.invalid_type,
        expected: f.void,
        received: s.parsedType
      }), y;
    }
    return I(e.data);
  }
}
Se.create = (n) => new Se({
  typeName: g.ZodVoid,
  ...v(n)
});
class M extends _ {
  _parse(e) {
    const { ctx: t, status: s } = this._processInputParams(e), r = this._def;
    if (t.parsedType !== f.array)
      return h(t, {
        code: c.invalid_type,
        expected: f.array,
        received: t.parsedType
      }), y;
    if (r.exactLength !== null) {
      const o = t.data.length > r.exactLength.value, l = t.data.length < r.exactLength.value;
      (o || l) && (h(t, {
        code: o ? c.too_big : c.too_small,
        minimum: l ? r.exactLength.value : void 0,
        maximum: o ? r.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: r.exactLength.message
      }), s.dirty());
    }
    if (r.minLength !== null && t.data.length < r.minLength.value && (h(t, {
      code: c.too_small,
      minimum: r.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.minLength.message
    }), s.dirty()), r.maxLength !== null && t.data.length > r.maxLength.value && (h(t, {
      code: c.too_big,
      maximum: r.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.maxLength.message
    }), s.dirty()), t.common.async)
      return Promise.all([...t.data].map((o, l) => r.type._parseAsync(new D(t, o, t.path, l)))).then((o) => S.mergeArray(s, o));
    const a = [...t.data].map((o, l) => r.type._parseSync(new D(t, o, t.path, l)));
    return S.mergeArray(s, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new M({
      ...this._def,
      minLength: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new M({
      ...this._def,
      maxLength: { value: e, message: p.toString(t) }
    });
  }
  length(e, t) {
    return new M({
      ...this._def,
      exactLength: { value: e, message: p.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
M.create = (n, e) => new M({
  type: n,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: g.ZodArray,
  ...v(e)
});
function ee(n) {
  if (n instanceof P) {
    const e = {};
    for (const t in n.shape) {
      const s = n.shape[t];
      e[t] = B.create(ee(s));
    }
    return new P({
      ...n._def,
      shape: () => e
    });
  } else
    return n instanceof M ? new M({
      ...n._def,
      type: ee(n.element)
    }) : n instanceof B ? B.create(ee(n.unwrap())) : n instanceof Y ? Y.create(ee(n.unwrap())) : n instanceof $ ? $.create(n.items.map((e) => ee(e))) : n;
}
class P extends _ {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = x.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== f.object) {
      const u = this._getOrReturnCtx(e);
      return h(u, {
        code: c.invalid_type,
        expected: f.object,
        received: u.parsedType
      }), y;
    }
    const { status: s, ctx: r } = this._processInputParams(e), { shape: a, keys: o } = this._getCached(), l = [];
    if (!(this._def.catchall instanceof H && this._def.unknownKeys === "strip"))
      for (const u in r.data)
        o.includes(u) || l.push(u);
    const d = [];
    for (const u of o) {
      const m = a[u], Z = r.data[u];
      d.push({
        key: { status: "valid", value: u },
        value: m._parse(new D(r, Z, r.path, u)),
        alwaysSet: u in r.data
      });
    }
    if (this._def.catchall instanceof H) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const m of l)
          d.push({
            key: { status: "valid", value: m },
            value: { status: "valid", value: r.data[m] }
          });
      else if (u === "strict")
        l.length > 0 && (h(r, {
          code: c.unrecognized_keys,
          keys: l
        }), s.dirty());
      else if (u !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const m of l) {
        const Z = r.data[m];
        d.push({
          key: { status: "valid", value: m },
          value: u._parse(
            new D(r, Z, r.path, m)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: m in r.data
        });
      }
    }
    return r.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const m of d) {
        const Z = await m.key, Le = await m.value;
        u.push({
          key: Z,
          value: Le,
          alwaysSet: m.alwaysSet
        });
      }
      return u;
    }).then((u) => S.mergeObjectSync(s, u)) : S.mergeObjectSync(s, d);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return p.errToObj, new P({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, s) => {
          var r, a, o, l;
          const d = (o = (a = (r = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(r, t, s).message) !== null && o !== void 0 ? o : s.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (l = p.errToObj(e).message) !== null && l !== void 0 ? l : d
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
    return x.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (t[s] = this.shape[s]);
    }), new P({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return x.objectKeys(this.shape).forEach((s) => {
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
    return ee(this);
  }
  partial(e) {
    const t = {};
    return x.objectKeys(this.shape).forEach((s) => {
      const r = this.shape[s];
      e && !e[s] ? t[s] = r : t[s] = r.optional();
    }), new P({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return x.objectKeys(this.shape).forEach((s) => {
      if (e && !e[s])
        t[s] = this.shape[s];
      else {
        let a = this.shape[s];
        for (; a instanceof B; )
          a = a._def.innerType;
        t[s] = a;
      }
    }), new P({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return tt(x.objectKeys(this.shape));
  }
}
P.create = (n, e) => new P({
  shape: () => n,
  unknownKeys: "strip",
  catchall: H.create(),
  typeName: g.ZodObject,
  ...v(e)
});
P.strictCreate = (n, e) => new P({
  shape: () => n,
  unknownKeys: "strict",
  catchall: H.create(),
  typeName: g.ZodObject,
  ...v(e)
});
P.lazycreate = (n, e) => new P({
  shape: n,
  unknownKeys: "strip",
  catchall: H.create(),
  typeName: g.ZodObject,
  ...v(e)
});
class pe extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = this._def.options;
    function r(a) {
      for (const l of a)
        if (l.result.status === "valid")
          return l.result;
      for (const l of a)
        if (l.result.status === "dirty")
          return t.common.issues.push(...l.ctx.common.issues), l.result;
      const o = a.map((l) => new O(l.ctx.common.issues));
      return h(t, {
        code: c.invalid_union,
        unionErrors: o
      }), y;
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
      for (const d of s) {
        const u = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, m = d._parseSync({
          data: t.data,
          path: t.path,
          parent: u
        });
        if (m.status === "valid")
          return m;
        m.status === "dirty" && !a && (a = { result: m, ctx: u }), u.common.issues.length && o.push(u.common.issues);
      }
      if (a)
        return t.common.issues.push(...a.ctx.common.issues), a.result;
      const l = o.map((d) => new O(d));
      return h(t, {
        code: c.invalid_union,
        unionErrors: l
      }), y;
    }
  }
  get options() {
    return this._def.options;
  }
}
pe.create = (n, e) => new pe({
  options: n,
  typeName: g.ZodUnion,
  ...v(e)
});
const L = (n) => n instanceof ye ? L(n.schema) : n instanceof A ? L(n.innerType()) : n instanceof ve ? [n.value] : n instanceof G ? n.options : n instanceof _e ? x.objectValues(n.enum) : n instanceof be ? L(n._def.innerType) : n instanceof he ? [void 0] : n instanceof fe ? [null] : n instanceof B ? [void 0, ...L(n.unwrap())] : n instanceof Y ? [null, ...L(n.unwrap())] : n instanceof Be || n instanceof xe ? L(n.unwrap()) : n instanceof we ? L(n._def.innerType) : [];
class je extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== f.object)
      return h(t, {
        code: c.invalid_type,
        expected: f.object,
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
    }) : (h(t, {
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
      const o = L(a.shape[e]);
      if (!o.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const l of o) {
        if (r.has(l))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(l)}`);
        r.set(l, a);
      }
    }
    return new je({
      typeName: g.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: r,
      ...v(s)
    });
  }
}
function Ve(n, e) {
  const t = q(n), s = q(e);
  if (n === e)
    return { valid: !0, data: n };
  if (t === f.object && s === f.object) {
    const r = x.objectKeys(e), a = x.objectKeys(n).filter((l) => r.indexOf(l) !== -1), o = { ...n, ...e };
    for (const l of a) {
      const d = Ve(n[l], e[l]);
      if (!d.valid)
        return { valid: !1 };
      o[l] = d.data;
    }
    return { valid: !0, data: o };
  } else if (t === f.array && s === f.array) {
    if (n.length !== e.length)
      return { valid: !1 };
    const r = [];
    for (let a = 0; a < n.length; a++) {
      const o = n[a], l = e[a], d = Ve(o, l);
      if (!d.valid)
        return { valid: !1 };
      r.push(d.data);
    }
    return { valid: !0, data: r };
  } else
    return t === f.date && s === f.date && +n == +e ? { valid: !0, data: n } : { valid: !1 };
}
class me extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), r = (a, o) => {
      if (Me(a) || Me(o))
        return y;
      const l = Ve(a.value, o.value);
      return l.valid ? ((Ae(a) || Ae(o)) && t.dirty(), { status: t.value, value: l.data }) : (h(s, {
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
me.create = (n, e, t) => new me({
  left: n,
  right: e,
  typeName: g.ZodIntersection,
  ...v(t)
});
class $ extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== f.array)
      return h(s, {
        code: c.invalid_type,
        expected: f.array,
        received: s.parsedType
      }), y;
    if (s.data.length < this._def.items.length)
      return h(s, {
        code: c.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), y;
    !this._def.rest && s.data.length > this._def.items.length && (h(s, {
      code: c.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const a = [...s.data].map((o, l) => {
      const d = this._def.items[l] || this._def.rest;
      return d ? d._parse(new D(s, o, s.path, l)) : null;
    }).filter((o) => !!o);
    return s.common.async ? Promise.all(a).then((o) => S.mergeArray(t, o)) : S.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new $({
      ...this._def,
      rest: e
    });
  }
}
$.create = (n, e) => {
  if (!Array.isArray(n))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new $({
    items: n,
    typeName: g.ZodTuple,
    rest: null,
    ...v(e)
  });
};
class ge extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== f.object)
      return h(s, {
        code: c.invalid_type,
        expected: f.object,
        received: s.parsedType
      }), y;
    const r = [], a = this._def.keyType, o = this._def.valueType;
    for (const l in s.data)
      r.push({
        key: a._parse(new D(s, l, s.path, l)),
        value: o._parse(new D(s, s.data[l], s.path, l)),
        alwaysSet: l in s.data
      });
    return s.common.async ? S.mergeObjectAsync(t, r) : S.mergeObjectSync(t, r);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, s) {
    return t instanceof _ ? new ge({
      keyType: e,
      valueType: t,
      typeName: g.ZodRecord,
      ...v(s)
    }) : new ge({
      keyType: R.create(),
      valueType: e,
      typeName: g.ZodRecord,
      ...v(t)
    });
  }
}
class Ie extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== f.map)
      return h(s, {
        code: c.invalid_type,
        expected: f.map,
        received: s.parsedType
      }), y;
    const r = this._def.keyType, a = this._def.valueType, o = [...s.data.entries()].map(([l, d], u) => ({
      key: r._parse(new D(s, l, s.path, [u, "key"])),
      value: a._parse(new D(s, d, s.path, [u, "value"]))
    }));
    if (s.common.async) {
      const l = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const d of o) {
          const u = await d.key, m = await d.value;
          if (u.status === "aborted" || m.status === "aborted")
            return y;
          (u.status === "dirty" || m.status === "dirty") && t.dirty(), l.set(u.value, m.value);
        }
        return { status: t.value, value: l };
      });
    } else {
      const l = /* @__PURE__ */ new Map();
      for (const d of o) {
        const u = d.key, m = d.value;
        if (u.status === "aborted" || m.status === "aborted")
          return y;
        (u.status === "dirty" || m.status === "dirty") && t.dirty(), l.set(u.value, m.value);
      }
      return { status: t.value, value: l };
    }
  }
}
Ie.create = (n, e, t) => new Ie({
  valueType: e,
  keyType: n,
  typeName: g.ZodMap,
  ...v(t)
});
class K extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== f.set)
      return h(s, {
        code: c.invalid_type,
        expected: f.set,
        received: s.parsedType
      }), y;
    const r = this._def;
    r.minSize !== null && s.data.size < r.minSize.value && (h(s, {
      code: c.too_small,
      minimum: r.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.minSize.message
    }), t.dirty()), r.maxSize !== null && s.data.size > r.maxSize.value && (h(s, {
      code: c.too_big,
      maximum: r.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.maxSize.message
    }), t.dirty());
    const a = this._def.valueType;
    function o(d) {
      const u = /* @__PURE__ */ new Set();
      for (const m of d) {
        if (m.status === "aborted")
          return y;
        m.status === "dirty" && t.dirty(), u.add(m.value);
      }
      return { status: t.value, value: u };
    }
    const l = [...s.data.values()].map((d, u) => a._parse(new D(s, d, s.path, u)));
    return s.common.async ? Promise.all(l).then((d) => o(d)) : o(l);
  }
  min(e, t) {
    return new K({
      ...this._def,
      minSize: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new K({
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
K.create = (n, e) => new K({
  valueType: n,
  minSize: null,
  maxSize: null,
  typeName: g.ZodSet,
  ...v(e)
});
class se extends _ {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== f.function)
      return h(t, {
        code: c.invalid_type,
        expected: f.function,
        received: t.parsedType
      }), y;
    function s(l, d) {
      return Ce({
        data: l,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Te(),
          ne
        ].filter((u) => !!u),
        issueData: {
          code: c.invalid_arguments,
          argumentsError: d
        }
      });
    }
    function r(l, d) {
      return Ce({
        data: l,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Te(),
          ne
        ].filter((u) => !!u),
        issueData: {
          code: c.invalid_return_type,
          returnTypeError: d
        }
      });
    }
    const a = { errorMap: t.common.contextualErrorMap }, o = t.data;
    if (this._def.returns instanceof ae) {
      const l = this;
      return I(async function(...d) {
        const u = new O([]), m = await l._def.args.parseAsync(d, a).catch((Oe) => {
          throw u.addIssue(s(d, Oe)), u;
        }), Z = await Reflect.apply(o, this, m);
        return await l._def.returns._def.type.parseAsync(Z, a).catch((Oe) => {
          throw u.addIssue(r(Z, Oe)), u;
        });
      });
    } else {
      const l = this;
      return I(function(...d) {
        const u = l._def.args.safeParse(d, a);
        if (!u.success)
          throw new O([s(d, u.error)]);
        const m = Reflect.apply(o, this, u.data), Z = l._def.returns.safeParse(m, a);
        if (!Z.success)
          throw new O([r(m, Z.error)]);
        return Z.data;
      });
    }
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
      args: $.create(e).rest(X.create())
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
      args: e || $.create([]).rest(X.create()),
      returns: t || X.create(),
      typeName: g.ZodFunction,
      ...v(s)
    });
  }
}
class ye extends _ {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
ye.create = (n, e) => new ye({
  getter: n,
  typeName: g.ZodLazy,
  ...v(e)
});
class ve extends _ {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return h(t, {
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
ve.create = (n, e) => new ve({
  value: n,
  typeName: g.ZodLiteral,
  ...v(e)
});
function tt(n, e) {
  return new G({
    values: n,
    typeName: g.ZodEnum,
    ...v(e)
  });
}
class G extends _ {
  constructor() {
    super(...arguments), ie.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return h(t, {
        expected: x.joinValues(s),
        received: t.parsedType,
        code: c.invalid_type
      }), y;
    }
    if (Pe(this, ie, "f") || Xe(this, ie, new Set(this._def.values), "f"), !Pe(this, ie, "f").has(e.data)) {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return h(t, {
        received: t.data,
        code: c.invalid_enum_value,
        options: s
      }), y;
    }
    return I(e.data);
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
  extract(e, t = this._def) {
    return G.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return G.create(this.options.filter((s) => !e.includes(s)), {
      ...this._def,
      ...t
    });
  }
}
ie = /* @__PURE__ */ new WeakMap();
G.create = tt;
class _e extends _ {
  constructor() {
    super(...arguments), oe.set(this, void 0);
  }
  _parse(e) {
    const t = x.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== f.string && s.parsedType !== f.number) {
      const r = x.objectValues(t);
      return h(s, {
        expected: x.joinValues(r),
        received: s.parsedType,
        code: c.invalid_type
      }), y;
    }
    if (Pe(this, oe, "f") || Xe(this, oe, new Set(x.getValidEnumValues(this._def.values)), "f"), !Pe(this, oe, "f").has(e.data)) {
      const r = x.objectValues(t);
      return h(s, {
        received: s.data,
        code: c.invalid_enum_value,
        options: r
      }), y;
    }
    return I(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
oe = /* @__PURE__ */ new WeakMap();
_e.create = (n, e) => new _e({
  values: n,
  typeName: g.ZodNativeEnum,
  ...v(e)
});
class ae extends _ {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== f.promise && t.common.async === !1)
      return h(t, {
        code: c.invalid_type,
        expected: f.promise,
        received: t.parsedType
      }), y;
    const s = t.parsedType === f.promise ? t.data : Promise.resolve(t.data);
    return I(s.then((r) => this._def.type.parseAsync(r, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
ae.create = (n, e) => new ae({
  type: n,
  typeName: g.ZodPromise,
  ...v(e)
});
class A extends _ {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === g.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), r = this._def.effect || null, a = {
      addIssue: (o) => {
        h(s, o), o.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), r.type === "preprocess") {
      const o = r.transform(s.data, a);
      if (s.common.async)
        return Promise.resolve(o).then(async (l) => {
          if (t.value === "aborted")
            return y;
          const d = await this._def.schema._parseAsync({
            data: l,
            path: s.path,
            parent: s
          });
          return d.status === "aborted" ? y : d.status === "dirty" || t.value === "dirty" ? te(d.value) : d;
        });
      {
        if (t.value === "aborted")
          return y;
        const l = this._def.schema._parseSync({
          data: o,
          path: s.path,
          parent: s
        });
        return l.status === "aborted" ? y : l.status === "dirty" || t.value === "dirty" ? te(l.value) : l;
      }
    }
    if (r.type === "refinement") {
      const o = (l) => {
        const d = r.refinement(l, a);
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
        return l.status === "aborted" ? y : (l.status === "dirty" && t.dirty(), o(l.value), { status: t.value, value: l.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((l) => l.status === "aborted" ? y : (l.status === "dirty" && t.dirty(), o(l.value).then(() => ({ status: t.value, value: l.value }))));
    }
    if (r.type === "transform")
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!ce(o))
          return o;
        const l = r.transform(o.value, a);
        if (l instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: l };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => ce(o) ? Promise.resolve(r.transform(o.value, a)).then((l) => ({ status: t.value, value: l })) : o);
    x.assertNever(r);
  }
}
A.create = (n, e, t) => new A({
  schema: n,
  typeName: g.ZodEffects,
  effect: e,
  ...v(t)
});
A.createWithPreprocess = (n, e, t) => new A({
  schema: e,
  effect: { type: "preprocess", transform: n },
  typeName: g.ZodEffects,
  ...v(t)
});
class B extends _ {
  _parse(e) {
    return this._getType(e) === f.undefined ? I(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
B.create = (n, e) => new B({
  innerType: n,
  typeName: g.ZodOptional,
  ...v(e)
});
class Y extends _ {
  _parse(e) {
    return this._getType(e) === f.null ? I(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Y.create = (n, e) => new Y({
  innerType: n,
  typeName: g.ZodNullable,
  ...v(e)
});
class be extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let s = t.data;
    return t.parsedType === f.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
be.create = (n, e) => new be({
  innerType: n,
  typeName: g.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...v(e)
});
class we extends _ {
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
    return de(r) ? r.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new O(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: r.status === "valid" ? r.value : this._def.catchValue({
        get error() {
          return new O(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
we.create = (n, e) => new we({
  innerType: n,
  typeName: g.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...v(e)
});
class Ne extends _ {
  _parse(e) {
    if (this._getType(e) !== f.nan) {
      const s = this._getOrReturnCtx(e);
      return h(s, {
        code: c.invalid_type,
        expected: f.nan,
        received: s.parsedType
      }), y;
    }
    return { status: "valid", value: e.data };
  }
}
Ne.create = (n) => new Ne({
  typeName: g.ZodNaN,
  ...v(n)
});
const Dt = Symbol("zod_brand");
class Be extends _ {
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
class ke extends _ {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return a.status === "aborted" ? y : a.status === "dirty" ? (t.dirty(), te(a.value)) : this._def.out._parseAsync({
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
    return new ke({
      in: e,
      out: t,
      typeName: g.ZodPipeline
    });
  }
}
class xe extends _ {
  _parse(e) {
    const t = this._def.innerType._parse(e), s = (r) => (ce(r) && (r.value = Object.freeze(r.value)), r);
    return de(t) ? t.then((r) => s(r)) : s(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
xe.create = (n, e) => new xe({
  innerType: n,
  typeName: g.ZodReadonly,
  ...v(e)
});
function st(n, e = {}, t) {
  return n ? re.create().superRefine((s, r) => {
    var a, o;
    if (!n(s)) {
      const l = typeof e == "function" ? e(s) : typeof e == "string" ? { message: e } : e, d = (o = (a = l.fatal) !== null && a !== void 0 ? a : t) !== null && o !== void 0 ? o : !0, u = typeof l == "string" ? { message: l } : l;
      r.addIssue({ code: "custom", ...u, fatal: d });
    }
  }) : re.create();
}
const $t = {
  object: P.lazycreate
};
var g;
(function(n) {
  n.ZodString = "ZodString", n.ZodNumber = "ZodNumber", n.ZodNaN = "ZodNaN", n.ZodBigInt = "ZodBigInt", n.ZodBoolean = "ZodBoolean", n.ZodDate = "ZodDate", n.ZodSymbol = "ZodSymbol", n.ZodUndefined = "ZodUndefined", n.ZodNull = "ZodNull", n.ZodAny = "ZodAny", n.ZodUnknown = "ZodUnknown", n.ZodNever = "ZodNever", n.ZodVoid = "ZodVoid", n.ZodArray = "ZodArray", n.ZodObject = "ZodObject", n.ZodUnion = "ZodUnion", n.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", n.ZodIntersection = "ZodIntersection", n.ZodTuple = "ZodTuple", n.ZodRecord = "ZodRecord", n.ZodMap = "ZodMap", n.ZodSet = "ZodSet", n.ZodFunction = "ZodFunction", n.ZodLazy = "ZodLazy", n.ZodLiteral = "ZodLiteral", n.ZodEnum = "ZodEnum", n.ZodEffects = "ZodEffects", n.ZodNativeEnum = "ZodNativeEnum", n.ZodOptional = "ZodOptional", n.ZodNullable = "ZodNullable", n.ZodDefault = "ZodDefault", n.ZodCatch = "ZodCatch", n.ZodPromise = "ZodPromise", n.ZodBranded = "ZodBranded", n.ZodPipeline = "ZodPipeline", n.ZodReadonly = "ZodReadonly";
})(g || (g = {}));
const Ut = (n, e = {
  message: `Input not instance of ${n.name}`
}) => st((t) => t instanceof n, e), De = R.create, nt = z.create, Lt = Ne.create, Ht = W.create, rt = ue.create, qt = F.create, zt = Ee.create, Wt = he.create, Gt = fe.create, Yt = re.create, Jt = X.create, Qt = H.create, Xt = Se.create, Ft = M.create, at = P.create, Kt = P.strictCreate, it = pe.create, es = je.create, ts = me.create, ss = $.create, ns = ge.create, rs = Ie.create, as = K.create, is = se.create, os = ye.create, V = ve.create, ls = G.create, cs = _e.create, ds = ae.create, Ge = A.create, us = B.create, hs = Y.create, fs = A.createWithPreprocess, ps = ke.create, ms = () => De().optional(), gs = () => nt().optional(), ys = () => rt().optional(), vs = {
  string: (n) => R.create({ ...n, coerce: !0 }),
  number: (n) => z.create({ ...n, coerce: !0 }),
  boolean: (n) => ue.create({
    ...n,
    coerce: !0
  }),
  bigint: (n) => W.create({ ...n, coerce: !0 }),
  date: (n) => F.create({ ...n, coerce: !0 })
}, _s = y;
var i = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: ne,
  setErrorMap: xt,
  getErrorMap: Te,
  makeIssue: Ce,
  EMPTY_PATH: kt,
  addIssueToContext: h,
  ParseStatus: S,
  INVALID: y,
  DIRTY: te,
  OK: I,
  isAborted: Me,
  isDirty: Ae,
  isValid: ce,
  isAsync: de,
  get util() {
    return x;
  },
  get objectUtil() {
    return Re;
  },
  ZodParsedType: f,
  getParsedType: q,
  ZodType: _,
  datetimeRegex: et,
  ZodString: R,
  ZodNumber: z,
  ZodBigInt: W,
  ZodBoolean: ue,
  ZodDate: F,
  ZodSymbol: Ee,
  ZodUndefined: he,
  ZodNull: fe,
  ZodAny: re,
  ZodUnknown: X,
  ZodNever: H,
  ZodVoid: Se,
  ZodArray: M,
  ZodObject: P,
  ZodUnion: pe,
  ZodDiscriminatedUnion: je,
  ZodIntersection: me,
  ZodTuple: $,
  ZodRecord: ge,
  ZodMap: Ie,
  ZodSet: K,
  ZodFunction: se,
  ZodLazy: ye,
  ZodLiteral: ve,
  ZodEnum: G,
  ZodNativeEnum: _e,
  ZodPromise: ae,
  ZodEffects: A,
  ZodTransformer: A,
  ZodOptional: B,
  ZodNullable: Y,
  ZodDefault: be,
  ZodCatch: we,
  ZodNaN: Ne,
  BRAND: Dt,
  ZodBranded: Be,
  ZodPipeline: ke,
  ZodReadonly: xe,
  custom: st,
  Schema: _,
  ZodSchema: _,
  late: $t,
  get ZodFirstPartyTypeKind() {
    return g;
  },
  coerce: vs,
  any: Yt,
  array: Ft,
  bigint: Ht,
  boolean: rt,
  date: qt,
  discriminatedUnion: es,
  effect: Ge,
  enum: ls,
  function: is,
  instanceof: Ut,
  intersection: ts,
  lazy: os,
  literal: V,
  map: rs,
  nan: Lt,
  nativeEnum: cs,
  never: Qt,
  null: Gt,
  nullable: hs,
  number: nt,
  object: at,
  oboolean: ys,
  onumber: gs,
  optional: us,
  ostring: ms,
  pipeline: ps,
  preprocess: fs,
  promise: ds,
  record: ns,
  set: as,
  strictObject: Kt,
  string: De,
  symbol: zt,
  transformer: Ge,
  tuple: ss,
  undefined: Wt,
  union: it,
  unknown: Jt,
  void: Xt,
  NEVER: _s,
  ZodIssueCode: c,
  quotelessJson: wt,
  ZodError: O
});
const j = (n, e) => i.number().refine((t) => t >= n && t <= e, {
  message: `The value should be between ${n} and ${e}`
}), bs = {
  min: 1,
  max: 50,
  range: j(1, 50),
  type: "int",
  defaultValue: 5
}, ws = {
  min: 1,
  max: 50,
  range: j(1, 50),
  type: "int",
  defaultValue: 9
}, xs = {
  min: 0.1,
  max: 10,
  range: j(0.1, 10),
  type: "float",
  defaultValue: 1
}, $e = {
  min: 0.1,
  max: 4,
  range: j(0.1, 4),
  type: "float",
  defaultValue: 1.5
}, ks = {
  min: 0,
  max: 1,
  range: j(0, 1),
  type: "float",
  defaultValue: 0
}, Ts = {
  min: -2,
  max: 2,
  range: j(-2, 2),
  type: "float",
  defaultValue: 0
}, Cs = {
  min: -2,
  max: 2,
  range: j(-2, 2),
  type: "float",
  defaultValue: 0
}, Ue = {
  min: 0.1,
  max: 4,
  range: j(0.1, 4),
  type: "float",
  defaultValue: 0
}, Ps = {
  min: -0.05,
  max: 0.05,
  range: j(-0.05, 0.05),
  type: "float",
  defaultValue: 0
}, Es = {
  min: 1,
  max: 50,
  range: j(1, 50),
  type: "int",
  defaultValue: 5
}, Ss = {
  min: 1,
  max: 50,
  range: j(1, 50),
  type: "int",
  defaultValue: 9
}, Is = {
  min: 1,
  max: 2500,
  range: j(1, 2500),
  type: "int",
  defaultValue: 45
}, ot = {
  min: -1,
  max: 1,
  range: j(-1, 1),
  type: "float",
  defaultValue: 0.01
}, lt = {
  min: 0,
  max: 3,
  range: j(0, 3),
  type: "int",
  defaultValue: 2
}, fn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ASPECT: xs,
  COLUMNS: bs,
  CROP_POS_X: Ts,
  CROP_POS_Y: Cs,
  DEPTHINESS: $e,
  DEPTH_CUTOFF: ks,
  FILTER_MODE: lt,
  FOCUS: Ps,
  GAUSSIAN_SIGMA: ot,
  QUILT_COLS: Ss,
  QUILT_ROWS: Es,
  QUILT_VIEW_COUNT: Is,
  ROWS: ws,
  ZOOM: Ue
}, Symbol.toStringTag, { value: "Module" })), pn = i.union([i.literal("quilt"), i.literal("rgbd")]), Ns = i.object({
  rows: i.number(),
  columns: i.number(),
  crop_pos_x: i.number().optional(),
  crop_pos_y: i.number().optional(),
  aspect: i.number(),
  viewCount: i.number(),
  focus: i.number().optional(),
  zoom: i.number().optional(),
  tag: i.string().optional()
}), js = i.object({
  rows: i.number().optional(),
  columns: i.number().optional(),
  crop_pos_x: i.number().optional(),
  crop_pos_y: i.number().optional(),
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
  depthiness: $e.range,
  /**Controls the Focus of the hologram */
  focus: i.number().optional(),
  /**Whether or not to cutoff depth beyond a certain point. 0 for false, 1 for true */
  depth_cutoff: i.union([i.literal(1), i.literal(0)]).optional(),
  /**Zoom can be between 0.1 and 2 */
  zoom: Ue.range,
  tag: i.string().optional()
}), Os = {
  quilt: Ns,
  rgbd: js
};
class Zs {
  constructor(e) {
    w(this, "uri");
    w(this, "type");
    w(this, "settings");
    this.uri = e.uri, this.type = "quilt", this.settings = e.settings;
  }
}
class Rs {
  constructor(e) {
    w(this, "uri");
    w(this, "type");
    w(this, "settings");
    this.uri = e.uri, this.type = "rgbd", this.settings = e.settings;
  }
}
function mn({ uri: n, type: e, settings: t }) {
  switch (Os[e].safeParse(t), e) {
    case "quilt":
      return new Zs({ uri: n, settings: t });
    case "rgbd":
      return new Rs({ uri: n, settings: t });
    default:
      throw new Error(`Invalid type: ${e}`);
  }
}
const gn = i.union([
  i.literal("focus"),
  i.literal("aspect"),
  i.literal("cols"),
  i.literal("rows"),
  i.literal("crop_pos_x"),
  i.literal("crop_pos_y"),
  i.literal("zoom"),
  i.literal("filter_mode"),
  i.literal("gaussian_sigma"),
  //rgbd specific
  i.literal("depth_loc"),
  i.literal("depth_inversion"),
  i.literal("chroma_depth"),
  i.literal("depthiness"),
  i.literal("depth_cutoff")
]), yn = i.object({
  focus: i.number().optional(),
  aspect: i.number().optional(),
  cols: i.number().optional(),
  rows: i.number().optional(),
  crop_pos_x: i.number().optional(),
  crop_pos_y: i.number().optional(),
  zoom: Ue.range,
  filter_mode: lt.range,
  gaussian_sigma: ot.range,
  //rgbd specific
  depth_loc: i.union([i.literal(0), i.literal(1), i.literal(2), i.literal(3)]),
  depth_inversion: i.union([i.literal(0), i.literal(1)]),
  chroma_depth: i.union([i.literal(0), i.literal(1)]),
  depthiness: $e.range,
  depth_cutoff: i.union([i.literal(1), i.literal(0)]).optional()
}), le = V("UNSIGNED_INT"), Ye = V("INT"), Ms = V("FLOAT");
V("INT2");
const T = V("WSTRING"), As = V("VARIANT_MAP"), Vs = V("Completion"), Bs = V("UnknownOrchestration"), Ds = V("Pending"), $s = V("Failure"), b = De(), Us = at({
  name: b,
  type: T,
  value: it([Vs, Ds, $s, Bs])
}), J = i.union([
  i.literal("Monitor Connect"),
  i.literal("Monitor Disconnect"),
  i.literal("New Item Playing"),
  i.literal("Progress Start"),
  i.literal("Progress Completion"),
  i.literal("Progress Update"),
  i.literal("Playlist Instance"),
  i.literal("Playlist Insert"),
  i.literal("Playlist Delete"),
  i.literal("Sync/Play Playlist"),
  i.literal("Sync/Play Playlist Complete"),
  i.literal("Sync/Play Playlist Cancelled"),
  i.literal("Transport Control Pause"),
  i.literal("Transport Control Play"),
  i.literal("Transport Control Next"),
  i.literal("Transport Control Previous"),
  i.literal("All Events")
]), Ls = i.object({
  event: i.object({
    name: b,
    type: T,
    value: J
  }),
  message: i.object({
    name: b,
    type: T,
    value: i.string()
  })
}), Hs = i.object({
  event: i.object({
    name: b,
    type: T,
    value: J
  }),
  head_index: i.object({
    name: b,
    type: le,
    value: i.number()
  }),
  height: i.object({
    name: b,
    type: le,
    value: i.number()
  }),
  hw: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  hw_long_name: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  hw_short_name: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  made_by_looking_glass: i.object({
    name: b,
    type: T,
    value: i.boolean()
  }),
  message: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  name: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  width: i.object({
    name: b,
    type: le,
    value: i.number()
  }),
  x: i.object({
    name: b,
    type: Ye,
    value: i.number()
  }),
  y: i.object({
    name: b,
    type: Ye,
    value: i.number()
  })
}), qs = i.object({
  event: i.object({
    name: b,
    type: T,
    value: J
  }),
  message: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  progress: i.object({
    name: b,
    type: Ms,
    value: i.number()
  }),
  progress_type: i.object({
    name: b,
    type: T,
    value: i.string()
  })
}), zs = i.object({
  event: i.object({
    name: b,
    type: T,
    value: J
  }),
  index: i.object({
    name: b,
    type: le,
    value: i.number()
  }),
  message: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  uri: i.object({
    name: b,
    type: T,
    value: i.string()
  })
}), Ws = i.object({
  event: i.object({
    name: b,
    type: T,
    value: J
  }),
  message: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  name: i.object({
    name: b,
    type: T,
    value: i.string()
  })
}), Gs = i.object({
  event: i.object({
    name: b,
    type: T,
    value: J
  }),
  message: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  name: i.object({
    name: b,
    type: T,
    value: i.string()
  })
}), Ys = i.object({
  event: i.object({
    name: b,
    type: T,
    value: J
  }),
  message: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  name: i.object({
    name: b,
    type: T,
    value: i.string()
  })
}), Js = i.object({
  event: i.object({
    name: b,
    type: T,
    value: J
  }),
  index: i.object({
    name: b,
    type: le,
    value: i.number()
  }),
  playlist_name: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  tag: i.object({
    name: b,
    type: T,
    value: i.string()
  })
}), Q = (n) => i.object({
  name: b,
  orchestration: i.object({
    name: b,
    type: T,
    value: i.string()
  }),
  payload: i.object({
    name: b,
    type: As,
    value: n
  }),
  status: Us
}), vn = Q(Hs), _n = Q(qs), bn = Q(zs), wn = Q(Ws), xn = Q(Gs), kn = Q(Ys), Tn = Q(Js), Cn = Q(Ls);
export {
  bt as AllEventsMessageHandler,
  N as BridgeClient,
  J as BridgeEvent,
  E as MessageHandler,
  Xs as MonitorConnectedMessageHandler,
  Fs as MonitorDisconnectedMessageHandler,
  _t as NewItemPlayingMessageHandler,
  ze as Playlist,
  cn as PlaylistDeleteMessageHandler,
  ln as PlaylistInsertMessageHandler,
  on as PlaylistInstanceMessageHandler,
  rn as ProgressCompletionMessageHandler,
  nn as ProgressStartMessageHandler,
  an as ProgressUpdateMessageHandler,
  Zs as QuiltHologram,
  Ns as QuiltHologramArgs,
  He as QuiltPlaylistItem,
  Rs as RGBDHologram,
  js as RGBDHologramArgs,
  qe as RGBDPlaylistItem,
  hn as SyncPlayPlaylistCancelledMessageHandler,
  un as SyncPlayPlaylistCompleteMessageHandler,
  dn as SyncPlayPlaylistMessageHandler,
  tn as TransportControlNextMessageHandler,
  Ks as TransportControlPauseMessageHandler,
  en as TransportControlPlayMessageHandler,
  sn as TransportControlPreviousMessageHandler,
  Cn as allEventsResponse,
  fn as defaults,
  xn as deletePlaylistResponse,
  mn as hologramFactory,
  Os as hologramMap,
  yn as hologramParamMap,
  pn as hologramTypeSchema,
  bn as insertPlaylistResponse,
  wn as instancePlaylistResponse,
  vn as monitorConnectResponse,
  Tn as newItemPlayingResponse,
  gn as parameterNames,
  _n as progressUpdateResponse,
  C as sendMessage,
  kn as transportControlResponse,
  ut as tryParseCalibration,
  ft as tryParseDisplay,
  ht as tryParseQuilt
};
//# sourceMappingURL=looking-glass-bridge.mjs.map

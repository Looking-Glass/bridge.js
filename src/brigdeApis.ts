import axios from "axios";

const BASE_URI = "http://localhost:3000"; // Temporary url

type PlayInput = {
  looking_glass_device_index: string;
  source: string;
};

type Yuv420pInput = {
  calibration: string;
  source: string;
  destination: string;
  encoder: string;
  crf: number;
  show_window: string;
  scale_x: number;
  scale_y: number;
};

type Yuv444pInput = {
  calibration: string;
  source: string;
  destination: string;
  encoder: string;
  crf: number;
  pixel_format: string;
};

type BridgeApiInput = {
  method: string,
  path: string,
  parameters: {}
}

interface IResponse {
  isSuccess: boolean;
  message: string;
  error?: {},
  response?: {}
}

const sendResponse = (args: IResponse) => {
  console.log(args);
  let response: IResponse = { isSuccess: args.isSuccess, message: args.message };

  if (args.error) response["error"] = args.error
  if (args.response) response["response"] = args.response

  return response
}

const bridgeApi = (args: BridgeApiInput) => {
  axios({
    method: (args.method).toUpperCase(),
    url: `${BASE_URI}/${args.path}`,
    data: args.parameters
  })
    .then((response) => {
      return sendResponse({ isSuccess: true, message: "Success", response: response.data });
    })
    .catch((error) => {
      console.log("Error: ", error);
      return sendResponse({ isSuccess: false, message: `Error in /${args.path} api`, error });
    })
}


export async function isBridgeRunning() {
  console.log("Checking if Bridge is running...");

  try {
    let response = await axios.get(BASE_URI);
    if (response.status === 200) {
      console.log("Bridge is running...");
      return sendResponse({ isSuccess: true, message: "Bridge is running...", response: response?.data });
    }

    console.log("Bridge is NOT running...");
    return sendResponse({ isSuccess: false, message: "Bridge is NOT running..." });

  } catch (error: any) {
    console.log("Error in checking Bridge status: " + error);
    return sendResponse({ isSuccess: false, message: "Error in checking Bridge status: ", error });
  }
}


export async function playContent(args: PlayInput) {
  // validation
  if (!args.looking_glass_device_index || !args.source) {
    return sendResponse({ isSuccess: false, message: "Missing paramaters" });
  }

  const checkbridgeStatus = await isBridgeRunning();
  console.log("checkbridgeStatus: ", checkbridgeStatus);

  if (!checkbridgeStatus) {
    return sendResponse({ isSuccess: false, message: "Please connect to bridge" });
  }

  return await bridgeApi({ method: "put", path: "play", parameters: args });
}


export async function encodeYuv420p(args: Yuv420pInput) {
  // validation
  if (
    !args.calibration ||
    !args.source ||
    !args.destination ||
    !args.encoder ||
    !args.crf ||
    !args.show_window ||
    !args.scale_x ||
    !args.scale_y
  ) {
    return sendResponse({ isSuccess: false, message: "Missing paramaters" });
  }

  const checkbridgeStatus = await isBridgeRunning();
  console.log("checkbridgeStatus: ", checkbridgeStatus);

  if (!checkbridgeStatus.isSuccess) {
    return sendResponse({ isSuccess: false, message: "Please connect to bridge" });
  }

  return await bridgeApi({ method: "put", path: "encode", parameters: args });

}


export async function encodeYuv444p(args: Yuv444pInput) {
  // validation
  if (
    !args.calibration ||
    !args.source ||
    !args.destination ||
    !args.encoder ||
    !args.crf ||
    !args.pixel_format
  ) {
    return sendResponse({ isSuccess: false, message: "Missing paramaters" });
  }

  const checkbridgeStatus = await isBridgeRunning();
  console.log("checkbridgeStatus: ", checkbridgeStatus);

  if (!checkbridgeStatus.isSuccess) {
    return sendResponse({ isSuccess: false, message: "Please connect to bridge" });
  }

  return await bridgeApi({ method: "put", path: "encode", parameters: args });
}

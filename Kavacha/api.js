const BASE_URL = "http://localhost:5000";
// For phone, change to your laptop IP like:
// const BASE_URL = "http://172.16.3.138:5000";

export const analyzeMessage = async (text) => {
  const res = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("Analyze failed");
  }

  return res.json();
};

export const autoDetectMessage = async (lang = "en") => {
  const res = await fetch(`${BASE_URL}/auto-detect-message?lang=${lang}`);

  if (!res.ok) {
    throw new Error("Auto message failed");
  }

  return res.json();
};

export const autoDetectFile = async (lang = "en") => {
  const res = await fetch(`${BASE_URL}/auto-detect-file?lang=${lang}`);

  if (!res.ok) {
    throw new Error("Auto file failed");
  }

  return res.json();
};

export const autoDetectCall = async (lang = "en") => {
  const res = await fetch(`${BASE_URL}/auto-detect-call?lang=${lang}`);

  if (!res.ok) {
    throw new Error("Auto call failed");
  }

  return res.json();
};

export const getEmergencyHelp = async () => {
  const res = await fetch(`${BASE_URL}/emergency-help`);

  if (!res.ok) {
    throw new Error("Emergency help failed");
  }

  return res.json();
};
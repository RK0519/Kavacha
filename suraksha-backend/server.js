const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const patterns = {
  otp: /\b(otp|one time password|ಒಟಿಪಿ)\b/i,
  bank: /\b(bank|account|kyc|atm|card|ಬ್ಯಾಂಕ್|ಖಾತೆ)\b/i,
  link: /(http|https):\/\/[^\s]+/i,
  urgent: /\b(urgent|immediately|now|blocked|suspended|ತಕ್ಷಣ|ಬ್ಲಾಕ್)\b/i,
  money: /\b(transfer|payment|reward|prize|lottery|money|ಹಣ)\b/i,
  phone: /(\+91[\s-]?\d{10}|\b\d{10}\b)/,
};

function analyzeText(text) {
  let score = 0;
  let flags = [];
  let detectedPhone = null;

  if (patterns.otp.test(text)) {
    score += 25;
    flags.push("otp");
  }

  if (patterns.bank.test(text)) {
    score += 15;
    flags.push("bank/account");
  }

  if (patterns.link.test(text)) {
    score += 25;
    flags.push("suspicious link");
  }

  if (patterns.urgent.test(text)) {
    score += 10;
    flags.push("urgency");
  }

  if (patterns.money.test(text)) {
    score += 10;
    flags.push("money trigger");
  }

  if (patterns.phone.test(text)) {
    score += 15;
    flags.push("phone number detected");

    const match = text.match(patterns.phone);
    if (match) {
      detectedPhone = match[0];
    }
  }

  if (patterns.otp.test(text) && patterns.bank.test(text) && patterns.link.test(text)) {
    score = 95;
    flags.push("critical combo: otp + bank + link");
  }

  let result = "GENUINE";
  let riskLevel = "LOW";
  let riskColor = "GREEN";
  let action = "No action needed";

  if (score >= 60) {
    result = "FRAUD";
    riskLevel = "HIGH";
    riskColor = "RED";
    action = "Emergency SOS";
  } else if (score >= 25) {
    result = "SUSPICIOUS";
    riskLevel = "MEDIUM";
    riskColor = "YELLOW";
    action = "Consult Support";
  }

  let voiceMessage = "No major risk detected. This looks safe.";

  if (patterns.otp.test(text) && score < 60) {
    voiceMessage =
      "This message contains OTP. Do not share it unless you requested it and trust the source.";
  }

  if (riskColor === "RED") {
    voiceMessage =
      "Warning. High risk fraud detected. Do not share OTP, bank details, or click suspicious links. Emergency help is opening now.";
  } else if (riskColor === "YELLOW" && !patterns.otp.test(text)) {
    voiceMessage =
      "Caution. Moderate risk detected. Please verify before taking action.";
  }

  return {
    score,
    result,
    riskLevel,
    riskColor,
    detectedWords: flags,
    action,
    voiceMessage,
    detectedPhone,
    lostMoneySteps: [
      "Contact your bank immediately and block suspicious transactions.",
      "Report the fraud to cybercrime helpline or police.",
      "Save screenshots, messages, links, and call logs as evidence.",
      "Do not share OTP, PIN, password, or bank details further.",
      "Ask a trusted family member or support person for help."
    ]
  };
}

app.get("/test", (req, res) => {
  res.send("Server is working");
});

app.post("/analyze", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "No text provided"
    });
  }

  const analysis = analyzeText(text);

  res.json({
    type: "message",
    input: text,
    ...analysis
  });
});

app.get("/auto-detect-message", (req, res) => {
  const lang = req.query.lang || "en";

  const englishMessages = [
    {
      input: "Your bank account is blocked. Click here and share OTP: http://fake-link.com",
      label: "RED"
    },
    {
      input: "Your account needs verification. Please share OTP to continue.",
      label: "YELLOW"
    },
    {
      input: "Your order has been delivered successfully.",
      label: "GREEN"
    }
  ];

  const kannadaMessages = [
    {
      input: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಬಂದ್ ಆಗಿದೆ. ಈ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ OTP ಹಂಚಿಕೊಳ್ಳಿ: http://fake-link.com",
      label: "RED"
    },
    {
      input: "ನಿಮ್ಮ ಖಾತೆ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ. ಮುಂದುವರಿಸಲು OTP ಹಂಚಿಕೊಳ್ಳಿ.",
      label: "YELLOW"
    },
    {
      input: "ನಿಮ್ಮ ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿಸಲಾಗಿದೆ.",
      label: "GREEN"
    }
  ];

  const pool = lang === "kn" ? kannadaMessages : englishMessages;
  const selected = pool[Math.floor(Math.random() * pool.length)];
  const analysis = analyzeText(selected.input);

  res.json({
    type: "message",
    language: lang,
    demoExpected: selected.label,
    input: selected.input,
    ...analysis
  });
});

app.get("/auto-detect-file", (req, res) => {
  const lang = req.query.lang || "en";

  const englishFiles = [
    {
      input: "bank_update.apk http://fake-link.com",
      fileName: "bank_update.apk",
      label: "RED"
    },
    {
      input: "account_verify_document.pdf share OTP to continue",
      fileName: "account_verify_document.pdf",
      label: "YELLOW"
    },
    {
      input: "meeting_notes.pdf",
      fileName: "meeting_notes.pdf",
      label: "GREEN"
    }
  ];

  const kannadaFiles = [
    {
      input: "bank_update.apk http://fake-link.com",
      fileName: "bank_update.apk",
      label: "RED"
    },
    {
      input: "ಖಾತೆ_ಪರಿಶೀಲನೆ.pdf OTP ಹಂಚಿಕೊಳ್ಳಿ",
      fileName: "ಖಾತೆ_ಪರಿಶೀಲನೆ.pdf",
      label: "YELLOW"
    },
    {
      input: "ಸಭೆ_ಸೂಚನೆ.pdf",
      fileName: "ಸಭೆ_ಸೂಚನೆ.pdf",
      label: "GREEN"
    }
  ];

  const pool = lang === "kn" ? kannadaFiles : englishFiles;
  const selected = pool[Math.floor(Math.random() * pool.length)];
  const analysis = analyzeText(selected.input);

  res.json({
    type: "file",
    language: lang,
    demoExpected: selected.label,
    fileName: selected.fileName,
    input: selected.input,
    ...analysis
  });
});

app.get("/auto-detect-call", (req, res) => {
  const lang = req.query.lang || "en";

  const englishCalls = [
    {
      input: "This is bank calling from +91 9876543210. Share your OTP immediately to avoid account block.",
      phoneNumber: "+91 9876543210",
      label: "RED"
    },
    {
      input: "We noticed unusual activity in your account. Please verify your details. Call us back on +91 9123456780.",
      phoneNumber: "+91 9123456780",
      label: "YELLOW"
    },
    {
      input: "Hello, this is a reminder for your meeting at 5 PM today. Call +91 9988776655 if needed.",
      phoneNumber: "+91 9988776655",
      label: "GREEN"
    }
  ];

  const kannadaCalls = [
    {
      input: "ಇದು ಬ್ಯಾಂಕ್‌ನಿಂದ ಕರೆ +91 9876543210 ರಿಂದ. ಖಾತೆ ಬ್ಲಾಕ್ ಆಗುವುದನ್ನು ತಪ್ಪಿಸಲು OTP ತಕ್ಷಣ ಹಂಚಿಕೊಳ್ಳಿ.",
      phoneNumber: "+91 9876543210",
      label: "RED"
    },
    {
      input: "ನಿಮ್ಮ ಖಾತೆಯಲ್ಲಿ ಅನುಮಾನಾಸ್ಪದ ಚಟುವಟಿಕೆ ಕಂಡುಬಂದಿದೆ. ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ. +91 9123456780 ಗೆ ಕರೆ ಮಾಡಿ.",
      phoneNumber: "+91 9123456780",
      label: "YELLOW"
    },
    {
      input: "ಇಂದು ಸಂಜೆ 5 ಗಂಟೆಗೆ ನಿಮ್ಮ ಸಭೆ ಇದೆ. ಅಗತ್ಯವಿದ್ದರೆ +91 9988776655 ಗೆ ಸಂಪರ್ಕಿಸಿ.",
      phoneNumber: "+91 9988776655",
      label: "GREEN"
    }
  ];

  const pool = lang === "kn" ? kannadaCalls : englishCalls;
  const selected = pool[Math.floor(Math.random() * pool.length)];
  const analysis = analyzeText(selected.input);

  res.json({
    type: "call",
    language: lang,
    demoExpected: selected.label,
    phoneNumber: selected.phoneNumber,
    input: selected.input,
    ...analysis
  });
});

app.get("/emergency-help", (req, res) => {
  res.json({
    police: "100",
    cyberCrime: "1930",
    bank: "Contact your bank immediately",
    message: "You may be under fraud attack. Do not share OTP or personal details."
  });
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
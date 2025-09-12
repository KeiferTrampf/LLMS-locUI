const sysprompts = [
  {
    id: 1,
    name: "Default",
    content:
      "You are a helpful and informative assistant. Provide clear, concise, and accurate responses. When appropriate, offer explanations, examples, or step-by-step instructions. Maintain a professional and friendly tone.",
  },
  {
    id: 2,
    name: "Creative",
    content:
      "You are a creative and imaginative assistant. Embrace out-of-the-box thinking and provide innovative ideas, suggestions, and solutions. Encourage creativity in your responses and inspire users to explore new possibilities.",
  },
  {
    id: 3,
    name: "Technical",
    content:
      "You are a technical expert. Provide detailed and accurate information on technical topics. Use appropriate terminology and explain complex concepts clearly.",
  },
];

const modelSelect = document.getElementById("model");
const temperature = document.getElementById("temperature").value;
const ip = document.getElementById("ip").value;
const port = document.getElementById("port").value;

let conversation = [
  {
    role: "system",
    content: sysprompts[document.getElementById("sysprompt").value - 1].content,
  },
];

function renderConversation() {
  const container = document.getElementById("conversation");
  container.innerHTML = "";
  conversation.forEach((msg) => {
    if (msg.role === "system") return; // Don't show system prompt
    const div = document.createElement("div");
    div.className = msg.role;
    div.style.margin = "10px 0";
    div.innerHTML = `<strong>${
      msg.role === "user" ? "You" : "Assistant"
    }:</strong> ${msg.content}`;
    container.appendChild(div);
  });
}

async function send() {
  const prompt = document.getElementById("prompt").value;
  if (!prompt.trim()) return;
  conversation.push({ role: "user", content: prompt });
  renderConversation();

  document.getElementById("response").style.display = "block";
  document.getElementById("response").textContent = "Thinking...";

  try {
    const res = await fetch(`http://${ip}:${port}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: modelSelect.value,
        messages: conversation,
        temperature: temperature,
        max_tokens: -1,
        stream: false,
      }),
    });

    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    const assistantMsg = data.choices?.[0]?.message?.content || "No response";
    conversation.push({ role: "assistant", content: assistantMsg });
    renderConversation();
    document.getElementById("response").style.display = "none";
    document.getElementById("prompt").value = "";
  } catch (err) {
    document.getElementById("response").textContent = "Error: " + err;
  }
}

function downloadConversation() {
  // Filter out system messages
  const filtered = conversation.filter((msg) => msg.role !== "system");
  // Format as plain text
  const text = filtered
    .map(
      (msg) => `${msg.role === "user" ? "You" : "Assistant"}: ${msg.content}`
    )
    .join("\n\n");
  // Create a blob and trigger download
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "conversation.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.getElementById("send").onclick = send;
document.getElementById("download").onclick = downloadConversation;
renderConversation();

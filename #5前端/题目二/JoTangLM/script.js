// 全局变量
let currentChatId = null;
let chats = {};

// DOM 元素
const chatList = document.getElementById("chat-list");
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const newChatButton = document.getElementById("new-chat");
const themeSelect = document.getElementById("theme-select");
const responseLengthSlider = document.getElementById("response-length");
const responseLengthValue = document.getElementById("response-length-value");
const aiTemperatureSlider = document.getElementById("ai-temperature");
const aiTemperatureValue = document.getElementById("ai-temperature-value");

// 初始化  添加键盘事件监听器
function init() {
  loadChats();
  loadSettings();
  newChat();

  sendButton.addEventListener("click", sendMessage);
  newChatButton.addEventListener("click", newChat);
  themeSelect.addEventListener("change", updateTheme);
  responseLengthSlider.addEventListener("input", updateResponseLength);
  aiTemperatureSlider.addEventListener("input", updateAITemperature);

  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); //阻止默认的回车键行为
      sendMessage();
    }
  });
}

// 加载保存的会话
function loadChats() {
  const savedChats = localStorage.getItem("chats");
  if (savedChats) {
    chats = JSON.parse(savedChats);
    Object.keys(chats).forEach((chatId) => {
      addChatToList(chatId);
    });
  }
}

// 保存会话
function saveChats() {
  localStorage.setItem("chats", JSON.stringify(chats));
}

// 新建会话
function newChat() {
  const chatId = "chat_" + Date.now();
  chats[chatId] = [];
  addChatToList(chatId);
  switchChat(chatId);
}

// 添加会话到列表
function addChatToList(chatId) {
  const li = document.createElement("li");
  li.textContent = `会话 ${chatList.children.length + 1}`;
  li.dataset.chatId = chatId;
  li.addEventListener("click", () => switchChat(chatId));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "删除"; //删除键
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteChat(chatId);
  });

  li.appendChild(deleteButton);
  chatList.appendChild(li);
}

// 切换会话
function switchChat(chatId) {
  currentChatId = chatId;
  chatMessages.innerHTML = "";
  chats[chatId].forEach((message) => {
    displayMessage(message.content, message.sender);
  });

  // 更新活动状态
  document.querySelectorAll("#chat-list li").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.chatId === chatId) {
      li.classList.add("active");
    }
  });
}

// 删除会话
function deleteChat(chatId) {
  delete chats[chatId];
  saveChats();
  document.querySelector(`li[data-chat-id="${chatId}"]`).remove();
  if (currentChatId === chatId) {
    const firstChat = Object.keys(chats)[0];
    if (firstChat) {
      switchChat(firstChat);
    } else {
      newChat();
    }
  }
}

// 发送消息
function sendMessage() {
  const message = userInput.value.trim();
  if (message) {
    displayMessage(message, "user");
    chats[currentChatId].push({ content: message, sender: "user" });
    saveChats();
    userInput.value = "";

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      displayMessage(aiResponse, "ai");
      chats[currentChatId].push({ content: aiResponse, sender: "ai" });
      saveChats();
    }, 1000);
  }
}

// 显示消息
function displayMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", `${sender}-message`);

  if (sender === "ai") {
    const avatarImg = document.createElement("img");
    avatarImg.src = "./image/welcome.jpg";
    avatarImg.alt = "AI Avatar";
    avatarImg.classList.add("ai-avatar");
    messageElement.appendChild(avatarImg);
  }

  const messageContent = document.createElement("div");
  messageContent.textContent = message;
  messageElement.appendChild(messageContent);

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 模拟AI回复
function generateAIResponse(userMessage) {
  const responses = [
    "喵喵喵。",
    "让我想想...",
    "根据我的理解...",
    "JoTangLM本质是一个复读机。",
    "你说得对。",
  ];
  return (
    responses[Math.floor(Math.random() * responses.length)] +
    " " +
    userMessage.substring(0, parseInt(responseLengthSlider.value))
  );
}

// 加载设置
function loadSettings() {
  const theme = localStorage.getItem("theme") || "light";
  themeSelect.value = theme;
  updateTheme();

  const responseLength = localStorage.getItem("responseLength") || 10;
  responseLengthSlider.value = responseLength;
  responseLengthValue.textContent = responseLength;

  const aiTemperature = localStorage.getItem("aiTemperature") || 80;
  aiTemperatureSlider.value = aiTemperature;
  aiTemperatureValue.textContent = aiTemperature;
}

// 更新主题
function updateTheme() {
  document.body.classList.toggle("dark-theme", themeSelect.value === "dark");
  localStorage.setItem("theme", themeSelect.value);
}

// 更新回复长度
function updateResponseLength() {
  responseLengthValue.textContent = responseLengthSlider.value;
  localStorage.setItem("responseLength", responseLengthSlider.value);
}

// 更新IQ
function updateAITemperature() {
  aiTemperatureValue.textContent = aiTemperatureSlider.value;
  localStorage.setItem("aiTemperature", aiTemperatureSlider.value);
}

// 初始化应用
init();

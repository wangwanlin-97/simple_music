// Check if the message component exists
function check() {
  const messageContainer = document.getElementById("simple-music-message")

  if (!messageContainer) {
    // Create a new message element
    const messageContainer = document.createElement("div")
    messageContainer.id = "simple-music-message"
    messageContainer.style.position = "fixed"
    messageContainer.style.top = "0"
    messageContainer.style.left = "0"
    // messageContainer.style.width = "200px"
    messageContainer.style.zIndex = "9999"
    document.body.appendChild(messageContainer)
    return messageContainer // Return the created or existing message container
  }
  return messageContainer
}

// Function to add a new message
export function addMessage(message) {
  if (!message.message) {
    return
  }
  const messageContainer = check()
  const id = "simple-music-message-" + Date.now() // Unique ID for each message
  const messageItem = document.createElement("div")
  messageItem.id = id
  messageItem.textContent = message.message // Set the message text
  messageItem.style.border = "1px solid #ccc" // Optional: Add some styling
  messageItem.style.margin = "5px" // Optional: Add margin
  messageItem.style.padding = "5px" // Optional: Add padding
  messageItem.style.backgroundColor = "#f9f9f9" // Optional: Background color
  messageItem.style.borderRadius = "3px" // Optional: Rounded corners
  if ((message.type = "error")) {
    messageItem.style.color = "red"
  } else if ((message.type = "success")) {
    messageItem.style.color = "green"
  } else {
    messageItem.style.color = "black"
  }

  // Append the message item to the container
  messageContainer.appendChild(messageItem)

  // Remove the message after a duration
  setTimeout(() => {
    removeMessage(id)
  }, message.duration || 3000)
}

// Function to remove a message by ID
function removeMessage(id) {
  const targetItem = document.getElementById(id)
  if (targetItem) {
    targetItem.remove() // Remove the message item if it exists
  }
}

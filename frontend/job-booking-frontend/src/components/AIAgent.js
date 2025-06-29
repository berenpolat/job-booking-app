import React, { useState } from "react";
import axios from "axios";

const AIAgent = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const ask = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE}/ask`, { message: input });
    setResponse(res.data.reply);
  };

  return (
    <div>
      <h2>AI Assistant</h2>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask something..." />
      <button onClick={ask}>Ask</button>
      <p><strong>Response:</strong> {response}</p>
    </div>
  );
};

export default AIAgent;

import React, { useState, useEffect, useRef } from 'react';
import { MdSend, MdChat, MdHelpOutline } from 'react-icons/md';

function AIAssistant() {
  // 1. Array array containing message objects { id, sender, text, timestamp }
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'gemini',
      text: "Hello! I am your AI Herpetologist Assistant, powered by Gemini. Ask me anything about your tortoise's diet, light setups, humidity ranges, enclosure sizes, or general husbandry habits.",
      timestamp: 'Just now'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Ref hook to cleanly manage view focus on new message receipt
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 2. Simulated message responder logic
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input.trim(),
      timestamp: userMessageTime
    };

    setMessages((prev) => [...prev, userMessage]);
    const cachedQuery = input.trim();
    setInput('');
    setIsTyping(true);

    // Simulated network processing latency window
    setTimeout(() => {
      setIsTyping(false);
      const assistantMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      let replyText = "That's an excellent question regarding reptile husbandry. For most tortoises, ensuring microclimates with distinct warm basking regions and damp burrow hideouts is essential.";
      
      // Basic match logic to mirror your wireframe asset demonstration
      if (cachedQuery.toLowerCase().includes('diet') || cachedQuery.toLowerCase().includes('sulcata')) {
        replyText = "A proper Sulcata tortoise diet consists primarily of high-fiber grasses, weeds, and hays (e.g., orchard hay or Timothy grass). Supplement with safe greens like hibiscus leaves, dandelion greens, and opuntia cactus pads. Avoid feeding fruit entirely, as their digestive tracts cannot process high sugar contents safely without causing severe blooms of harmful gut bacteria.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'gemini',
          text: replyText,
          timestamp: assistantMessageTime
        }
      ]);
    }, 1200);
  };

  return (
    <div className="ai-assistant-page">
      {/* HEADER META STRIP */}
      <header className="ai-page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, color: '#091e16', fontSize: '24px', fontWeight: '800' }}>
          Herpetologist AI Assistant
        </h1>
        <p style={{ color: '#166534', marginTop: '6px', fontSize: '14px', fontWeight: '500' }}>
          Consult with Gemini on specialized, science-backed tortoise care, nutrition guidelines, and habitat regulations.
        </p>
      </header>

      {/* CORE FLOATING WORKSPACE CONTAINER */}
      <div className="ai-chat-card-container" style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(9, 30, 22, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 240px)', // Keeps chat bounded to window frame dynamically
        minHeight: '480px',
        overflow: 'hidden',
        border: '1px solid rgba(4, 138, 96, 0.1)'
      }}>
        
        {/* TOP INTERFACE UTILITY BAR */}
        <div className="chat-top-bar" style={{
          padding: '16px 24px',
          borderBottom: '1px solid #eefbf4',
          backgroundColor: '#fafefe',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            backgroundColor: '#eefbf4',
            color: '#048a60',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MdChat size={18} />
          </div>
          <div>
            <div style={{ fontWeight: '700', color: '#091e16', fontSize: '14px' }}>Ask ShellSchedule AI</div>
            <div style={{ fontSize: '11px', color: '#048a60', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: '#048a60', borderRadius: '50%', display: 'inline-block' }}></span>
              Optimized Herpetology Model Live
            </div>
          </div>
        </div>

        {/* SCROLLABLE MESSAGE DISPLAY PANELS */}
        <div className="chat-messages-viewport" style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          backgroundColor: '#fcfefe',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`chat-bubble-row ${isUser ? 'user-align' : 'gemini-align'}`}
                style={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  width: '100%'
                }}
              >
                <div 
                  className="message-bubble"
                  style={{
                    maxWidth: '75%',
                    padding: '14px 18px',
                    borderRadius: isUser ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                    backgroundColor: isUser ? '#048a60' : '#ffffff',
                    color: isUser ? '#ffffff' : '#091e16',
                    border: isUser ? 'none' : '1px solid #e2e8f0',
                    boxShadow: isUser ? '0 2px 8px rgba(4, 138, 96, 0.15)' : '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    marginBottom: '4px',
                    color: isUser ? 'rgba(255,255,255,0.8)' : '#166534'
                  }}>
                    {isUser ? 'You' : 'ShellSchedule AI (Gemini)'}
                  </div>
                  
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                    {msg.text}
                  </p>
                  
                  <div style={{ 
                    fontSize: '10px', 
                    textAlign: 'right', 
                    marginTop: '6px',
                    color: isUser ? 'rgba(255,255,255,0.6)' : '#8c9ba5'
                  }}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* DYNAMIC TYPING DOTS INDICATOR */}
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '12px 18px',
                borderRadius: '18px 18px 18px 2px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{ color: '#166534', fontSize: '12px', fontWeight: '500', marginRight: '4px' }}>Gemini is thinking</span>
                <span style={{ animation: 'pulse 1s infinite alternate', width: '6px', height: '6px', backgroundColor: '#048a60', borderRadius: '50%' }}></span>
                <span style={{ animation: 'pulse 1s infinite alternate 0.2s', width: '6px', height: '6px', backgroundColor: '#048a60', borderRadius: '50%' }}></span>
                <span style={{ animation: 'pulse 1s infinite alternate 0.4s', width: '6px', height: '6px', backgroundColor: '#048a60', borderRadius: '50%' }}></span>
              </div>
            </div>
          )}
          
          {/* Virtual point element used to anchor automated down-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* BOTTOM INTERACTIVE DOCK INPUT WRAPPER */}
        <form onSubmit={handleSendMessage} style={{
          padding: '20px 24px',
          borderTop: '1px solid #eefbf4',
          backgroundColor: '#ffffff',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your husbandry question here..."
            disabled={isTyping}
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: '12px',
              border: '1px solid #c2ffd8',
              backgroundColor: '#eefbf4',
              color: '#091e16',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#048a60'}
            onBlur={(e) => e.target.style.borderColor = '#c2ffd8'}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            style={{
              backgroundColor: (!input.trim() || isTyping) ? '#e2e8f0' : '#048a60',
              color: (!input.trim() || isTyping) ? '#8c9ba5' : '#ffffff',
              border: 'none',
              borderRadius: '12px',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: (!input.trim() || isTyping) ? 'not-allowed' : 'pointer',
              transition: 'transform 0.1s, background-color 0.2s'
            }}
          >
            <MdSend size={18} />
          </button>
        </form>

        {/* COMPLIANCE HINT FOOTER FOOTNOTE */}
        <div style={{
          padding: '6px 24px 10px',
          fontSize: '11px',
          color: '#166534',
          backgroundColor: '#ffffff',
          borderTop: 'none',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px'
        }}>
          <MdHelpOutline size={12} />
          AI insights serve as support guidelines. Always cross-reference with exotic veterinarians for diagnostic issues.
        </div>

      </div>
    </div>
  );
}

export default AIAssistant;
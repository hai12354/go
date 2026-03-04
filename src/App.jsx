import React, { useState, useEffect, useRef } from 'react';
import { db } from './firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import RevealOnScroll from './RevealOnScroll'; // XÓA FILE CŨ NÀY ĐI
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'; // THÊM NÀY
import './index.css';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const fadeInUp = {
  hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2 // Các con hiện cách nhau 0.2s
    }
  }
};

const floatingLeaf = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    x: [0, 10, 0],
    transition: {
      duration: 5, // Trôi rất chậm (5 giây)
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function App() {
  // ... (Giữ nguyên State & Logic Chatbot/Form cũ của bạn ở đây) ...
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Chào bạn! Tôi là trợ lý ảo của WoodMart. Bạn cần tư vấn nội thất cho không gian nào?", sender: 'bot' }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const chatBodyRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Parallax Scroll Hook
  const { scrollY } = useScroll();
  const yHeroText = useTransform(scrollY, [0, 500], [0, 200]); // Text trôi chậm hơn khi scroll
  const yLeaf1 = useTransform(scrollY, [0, 500], [0, -150]);   // Lá trôi ngược lên

  // ... (Giữ nguyên useEffect Scroll Spy & Chatbot Logic) ...
  useEffect(() => {
      const handleScroll = () => {
        const sections = document.querySelectorAll('section');
        let current = 'hero';
        sections.forEach((section) => {
          if (window.scrollY >= section.offsetTop - 300) {
            current = section.getAttribute('id');
          }
        });
        setActiveSection(current);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const toggleChat = () => setChatOpen(!chatOpen);
    
    useEffect(() => {
      if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, [messages, chatOpen]);
  
    const handleSendChat = async () => {
      if (!inputMsg.trim()) return;
      const newMessages = [...messages, { text: inputMsg, sender: 'user' }];
      setMessages(newMessages);
      setInputMsg("");
      setIsAiThinking(true);
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: `Bạn là trợ lý nội thất hiện đại. Trả lời ngắn gọn, tiếng Việt, thân thiện. Khách hỏi: ${inputMsg}` }] }] })
        });
        const data = await response.json();
        setMessages([...newMessages, { text: data.candidates[0].content.parts[0].text, sender: 'bot' }]);
      } catch (error) {
        setMessages([...newMessages, { text: "Kết nối hơi chậm, bạn chờ chút nhé.", sender: 'bot' }]);
      } finally { setIsAiThinking(false); }
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, "tu_van"), { ...formData, createdAt: serverTimestamp() });
        alert("Đã gửi thành công! WoodMart sẽ liên hệ bạn sớm.");
        setFormData({ name: '', phone: '', message: '' });
      } catch (error) { alert("Lỗi gửi đơn, vui lòng thử lại."); } finally { setIsSubmitting(false); }
    };

  const products = [
    { id: 1, img: "thong.png", name: "Gỗ Thông (Pine)", price: "2.000.000₫" },
    { id: 2, img: "soi.png", name: "Gỗ Sồi Trắng", price: "8.500.000₫" },
    { id: 3, img: "oc_cho.png", name: "Gỗ Óc Chó Mỹ", price: "25.000.000₫" },
    { id: 4, img: "lim.png", name: "Gỗ Lim Xanh", price: "15.000.000₫" },
    { id: 5, img: "bach_dan.png", name: "Gỗ Bạch Đàn", price: "1.800.000₫" },
    { id: 6, img: "dan_huong.png", name: "Gỗ Đàn Hương", price: "Liên hệ" },
  ];

  return (
    <div className="App">
      <header className="main-header glass-morphism">
         {/* ... (Giữ nguyên Header) ... */}
         <div className="container">
          <a href="#hero" className="logo">WoodMart<span className="dot">.</span>vn</a>
          <nav className="main-nav">
            <ul>
              <li><a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Trang chủ</a></li>
              <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>Câu chuyện</a></li>
              <li><a href="#products" className={activeSection === 'products' ? 'active' : ''}>Sản phẩm</a></li>
              <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Liên hệ</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION - ANIMATED */}
        <section id="hero">
          <div className="tropical-mist"></div>
          {/* Lá bay động */}
          <motion.div className="floating-leaf leaf-1" variants={floatingLeaf} animate="animate" style={{ y: yLeaf1 }}></motion.div>
          <motion.div className="floating-leaf leaf-2" variants={floatingLeaf} animate="animate" transition={{ delay: 2 }}></motion.div>

          {/* Card xuất hiện mượt mà */}
          <motion.div 
            className="hero-glass-card wet-glass"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{ y: yHeroText }} // Parallax effect cho cả card
          >
            <span className="badge">Tropical Living 2026</span>
            <h1>Sống Xanh <br/> <span className="text-outline">Phong Cách Mới</span></h1>
            <p>Biến ngôi nhà thành không gian nghỉ dưỡng nhiệt đới với nội thất gỗ tự nhiên, hiện đại và tối giản.</p>
            <div className="btn-group">
              <motion.a href="#products" className="cta-button primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Khám Phá Ngay</motion.a>
              <motion.a href="#about" className="cta-button secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Tìm Hiểu Thêm</motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Cuộn để cảm nhận</span>
            <div className="arrow-down">↓</div>
          </motion.div>
        </section>

        {/* ABOUT SECTION - SCROLL REVEAL */}
        <section id="about">
          <div className="watermark-text">TROPICAL</div>
          <div className="organic-blob"></div>
          
          <div className="container">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Triết Lý Của Chúng Tôi
            </motion.h2>

            <motion.div 
              className="about-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="about-card highlight wet-glass" variants={fadeInUp}>
                <h3>Hiện Đại & Bền Vững</h3>
                <p>
                  WoodMart không chỉ bán gỗ. Chúng tôi mang đến giải pháp "thở" cho không gian sống đô thị ngột ngạt. 
                  Sự kết hợp hoàn hảo giữa vân gỗ mộc mạc và thiết kế đương đại (Modernism).
                </p>
                <div className="stat-row">
                  <div><strong>10+</strong><br/>Năm kinh nghiệm</div>
                  <div><strong>500+</strong><br/>Dự án</div>
                </div>
              </motion.div>
              <motion.div className="about-card img-card" variants={fadeInUp}>
                <div className="about-img-box tropical-border">
                  <motion.img 
                    src="/images/intro.jpg" 
                    alt="Xưởng gỗ hiện đại" 
                    whileHover={{ scale: 1.1 }} // Zoom ảnh nhẹ khi hover
                    transition={{ duration: 0.6 }}
                  />
                  <div className="img-overlay-text glass-tag">Crafted with Nature</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* PRODUCTS SECTION - STAGGERED GRID */}
        <section id="products">
          <div className="container">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Bộ Sưu Tập Mới
            </motion.h2>
            <p className="section-subtitle">Tinh hoa từ những cánh rừng bền vững</p>
            
            <motion.div 
              className="product-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {products.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="product-card"
                  variants={fadeInUp} // Mỗi card sẽ hiện lên từ từ theo thứ tự
                  whileHover={{ y: -10, rotate: 1 }} // Hover effect bằng JS mượt hơn CSS
                >
                  <div className="img-wrapper">
                     <img src={`/images/${item.img}`} alt={item.name} className="product-img" />
                     {index < 2 && <span className="card-badge">Best Seller</span>}
                  </div>
                  <div className="product-info">
                    <h3>{item.name}</h3>
                    <div className="price-row">
                      <span className="price">{item.price}</span>
                      <motion.a href="#contact" className="btn-icon" whileTap={{ scale: 0.8 }}>+</motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHY US - 3 CỘT XUẤT HIỆN LẦN LƯỢT */}
        <section id="why-us">
          <div className="wood-texture-overlay"></div>
          <div className="container">
            <h2 className="section-title light">Tại Sao Chọn WoodMart?</h2>
            <motion.div 
              className="why-us-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Lặp lại logic variants cho từng item */}
              <motion.div className="why-us-item wet-glass-dark" variants={fadeInUp}>
                <div className="step-number">01</div>
                <div className="icon-modern">🌿</div>
                <h3>Thân Thiện</h3>
                <p>Gỗ rừng trồng đạt chuẩn FSC, phù hợp khí hậu nhiệt đới nóng ẩm.</p>
              </motion.div>
              <motion.div className="why-us-item wet-glass-dark" variants={fadeInUp}>
                <div className="step-number">02</div>
                <div className="icon-modern">✨</div>
                <h3>Tối Giản</h3>
                <p>Thiết kế Minimalism, thoáng khí, chống cong vênh.</p>
              </motion.div>
              <motion.div className="why-us-item wet-glass-dark" variants={fadeInUp}>
                <div className="step-number">03</div>
                <div className="icon-modern">🛡️</div>
                <h3>Bảo Hành</h3>
                <p>Cam kết chất lượng trọn đời, chịu được gió mùa.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact">
          <div className="jungle-pattern"></div>
          <div className="container relative-z">
            <div className="contact-layout">
              <motion.div 
                className="contact-text"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title light align-left">Nhận Tư Vấn <br/> Miễn Phí</h2>
                <p className="contact-desc">Để lại thông tin, đội ngũ kiến trúc sư của chúng tôi sẽ liên hệ tư vấn giải pháp phù hợp nhất.</p>
                <ul className="contact-info">
                  <li className="glass-item">📍 Số 2, Đường Trường Sa, TP. HCM</li>
                  <li className="glass-item">📞 (028) 3512 3198</li>
                  <li className="glass-item">✉️ truyenthongtls@tlu.edu.vn</li>
                </ul>
              </motion.div>
              
              <motion.form 
                className="form-box wet-glass-light" 
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3>Gửi Yêu Cầu</h3>
                <input className="modern-input" type="text" name="name" placeholder="Họ và tên" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input className="modern-input" type="tel" name="phone" placeholder="Số điện thoại" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <textarea className="modern-input" name="message" rows="4" placeholder="Bạn cần hỗ trợ gì?" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                <motion.button 
                  type="submit" 
                  className="cta-button primary full-width" 
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi Ngay"}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <p>&copy; 2026 WoodMart Vietnam. Kiến tạo không gian sống nhiệt đới.</p>
      </footer>

      {/* CHATBOT ANIMATION */}
      <AnimatePresence>
        <motion.div 
          id="chat-toggle-button" 
          onClick={toggleChat}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </motion.div>

        {chatOpen && (
          <motion.div 
            id="chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* ... (Nội dung chat giữ nguyên) ... */}
             <div className="chat-header">
                <div>
                  <h3 style={{display:'inline-block', fontSize:'1rem', margin:0}}>Hỗ trợ trực tuyến</h3>
                  <div style={{marginLeft: '10px', display:'inline-block'}}><span className="status-dot"></span><small style={{opacity:0.8}}>Sẵn sàng</small></div>
                </div>
                <button onClick={toggleChat} style={{background:'none', border:'none', fontSize:'1.5rem', cursor:'pointer', color: 'white'}}>&times;</button>
              </div>
              <div className="chat-body" ref={chatBodyRef}>
                {messages.map((msg, i) => (
                  <div key={i} className={`chat-msg ${msg.sender}`}>
                    {msg.text}
                  </div>
                ))}
                {isAiThinking && <div className="chat-msg bot">...</div>}
              </div>
              <div className="chat-input-area">
                <input type="text" className="chat-input-field" placeholder="Nhập tin nhắn..." value={inputMsg} onChange={(e)=>setInputMsg(e.target.value)} onKeyPress={(e)=>e.key==='Enter' && handleSendChat()} />
                <button className="chat-send" onClick={handleSendChat}>➤</button>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
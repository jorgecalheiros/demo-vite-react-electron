import { useState, useEffect } from 'react'
import './Demo.css'

function Demo() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [counter, setCounter] = useState(0)
  const [color, setColor] = useState('#3b82f6')
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const demoText = "Claude Code em ação! 🚀"

  // Efeito de digitação
  useEffect(() => {
    if (isTyping && text.length < demoText.length) {
      const timeout = setTimeout(() => {
        setText(demoText.slice(0, text.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [text, isTyping])

  // Contador automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => (prev + 1) % 100)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newParticle = { id: Date.now(), x, y }
    setParticles(prev => [...prev, newParticle])

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id))
    }, 1000)
  }

  const randomColor = () => {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`demo-container ${theme}`}>
      <div className="demo-header">
        <h1 className="demo-title">
          Demonstração de Poder 💪
        </h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="demo-grid">
        {/* Card 1: Área de Partículas */}
        <div className="demo-card" onClick={handleClick}>
          <h2>Área Interativa</h2>
          <p>Clique em qualquer lugar para criar partículas!</p>
          <div className="particle-area">
            {particles.map(particle => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  left: particle.x,
                  top: particle.y,
                  backgroundColor: color
                }}
              />
            ))}
          </div>
        </div>

        {/* Card 2: Contador Animado */}
        <div className="demo-card">
          <h2>Contador Dinâmico</h2>
          <div className="counter-display" style={{ color }}>
            {counter}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${counter}%`,
                backgroundColor: color
              }}
            />
          </div>
        </div>

        {/* Card 3: Seletor de Cores */}
        <div className="demo-card">
          <h2>Paleta de Cores</h2>
          <div className="color-display" style={{ backgroundColor: color }}>
            {color}
          </div>
          <button className="color-button" onClick={randomColor}>
            Mudar Cor
          </button>
        </div>

        {/* Card 4: Efeito de Digitação */}
        <div className="demo-card">
          <h2>Efeito de Digitação</h2>
          <div className="typing-text">
            {text}
            <span className="cursor">|</span>
          </div>
          <button
            className="typing-button"
            onClick={() => {
              setText('')
              setIsTyping(true)
            }}
            disabled={isTyping && text.length < demoText.length}
          >
            {isTyping && text.length < demoText.length ? 'Digitando...' : 'Iniciar'}
          </button>
        </div>

        {/* Card 5: Estatísticas */}
        <div className="demo-card stats-card">
          <h2>Estatísticas em Tempo Real</h2>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-value">{particles.length}</span>
              <span className="stat-label">Partículas Ativas</span>
            </div>
            <div className="stat">
              <span className="stat-value">{counter}%</span>
              <span className="stat-label">Progresso</span>
            </div>
            <div className="stat">
              <span className="stat-value">{text.length}</span>
              <span className="stat-label">Caracteres</span>
            </div>
          </div>
        </div>

        {/* Card 6: Sistema Info */}
        <div className="demo-card">
          <h2>Informações do Sistema</h2>
          <div className="system-info">
            <p><strong>Framework:</strong> React 19</p>
            <p><strong>Build Tool:</strong> Vite</p>
            <p><strong>Desktop:</strong> Electron</p>
            <p><strong>Linguagem:</strong> TypeScript</p>
          </div>
        </div>
      </div>

      <div className="demo-footer">
        <p>Criado por Claude Code - Demonstrando capacidades de desenvolvimento</p>
      </div>
    </div>
  )
}

export default Demo

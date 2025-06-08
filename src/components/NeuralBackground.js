import React, { useEffect, useRef, useState } from 'react';

const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        throw new Error('Canvas element not found');
      }
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('2D context not available');
      }

      class NeuralParticle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.vx = Math.random() * 2 - 1;
          this.vy = Math.random() * 2 - 1;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
      }

      class NeuralNetwork {
        constructor() {
          this.particles = [];
          this.lastTime = 0;
          this.fps = 30;
          this.fpsInterval = 1000 / this.fps;
          this.animationFrameId = null;
          this.init();
        }

        init() {
          const particleCount = Math.min(100, Math.floor(window.innerWidth * window.innerHeight / 20000));
          this.particles = Array.from({ length: particleCount }, () => 
            new NeuralParticle(
              Math.random() * canvas.width,
              Math.random() * canvas.height
            )
          );
        }

        animate(currentTime = 0) {
          try {
            this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

            const elapsed = currentTime - this.lastTime;
            if (elapsed < this.fpsInterval) return;

            this.lastTime = currentTime - (elapsed % this.fpsInterval);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach(particle => {
              particle.update();
              this.drawConnections(particle);
            });
          } catch (error) {
            console.error('Animation error:', error);
            this.stop();
            setError(error.message);
          }
        }

        stop() {
          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
          }
        }

        drawConnections(particle) {
          const maxConnections = 5;
          let connections = 0;
          
          for (const other of this.particles) {
            if (connections >= maxConnections) break;
            
            const distance = Math.hypot(
              particle.x - other.x,
              particle.y - other.y
            );

            if (distance < 100 && distance > 0) {
              connections++;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(0, 247, 255, ${1 - distance / 100})`;
              ctx.stroke();
            }
          }
        }
      }

      const initCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (networkRef.current) {
          networkRef.current.init();
        }
      };

      window.addEventListener('resize', initCanvas);
      initCanvas();

      const network = new NeuralNetwork();
      networkRef.current = network;
      network.animate();

      return () => {
        window.removeEventListener('resize', initCanvas);
        if (networkRef.current) {
          networkRef.current.stop();
        }
      };
    } catch (error) {
      console.error('Neural background initialization error:', error);
      setError(error.message);
    }
  }, []);

  if (error) {
    return null; // Gracefully fail by not rendering anything
  }

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1, 
        opacity: 0.2,
        willChange: 'transform' // Optimize for animations
      }} 
    />
  );
};

export default NeuralBackground;
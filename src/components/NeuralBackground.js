import React, { useEffect, useRef } from 'react';

const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    class NeuralParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.connections = [];
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
        this.init();
      }

      init() {
        for (let i = 0; i < 100; i++) {
          this.particles.push(
            new NeuralParticle(
              Math.random() * canvas.width,
              Math.random() * canvas.height
            )
          );
        }
      }

      animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.particles.forEach(particle => {
          particle.update();
          this.drawConnections(particle);
        });

        requestAnimationFrame(() => this.animate());
      }

      drawConnections(particle) {
        this.particles.forEach(other => {
          const distance = Math.hypot(
            particle.x - other.x,
            particle.y - other.y
          );

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 247, 255, ${1 - distance / 100})`;
            ctx.stroke();
          }
        });
      }
    }

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', initCanvas);
    initCanvas();

    const network = new NeuralNetwork();
    network.animate();

    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.2 }} />;
};

export default NeuralBackground;